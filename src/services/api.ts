import { Question, ExamConfig, SubmissionRecord, ViolationLog, StudentAnswers, SanitizedQuestion } from '../types/exam';

const API_BASE =
  window.location.port === '5173'
    ? `http://${window.location.hostname}:3000/api`
    : `${window.location.origin}/api`;

export const api = {
  async getBank(): Promise<Question[]> {
    const res = await fetch(`${API_BASE}/bank`);
    if (!res.ok) throw new Error('Không thể tải ngân hàng câu hỏi');
    return res.json();
  },

  async updateBank(bank: Question[]): Promise<void> {
    const res = await fetch(`${API_BASE}/bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bank)
    });
    if (!res.ok) throw new Error('Không thể lưu ngân hàng câu hỏi');
  },

  async getConfig(): Promise<ExamConfig> {
    const res = await fetch(`${API_BASE}/config`);
    if (!res.ok) throw new Error('Không thể tải cấu hình đề thi');
    return res.json();
  },

  async updateConfig(config: ExamConfig): Promise<void> {
    const res = await fetch(`${API_BASE}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (!res.ok) throw new Error('Không thể lưu cấu hình đề thi');
  },

  async startExam(studentName: string, studentClass: string, pin?: string): Promise<{
    attemptId: string;
    assignedCode: string;
    sanitizedQuestions: SanitizedQuestion[];
    durationSeconds: number;
    startTime: string;
  }> {
    const res = await fetch(`${API_BASE}/exam/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_name: studentName,
        student_class: studentClass,
        pin
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Lỗi khi bắt đầu bài thi');
    }
    return res.json();
  },

  async submitExam(payload: {
    attempt_id: string;
    student_name: string;
    student_class: string;
    assigned_code: string;
    answers: StudentAnswers;
    status: 'SUBMITTED' | 'FORCE_SUBMITTED';
    violations_log: ViolationLog[];
  }): Promise<{
    success: boolean;
    submission_id: string;
    student_name: string;
    studentClass: string;
    assigned_code: string;
    submit_time: string;
    status: 'SUBMITTED' | 'FORCE_SUBMITTED';
  }> {
    const res = await fetch(`${API_BASE}/exam/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Lỗi khi nộp bài');
    }
    return res.json();
  },

  async getSubmissions(): Promise<SubmissionRecord[]> {
    const res = await fetch(`${API_BASE}/submissions`);
    if (!res.ok) throw new Error('Không thể tải bảng điểm');
    return res.json();
  },

  async clearSubmissions(): Promise<void> {
    const res = await fetch(`${API_BASE}/submissions`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Không thể xóa bảng điểm');
  },

  async getActiveStudents(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/active-students`);
    if (!res.ok) return [];
    return res.json();
  }
};
