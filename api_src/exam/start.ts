import type { IncomingMessage, ServerResponse } from 'http';
import {
  getClasses,
  getQuestionBank,
  getExamConfig,
  getActiveStudentSession,
  saveActiveStudentSession,
  parseJsonBody,
  sendJson,
  handleCors
} from '../_storage';
import type { ExamConfig, Question, SanitizedQuestion } from '../../src/types/exam';
import { generateAllExamVariants } from '../../src/utils/randomEngine';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (handleCors(req, res)) return;

  if ((req.method || 'GET').toUpperCase() !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    const { student_name, student_class, pin, forceNew } = body;

    if (!student_name?.trim() || !student_class?.trim()) {
      return sendJson(res, 400, { error: 'Vui lòng cung cấp Họ tên và Mã lớp học' });
    }

    const normClass = student_class.trim().toUpperCase();
    const normName = student_name.trim();
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

    const classCfg = matchedClass?.examConfig || {};
    const effectiveTotal = classCfg.total_questions_to_pick ?? config.total_questions_to_pick ?? 10;
    
    let effectiveDist = classCfg.distribution;
    if (!effectiveDist && effectiveTotal) {
      const tf = Math.max(0, Math.min(6, Math.round(effectiveTotal * 0.2)));
      const sc = effectiveTotal - tf;
      effectiveDist = { single_choice: sc, true_false: tf };
    }

    const effectiveConfig: ExamConfig = {
      ...config,
      ...classCfg,
      title: matchedClass?.examTitle || config.title,
      duration_minutes: classCfg.duration_minutes || config.duration_minutes,
      total_questions_to_pick: effectiveTotal,
      distribution: effectiveDist || config.distribution
    };

    const expectedQCount = effectiveConfig.exam_mode === 'pdf'
      ? (effectiveConfig.pdf_total_questions || (effectiveConfig.pdf_answer_key ? Object.keys(effectiveConfig.pdf_answer_key).length : 40))
      : effectiveTotal;

    // Check for existing active session for reconnect (if not forceNew)
    if (!forceNew) {
      const existingSession = await getActiveStudentSession(normClass, normName);
      if (existingSession) {
        const elapsedSec = Math.floor((Date.now() - new Date(existingSession.startTime).getTime()) / 1000);
        if (elapsedSec < existingSession.durationSeconds + 300 && existingSession.totalQuestions === expectedQCount) {
          const remainingSeconds = Math.max(10, existingSession.durationSeconds - elapsedSec);
          return sendJson(res, 200, {
            attemptId: existingSession.attemptId,
            assignedCode: existingSession.assignedCode,
            sanitizedQuestions: existingSession.sanitizedQuestions,
            durationSeconds: existingSession.durationSeconds,
            remainingSeconds,
            startTime: existingSession.startTime,
            isReconnected: true,
            classInfo: matchedClass
              ? {
                  code: matchedClass.code,
                  name: matchedClass.name,
                  subject: matchedClass.subject,
                  examTitle: matchedClass.examTitle
                }
              : undefined
          });
        }
      }
    }

    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const durationSeconds = (effectiveConfig.duration_minutes || 45) * 60;
    const startTime = new Date().toISOString();

    let assignedCode = '101';
    let sanitizedQuestions: SanitizedQuestion[] = [];

    if (effectiveConfig.exam_mode === 'pdf') {
      const totalQ = expectedQCount;
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

    // Persist active session in Redis/Memory for seamless reconnect
    await saveActiveStudentSession({
      attemptId,
      studentName: normName,
      studentClass: normClass,
      assignedCode,
      sanitizedQuestions,
      durationSeconds,
      startTime,
      totalQuestions: sanitizedQuestions.length
    });

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
