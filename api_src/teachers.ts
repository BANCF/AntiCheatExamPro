import type { IncomingMessage, ServerResponse } from 'http';
import { getTeachers, saveTeacher, deleteTeacher, parseJsonBody, sendJson, handleCors } from './_storage';
import type { TeacherAccount } from '../src/types/exam';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (handleCors(req, res)) return;

    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const teachers = await getTeachers();
      // Return safe list without passwords
      const safeList = teachers.map(({ password: _, ...rest }) => rest);
      return sendJson(res, 200, safeList);
    }

    if (method === 'POST') {
      const body = await parseJsonBody(req);
      const { id, username, password, fullName, role, subject, assignedClasses } = body;

      if (!username || !password || !fullName) {
        return sendJson(res, 400, { error: 'Vui lòng điền đủ Tên đăng nhập, Mật khẩu và Họ tên' });
      }

      const teacherAccount: TeacherAccount = {
        id: id || `tc_${Date.now()}`,
        username: username.trim(),
        password: password.trim(),
        fullName: fullName.trim(),
        role: role === 'admin' ? 'admin' : 'teacher',
        subject: subject || 'Tin học',
        assignedClasses: assignedClasses || []
      };

      await saveTeacher(teacherAccount);
      const { password: _, ...safe } = teacherAccount;
      return sendJson(res, 200, { success: true, teacher: safe });
    }

    if (method === 'DELETE') {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id');
      const pathSegments = url.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const pathId = lastSegment && lastSegment !== 'teachers' ? lastSegment : null;
      const body = await parseJsonBody(req);
      const targetId = id || pathId || body?.id;

      if (!targetId) {
        return sendJson(res, 400, { error: 'Thiếu ID giáo viên cần xóa' });
      }

      if (targetId === 'tc_admin') {
        return sendJson(res, 400, { error: 'Không thể xóa tài khoản Quản trị viên mặc định!' });
      }

      await deleteTeacher(targetId);
      return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 405, { error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('API Error in /api/teachers:', err);
    return sendJson(res, 500, { error: err?.message || 'Internal Server Error' });
  }
}
