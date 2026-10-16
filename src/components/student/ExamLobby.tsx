import React, { useState } from 'react';
import { ExamConfig } from '../../types/exam';
import { ShieldAlert, Clock, HelpCircle, CheckCircle2, Lock, Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';

interface ExamLobbyProps {
  config: ExamConfig;
  onStartExam: (studentName: string, studentClass: string) => void;
}

export const ExamLobby: React.FC<ExamLobbyProps> = ({ config, onStartExam }) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError('Vui lòng nhập Họ và Tên của bạn');
      return;
    }
    if (!studentClass.trim()) {
      setError('Vui lòng nhập Lớp học');
      return;
    }
    if (config.access_pin && pinInput.trim() !== config.access_pin.trim()) {
      setError('Mã PIN phòng thi không chính xác! Vui lòng hỏi giáo viên.');
      return;
    }

    setError(null);
    onStartExam(studentName.trim(), studentClass.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <ShieldAlert className="w-4 h-4 text-indigo-400" />
          HỆ THỐNG KIỂM TRA TRỰC TUYẾN CHỐNG GIAN LẬN ĐA LỚP
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {config.title}
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Vui lòng kiểm tra đường truyền mạng ổn định và đọc kỹ quy chế phòng thi trước khi bắt đầu làm bài.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left 3 cols: Info & Rules */}
        <div className="md:col-span-3 space-y-5">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-sky-400" />
              <div className="text-lg font-bold text-white">{config.duration_minutes} phút</div>
              <div className="text-xs text-slate-400">Thời gian làm bài</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <HelpCircle className="w-5 h-5 mx-auto mb-1 text-indigo-400" />
              <div className="text-lg font-bold text-white">{config.total_questions_to_pick} câu</div>
              <div className="text-xs text-slate-400">Tổng số câu hỏi</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-center">
              <ShieldAlert className="w-5 h-5 mx-auto mb-1 text-rose-400" />
              <div className="text-lg font-bold text-rose-300">{config.max_violations_allowed} lần</div>
              <div className="text-xs text-slate-400">Ngưỡng vi phạm</div>
            </div>
          </div>

          {/* Anti-cheat Regulations Card */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 mb-3 text-amber-300 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Quy Chế Phòng Thi Nghiêm Ngặt
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Ép buộc toàn màn hình (Fullscreen):</strong> Hệ thống sẽ tự động chuyển sang chế độ toàn màn hình khi làm bài. Nếu thoát, bạn có 10 giây để quay lại.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Chống chuyển tab & rời màn hình:</strong> Mọi hành vi Alt+Tab, chuyển tab hoặc mở ứng dụng khác đều được ghi nhật ký và đếm số lần vi phạm. Quá{' '}
                  <strong className="text-rose-400">{config.max_violations_allowed} lần</strong> hệ thống sẽ <strong>tự động thu bài</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Khóa phím tắt & chuột phải:</strong> Vô hiệu hóa chuột phải, bôi đen văn bản, thao tác copy/paste và phím F12/DevTools.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Bảo mật kết quả thi:</strong> Sau khi nộp bài, điểm số và đáp án sẽ được ẩn hoàn toàn để đảm bảo tính công bằng. Kết quả do giáo viên công bố.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right 2 cols: Student Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-xl flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-base mb-4">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Thông Tin Thí Sinh
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Họ và Tên thí sinh <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="VD: Nguyễn Văn An"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Lớp học <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="VD: 10A1"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {config.access_pin && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mã PIN phòng thi <span className="text-slate-400 font-normal">(Do giáo viên cấp)</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Nhập mã PIN..."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
              >
                <span>Bắt đầu làm bài thi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Trình duyệt sẽ yêu cầu cấp quyền toàn màn hình khi bấm nút.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
