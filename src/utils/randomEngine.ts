import {
  Question,
  SanitizedQuestion,
  SanitizedSingleChoiceQuestion,
  SanitizedTrueFalseQuestion,
  ExamConfig,
  ExamVariant,
  StudentAnswers,
  SubmissionRecord,
  ViolationLog,
  SubmissionStatus
} from '../types/exam';
import { getQuestionClassification } from './questionClassification';

/**
 * Seedable Pseudo-Random Number Generator (Mulberry32)
 */
export function createPRNG(seed: number) {
  let s = Math.floor(seed);
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Convert string or number into 32-bit integer seed
 */
export function hashSeed(input: string | number): number {
  if (typeof input === 'number') return Math.abs(Math.floor(input)) || 123456789;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 987654321;
}

/**
 * Fisher-Yates Shuffle using PRNG
 */
export function shuffleArray<T>(array: T[], prng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate Student Exam:
 * 1. Samples questions by distribution
 * 2. Shuffles questions order
 * 3. Shuffles options for single choice
 * 4. STRIPS `is_correct` for anti-cheat security!
 */
export function generateStudentExam(
  seedInput: string | number,
  bank: Question[],
  config: ExamConfig,
  customAssignedCode?: string
): {
  sanitizedQuestions: SanitizedQuestion[];
  pickedOriginalQuestions: Question[];
  assignedCode: string;
  seed: number;
} {
  const seed = hashSeed(seedInput);
  const prng = createPRNG(seed);

  // Filter bank by target_grade, target_subject, target_term if specified
  let pool = bank;
  if (config.target_grade && config.target_grade !== 'all') {
    const matched = pool.filter((q) => getQuestionClassification(q).grade === config.target_grade);
    if (matched.length > 0) pool = matched;
  }
  if (config.target_subject && config.target_subject !== 'all') {
    const matched = pool.filter((q) => getQuestionClassification(q).subject === config.target_subject);
    if (matched.length > 0) pool = matched;
  }
  if (config.target_term && config.target_term !== 'all') {
    const matched = pool.filter((q) => getQuestionClassification(q).term === config.target_term);
    if (matched.length > 0) pool = matched;
  }

  // Group by type
  const singleChoicePool = pool.filter((q) => q.type === 'single_choice');
  const trueFalsePool = pool.filter((q) => q.type === 'true_false');

  // Shuffle pools
  const shuffledSingle = shuffleArray(singleChoicePool, prng);
  const shuffledTF = shuffleArray(trueFalsePool, prng);

  // Pick counts based on distribution or proportional fallback
  const scCount = Math.min(config.distribution.single_choice, shuffledSingle.length);
  const tfCount = Math.min(config.distribution.true_false, shuffledTF.length);

  const pickedSingle = shuffledSingle.slice(0, scCount);
  const pickedTF = shuffledTF.slice(0, tfCount);

  // Combine and shuffle the overall question order
  const combinedOriginal = shuffleArray([...pickedSingle, ...pickedTF], prng);

  // Generate a friendly 3-digit Exam Code (or use custom code e.g. 101, 102...)
  const assignedCode = customAssignedCode || String(100 + (seed % 900));

  // Sanitize and shuffle options
  const sanitizedQuestions: SanitizedQuestion[] = combinedOriginal.map((q) => {
    if (q.type === 'single_choice') {
      // Shuffle options with PRNG
      const shuffledOptions = shuffleArray(q.options, prng);
      // Strip is_correct
      const cleanOptions = shuffledOptions.map(({ id, text }) => ({ id, text }));
      const cleanQuestion: SanitizedSingleChoiceQuestion = {
        id: q.id,
        type: 'single_choice',
        prompt: q.prompt,
        tags: q.tags,
        options: cleanOptions
      };
      return cleanQuestion;
    } else {
      // true_false items (strip is_correct)
      const cleanItems = q.items.map(({ id, text }) => ({ id, text }));
      const cleanQuestion: SanitizedTrueFalseQuestion = {
        id: q.id,
        type: 'true_false',
        prompt: q.prompt,
        tags: q.tags,
        items: cleanItems
      };
      return cleanQuestion;
    }
  });

  return {
    sanitizedQuestions,
    pickedOriginalQuestions: combinedOriginal,
    assignedCode,
    seed
  };
}

/**
 * Generate a pool of minimum 12 official Exam Variants
 * e.g. Codes 101, 102, 103, ..., 112
 */
export function generateAllExamVariants(
  bank: Question[],
  config: ExamConfig
): ExamVariant[] {
  const count = Math.max(12, config.variants_count || 12);
  const baseCode = config.base_code || 101;
  const salt = config.session_salt || 2026;

  const variants: ExamVariant[] = [];
  for (let i = 0; i < count; i++) {
    const code = String(baseCode + i);
    const variantSeed = hashSeed(`${config.exam_id}_code_${code}_salt_${salt}`);
    const exam = generateStudentExam(variantSeed, bank, config, code);
    variants.push({
      assignedCode: code,
      seed: exam.seed,
      sanitizedQuestions: exam.sanitizedQuestions,
      pickedOriginalQuestions: exam.pickedOriginalQuestions
    });
  }
  return variants;
}

/**
 * Score student's submission against original questions (master key)
 * Scale: 0.0 - 10.0
 */
export function calculateExamScore(
  studentAnswers: StudentAnswers,
  originalQuestions: Question[]
): {
  calculatedScore: number;
  earnedPoints: number;
  totalPossiblePoints: number;
} {
  let earnedPoints = 0;
  let totalPossiblePoints = 0;

  for (const q of originalQuestions) {
    if (q.type === 'single_choice') {
      totalPossiblePoints += 1.0;
      const selectedOptId = studentAnswers[q.id];
      const correctOpt = q.options.find((opt) => opt.is_correct);
      if (correctOpt && selectedOptId === correctOpt.id) {
        earnedPoints += 1.0;
      }
    } else if (q.type === 'true_false') {
      // Each sub-item counts towards the question score
      const subItemsCount = q.items.length || 1;
      const subItemWeight = 1.0 / subItemsCount;
      totalPossiblePoints += 1.0;

      const userAnsObj = (studentAnswers[q.id] as Record<string, boolean>) || {};
      let questionEarned = 0;

      for (const item of q.items) {
        if (typeof item.is_correct === 'boolean') {
          const userVal = userAnsObj[item.id];
          if (userVal === item.is_correct) {
            questionEarned += subItemWeight;
          }
        }
      }
      earnedPoints += questionEarned;
    }
  }

  // Convert to 10.0 scale
  let rawScore = 0;
  if (totalPossiblePoints > 0) {
    rawScore = (earnedPoints / totalPossiblePoints) * 10;
  }
  // Round to 2 decimal places
  const calculatedScore = Math.round(rawScore * 100) / 100;

  return {
    calculatedScore,
    earnedPoints: Math.round(earnedPoints * 100) / 100,
    totalPossiblePoints: Math.round(totalPossiblePoints * 100) / 100
  };
}

/**
 * Create full submission record
 */
export function buildSubmissionRecord(params: {
  studentName: string;
  studentClass: string;
  assignedCode: string;
  startTime: string;
  submitTime: string;
  status: SubmissionStatus;
  violationCount: number;
  violationsLog: ViolationLog[];
  studentAnswers: StudentAnswers;
  originalQuestions: Question[];
}): SubmissionRecord {
  const { calculatedScore, earnedPoints, totalPossiblePoints } = calculateExamScore(
    params.studentAnswers,
    params.originalQuestions
  );

  return {
    submission_id: `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    student_name: params.studentName.trim(),
    student_class: params.studentClass.trim(),
    assigned_code: params.assignedCode,
    start_time: params.startTime,
    submit_time: params.submitTime,
    status: params.status,
    violation_count: params.violationCount,
    violations_log: params.violationsLog,
    student_answers: params.studentAnswers,
    calculated_score: calculatedScore,
    total_questions: params.originalQuestions.length,
    correct_points_earned: earnedPoints,
    max_possible_points: totalPossiblePoints
  };
}
