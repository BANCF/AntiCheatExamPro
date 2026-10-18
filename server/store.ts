import fs from 'fs';
import path from 'path';
import { Question, ExamConfig, SubmissionRecord, ViolationLog, StudentAnswers, TeacherAccount, ClassRoom } from '../src/types/exam';
import { DEFAULT_QUESTION_BANK, DEFAULT_EXAM_CONFIG } from '../src/data/defaultQuestionBank';
import { DEFAULT_CLASSES, DEFAULT_TEACHERS } from '../src/data/defaultClasses';
import { generateAllExamVariants, generateStudentExam, calculateExamScore } from '../src/utils/randomEngine';

export { DEFAULT_CLASSES, DEFAULT_TEACHERS };

export interface ActiveStudentState {
  socketId?: string;
  attemptId: string;
  studentName: string;
  studentClass: string;
  assignedCode: string;
  seed: number;
  startTime: string;
  durationSeconds: number;
  remainingSeconds: number;
  currentQuestionIndex: number;
  answeredCount: number;
  totalQuestions: number;
  violationCount: number;
  violationsLog: ViolationLog[];
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'FORCE_SUBMITTED' | 'DISCONNECTED';
  lastPing: number;
  pickedOriginalQuestions: Question[];
}

const DATA_DIR = path.resolve(process.cwd(), 'server_data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

interface StoredData {
  bank: Question[];
  config: ExamConfig;
  submissions: SubmissionRecord[];
  teachers?: TeacherAccount[];
  classes?: ClassRoom[];
}

class ServerStore {
  public bank: Question[] = DEFAULT_QUESTION_BANK;
  public config: ExamConfig = DEFAULT_EXAM_CONFIG;
  public submissions: SubmissionRecord[] = [];
  public teachers: TeacherAccount[] = DEFAULT_TEACHERS;
  public classes: ClassRoom[] = DEFAULT_CLASSES;
  public activeStudents: Map<string, ActiveStudentState> = new Map();

  constructor() {
    this.initStore();
  }

  private initStore() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed: StoredData = JSON.parse(raw);
        if (parsed.bank && Array.isArray(parsed.bank)) this.bank = parsed.bank;
        if (parsed.config) this.config = parsed.config;
        if (parsed.submissions && Array.isArray(parsed.submissions)) this.submissions = parsed.submissions;
        if (parsed.teachers && Array.isArray(parsed.teachers) && parsed.teachers.length > 0) {
          this.teachers = parsed.teachers;
        }
        if (parsed.classes && Array.isArray(parsed.classes) && parsed.classes.length > 0) {
          this.classes = parsed.classes;
        }
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn('Failed to load store from disk, using defaults:', err);
    }
  }

  private persistTimer: NodeJS.Timeout | null = null;

  public persist() {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
    }
    this.persistTimer = setTimeout(() => {
      try {
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        const data: StoredData = {
          bank: this.bank,
          config: this.config,
          submissions: this.submissions,
          teachers: this.teachers,
          classes: this.classes
        };
        fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8').catch((err) => {
          console.error('Async persist error:', err);
        });
      } catch (err) {
        console.error('Failed to schedule store persist:', err);
      }
    }, 500);
  }

  public getOrCreateStudentExam(studentName: string, studentClass: string, classOverride?: ClassRoom) {
    const normName = studentName.trim().toLowerCase();
    const normClass = studentClass.trim().toLowerCase();

    for (const [_id, student] of this.activeStudents.entries()) {
      if (
        student.studentName.trim().toLowerCase() === normName &&
        student.studentClass.trim().toLowerCase() === normClass &&
        student.status !== 'SUBMITTED' &&
        student.status !== 'FORCE_SUBMITTED'
      ) {
        const sanitizedQuestions = student.pickedOriginalQuestions.map((q) => {
          if (q.type === 'single_choice') {
            return {
              id: q.id,
              type: 'single_choice' as const,
              prompt: q.prompt,
              tags: q.tags,
              options: q.options.map(({ id, text }) => ({ id, text }))
            };
          } else {
            return {
              id: q.id,
              type: 'true_false' as const,
              prompt: q.prompt,
              tags: q.tags,
              items: q.items.map(({ id, text }) => ({ id, text }))
            };
          }
        });

        const elapsedSec = Math.floor((Date.now() - new Date(student.startTime).getTime()) / 1000);
        const remainingSeconds = Math.max(10, student.durationSeconds - elapsedSec);

        return {
          attemptId: student.attemptId,
          assignedCode: student.assignedCode,
          sanitizedQuestions,
          durationSeconds: student.durationSeconds,
          remainingSeconds,
          startTime: student.startTime,
          isReconnected: true
        };
      }
    }

    return this.startStudentExam(studentName, studentClass, classOverride);
  }

  public startStudentExam(studentName: string, studentClass: string, classOverride?: ClassRoom) {
    const effectiveConfig: ExamConfig = classOverride?.examConfig
      ? {
          ...this.config,
          ...classOverride.examConfig,
          title: classOverride.examTitle || this.config.title,
          duration_minutes: classOverride.examConfig.duration_minutes || this.config.duration_minutes
        }
      : {
          ...this.config,
          title: classOverride?.examTitle || this.config.title
        };

    if (effectiveConfig.exam_mode === 'pdf') {
      const totalQ = effectiveConfig.pdf_total_questions || (effectiveConfig.pdf_answer_key ? Object.keys(effectiveConfig.pdf_answer_key).length : 40);
      const assignedCode = String(100 + Math.floor(Math.random() * 15));
      const sanitizedQuestions: Question[] = Array.from({ length: totalQ }, (_, i) => ({
        id: String(i + 1),
        type: 'single_choice' as const,
        prompt: `Câu ${i + 1}`,
        tags: [effectiveConfig.target_subject || 'Đề PDF'],
        options: [
          { id: 'A', text: 'A' },
          { id: 'B', text: 'B' },
          { id: 'C', text: 'C' },
          { id: 'D', text: 'D' }
        ]
      }));

      const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const durationSeconds = effectiveConfig.duration_minutes * 60;
      const startTime = new Date().toISOString();

      const studentState: ActiveStudentState = {
        attemptId,
        studentName: studentName.trim(),
        studentClass: studentClass.trim(),
        assignedCode,
        seed: 2026,
        startTime,
        durationSeconds,
        remainingSeconds: durationSeconds,
        currentQuestionIndex: 0,
        answeredCount: 0,
        totalQuestions: sanitizedQuestions.length,
        violationCount: 0,
        violationsLog: [],
        status: 'IN_PROGRESS',
        lastPing: Date.now(),
        pickedOriginalQuestions: sanitizedQuestions
      };

      this.activeStudents.set(attemptId, studentState);

      return {
        attemptId,
        assignedCode,
        sanitizedQuestions,
        durationSeconds,
        remainingSeconds: durationSeconds,
        startTime,
        isReconnected: false
      };
    }

    const variants = generateAllExamVariants(this.bank, effectiveConfig);
    const pickedVariant = variants[Math.floor(Math.random() * variants.length)];
    const { sanitizedQuestions, pickedOriginalQuestions, assignedCode, seed } = pickedVariant;

    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const durationSeconds = effectiveConfig.duration_minutes * 60;
    const startTime = new Date().toISOString();

    const studentState: ActiveStudentState = {
      attemptId,
      studentName: studentName.trim(),
      studentClass: studentClass.trim(),
      assignedCode,
      seed,
      startTime,
      durationSeconds,
      remainingSeconds: durationSeconds,
      currentQuestionIndex: 0,
      answeredCount: 0,
      totalQuestions: sanitizedQuestions.length,
      violationCount: 0,
      violationsLog: [],
      status: 'IN_PROGRESS',
      lastPing: Date.now(),
      pickedOriginalQuestions
    };

    this.activeStudents.set(attemptId, studentState);

    return {
      attemptId,
      assignedCode,
      sanitizedQuestions,
      durationSeconds,
      remainingSeconds: durationSeconds,
      startTime,
      isReconnected: false
    };
  }

  public submitStudentExam(params: {
    attemptId: string;
    studentName: string;
    studentClass: string;
    assignedCode: string;
    answers: StudentAnswers;
    status: 'SUBMITTED' | 'FORCE_SUBMITTED';
    violationsLog: ViolationLog[];
  }): SubmissionRecord {
    const existing = this.activeStudents.get(params.attemptId);
    const originalQuestions = existing ? existing.pickedOriginalQuestions : this.bank;

    let calculatedScore = 0;
    let earnedPoints = 0;
    let totalPossiblePoints = 0;

    if (this.config.exam_mode === 'pdf') {
      const answerKey = this.config.pdf_answer_key || {};
      const totalQ = this.config.pdf_total_questions || (Object.keys(answerKey).length || 40);
      totalPossiblePoints = totalQ;

      for (let i = 1; i <= totalQ; i++) {
        const studentAns = params.answers[String(i)];
        const correctAns = answerKey[String(i)];
        if (studentAns && correctAns && String(studentAns).trim().toUpperCase() === String(correctAns).trim().toUpperCase()) {
          earnedPoints += 1;
        }
      }
      calculatedScore = totalPossiblePoints > 0 ? Math.round((earnedPoints / totalPossiblePoints) * 10 * 100) / 100 : 0;
    } else {
      const res = calculateExamScore(params.answers, originalQuestions);
      calculatedScore = res.calculatedScore;
      earnedPoints = res.earnedPoints;
      totalPossiblePoints = res.totalPossiblePoints;
    }

    const matchedClass = this.classes.find(
      (c) => c.code.trim().toUpperCase() === params.studentClass.trim().toUpperCase()
    );
    const examId = matchedClass?.id || this.config.exam_id;
    const examTitle = matchedClass?.examTitle || this.config.title;

    const submitTime = new Date().toISOString();
    const submission: SubmissionRecord = {
      submission_id: `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      exam_id: examId,
      exam_title: examTitle,
      student_name: params.studentName.trim(),
      student_class: params.studentClass.trim(),
      assigned_code: params.assignedCode,
      start_time: existing ? existing.startTime : submitTime,
      submit_time: submitTime,
      status: params.status,
      violation_count: params.violationsLog.length,
      violations_log: params.violationsLog,
      student_answers: params.answers,
      calculated_score: calculatedScore,
      total_questions: originalQuestions.length,
      correct_points_earned: earnedPoints,
      max_possible_points: totalPossiblePoints
    };

    this.submissions = [submission, ...this.submissions.filter((s) => s.submission_id !== submission.submission_id)];
    this.persist();

    if (existing) {
      existing.status = params.status;
      existing.answeredCount = Object.keys(params.answers).length;
    }

    return submission;
  }
}

export const serverStore = new ServerStore();
