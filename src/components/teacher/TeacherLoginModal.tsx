import React, { useState } from 'react';
import { Lock, Shield, KeyRound, AlertCircle, ArrowRight, X } from 'lucide-react';

interface TeacherLoginModalProps {
  correctPassword?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  correctPassword = 'admin2026',
  onSuccess,
  onCancel
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu quản trị');
      return;
    }

    if (password.trim() === correctPassword.trim()) {
      setError(null);
      onSuccess();
    } else {
      setError('Mật khẩu quản trị giáo viên không chính xác!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5 relative">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">Xác Thực Quyền Giáo Viên</h2>
          <p className="text-xs text-slate-400">
            Khu vực dành riêng cho giáo viên bộ môn. Vui lòng nhập mật khẩu để truy cập Ngân hàng đề, Cấu hình và Giám thị Live.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mật khẩu Quản Trị Giáo Viên
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Nhập mật khẩu (mặc định: admin2026)..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Mật khẩu mặc định khởi tạo: <code className="text-indigo-400 font-mono">admin2026</code>
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <span>Mở khóa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
