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

  public persist() {
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
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist store:', err);
    }
  }

  public getOrCreateStudentExam(
    studentName: string,
    studentClass: string,
    classOverride?: ClassRoom,
    forceNew: boolean = false
  ) {
    const normName = studentName.trim().toLowerCase();
    const normClass = studentClass.trim().toLowerCase();

    if (!forceNew) {
      for (const [_id, student] of this.activeStudents.entries()) {
        if (
          student.studentName.trim().toLowerCase() === normName &&
          student.studentClass.trim().toLowerCase() === normClass &&
          student.status !== 'SUBMITTED' &&
          student.status !== 'FORCE_SUBMITTED'
        ) {
          // If the class has a specific question count and the existing session has a different count, start fresh!
          const expectedQCount = classOverride?.examConfig?.total_questions_to_pick;
          if (expectedQCount && student.totalQuestions !== expectedQCount) {
            this.activeStudents.delete(student.attemptId);
            break;
          }

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
    } else {
      // Remove any pending old attempt for this student in this class so we start 100% clean
      for (const [id, student] of this.activeStudents.entries()) {
        if (
          student.studentName.trim().toLowerCase() === normName &&
          student.studentClass.trim().toLowerCase() === normClass
        ) {
          this.activeStudents.delete(id);
        }
      }
    }

    return this.startStudentExam(studentName, studentClass, classOverride);
  }

  public startStudentExam(studentName: string, studentClass: string, classOverride?: ClassRoom) {
    const classCfg = classOverride?.examConfig || {};
    const effectiveTotal = classCfg.total_questions_to_pick ?? this.config.total_questions_to_pick ?? 10;
    
    let effectiveDist = classCfg.distribution;
    if (!effectiveDist && effectiveTotal) {
      const tf = Math.max(0, Math.min(6, Math.round(effectiveTotal * 0.2)));
      const sc = effectiveTotal - tf;
      effectiveDist = { single_choice: sc, true_false: tf };
    }

    const effectiveConfig: ExamConfig = {
      ...this.config,
      ...classCfg,
      title: classOverride?.examTitle || this.config.title,
      duration_minutes: classCfg.duration_minutes || this.config.duration_minutes,
      total_questions_to_pick: effectiveTotal,
      distribution: effectiveDist || this.config.distribution
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

  public deleteSubmission(idOrAttempt: string): boolean {
    const prevCount = this.submissions.length;
    this.submissions = this.submissions.filter(
      (s) => s.submission_id !== idOrAttempt && (s as any).attempt_id !== idOrAttempt
    );
    if (this.submissions.length !== prevCount) {
      this.persist();
      return true;
    }
    return false;
  }

  public deduplicateSubmissions(): number {
    const initialCount = this.submissions.length;
    const seen = new Set<string>();
    const unique: SubmissionRecord[] = [];

    // Sort by submit_time desc so the latest valid submission is kept
    const sorted = [...this.submissions].sort(
      (a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime()
    );

    for (const sub of sorted) {
      const key = `${sub.student_name.trim().toLowerCase()}_${sub.student_class.trim().toLowerCase()}_${sub.assigned_code}_${sub.exam_id || 'default'}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(sub);
      }
    }

    this.submissions = unique;
    this.persist();
    return initialCount - unique.length;
  }

  public submitStudentExam(params: {
    attemptId: string;
    studentName: string;
    studentClass: string;
    assignedCode: string;
    answers: StudentAnswers;
    status: 'SUBMITTED' | 'FORCE_SUBMITTED';
    violationsLog: ViolationLog[];
    submissionId?: string;
    incomingRecord?: SubmissionRecord;
  }): SubmissionRecord {
    const existing = this.activeStudents.get(params.attemptId);
    const originalQuestions = existing ? existing.pickedOriginalQuestions : this.bank;

    const matchedClass = this.classes.find(
      (c) => c.code.trim().toUpperCase() === params.studentClass.trim().toUpperCase()
    );

    const effectiveConfig: ExamConfig = matchedClass?.examConfig
      ? {
          ...this.config,
          ...matchedClass.examConfig,
          title: matchedClass.examTitle || this.config.title,
          duration_minutes: matchedClass.examConfig.duration_minutes || this.config.duration_minutes
        }
      : {
          ...this.config,
          title: matchedClass?.examTitle || this.config.title
        };

    const examId = matchedClass?.id || this.config.exam_id;
    const examTitle = matchedClass?.examTitle || this.config.title;

    let calculatedScore = 0;
    let earnedPoints = 0;
    let totalPossiblePoints = 0;

    if (params.incomingRecord && typeof params.incomingRecord.calculated_score === 'number' && effectiveConfig.exam_mode !== 'pdf') {
      calculatedScore = params.incomingRecord.calculated_score;
      earnedPoints = params.incomingRecord.correct_points_earned ?? calculatedScore;
      totalPossiblePoints = params.incomingRecord.max_possible_points ?? originalQuestions.length;
    } else {
      const res = calculateExamScore(params.answers, originalQuestions, effectiveConfig);
      calculatedScore = res.calculatedScore;
      earnedPoints = res.earnedPoints;
      totalPossiblePoints = res.totalPossiblePoints;
    }

    const submitTime = new Date().toISOString();
    // Prefer client's existing submission ID or reuse duplicate attempt
    const targetId =
      params.submissionId ||
      params.incomingRecord?.submission_id ||
      `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const submission: SubmissionRecord = {
      submission_id: targetId,
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
      total_questions: params.incomingRecord?.total_questions ?? (effectiveConfig.exam_mode === 'pdf' ? totalPossiblePoints : originalQuestions.length),
      correct_points_earned: earnedPoints,
      max_possible_points: params.incomingRecord?.max_possible_points ?? totalPossiblePoints
    };

    // Deduplicate: replace any existing record with same submission_id or same student + class + assigned_code
    const normName = params.studentName.trim().toLowerCase();
    const normClass = params.studentClass.trim().toLowerCase();

    this.submissions = [
      submission,
      ...this.submissions.filter((s) => {
        if (s.submission_id === targetId) return false;
        if (
          s.student_name.trim().toLowerCase() === normName &&
          s.student_class.trim().toLowerCase() === normClass &&
          s.assigned_code === params.assignedCode &&
          (s.exam_id === examId || !s.exam_id)
        ) {
          return false;
        }
        return true;
      })
    ];

    this.persist();

    if (existing) {
      existing.status = params.status;
      existing.answeredCount = Object.keys(params.answers).length;
    }

    return submission;
  }
}

export const serverStore = new ServerStore();
