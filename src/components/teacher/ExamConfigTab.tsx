import React, { useState, useMemo } from 'react';
import { ExamConfig, Question, SanitizedQuestion, ExamVariant } from '../../types/exam';
import { generateStudentExam, generateAllExamVariants } from '../../utils/randomEngine';
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
  Sparkles,
  Info,
  Layers,
  Eye,
  X,
  FileText,
  CheckCircle2,
  RefreshCw
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
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Selected variant for preview modal
  const [selectedVariant, setSelectedVariant] = useState<ExamVariant | null>(null);

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

  // Pre-generate all official exam variants based on current configuration
  const allVariants = useMemo(() => {
    return generateAllExamVariants(bank, {
      ...formData,
      total_questions_to_pick: totalCalculated
    });
  }, [bank, formData, totalCalculated]);

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

  const handleReshuffleVariants = () => {
    const updated: ExamConfig = {
      ...formData,
      session_salt: Date.now(),
      total_questions_to_pick: totalCalculated
    };
    setFormData(updated);
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

  const handleCopyVariantKey = (variant: ExamVariant) => {
    const lines = variant.pickedOriginalQuestions.map((q, idx) => {
      if (q.type === 'single_choice') {
        const correctOpt = q.options.find((o) => o.is_correct);
        const sanitizedQ = variant.sanitizedQuestions[idx];
        const letterIndex =
          sanitizedQ && 'options' in sanitizedQ
            ? sanitizedQ.options.findIndex((o) => o.id === correctOpt?.id)
            : -1;
        const letter = letterIndex >= 0 ? ['A', 'B', 'C', 'D'][letterIndex] : '?';
        return `Câu ${idx + 1}: ${letter} (${correctOpt?.text || ''})`;
      } else {
        const answers = q.items
          .map((item, i) => {
            const l = ['a', 'b', 'c', 'd'][i];
            return `${l}-${item.is_correct ? 'Đ' : 'S'}`;
          })
          .join(', ');
        return `Câu ${idx + 1}: [${answers}]`;
      }
    });

    const textToCopy = `BẢNG ĐÁP ÁN CHUẨN - MÃ ĐỀ ${variant.assignedCode}\nKỳ thi: ${formData.title}\nSeed: ${variant.seed}\n------------------------------------\n` + lines.join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(variant.assignedCode);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Cấu Hình Đề Thi Tự Động & Đa Mã Đề
          </div>
          <h2 className="text-xl font-bold text-slate-900">{formData.title}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Động cơ Fisher-Yates sinh sẵn <strong>{allVariants.length} mã đề chuẩn</strong>. Khi 50 học sinh truy cập, hệ thống bốc ngẫu nhiên 1 mã đề cho từng em.
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
        {/* Left 2 cols: Main Form Settings */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                Thông Số Kỳ Thi & Quy Chế
              </h3>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Tổng cộng: {totalCalculated} câu hỏi
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề đề thi / Bài kiểm tra
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                      setFormData({
                        ...formData,
                        duration_minutes: parseInt(e.target.value) || 1
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    Số lần vi phạm tối đa (Tự nộp bài)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    required
                    value={formData.max_violations_allowed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        max_violations_allowed: parseInt(e.target.value) || 1
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Multi-variant generation config */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Layers className="w-4 h-4 text-purple-600" />
                  Cấu Hình Sinh Đa Mã Đề (Tối thiểu 12 mã đề)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Số lượng mã đề sinh ra (Tối thiểu 12)
                    </label>
                    <input
                      type="number"
                      min={12}
                      max={50}
                      value={formData.variants_count || 12}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          variants_count: Math.max(12, parseInt(e.target.value) || 12)
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Phòng 50 học sinh bốc từ {formData.variants_count || 12} mã sẽ giảm tỷ lệ trùng đề &lt; 8%.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Mã đề bắt đầu (Base Code)
                    </label>
                    <input
                      type="number"
                      min={100}
                      max={900}
                      value={formData.base_code || 101}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          base_code: parseInt(e.target.value) || 101
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Ví dụ: 101 tạo ra các mã: {formData.base_code || 101}, {(formData.base_code || 101) + 1}, ...
                    </span>
                  </div>
                </div>
              </div>

              {/* Question Distribution */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  Cấu Trúc Đề Thi (Lấy mẫu ngẫu nhiên từ Ngân hàng đề)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Số câu Trắc nghiệm 4 lựa chọn (Kho có: {singleChoiceBankCount})
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
                    Bảo vệ khu vực Giáo viên, không hiển thị gợi ý mật khẩu cho học sinh.
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
                <span className="text-xs text-slate-500">Cấu hình được lưu tự động vào trình duyệt & Server</span>
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
              Hệ thống tạo sẵn <strong>{allVariants.length} mã đề chính thức</strong>. Khi 50 học sinh truy cập đồng thời, mỗi em bốc ngẫu nhiên 1 mã đề. Thứ tự câu hỏi và phương án A-B-C-D được xáo trộn độc lập, ngăn chặn hoàn toàn việc nhìn bài nhau trong phòng thi.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 12+ Official Exam Variants */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Ngân Hàng {allVariants.length} Mã Đề Thi Chính Thức & Đáp Án Chuẩn
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Danh sách {allVariants.length} mã đề được chuẩn bị sẵn cho phiên thi này. Giáo viên có thể nhấp vào bất kỳ mã đề nào để xem nội dung câu hỏi và bảng đáp án chuẩn.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReshuffleVariants}
            className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Xáo trộn lại {allVariants.length} mã đề mới</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
          {allVariants.map((variant) => (
            <div
              key={variant.assignedCode}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mã đề</span>
                  <span className="text-[10px] font-mono text-slate-400">#{variant.seed.toString().slice(-4)}</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {variant.assignedCode}
                </div>
                <div className="text-[11px] text-slate-500 mb-3">
                  {variant.sanitizedQuestions.length} câu hỏi
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className="w-full py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem đề & Đ.án</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyVariantKey(variant)}
                  className="w-full py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedKey === variant.assignedCode ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                  <span>{copiedKey === variant.assignedCode ? 'Đã chép' : 'Chép đáp án'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Preview Modal */}
      {selectedVariant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-3xl w-full max-h-[90vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-1">
                  Mã đề thi: {selectedVariant.assignedCode}
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Xem Trước Nội Dung & Bảng Đáp Án Chuẩn
                </h3>
                <p className="text-xs text-slate-500">
                  Seed: {selectedVariant.seed} • Tổng số câu: {selectedVariant.pickedOriginalQuestions.length} câu
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyVariantKey(selectedVariant)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === selectedVariant.assignedCode ? (
                    <Check className="w-4 h-4 text-emerald-200" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedKey === selectedVariant.assignedCode ? 'Đã sao chép' : 'Sao chép đáp án'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVariant(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="p-6 overflow-y-auto space-y-5 divide-y divide-slate-100">
              {selectedVariant.pickedOriginalQuestions.map((q, qIndex) => {
                const sanitizedQ = selectedVariant.sanitizedQuestions[qIndex];
                return (
                  <div key={q.id} className={qIndex > 0 ? 'pt-5' : ''}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {qIndex + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {q.type === 'single_choice' ? 'Trắc nghiệm 4 lựa chọn' : 'Đúng / Sai chùm'}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{q.prompt}</p>
                      </div>
                    </div>

                    {q.type === 'single_choice' && sanitizedQ && 'options' in sanitizedQ && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-10">
                        {sanitizedQ.options.map((opt, optIdx) => {
                          const origOpt = (q as any).options.find((o: any) => o.id === opt.id);
                          const isCorrect = !!origOpt?.is_correct;
                          const letter = ['A', 'B', 'C', 'D'][optIdx];
                          return (
                            <div
                              key={opt.id}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                  : 'bg-slate-50/70 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {letter}
                                </span>
                                <span>{opt.text}</span>
                              </div>
                              {isCorrect && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-0.5">
                                  <Check className="w-3 h-3" /> Đúng
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {q.type === 'true_false' && (
                      <div className="space-y-1.5 pl-10">
                        {q.items.map((sub, sIdx) => {
                          const letter = ['a', 'b', 'c', 'd'][sIdx];
                          return (
                            <div
                              key={sub.id}
                              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                            >
                              <span className="text-slate-800">
                                <strong>{letter})</strong> {sub.text}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  sub.is_correct
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {sub.is_correct ? 'ĐÚNG' : 'SAI'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedVariant(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
