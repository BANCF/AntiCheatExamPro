import type { IncomingMessage, ServerResponse } from 'http';
import { getTeachers, getExamConfig, parseJsonBody, sendJson } from '../_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if ((req.method || 'GET').toUpperCase() !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const body = await parseJsonBody(req);
    const { username, password } = body;
    const cleanPass = (password || '').trim();
    const cleanUser = (username || '').trim().toLowerCase();

    if (!cleanPass) {
      return sendJson(res, 400, { success: false, error: 'Vui lòng nhập mật khẩu quản trị!' });
    }

    const teachers = await getTeachers();
    const config = await getExamConfig();

    // Legacy password-only login
    if (!cleanUser) {
      const match =
        teachers.find((t) => t.password.trim() === cleanPass) ||
        (cleanPass === (config.teacher_password || 'admin2026').trim() ? teachers[0] : null);
      if (match) {
        const { password: _, ...safe } = match;
        return sendJson(res, 200, { success: true, teacher: safe });
      }
      return sendJson(res, 401, { success: false, error: 'Mật khẩu giáo viên không chính xác!' });
    }

    // Match username & password
    const found = teachers.find(
      (t) => t.username.toLowerCase() === cleanUser && t.password.trim() === cleanPass
    );

    if (found) {
      const { password: _, ...safe } = found;
      return sendJson(res, 200, { success: true, teacher: safe });
    }

    // Admin fallback
    if (cleanUser === 'admin' && cleanPass === (config.teacher_password || 'admin2026').trim()) {
      const adminTeacher = teachers[0] || {
        id: 'tc_admin',
        username: 'admin',
        fullName: 'Quản Trị Viên (Admin Trường)',
        role: 'admin',
        subject: 'Tất cả'
      };
      const { password: _, ...safe } = adminTeacher as any;
      return sendJson(res, 200, { success: true, teacher: safe });
    }

    return sendJson(res, 401, {
      success: false,
      error: 'Tên đăng nhập hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại.'
    });
  } catch (err: any) {
    return sendJson(res, 500, { error: 'Lỗi xác thực: ' + (err?.message || err) });
  }
}
