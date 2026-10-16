import { Question, ExamConfig, SubmissionRecord, SanitizedQuestion, StudentAnswers, ViolationLog, SubmissionStatus } from '../types/exam';

const API_BASE =
  window.location.port === '5173'
    ? `http://${window.location.hostname}:3000/api`
    : `${window.location.origin}/api`;

export async function fetchQuestionBank(): Promise<Question[] | null> {
  try {
    const res = await fetch(`${API_BASE}/bank`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API fetchQuestionBank failed, fallback to local:', err);
  }
  return null;
}

export async function saveQuestionBankApi(bank: Question[]): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bank)
    });
    return res.ok;
  } catch (err) {
    console.warn('API saveQuestionBankApi failed:', err);
    return false;
  }
}

export async function fetchExamConfig(): Promise<ExamConfig | null> {
  try {
    const res = await fetch(`${API_BASE}/config`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API fetchExamConfig failed, fallback to local:', err);
  }
  return null;
}

export async function saveExamConfigApi(config: ExamConfig): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return res.ok;
  } catch (err) {
    console.warn('API saveExamConfigApi failed:', err);
    return false;
  }
}

export async function fetchSubmissionsApi(): Promise<SubmissionRecord[] | null> {
  try {
    const res = await fetch(`${API_BASE}/submissions`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API fetchSubmissionsApi failed, fallback to local:', err);
  }
  return null;
}

export async function clearSubmissionsApi(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/submissions`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    console.warn('API clearSubmissionsApi failed:', err);
    return false;
  }
}

export async function startStudentExamApi(params: {
  studentName: string;
  studentClass: string;
  pin?: string;
}): Promise<{
  attemptId: string;
  assignedCode: string;
  sanitizedQuestions: SanitizedQuestion[];
  durationSeconds: number;
  remainingSeconds?: number;
  startTime: string;
  isReconnected?: boolean;
} | null> {
  try {
    const res = await fetch(`${API_BASE}/exam/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name: params.studentName,
        student_class: params.studentClass,
        pin: params.pin
      })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API startStudentExamApi failed, will fallback to local:', err);
  }
  return null;
}

export async function submitStudentExamApi(params: {
  attemptId: string;
  studentName: string;
  studentClass: string;
  assignedCode: string;
  answers: StudentAnswers;
  status: SubmissionStatus;
  violationsLog: ViolationLog[];
}): Promise<{
  success: boolean;
  submission_id: string;
  student_name: string;
  student_class: string;
  assigned_code: string;
  submit_time: string;
  status: SubmissionStatus;
} | null> {
  try {
    const res = await fetch(`${API_BASE}/exam/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        attempt_id: params.attemptId,
        student_name: params.studentName,
        student_class: params.studentClass,
        assigned_code: params.assignedCode,
        answers: params.answers,
        status: params.status,
        violations_log: params.violationsLog
      })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('API submitStudentExamApi failed:', err);
  }
  return null;
}

export async function verifyTeacherPasswordApi(password: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/teacher`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return res.ok;
  } catch (err) {
    console.warn('API verifyTeacherPasswordApi fallback to local comparison:', err);
    return false;
  }
}
