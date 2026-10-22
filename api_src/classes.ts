import type { IncomingMessage, ServerResponse } from 'http';
import { getClasses, saveClass, deleteClass, parseJsonBody, sendJson, handleCors } from './_storage';
import type { ClassRoom } from '../src/types/exam';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (handleCors(req, res)) return;

    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const classes = await getClasses();
      return sendJson(res, 200, classes);
    }

    if (method === 'POST') {
      const body = await parseJsonBody(req);
      const { id, code, name, grade, subject, teacherName, pinCode, examTitle, examConfig, isActive, description, createdAt } = body;

      if (!code || !name) {
        return sendJson(res, 400, { error: 'Mã lớp và Tên lớp là bắt buộc!' });
      }

      const classes = await getClasses();
      const normalizedCode = code.trim().toUpperCase();
      const existing = classes.find(
        (c) => (id && c.id === id) || c.code.trim().toUpperCase() === normalizedCode
      );

      const classItem: ClassRoom = {
        id: id || existing?.id || `cls_${Date.now()}`,
        code: normalizedCode,
        name: name.trim(),
        grade: grade || existing?.grade || 'Lớp 6',
        subject: subject || existing?.subject || 'Tin học',
        teacherName: teacherName || existing?.teacherName || 'Giáo viên bộ môn',
        pinCode: (pinCode || existing?.pinCode || '2026').trim(),
        examTitle: examTitle?.trim() || existing?.examTitle || `Kiểm tra ${subject || 'Bộ môn'} - ${normalizedCode}`,
        examConfig: examConfig || existing?.examConfig || {},
        isActive: isActive !== undefined ? Boolean(isActive) : (existing?.isActive ?? true),
        description: description !== undefined ? description : (existing?.description || ''),
        createdAt: existing ? existing.createdAt : (createdAt || new Date().toISOString())
      };

      await saveClass(classItem);
      return sendJson(res, 200, { success: true, classItem });
    }

    if (method === 'DELETE') {
      // Delete id passed in query, path, or body
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id');
      const pathSegments = url.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const pathId = lastSegment && lastSegment !== 'classes' ? lastSegment : null;
      const body = await parseJsonBody(req);
      const targetId = id || pathId || body?.id;

      if (!targetId) {
        return sendJson(res, 400, { error: 'Thiếu ID lớp cần xóa' });
      }

      await deleteClass(targetId);
      return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 405, { error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('API Error in /api/classes:', err);
    return sendJson(res, 500, { error: err?.message || 'Internal Server Error' });
  }
}
