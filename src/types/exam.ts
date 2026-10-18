export type QuestionType = 'single_choice' | 'true_false';

export interface SingleChoiceOption {
  id: string;
  text: string;
  is_correct?: boolean; // Stripped before sending to student!
}

export interface TrueFalseSubItem {
  id: string;
  text: string;
  is_correct?: boolean; // Stripped before sending to student!
}

export interface SingleChoiceQuestion {
  id: string;
  type: 'single_choice';
  prompt: string;
  options: SingleChoiceOption[];
  tags: string[];
  grade?: string;    // e.g. "Lớp 7", "Lớp 10", "Lớp 12"
  subject?: string;  // e.g. "Tin học", "Toán học", "Vật lí"
  term?: string;     // e.g. "Giữa kì I", "Cuối kì I", "Giữa kì II", "Cuối kì II"
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true_false';
  prompt: string;
  items: TrueFalseSubItem[];
  tags: string[];
  grade?: string;    // e.g. "Lớp 7", "Lớp 10", "Lớp 12"
  subject?: string;  // e.g. "Tin học", "Toán học", "Vật lí"
  term?: string;     // e.g. "Giữa kì I", "Cuối kì I", "Giữa kì II", "Cuối kì II"
}

export type Question = SingleChoiceQuestion | TrueFalseQuestion;

export type SanitizedOption = Omit<SingleChoiceOption, 'is_correct'>;
export type SanitizedSubItem = Omit<TrueFalseSubItem, 'is_correct'>;

export interface SanitizedSingleChoiceQuestion extends Omit<SingleChoiceQuestion, 'options'> {
  options: SanitizedOption[];
}

export interface SanitizedTrueFalseQuestion extends Omit<TrueFalseQuestion, 'items'> {
  items: SanitizedSubItem[];
}

export type SanitizedQuestion = SanitizedSingleChoiceQuestion | SanitizedTrueFalseQuestion;

export interface ExamDistribution {
  single_choice: number;
  true_false: number;
}

export type ExamMode = 'bank' | 'pdf';

export interface ClassRoom {
  id: string;
  code: string; // Mã lớp viết hoa duy nhất, ví dụ: "7A1", "10A1", "12A3"
  name: string; // Tên hiển thị lớp, ví dụ: "Lớp 7A1 - Tin học 7"
  grade: string; // Khối lớp, ví dụ: "Lớp 7"
  subject: string; // Môn học, ví dụ: "Tin học"
  teacherName?: string;
  pinCode: string; // Mã PIN bảo mật riêng cho bài thi của lớp này (VD: "2026", "1234")
  examTitle?: string; // Tên bài thi riêng cho lớp
  examConfig?: Partial<ExamConfig>; // Cấu hình riêng cho bài thi lớp này (thời gian, số câu, pdf...)
  isActive: boolean; // Trạng thái mở phòng thi (true: đang mở, false: đóng)
  studentCount?: number;
  description?: string;
  createdAt?: string;
}

export interface TeacherAccount {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  role: 'admin' | 'teacher';
  subject: string; // "Tin học" | "Toán học" | "Vật lí" | "Hóa học" | "Sinh học" | "Tất cả"
  assignedClasses?: string[];
}

export interface ExamConfig {
  exam_id: string;
  title: string;
  duration_minutes: number;
  max_violations_allowed: number;
  total_questions_to_pick: number;
  distribution: ExamDistribution;
  access_pin?: string;
  teacher_password?: string;
  variants_count?: number; // Minimum 12, default 12
  base_code?: number; // e.g. 101 -> 101, 102, ..., 112
  session_salt?: number; // Salt to re-shuffle variants
  target_grade?: string; // Lọc theo lớp cụ thể
  target_subject?: string; // Lọc theo môn cụ thể
  target_term?: string; // Lọc theo kì cụ thể (Giữa kì I / Cuối kì I)
  // PDF Exam Mode
  exam_mode?: ExamMode;
  pdf_url?: string; // base64 or URL
  pdf_filename?: string;
  pdf_total_questions?: number; // e.g. 40
  pdf_options_per_question?: number; // 4 (A, B, C, D)
  pdf_answer_key?: Record<string, string>; // e.g. { "1": "A", "2": "B" }
  created_by_teacher_id?: string;
}

export interface ExamVariant {
  assignedCode: string;
  seed: number;
  sanitizedQuestions: SanitizedQuestion[];
  pickedOriginalQuestions: Question[];
}

export type ViolationType =
  | 'TAB_SWITCH'
  | 'WINDOW_BLUR'
  | 'DEVTOOLS'
  | 'SHORTCUT_ATTEMPT'
  | 'FULLSCREEN_EXIT'
  | 'CONTEXT_MENU';

export interface ViolationLog {
  id: string;
  timestamp: string;
  type: ViolationType;
  duration?: number;
  note?: string;
}

// Map questionId -> optionId (for single_choice) OR { subItemId: boolean } (for true_false)
export type StudentAnswers = Record<string, string | Record<string, boolean>>;

export type SubmissionStatus = 'SUBMITTED' | 'FORCE_SUBMITTED';

export interface SubmissionRecord {
  submission_id: string;
  exam_id?: string;
  exam_title?: string;
  student_name: string;
  student_class: string;
  assigned_code: string;
  start_time: string;
  submit_time: string;
  status: SubmissionStatus;
  violation_count: number;
  violations_log: ViolationLog[];
  student_answers: StudentAnswers;
  calculated_score: number; // Scale of 10
  total_questions: number;
  correct_points_earned?: number;
  max_possible_points?: number;
}

export interface ExamSessionState {
  attempt_id: string;
  assigned_code: string;
  seed: number;
  student_name: string;
  student_class: string;
  questions: SanitizedQuestion[];
  answers: StudentAnswers;
  start_time: string;
  duration_seconds: number;
  remaining_seconds: number;
  violation_count: number;
  violations_log: ViolationLog[];
  is_submitted: boolean;
  status?: SubmissionStatus;
  exam_id: string;
}
