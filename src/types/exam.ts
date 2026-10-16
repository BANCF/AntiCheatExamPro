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
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true_false';
  prompt: string;
  items: TrueFalseSubItem[];
  tags: string[];
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

export interface ExamConfig {
  exam_id: string;
  title: string;
  duration_minutes: number;
  max_violations_allowed: number;
  total_questions_to_pick: number;
  distribution: ExamDistribution;
  access_pin?: string;
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
