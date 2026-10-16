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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3 shadow-2xs">
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          HỆ THỐNG KIỂM TRA TRỰC TUYẾN CHỐNG GIAN LẬN ĐA LỚP
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {config.title}
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Vui lòng kiểm tra đường truyền mạng ổn định và đọc kỹ quy chế phòng thi trước khi bắt đầu làm bài.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left 3 cols: Info & Rules */}
        <div className="md:col-span-3 space-y-5">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-sky-600" />
              <div className="text-lg font-bold text-slate-900">{config.duration_minutes} phút</div>
              <div className="text-xs text-slate-500">Thời gian làm bài</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <HelpCircle className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
              <div className="text-lg font-bold text-slate-900">{config.total_questions_to_pick} câu</div>
              <div className="text-xs text-slate-500">Tổng số câu hỏi</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <ShieldAlert className="w-5 h-5 mx-auto mb-1 text-rose-600" />
              <div className="text-lg font-bold text-rose-600">{config.max_violations_allowed} lần</div>
              <div className="text-xs text-slate-500">Ngưỡng vi phạm</div>
            </div>
          </div>

          {/* Anti-cheat Regulations Card */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-800 shadow-xs">
            <div className="flex items-center gap-2 mb-3 text-amber-800 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Quy Chế Phòng Thi Nghiêm Ngặt
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Ép buộc toàn màn hình (Fullscreen):</strong> Hệ thống sẽ tự động chuyển sang chế độ toàn màn hình khi làm bài. Nếu thoát, bạn có 10 giây để quay lại.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chống chuyển tab & rời màn hình:</strong> Mọi hành vi Alt+Tab, chuyển tab hoặc mở ứng dụng khác đều được ghi nhật ký và đếm số lần vi phạm. Quá{' '}
                  <strong className="text-rose-600">{config.max_violations_allowed} lần</strong> hệ thống sẽ <strong>tự động thu bài</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Khóa phím tắt & chuột phải:</strong> Vô hiệu hóa chuột phải, bôi đen văn bản, thao tác copy/paste và phím F12/DevTools.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Thông Tin Thí Sinh
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và Tên thí sinh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="VD: Nguyễn Văn An"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lớp học <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    placeholder="VD: 7A1"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>

                {config.access_pin && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mã PIN phòng thi <span className="text-slate-500 font-normal">(Do giáo viên cấp)</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Nhập mã PIN..."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
              >
                <span>Bắt đầu làm bài thi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Trình duyệt sẽ tự động kích hoạt chế độ toàn màn hình khi bắt đầu.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
