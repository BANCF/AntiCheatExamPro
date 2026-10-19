import type { IncomingMessage, ServerResponse } from 'http';
import {
  addSubmission,
  getClasses,
  getQuestionBank,
  getExamConfig,
  parseJsonBody,
  sendJson,
  handleCors
} from '../_storage';
import { SubmissionRecord } from '../../src/types/exam';
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

    const incomingRecord = submission_record || submissionRecord || record;

    if (!attempt_id && !incomingRecord?.attempt_id && !incomingRecord?.submission_id) {
      return sendJson(res, 400, { error: 'Thiếu attempt_id hoặc submission record' });
    }

    let finalRecord: SubmissionRecord;

    if (incomingRecord && incomingRecord.submission_id) {
      // Client has already computed accurate score based on picked randomized variant
      finalRecord = incomingRecord;
    } else {
      // Calculate score on server
      const bank = await getQuestionBank();
      const config = await getExamConfig();
      const classes = await getClasses();

      const matchedClass = classes.find(
        (c) => c.code.trim().toUpperCase() === (student_class || '').trim().toUpperCase()
      );
      const examId = matchedClass?.id || config.exam_id;
      const examTitle = matchedClass?.examTitle || config.title;

      let calculatedScore = 0;
      let earnedPoints = 0;
      let totalPossiblePoints = 0;

      if (config.exam_mode === 'pdf') {
        const answerKey = config.pdf_answer_key || {};
        const totalQ = config.pdf_total_questions || (Object.keys(answerKey).length || 40);
        totalPossiblePoints = totalQ;

        for (let i = 1; i <= totalQ; i++) {
          const studentAns = answers?.[String(i)];
          const correctAns = answerKey[String(i)];
          if (
            studentAns &&
            correctAns &&
            String(studentAns).trim().toUpperCase() === String(correctAns).trim().toUpperCase()
          ) {
            earnedPoints += 1;
          }
        }
        calculatedScore = totalPossiblePoints > 0 ? Math.round((earnedPoints / totalPossiblePoints) * 10 * 100) / 100 : 0;
      } else {
        const scoreRes = calculateExamScore(answers || {}, bank);
        calculatedScore = scoreRes.calculatedScore;
        earnedPoints = scoreRes.earnedPoints;
        totalPossiblePoints = scoreRes.totalPossiblePoints;
      }

      const submitTime = new Date().toISOString();
      finalRecord = {
        submission_id: `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        exam_id: examId,
        exam_title: examTitle,
        student_name: (student_name || 'Học sinh').trim(),
        student_class: (student_class || 'Lớp').trim(),
        assigned_code: assigned_code || '101',
        start_time: submitTime,
        submit_time: submitTime,
        status: status === 'FORCE_SUBMITTED' ? 'FORCE_SUBMITTED' : 'SUBMITTED',
        violation_count: (violations_log || []).length,
        violations_log: violations_log || [],
        student_answers: answers || {},
        calculated_score: calculatedScore,
        total_questions: bank.length,
        correct_points_earned: earnedPoints,
        max_possible_points: totalPossiblePoints
      };
    }

    // Persist to Upstash Redis
    await addSubmission(finalRecord);

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
