import { Question } from '../types/exam';

export interface QuestionCategoryInfo {
  grade: string;   // e.g. "Lớp 7"
  subject: string; // e.g. "Tin học"
  term: string;    // e.g. "Giữa kì I"
}

export const KNOWN_GRADES = [
  'Lớp 6',
  'Lớp 7',
  'Lớp 8',
  'Lớp 9',
  'Lớp 10',
  'Lớp 11',
  'Lớp 12'
];

export const KNOWN_SUBJECTS = [
  'Tin học',
  'Toán học',
  'Vật lí',
  'Hóa học',
  'Sinh học',
  'Tiếng Anh',
  'Lịch sử - Địa lí',
  'Ngữ văn'
];

export const KNOWN_TERMS = [
  'Giữa kì I',
  'Cuối kì I',
  'Giữa kì II',
  'Cuối kì II',
  'Ôn tập thường xuyên'
];

/**
 * Get or infer the classification (Grade, Subject, Term) of any question
 */
export function getQuestionClassification(q: Question): QuestionCategoryInfo {
  let grade = q.grade;
  let subject = q.subject;
  let term = q.term;

  const combined = `${q.tags?.join(' ') || ''} ${q.id} ${q.prompt}`.toLowerCase();

  // 1. Infer Grade if missing
  if (!grade) {
    if (combined.includes('tin_hoc_7') || combined.includes('lop 7') || combined.includes('lớp 7') || combined.includes('toan 7') || combined.includes('toán 7') || combined.includes('tin 7') || combined.includes('tin7')) {
      grade = 'Lớp 7';
    } else if (combined.includes('lop 6') || combined.includes('lớp 6') || combined.includes('tin 6') || combined.includes('toan 6')) {
      grade = 'Lớp 6';
    } else if (combined.includes('lop 8') || combined.includes('lớp 8') || combined.includes('tin 8') || combined.includes('toan 8')) {
      grade = 'Lớp 8';
    } else if (combined.includes('lop 9') || combined.includes('lớp 9') || combined.includes('tin 9') || combined.includes('toan 9')) {
      grade = 'Lớp 9';
    } else if (combined.includes('lop 10') || combined.includes('lớp 10') || combined.includes('tin 10') || combined.includes('toan 10') || combined.includes('toán 10')) {
      grade = 'Lớp 10';
    } else if (combined.includes('lop 11') || combined.includes('lớp 11') || combined.includes('tin 11') || combined.includes('toan 11')) {
      grade = 'Lớp 11';
    } else if (combined.includes('lop 12') || combined.includes('lớp 12') || combined.includes('tin 12') || combined.includes('toan 12')) {
      grade = 'Lớp 12';
    } else {
      grade = 'Lớp 7'; // Default fallback
    }
  }

  // 2. Infer Subject if missing
  if (!subject) {
    if (combined.includes('toan') || combined.includes('toán') || combined.includes('đại số') || combined.includes('hình học') || combined.includes('tam giác') || combined.includes('vecto') || combined.includes('hàm số')) {
      subject = 'Toán học';
    } else if (combined.includes('vật lí') || combined.includes('vat li') || combined.includes('vật lý') || combined.includes('vat ly') || combined.includes('dòng điện') || combined.includes('vận tốc') || combined.includes('quang học')) {
      subject = 'Vật lí';
    } else if (combined.includes('hóa học') || combined.includes('hoa hoc') || combined.includes('nguyên tử') || combined.includes('phản ứng') || combined.includes('axit') || combined.includes('oxit')) {
      subject = 'Hóa học';
    } else if (combined.includes('sinh học') || combined.includes('sinh hoc') || combined.includes('tế bào') || combined.includes('gen') || combined.includes('adn') || combined.includes('di truyền')) {
      subject = 'Sinh học';
    } else if (combined.includes('tiếng anh') || combined.includes('english') || combined.includes('grammar') || combined.includes('vocabulary')) {
      subject = 'Tiếng Anh';
    } else {
      subject = 'Tin học'; // Default fallback
    }
  }

  // 3. Infer Term if missing
  if (!term) {
    if (combined.includes('cuoi ki 1') || combined.includes('cuối kì 1') || combined.includes('cuối kì i') || combined.includes('cuoiki1') || combined.includes('hki') || combined.includes('hk1')) {
      term = 'Cuối kì I';
    } else if (combined.includes('giua ki 2') || combined.includes('giữa kì 2') || combined.includes('giữa kì ii') || combined.includes('giuaki2')) {
      term = 'Giữa kì II';
    } else if (combined.includes('cuoi ki 2') || combined.includes('cuối kì 2') || combined.includes('cuối kì ii') || combined.includes('cuoiki2') || combined.includes('hk2')) {
      term = 'Cuối kì II';
    } else if (combined.includes('on tap') || combined.includes('ôn tập') || combined.includes('thuong xuyen') || combined.includes('thường xuyên')) {
      term = 'Ôn tập thường xuyên';
    } else {
      term = 'Giữa kì I'; // Default fallback
    }
  }

  return { grade, subject, term };
}
