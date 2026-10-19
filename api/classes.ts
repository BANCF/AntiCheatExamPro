import type { IncomingMessage, ServerResponse } from 'http';
import { getClasses, saveClass, deleteClass, parseJsonBody, sendJson } from './_storage';
import { ClassRoom } from '../src/types/exam';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const method = (req.method || 'GET').toUpperCase();

  if (method === 'GET') {
    const classes = await getClasses();
    return sendJson(res, 200, classes);
  }

  if (method === 'POST') {
    const body = await parseJsonBody(req);
    const { id, code, name, grade, subject, teacherName, pinCode, examTitle, examConfig, isActive, description } = body;

    if (!code || !name) {
      return sendJson(res, 400, { error: 'Mã lớp và Tên lớp là bắt buộc!' });
    }

    const normalizedCode = code.trim().toUpperCase();
    const classItem: ClassRoom = {
      id: id || `cls_${Date.now()}`,
      code: normalizedCode,
      name: name.trim(),
      grade: grade || 'Lớp 6',
      subject: subject || 'Tin học',
      teacherName: teacherName || 'Giáo viên bộ môn',
      pinCode: (pinCode || '2026').trim(),
      examTitle: examTitle?.trim() || `Kiểm tra ${subject || 'Bộ môn'} - ${normalizedCode}`,
      examConfig: examConfig || {},
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      description: description || '',
      createdAt: new Date().toISOString()
    };

    await saveClass(classItem);
    return sendJson(res, 200, { success: true, classItem });
  }

  if (method === 'DELETE') {
    // Delete id passed in query or body
    const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
    const id = url.searchParams.get('id');
    const body = await parseJsonBody(req);
    const targetId = id || body?.id;

    if (!targetId) {
      return sendJson(res, 400, { error: 'Thiếu ID lớp cần xóa' });
    }

    await deleteClass(targetId);
    return sendJson(res, 200, { success: true });
  }

  return sendJson(res, 405, { error: 'Method Not Allowed' });
}
