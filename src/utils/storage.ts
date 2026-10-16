import { Question, ExamConfig, SubmissionRecord, ExamSessionState } from '../types/exam';
import { DEFAULT_QUESTION_BANK, DEFAULT_EXAM_CONFIG } from '../data/defaultQuestionBank';

const STORAGE_KEYS = {
  QUESTION_BANK: 'anticheat_exam_bank_v1',
  EXAM_CONFIG: 'anticheat_exam_config_v1',
  SUBMISSIONS: 'anticheat_exam_submissions_v1',
  ACTIVE_SESSION: 'anticheat_active_session_v1'
};

export function getStoredQuestionBank(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTION_BANK);
    if (!raw) return DEFAULT_QUESTION_BANK;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_QUESTION_BANK;
  } catch {
    return DEFAULT_QUESTION_BANK;
  }
}

export function saveQuestionBank(bank: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTION_BANK, JSON.stringify(bank));
  } catch (err) {
    console.error('Failed to save question bank to localStorage:', err);
  }
}

export function getStoredExamConfig(): ExamConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_CONFIG);
    if (!raw) return DEFAULT_EXAM_CONFIG;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_EXAM_CONFIG;
  }
}

export function saveExamConfig(config: ExamConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EXAM_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save exam config:', err);
  }
}

export function getStoredSubmissions(): SubmissionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSubmissions(submissions: SubmissionRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  } catch (err) {
    console.error('Failed to save submissions:', err);
  }
}

export function addSubmission(submission: SubmissionRecord): SubmissionRecord[] {
  const current = getStoredSubmissions();
  // Filter out any duplicate submission id
  const updated = [submission, ...current.filter((s) => s.submission_id !== submission.submission_id)];
  saveSubmissions(updated);
  return updated;
}

export function getStoredActiveSession(): ExamSessionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!raw) return null;
    const session = JSON.parse(raw) as ExamSessionState;
    // Check if session has expired
    const elapsed = Math.floor((Date.now() - new Date(session.start_time).getTime()) / 1000);
    if (elapsed > session.duration_seconds + 300) {
      // Expired by more than 5 minutes
      clearActiveSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveActiveSession(session: ExamSessionState): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save active session:', err);
  }
}

export function clearActiveSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  } catch (err) {
    console.error('Failed to clear active session:', err);
  }
}
