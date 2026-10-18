import React, { useState, useMemo, useEffect } from 'react';
import { ExamConfig, ClassRoom } from '../../types/exam';
import { ShieldAlert, Clock, HelpCircle, CheckCircle2, Lock, Sparkles, ArrowRight, AlertTriangle, School, Check, BookOpen, KeyRound } from 'lucide-react';

interface ExamLobbyProps {
  config: ExamConfig;
  classes?: ClassRoom[];
  initialClassCode?: string;
  onStartExam: (studentName: string, studentClass: string, pin: string, matchedClass?: ClassRoom) => void;
}

export const ExamLobby: React.FC<ExamLobbyProps> = ({
  config,
  classes = [],
  initialClassCode = '',
  onStartExam
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState(initialClassCode);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Set initial class code from prop or URL if provided
  useEffect(() => {
    if (initialClassCode) {
      setStudentClass(initialClassCode);
    }
  }, [initialClassCode]);

  // Realtime search for matching class
  const matchedClass = useMemo(() => {
    const clean = studentClass.trim().toUpperCase();
    if (!clean) return null;
    return classes.find((c) => c.code.trim().toUpperCase() === clean) || null;
  }, [studentClass, classes]);

  // Dynamic Exam details based on matched class (or fallback to global config)
  const effectiveTitle = matchedClass?.examTitle || config.title;
  const effectiveDuration = matchedClass?.examConfig?.duration_minutes || config.duration_minutes;
  const effectiveQuestions = matchedClass?.examConfig?.total_questions_to_pick || config.total_questions_to_pick;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = studentName.trim();
    const cleanClass = studentClass.trim().toUpperCase();
    const cleanPin = pinInput.trim();

    if (!cleanName) {
      setError('Vui lòng nhập Họ và Tên của bạn');
      return;
    }
    if (!cleanClass) {
      setError('Vui lòng nhập chính xác Mã lớp học của bạn');
      return;
    }

    // Class validation
    if (classes.length > 0) {
      if (!matchedClass) {
        setError(`Mã lớp "${cleanClass}" không tồn tại trên hệ thống! Vui lòng nhập đúng mã lớp do giáo viên cung cấp (VD: 7A1, 7A2, 10A1...).`);
        return;
      }

      if (!matchedClass.isActive) {
        setError(`Phòng thi của lớp ${matchedClass.code} (${matchedClass.name}) hiện đang ĐÓNG. Vui lòng chờ thầy cô mở phòng thi!`);
        return;
      }

      if (matchedClass.pinCode && cleanPin !== matchedClass.pinCode.trim()) {
        setError(`Mã PIN bài thi không chính xác cho lớp ${matchedClass.code}! Vui lòng hỏi lại giáo viên bộ môn.`);
        return;
      }
    } else {
      // Legacy global PIN check
      if (config.access_pin && cleanPin !== config.access_pin.trim()) {
        setError('Mã PIN phòng thi không chính xác! Vui lòng hỏi giáo viên.');
        return;
      }
    }

    setError(null);
    onStartExam(cleanName, cleanClass, cleanPin, matchedClass || undefined);
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
          {effectiveTitle}
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          {matchedClass
            ? `Thí sinh thuộc lớp ${matchedClass.name} • Bộ môn ${matchedClass.subject}. Vui lòng làm bài nghiêm túc.`
            : 'Vui lòng kiểm tra đường truyền mạng ổn định và nhập chính xác Mã lớp học của bạn để bắt đầu.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left 3 cols: Info & Rules */}
        <div className="md:col-span-3 space-y-5">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-sky-600" />
              <div className="text-lg font-bold text-slate-900">{effectiveDuration} phút</div>
              <div className="text-xs text-slate-500">Thời gian làm bài</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <HelpCircle className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
              <div className="text-lg font-bold text-slate-900">{effectiveQuestions} câu</div>
              <div className="text-xs text-slate-500">Tổng số câu hỏi</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
              <ShieldAlert className="w-5 h-5 mx-auto mb-1 text-rose-600" />
              <div className="text-lg font-bold text-rose-600">{config.max_violations_allowed} lần</div>
              <div className="text-xs text-slate-500">Ngưỡng vi phạm</div>
            </div>
          </div>

          {/* Real-time Class Recognition Card (when student entered a valid class) */}
          {matchedClass && (
            <div className={`p-4 rounded-2xl border transition-all animate-fadeIn ${
              matchedClass.isActive
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-amber-50/80 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {matchedClass.code}
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <School className="w-4 h-4 text-emerald-700" />
                      <span>{matchedClass.name}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                      <span className="font-semibold text-emerald-800">Môn: {matchedClass.subject}</span>
                      <span>•</span>
                      <span>{matchedClass.grade}</span>
                      {matchedClass.teacherName && (
                        <>
                          <span>•</span>
                          <span>GV: {matchedClass.teacherName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  matchedClass.isActive ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  {matchedClass.isActive ? '✓ Đang mở thi' : 'Đang đóng'}
                </span>
              </div>

              <div className="mt-2.5 pt-2 border-t border-emerald-200/60 text-xs flex items-center justify-between">
                <span className="text-slate-700 font-medium">
                  📝 Bài thi: <strong>{matchedClass.examTitle || matchedClass.name}</strong>
                </span>
                <span className="text-[11px] font-semibold text-emerald-800">
                  Nhập mã PIN để vào bài thi →
                </span>
              </div>
            </div>
          )}

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
                  <strong>Đúng mã lớp & mã PIN:</strong> Thí sinh phải điền chính xác mã lớp và mã PIN do giáo viên phụ trách cấp để được cấp đúng đề thi của lớp mình.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Ép buộc toàn màn hình (Fullscreen):</strong> Hệ thống sẽ tự động kích hoạt chế độ toàn màn hình khi bắt đầu làm bài.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chống gian lận:</strong> Nghiêm cấm chuyển tab, Alt+Tab, mở ứng dụng khác, mở DevTools hoặc bấm chuột phải. Vi phạm quá{' '}
                  <strong className="text-rose-600">{config.max_violations_allowed} lần</strong> hệ thống sẽ <strong>tự động thu bài</strong>.
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
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Full name input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và Tên thí sinh <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      setError(null);
                    }}
                    placeholder="VD: Nguyễn Văn An"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-medium"
                  />
                </div>

                {/* Class Code input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Mã lớp học <span className="text-rose-500">* (Điền chính xác mã lớp)</span>
                    </label>
                    {matchedClass && (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Hợp lệ
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={studentClass}
                      onChange={(e) => {
                        setStudentClass(e.target.value.toUpperCase());
                        setError(null);
                      }}
                      placeholder="VD: 7A1, 7A2, 10A1..."
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm uppercase font-mono font-bold transition-colors focus:outline-none focus:ring-1 ${
                        matchedClass
                          ? 'border-emerald-500 bg-emerald-50/30 text-emerald-900 focus:border-emerald-600 focus:ring-emerald-500'
                          : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-indigo-600'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {matchedClass ? (
                      <span className="text-emerald-700 font-medium">
                        ✓ Lớp: {matchedClass.name} ({matchedClass.subject})
                      </span>
                    ) : (
                      <span>Học sinh phải điền chính xác mã lớp (VD: 7A1, 7A2, 10A1) do giáo viên cấp.</span>
                    )}
                  </p>
                </div>

                {/* Class-specific Exam PIN input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mã PIN bài thi <span className="text-rose-500">* (Do giáo viên cấp)</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setError(null);
                      }}
                      placeholder="Nhập mã PIN của lớp..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-mono tracking-wider focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>
                  {matchedClass && pinInput && (
                    <p className="text-[11px] mt-1 font-medium">
                      {pinInput.trim() === matchedClass.pinCode.trim() ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Mã PIN chính xác! Bạn đã sẵn sàng làm bài.
                        </span>
                      ) : (
                        <span className="text-slate-400">Đang kiểm tra mã PIN...</span>
                      )}
                    </p>
                  )}
                </div>
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
