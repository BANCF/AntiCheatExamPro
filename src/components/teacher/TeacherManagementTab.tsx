import React, { useState, useEffect } from 'react';
import { TeacherAccount } from '../../types/exam';
import { fetchTeachersApi, saveTeacherApi, deleteTeacherApi } from '../../services/api';
import {
  Users,
  UserPlus,
  ShieldCheck,
  BookOpen,
  Trash2,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Search,
  Sparkles
} from 'lucide-react';

interface TeacherManagementTabProps {
  currentTeacher?: TeacherAccount | null;
  onSwitchTeacher?: (teacher: TeacherAccount) => void;
}

const AVAILABLE_SUBJECTS = [
  'Tin học',
  'Toán học',
  'Vật lí',
  'Hóa học',
  'Sinh học',
  'Tiếng Anh',
  'Lịch sử - Địa lí',
  'Ngữ văn',
  'Tất cả'
];

export const TeacherManagementTab: React.FC<TeacherManagementTabProps> = ({
  currentTeacher,
  onSwitchTeacher
}) => {
  const [teachers, setTeachers] = useState<TeacherAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Partial<TeacherAccount> | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formFullName, setFormFullName] = useState('');
  const [formRole, setFormRole] = useState<'admin' | 'teacher'>('teacher');
  const [formSubject, setFormSubject] = useState('Toán học');
  const [formClasses, setFormClasses] = useState('10A1, 10A2');

  const loadTeachers = async () => {
    setIsLoading(true);
    const data = await fetchTeachersApi();
    if (data) {
      setTeachers(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormUsername('');
    setFormPassword('');
    setFormFullName('');
    setFormRole('teacher');
    setFormSubject('Toán học');
    setFormClasses('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (t: TeacherAccount) => {
    setEditingTeacher(t);
    setFormUsername(t.username);
    setFormPassword(t.password || '******');
    setFormFullName(t.fullName);
    setFormRole(t.role);
    setFormSubject(t.subject);
    setFormClasses(t.assignedClasses ? t.assignedClasses.join(', ') : '');
    setIsAddModalOpen(true);
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUsername.trim() || !formFullName.trim()) {
      showToast('error', 'Vui lòng điền đủ Tên đăng nhập và Họ tên');
      return;
    }

    const payload: Partial<TeacherAccount> = {
      id: editingTeacher?.id,
      username: formUsername.trim(),
      password: formPassword.trim() || '123456',
      fullName: formFullName.trim(),
      role: formRole,
      subject: formSubject,
      assignedClasses: formClasses
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    };

    const ok = await saveTeacherApi(payload);
    if (ok) {
      showToast('success', `Đã lưu tài khoản giáo viên: ${payload.fullName}`);
      setIsAddModalOpen(false);
      loadTeachers();
    } else {
      showToast('error', 'Lưu tài khoản thất bại, vui lòng thử lại');
    }
  };

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản của giáo viên "${name}"?`)) {
      return;
    }
    const ok = await deleteTeacherApi(id);
    if (ok) {
      showToast('success', `Đã xóa tài khoản: ${name}`);
      loadTeachers();
    } else {
      showToast('error', 'Không thể xóa tài khoản này!');
    }
  };

  const filteredTeachers = teachers.filter((t) => {
    const q = searchTerm.toLowerCase();
    return (
      t.fullName.toLowerCase().includes(q) ||
      t.username.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold shadow-lg transition-all animate-fadeIn ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border border-rose-300 text-rose-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            PHÂN QUYỀN GIÁO VIÊN BỘ MÔN (RBAC)
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Quản Lý Danh Sách Giáo Viên Bộ Môn</h2>
          <p className="text-xs sm:text-sm text-indigo-200/80 max-w-2xl">
            Giải phóng quản trị viên! Cấp tài khoản riêng cho từng giáo viên (Toán, Lí, Hóa, Sinh, Tin, Anh...).
            Mỗi giáo viên chỉ quản lý ngân hàng đề, tạo phòng thi và xem bảng điểm của bộ môn mình phụ trách.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-900 text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4 text-indigo-600" />
          <span>Thêm Giáo Viên Mới</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, môn, tài khoản..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Tổng số: <span className="font-bold text-slate-900">{teachers.length}</span> giáo viên bộ môn
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Giáo Viên</th>
                <th className="py-3.5 px-4">Tài Khoản</th>
                <th className="py-3.5 px-4">Bộ Môn</th>
                <th className="py-3.5 px-4">Vai Trò</th>
                <th className="py-3.5 px-4">Lớp Phụ Trách</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((t) => {
                const isCurrent = currentTeacher?.id === t.id;
                return (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                          {t.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{t.fullName}</span>
                            {isCurrent && (
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Đang đăng nhập
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">ID: {t.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                      @{t.username}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold">
                        <BookOpen className="w-3.5 h-3.5" />
                        {t.subject}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {t.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5" /> Quản Trị Viên
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          Giáo Viên Bộ Môn
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {t.assignedClasses && t.assignedClasses.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {t.assignedClasses.map((c) => (
                            <span key={c} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono">
                              {c}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Tất cả các lớp</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onSwitchTeacher && (
                          <button
                            type="button"
                            onClick={() => onSwitchTeacher(t)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition-colors cursor-pointer"
                            title="Chuyển sang làm việc với tư cách giáo viên này"
                          >
                            Đăng nhập ngay
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(t)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Sửa thông tin hoặc đổi mật khẩu"
                        >
                          <KeyRound className="w-4 h-4" />
                        </button>

                        {t.id !== 'tc_admin' && (
                          <button
                            type="button"
                            onClick={() => handleDeleteTeacher(t.id, t.fullName)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingTeacher ? 'Sửa Tài Khoản Giáo Viên' : 'Thêm Giáo Viên Bộ Môn Mới'}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Họ và tên giáo viên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formFullName}
                  onChange={(e) => setFormFullName(e.target.value)}
                  placeholder="Ví dụ: Thầy Nguyễn Văn Nam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tên đăng nhập <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    placeholder="gv_toan_nam"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="toan2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bộ môn phụ trách</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    {AVAILABLE_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vai trò</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as 'admin' | 'teacher')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    <option value="teacher">Giáo Viên Bộ Môn</option>
                    <option value="admin">Quản Trị Viên (Admin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lớp giảng dạy (cách nhau bởi dấu phẩy, để trống nếu dạy tất cả)
                </label>
                <input
                  type="text"
                  value={formClasses}
                  onChange={(e) => setFormClasses(e.target.value)}
                  placeholder="Ví dụ: 10A1, 10A2, 10A3"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  Lưu Tài Khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
