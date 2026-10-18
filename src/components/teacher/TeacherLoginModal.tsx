import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, ArrowRight, X, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { verifyTeacherLoginApi } from '../../services/api';
import { TeacherAccount } from '../../types/exam';

interface TeacherLoginModalProps {
  onSuccess: (teacher: TeacherAccount) => void;
  onCancel: () => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  onSuccess,
  onCancel
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const performLogin = async (userToSubmit: string, passToSubmit: string) => {
    if (!userToSubmit.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }

    if (!passToSubmit.trim()) {
      setError('Vui lòng nhập mật khẩu quản trị');
      return;
    }

    setIsLoading(true);
    setError(null);

    const res = await verifyTeacherLoginApi({
      username: userToSubmit.trim(),
      password: passToSubmit.trim()
    });

    setIsLoading(false);

    if (res?.success && res.teacher) {
      onSuccess(res.teacher);
    } else {
      setError(res?.error || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(username, password);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 relative animate-fadeIn">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1.5">
          <div className="w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Đăng Nhập Khu Vực Giáo Viên</h2>
          <p className="text-xs text-slate-500">
            Dành cho Ban giám hiệu và Giáo viên bộ môn quản lý đề thi và phòng thi.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tên đăng nhập
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                placeholder="Nhập tên đăng nhập của giáo viên..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="w-3 h-3" /> Ẩn
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" /> Hiện
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-1 focus:ring-indigo-600 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Khu vực bảo mật - Chỉ dành cho Giáo viên & Quản trị</span>
        </div>
      </div>
    </div>
  );
};
