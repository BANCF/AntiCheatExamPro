import type { IncomingMessage, ServerResponse } from 'http';
import {
  getClasses,
  getQuestionBank,
  getExamConfig,
  parseJsonBody,
  sendJson
} from '../_storage';
import { ExamConfig, Question, SanitizedQuestion } from '../../src/types/exam';
import { generateAllExamVariants } from '../../src/utils/randomEngine';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if ((req.method || 'GET').toUpperCase() !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    const { student_name, student_class, pin } = body;

    if (!student_name?.trim() || !student_class?.trim()) {
      return sendJson(res, 400, { error: 'Vui lòng cung cấp Họ tên và Mã lớp học' });
    }

    const normClass = student_class.trim().toUpperCase();
    const classes = await getClasses();
    const config = await getExamConfig();
    const bank = await getQuestionBank();

    const matchedClass = classes.find((c) => c.code.trim().toUpperCase() === normClass);

    if (classes.length > 0) {
      if (!matchedClass) {
        return sendJson(res, 404, {
          error: `Mã lớp "${student_class}" không tồn tại trên hệ thống! Vui lòng nhập đúng mã lớp đã được giáo viên tạo.`
        });
      }

      if (!matchedClass.isActive) {
        return sendJson(res, 403, {
          error: `Phòng thi của lớp ${matchedClass.code} (${matchedClass.name}) hiện đang ĐÓNG. Vui lòng liên hệ giáo viên!`
        });
      }

      const cleanPin = (pin || '').trim();
      if (matchedClass.pinCode && cleanPin !== matchedClass.pinCode.trim()) {
        return sendJson(res, 403, {
          error: `Mã PIN bài thi cho lớp ${matchedClass.code} không chính xác!`
        });
      }
    } else if (config.access_pin && pin?.trim() !== config.access_pin.trim()) {
      return sendJson(res, 403, { error: 'Mã PIN phòng thi không hợp lệ!' });
    }

    const effectiveConfig: ExamConfig = matchedClass?.examConfig
      ? {
          ...config,
          ...matchedClass.examConfig,
          title: matchedClass.examTitle || config.title,
          duration_minutes: matchedClass.examConfig.duration_minutes || config.duration_minutes
        }
      : {
          ...config,
          title: matchedClass?.examTitle || config.title
        };

    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const durationSeconds = (effectiveConfig.duration_minutes || 45) * 60;
    const startTime = new Date().toISOString();

    let assignedCode = '101';
    let sanitizedQuestions: SanitizedQuestion[] = [];

    if (effectiveConfig.exam_mode === 'pdf') {
      const totalQ =
        effectiveConfig.pdf_total_questions ||
        (effectiveConfig.pdf_answer_key ? Object.keys(effectiveConfig.pdf_answer_key).length : 40);
      assignedCode = String(100 + Math.floor(Math.random() * 15));
      sanitizedQuestions = Array.from({ length: totalQ }, (_, i) => ({
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
    } else {
      const variants = generateAllExamVariants(bank, effectiveConfig);
      const pickedVariant = variants[Math.floor(Math.random() * variants.length)];
      assignedCode = pickedVariant.assignedCode;
      sanitizedQuestions = pickedVariant.sanitizedQuestions;
    }

    return sendJson(res, 200, {
      attemptId,
      assignedCode,
      sanitizedQuestions,
      durationSeconds,
      remainingSeconds: durationSeconds,
      startTime,
      isReconnected: false,
      classInfo: matchedClass
        ? {
            code: matchedClass.code,
            name: matchedClass.name,
            subject: matchedClass.subject,
            examTitle: matchedClass.examTitle
          }
        : undefined
    });
  } catch (err: any) {
    console.error('Error starting exam on Vercel Function:', err);
    return sendJson(res, 500, { error: 'Lỗi máy chủ khi bắt đầu bài thi: ' + (err?.message || err) });
  }
}
