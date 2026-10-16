import fs from 'fs';
import path from 'path';
import { Question, ExamConfig, SubmissionRecord, ViolationLog, StudentAnswers } from '../src/types/exam';
import { DEFAULT_QUESTION_BANK, DEFAULT_EXAM_CONFIG } from '../src/data/defaultQuestionBank';
import { generateStudentExam, calculateExamScore } from '../src/utils/randomEngine';

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
}

class ServerStore {
  public bank: Question[] = DEFAULT_QUESTION_BANK;
  public config: ExamConfig = DEFAULT_EXAM_CONFIG;
  public submissions: SubmissionRecord[] = [];
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
        submissions: this.submissions
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist store to disk:', err);
    }
  }

  public startStudentExam(studentName: string, studentClass: string) {
    const seed = Date.now();
    const { sanitizedQuestions, pickedOriginalQuestions, assignedCode } = generateStudentExam(
      seed,
      this.bank,
      this.config
    );

    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const durationSeconds = this.config.duration_minutes * 60;
    const startTime = new Date().toISOString();

    const studentState: ActiveStudentState = {
      attemptId,
      studentName,
      studentClass,
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
      startTime
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

    const { calculatedScore, earnedPoints, totalPossiblePoints } = calculateExamScore(
      params.answers,
      originalQuestions
    );

    const submitTime = new Date().toISOString();
    const submission: SubmissionRecord = {
      submission_id: `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
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
