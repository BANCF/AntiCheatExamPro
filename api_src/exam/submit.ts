import type { IncomingMessage, ServerResponse } from 'http';
import {
  addSubmission,
  getClasses,
  getQuestionBank,
  getExamConfig,
  deleteActiveStudentSession,
  parseJsonBody,
  sendJson,
  handleCors
} from '../_storage';
import type { SubmissionRecord, ExamConfig } from '../../src/types/exam';
import { calculateExamScore } from '../../src/utils/randomEngine';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handleCors(req, res)) return;

  if ((req.method || 'GET').toUpperCase() !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    const {
      attempt_id,
      student_name,
      student_class,
      assigned_code,
      answers,
      status,
      violations_log,
      submission_record,
      submissionRecord,
      record
    } = body;

    const incomingRecord: SubmissionRecord | undefined = submission_record || submissionRecord || record;

    if (!attempt_id && !incomingRecord?.attempt_id && !incomingRecord?.submission_id) {
      return sendJson(res, 400, { error: 'Thiếu attempt_id hoặc submission record' });
    }

    const targetStudentClass = (student_class || incomingRecord?.student_class || '').trim();
    const targetStudentName = (student_name || incomingRecord?.student_name || 'Học sinh').trim();
    const targetAssignedCode = assigned_code || incomingRecord?.assigned_code || '101';
    const targetAnswers = answers || incomingRecord?.student_answers || {};

    const bank = await getQuestionBank();
    const config = await getExamConfig();
    const classes = await getClasses();

    const matchedClass = classes.find(
      (c) => c.code.trim().toUpperCase() === targetStudentClass.toUpperCase()
    );

    const effectiveConfig: ExamConfig = matchedClass?.examConfig
      ? {
          ...config,
          ...matchedClass.examConfig,
          title: matchedClass.examTitle || config.title,
          duration_minutes: matchedClass.examConfig.duration_minutes || config.duration_minutes
        }
      : {
          ...config,
          title: matchedClass?.examTitle || config.title
        };

    const examId = matchedClass?.id || config.exam_id;
    const examTitle = matchedClass?.examTitle || effectiveConfig.title || config.title;

    let finalRecord: SubmissionRecord;

    if (
      incomingRecord &&
      incomingRecord.submission_id &&
      typeof incomingRecord.calculated_score === 'number' &&
      effectiveConfig.exam_mode !== 'pdf'
    ) {
      // Client has already computed accurate score based on picked randomized variant
      finalRecord = {
        ...incomingRecord,
        exam_id: incomingRecord.exam_id || examId,
        exam_title: incomingRecord.exam_title || examTitle
      };
    } else {
      // Calculate / validate score on server using effectiveConfig (handles class PDF answer key & Bank)
      const scoreRes = calculateExamScore(targetAnswers, bank, effectiveConfig);
      const calculatedScore = scoreRes.calculatedScore;
      const earnedPoints = scoreRes.earnedPoints;
      const totalPossiblePoints = scoreRes.totalPossiblePoints;
      const totalQ = scoreRes.totalQuestions || Object.keys(targetAnswers).length || 10;

      const submitTime = incomingRecord?.submit_time || new Date().toISOString();
      const startTime = incomingRecord?.start_time || submitTime;

      if (incomingRecord && incomingRecord.submission_id) {
        finalRecord = {
          ...incomingRecord,
          exam_id: examId,
          exam_title: examTitle,
          calculated_score: calculatedScore,
          correct_points_earned: earnedPoints,
          max_possible_points: totalPossiblePoints,
          total_questions: totalQ,
          correct_answers_count: scoreRes.correctAnswersCount,
          per_question_scores: scoreRes.perQuestionScores,
          per_question_max_points: scoreRes.perQuestionMaxPoints
        };
      } else {
        finalRecord = {
          submission_id: `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
          exam_id: examId,
          exam_title: examTitle,
          student_name: targetStudentName,
          student_class: targetStudentClass || 'Lớp',
          assigned_code: targetAssignedCode,
          start_time: startTime,
          submit_time: submitTime,
          status: status === 'FORCE_SUBMITTED' || incomingRecord?.status === 'FORCE_SUBMITTED' ? 'FORCE_SUBMITTED' : 'SUBMITTED',
          violation_count: (violations_log || incomingRecord?.violations_log || []).length,
          violations_log: violations_log || incomingRecord?.violations_log || [],
          student_answers: targetAnswers,
          calculated_score: calculatedScore,
          total_questions: totalQ,
          correct_points_earned: earnedPoints,
          max_possible_points: totalPossiblePoints,
          correct_answers_count: scoreRes.correctAnswersCount,
          per_question_scores: scoreRes.perQuestionScores,
          per_question_max_points: scoreRes.perQuestionMaxPoints
        };
      }
    }

    // Persist to Upstash Redis / Memory
    await addSubmission(finalRecord);

    // Clean up active session for this student
    if (finalRecord.student_class && finalRecord.student_name) {
      await deleteActiveStudentSession(finalRecord.student_class, finalRecord.student_name);
    }

    // Return receipt without answers/score for student privacy
    return sendJson(res, 200, {
      success: true,
      submission_id: finalRecord.submission_id,
      student_name: finalRecord.student_name,
      student_class: finalRecord.student_class,
      assigned_code: finalRecord.assigned_code,
      submit_time: finalRecord.submit_time,
      status: finalRecord.status
    });
  } catch (err: any) {
    console.error('Error submitting exam on Vercel Function:', err);
    return sendJson(res, 500, { error: 'Lỗi máy chủ khi nộp bài: ' + (err?.message || err) });
  }
}
