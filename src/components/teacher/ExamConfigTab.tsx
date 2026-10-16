import React, { useState } from 'react';
import { ExamConfig, Question, SanitizedQuestion } from '../../types/exam';
import { generateStudentExam } from '../../utils/randomEngine';
import {
  Sliders,
  Save,
  Copy,
  Check,
  Play,
  Shuffle,
  Clock,
  ShieldAlert,
  HelpCircle,
  KeyRound,
  Lock,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

interface ExamConfigTabProps {
  config: ExamConfig;
  bank: Question[];
  onSaveConfig: (config: ExamConfig) => void;
  onLaunchExamMode: () => void;
}

export const ExamConfigTab: React.FC<ExamConfigTabProps> = ({
  config,
  bank,
  onSaveConfig,
  onLaunchExamMode
}) => {
  const [formData, setFormData] = useState<ExamConfig>(config);
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Simulation state
  const [simulatedExam, setSimulatedExam] = useState<{
    assignedCode: string;
    seed: number;
    sanitizedQuestions: SanitizedQuestion[];
  } | null>(null);

  const singleChoiceBankCount = bank.filter((q) => q.type === 'single_choice').length;
  const trueFalseBankCount = bank.filter((q) => q.type === 'true_false').length;

  const totalCalculated =
    Number(formData.distribution.single_choice || 0) +
    Number(formData.distribution.true_false || 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ExamConfig = {
      ...formData,
      total_questions_to_pick: totalCalculated
    };
    onSaveConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSimulateRandomExam = () => {
    const randomSeed = Date.now();
    const result = generateStudentExam(randomSeed, bank, {
      ...formData,
      total_questions_to_pick: totalCalculated
    });
    setSimulatedExam({
      assignedCode: result.assignedCode,
      seed: result.seed,
      sanitizedQuestions: result.sanitizedQuestions
    });
  };

  const examLink = `${window.location.origin}${window.location.pathname}?mode=exam&examId=${formData.exam_id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(examLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Cấu Hình Đề Thi Tự Động
          </div>
          <h2 className="text-xl font-bold text-slate-900">{formData.title}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Động cơ xáo trộn đề thi sẽ tự động lấy mẫu ngẫu nhiên và hoán vị phương án cho từng học sinh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copiedLink ? 'Đã sao chép link' : 'Sao chép link làm bài'}</span>
          </button>

          <button
            type="button"
            onClick={onLaunchExamMode}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Vào thi thử (Học sinh)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Configuration Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Thông Số Đề Thi
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề đề thi <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="VD: Kiểm tra Giữa kỳ Môn Tin Học 7"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Thời gian làm bài (Phút)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={180}
                    required
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 15 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    Ngưỡng vi phạm tối đa (Lần rời tab)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={formData.max_violations_allowed}
                    onChange={(e) =>
                      setFormData({ ...formData, max_violations_allowed: parseInt(e.target.value) || 3 })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                  />
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Đạt ngưỡng này hệ thống sẽ tự động thu bài lập tức.
                  </span>
                </div>
              </div>

              {/* Distribution */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    Tỷ Lệ Phân Bổ Câu Hỏi Lấy Ngẫu Nhiên
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-700">
                    Tổng: {totalCalculated} câu
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Số câu Trắc nghiệm 1 đáp án (Kho có: {singleChoiceBankCount})
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={singleChoiceBankCount}
                      value={formData.distribution.single_choice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          distribution: {
                            ...formData.distribution,
                            single_choice: parseInt(e.target.value) || 0
                          }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Số câu Đúng / Sai chùm (Kho có: {trueFalseBankCount})
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={trueFalseBankCount}
                      value={formData.distribution.true_false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          distribution: {
                            ...formData.distribution,
                            true_false: parseInt(e.target.value) || 0
                          }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {(formData.distribution.single_choice > singleChoiceBankCount ||
                  formData.distribution.true_false > trueFalseBankCount) && (
                  <div className="text-xs text-rose-600 font-medium">
                    ⚠️ Số lượng câu yêu cầu vượt quá số câu hiện có trong kho!
                  </div>
                )}
              </div>

              {/* Security Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    Mã PIN phòng thi cho Học sinh (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={formData.access_pin || ''}
                    onChange={(e) => setFormData({ ...formData, access_pin: e.target.value })}
                    placeholder="Để trống nếu không yêu cầu PIN..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Học sinh cần nhập mã này trước khi vào thi.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-rose-600" />
                    Mật khẩu Quản Trị Giáo Viên <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.teacher_password || 'admin2026'}
                    onChange={(e) => setFormData({ ...formData, teacher_password: e.target.value })}
                    placeholder="Mật khẩu giáo viên..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Bảo vệ khu vực Giáo viên, ngăn học sinh truy cập đề & bảng điểm.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              {saveSuccess ? (
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                  <Check className="w-4 h-4" /> Đã lưu cấu hình thành công!
                </span>
              ) : (
                <span className="text-xs text-slate-500">Cấu hình được lưu tự động vào trình duyệt</span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu cấu hình đề thi</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 col: Seed Simulator & Quick Preview */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-purple-600" />
                Động Cơ Xáo Trộn & Sinh Mã Đề
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kiểm tra thuật toán Fisher-Yates: mô phỏng một đề thi ngẫu nhiên phát cho học sinh.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSimulateRandomExam}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Mô phỏng sinh đề ngẫu nhiên</span>
            </button>

            {simulatedExam && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Mã đề tự sinh:</span>
                  <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-sm">
                    {simulatedExam.assignedCode}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Seed định danh:</span>
                  <span className="font-mono text-slate-800 font-semibold">{simulatedExam.seed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Số câu bốc được:</span>
                  <span className="font-bold text-emerald-700">
                    {simulatedExam.sanitizedQuestions.length} câu
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-1">
                    Xem trước câu đầu tiên sau khi xáo trộn:
                  </span>
                  <p className="text-slate-800 font-medium italic line-clamp-2">
                    "{simulatedExam.sanitizedQuestions[0]?.prompt}"
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                    ✓ Đã bóc tách is_correct (An toàn chống soi DevTools)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs space-y-2">
            <div className="font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-600" /> Cơ chế bảo mật ngẫu nhiên
            </div>
            <p className="leading-relaxed text-slate-600">
              Mỗi học sinh khi bấm vào làm bài sẽ được cấp một seed riêng biệt. Thứ tự câu hỏi và thứ tự phương án A-B-C-D được xáo trộn hoàn toàn, ngăn chặn việc nhìn bài nhau trong cùng phòng thi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
