import React, { useEffect } from 'react';
import { SubmissionStatus } from '../../types/exam';
import { CheckCircle2, ShieldAlert, LogOut, Clock, Calendar, Hash, User, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamCompletedProps {
  studentName: string;
  studentClass: string;
  assignedCode: string;
  status: SubmissionStatus;
  submissionId: string;
  submitTime: string;
  onExit: () => void;
}

export const ExamCompleted: React.FC<ExamCompletedProps> = ({
  studentName,
  studentClass,
  assignedCode,
  status,
  submissionId,
  submitTime,
  onExit
}) => {
  const isForceSubmitted = status === 'FORCE_SUBMITTED';

  useEffect(() => {
    // Only launch celebratory confetti if not force submitted
    if (!isForceSubmitted) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore if confetti fails
      }
    }
  }, [isForceSubmitted]);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
        {/* Status Icon */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          {isForceSubmitted ? (
            <div className="w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Title & Message */}
        <div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            {isForceSubmitted
              ? 'Bài Thi Đã Bị Thu Do Vi Phạm Quy Chế'
              : 'Đã Hoàn Thành Bài Kiểm Tra!'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {isForceSubmitted ? (
              <span className="text-rose-700 font-medium">
                Hệ thống đã tự động khóa và thu bài của bạn do vượt quá số lần vi phạm (chuyển tab hoặc rời màn hình). Toàn bộ dữ liệu đã được gửi về cho giáo viên.
              </span>
            ) : (
              'Bạn đã hoàn thành bài kiểm tra thành công. Dữ liệu bài làm đã được lưu trữ an toàn trên hệ thống.'
            )}
          </p>
        </div>

        {/* Confidentiality Notice */}
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center gap-3 text-left">
          <ShieldCheck className="w-5 h-5 shrink-0 text-indigo-600" />
          <span>
            <strong>Bảo mật kết quả:</strong> Điểm số và đáp án chi tiết được ẩn hoàn toàn để đảm bảo công bằng. Kết quả chính thức sẽ được công bố bởi giáo viên bộ môn.
          </span>
        </div>

        {/* Receipt Information Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-left">
          <div className="flex items-center justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Thí sinh
            </span>
            <span className="font-semibold text-slate-800">
              {studentName} ({studentClass})
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400" /> Mã đề thi
            </span>
            <span className="font-mono font-bold text-purple-700">{assignedCode}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Thời gian nộp
            </span>
            <span className="font-mono font-semibold text-slate-700">
              {new Date(submitTime).toLocaleTimeString('vi-VN')}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Mã biên nhận
            </span>
            <span className="font-mono text-[11px] text-slate-500 truncate max-w-[200px]">
              {submissionId}
            </span>
          </div>
        </div>

        {/* Exit Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onExit}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Thoát Phòng Thi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
