import React, { useState, useMemo } from 'react';
import { ExamConfig, Question } from '../../types/exam';
import { generateAllExamVariants } from '../../utils/randomEngine';
import {
  Sliders,
  Save,
  Copy,
  Check,
  Play,
  Shuffle,
  Clock,
  ShieldAlert,
  KeyRound,
  Sparkles,
  Layers,
  FileText,
  UploadCloud,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import {
  getQuestionClassification,
  KNOWN_GRADES,
  KNOWN_SUBJECTS,
  KNOWN_TERMS
} from '../../utils/questionClassification';

interface ExamConfigTabProps {
  config: ExamConfig;
  bank: Question[];
  onSaveConfig: (config: ExamConfig) => void;
  onLaunchExamMode: () => void;
}

/**
 * Parses user input string like "1A 2B 3C 4D", "1.A, 2.B", "Câu 1: A", or "ABCDABCD..."
 * into a structured dictionary { "1": "A", "2": "B", ... }
 */
function parseAnswerKeyString(input: string, total: number): Record<string, string> {
  const result: Record<string, string> = {};
  if (!input || !input.trim()) return result;

  const regex = /(?:câu\s*)?(\d+)[\s.:-]*([a-dA-D])/gi;
  let match: RegExpExecArray | null;
  let count = 0;

  while ((match = regex.exec(input)) !== null) {
    const qNum = match[1];
    const ans = match[2].toUpperCase();
    result[qNum] = ans;
    count++;
  }

  // Fallback: raw letters without numbers
  if (count === 0) {
    const cleanLetters = input.replace(/[^a-dA-D]/gi, '').toUpperCase();
    for (let i = 0; i < Math.min(cleanLetters.length, total); i++) {
      result[String(i + 1)] = cleanLetters[i];
    }
  }

  return result;
}

export const ExamConfigTab: React.FC<ExamConfigTabProps> = ({
  config,
  bank,
  onSaveConfig,
  onLaunchExamMode
}) => {
  const [formData, setFormData] = useState<ExamConfig>(config);
  const [examMode, setExamMode] = useState<'bank' | 'pdf'>(config.exam_mode || 'bank');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // PDF Exam States
  const [pdfAnswerText, setPdfAnswerText] = useState<string>(() => {
    if (config.pdf_answer_key) {
      return Object.entries(config.pdf_answer_key)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([k, v]) => `${k}${v}`)
        .join(' ');
    }
    return '';
  });
  const [pdfQuestionCount, setPdfQuestionCount] = useState<number>(config.pdf_total_questions || 40);

  // Filter question pool for active config based on target scope
  const activePool = useMemo(() => {
    let pool = bank;
    if (formData.target_grade && formData.target_grade !== 'all') {
      const matched = pool.filter((q) => getQuestionClassification(q).grade === formData.target_grade);
      if (matched.length > 0) pool = matched;
    }
    if (formData.target_subject && formData.target_subject !== 'all') {
      const matched = pool.filter((q) => getQuestionClassification(q).subject === formData.target_subject);
      if (matched.length > 0) pool = matched;
    }
    if (formData.target_term && formData.target_term !== 'all') {
      const matched = pool.filter((q) => getQuestionClassification(q).term === formData.target_term);
      if (matched.length > 0) pool = matched;
    }
    return pool;
  }, [bank, formData.target_grade, formData.target_subject, formData.target_term]);

  const singleChoiceBankCount = activePool.filter((q) => q.type === 'single_choice').length;
  const trueFalseBankCount = activePool.filter((q) => q.type === 'true_false').length;

  const totalCalculated =
    examMode === 'pdf'
      ? pdfQuestionCount
      : Number(formData.distribution.single_choice || 0) + Number(formData.distribution.true_false || 0);

  // Pre-generate all official exam variants based on current configuration
  const allVariants = useMemo(() => {
    if (examMode === 'pdf') return [];
    return generateAllExamVariants(bank, {
      ...formData,
      total_questions_to_pick: totalCalculated
    });
  }, [bank, formData, totalCalculated, examMode]);

  // Handle PDF file upload
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Vui lòng chọn đúng tệp tài liệu PDF (.pdf)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        pdf_url: base64Data,
        pdf_filename: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle PDF answer key quick parse
  const handleParseAnswerText = (text: string) => {
    setPdfAnswerText(text);
    const parsed = parseAnswerKeyString(text, pdfQuestionCount);
    setFormData((prev) => ({
      ...prev,
      pdf_answer_key: parsed
    }));
  };

  // Toggle single bubble answer for PDF key
  const handleTogglePdfAnswer = (qNum: string, letter: string) => {
    setFormData((prev) => {
      const current = { ...(prev.pdf_answer_key || {}) };
      if (current[qNum] === letter) {
        delete current[qNum];
      } else {
        current[qNum] = letter;
      }
      // Sync string
      const text = Object.entries(current)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([k, v]) => `${k}${v}`)
        .join(' ');
      setPdfAnswerText(text);

      return {
        ...prev,
        pdf_answer_key: current
      };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (examMode === 'pdf') {
      if (!formData.pdf_url) {
        alert('Vui lòng tải lên file đề thi PDF trước khi lưu!');
        return;
      }
    }

    const updated: ExamConfig = {
      ...formData,
      exam_mode: examMode,
      total_questions_to_pick: totalCalculated,
      pdf_total_questions: pdfQuestionCount,
      pdf_answer_key: formData.pdf_answer_key || {}
    };

    onSaveConfig(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
            Cấu Hình Đề Thi & Phòng Kiểm Tra
          </div>
          <h2 className="text-xl font-bold text-slate-900">{formData.title}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {examMode === 'pdf' ? (
              <span>Chế độ: <strong>Đề Thi PDF Gốc + Phiếu Trả Lời Trắc Nghiệm</strong> (Giữ 100% đồ thị & công thức Toán, Lí, Hóa).</span>
            ) : (
              <span>Động cơ Fisher-Yates sinh sẵn <strong>{allVariants.length} mã đề chuẩn</strong> từ ngân hàng câu hỏi.</span>
            )}
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

      {/* Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mode 1: Bank Randomizer */}
        <div
          onClick={() => {
            setExamMode('bank');
            setFormData((p) => ({ ...p, exam_mode: 'bank' }));
          }}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            examMode === 'bank'
              ? 'bg-indigo-50/70 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              examMode === 'bank' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Shuffle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">
                1. Trộn Đề Từ Ngân Hàng Câu Hỏi
              </h3>
              {examMode === 'bank' && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                  Đang chọn
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tự động bốc ngẫu nhiên câu hỏi từ ngân hàng câu hỏi, hoán vị các phương án A-B-C-D tạo ra 12+ mã đề xáo trộn độc lập.
            </p>
          </div>
        </div>

        {/* Mode 2: PDF + OMR Bubble Sheet */}
        <div
          onClick={() => {
            setExamMode('pdf');
            setFormData((p) => ({ ...p, exam_mode: 'pdf' }));
          }}
          className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
            examMode === 'pdf'
              ? 'bg-purple-50/70 border-purple-600 shadow-md ring-2 ring-purple-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              examMode === 'pdf' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">
                2. Tải Đề Thi PDF Sẵn Có (Toán, Lí, Hóa, Sinh...)
              </h3>
              {examMode === 'pdf' && (
                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                  Đang chọn
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dành riêng cho giáo viên Tự Nhiên! Tải 1 file PDF đề thi có sẵn (giữ nguyên vẹn hình vẽ, công thức toán), dán chuỗi đáp án là xong.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Main Form Settings */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                Thông Số Kỳ Thi ({examMode === 'pdf' ? 'Chế Độ PDF' : 'Chế Độ Ngân Hàng Đề'})
              </h3>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Tổng cộng: {totalCalculated} câu hỏi
              </span>
            </div>

            <div className="space-y-4">
              {/* Exam Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tiêu đề đề thi / Bài kiểm tra <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ví dụ: Kiểm tra Giữa kì I - Môn Toán 10"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              {/* Subject & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bộ môn thi</label>
                  <select
                    value={formData.target_subject || 'Tin học'}
                    onChange={(e) => setFormData({ ...formData, target_subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    {KNOWN_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Khối lớp</label>
                  <select
                    value={formData.target_grade || 'Lớp 7'}
                    onChange={(e) => setFormData({ ...formData, target_grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    {KNOWN_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Học kỳ / Đợt thi</label>
                  <select
                    value={formData.target_term || 'Giữa kì I'}
                    onChange={(e) => setFormData({ ...formData, target_term: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    {KNOWN_TERMS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* PDF MODE SPECIFIC SECTION */}
              {examMode === 'pdf' ? (
                <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-4">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Thiết Lập Đề Thi PDF & Bảng Đáp Án</span>
                  </div>

                  {/* Upload PDF Box */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Chọn file đề thi PDF từ máy tính của bạn <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>Tải File PDF Lên</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>

                      {formData.pdf_filename ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-purple-900 bg-white border border-purple-200 px-3 py-2 rounded-xl flex-1 truncate">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{formData.pdf_filename}</span>
                          {formData.pdf_url && (
                            <a
                              href={formData.pdf_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-purple-600 underline text-[11px] shrink-0 ml-auto"
                            >
                              Xem thử PDF
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Chưa chọn tệp PDF nào</span>
                      )}
                    </div>
                  </div>

                  {/* Question count */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tổng số câu hỏi trong đề PDF
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={pdfQuestionCount}
                      onChange={(e) => {
                        const count = Math.max(1, Math.min(100, Number(e.target.value) || 40));
                        setPdfQuestionCount(count);
                      }}
                      className="w-32 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  {/* Quick Answer Key Parser */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dán chuỗi đáp án nhanh (Ví dụ: <code className="bg-white px-1.5 py-0.5 rounded border border-purple-200 font-mono text-purple-700">1A 2B 3C 4D 5A 6B...</code> hoặc <code className="bg-white px-1.5 py-0.5 rounded border border-purple-200 font-mono text-purple-700">ABCDABCD...</code>)
                    </label>
                    <textarea
                      rows={2}
                      value={pdfAnswerText}
                      onChange={(e) => handleParseAnswerText(e.target.value)}
                      placeholder="Dán đáp án của bạn vào đây: 1A 2B 3C 4D 5B 6A 7C 8D 9B 10A..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                    />
                    <div className="text-[11px] text-slate-500 mt-1">
                      Đã nhận diện: <strong className="text-purple-700">{Object.keys(formData.pdf_answer_key || {}).length}</strong> / {pdfQuestionCount} câu có đáp án.
                    </div>
                  </div>

                  {/* Interactive Bubble Matrix */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Bảng đáp án trực quan (Bấm vào A, B, C, D để chỉnh sửa):</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((p) => ({ ...p, pdf_answer_key: {} }));
                          setPdfAnswerText('');
                        }}
                        className="text-rose-600 hover:text-rose-700 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Xóa toàn bộ
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-2 bg-white rounded-xl border border-purple-200">
                      {Array.from({ length: pdfQuestionCount }, (_, i) => {
                        const qNum = String(i + 1);
                        const selectedLetter = formData.pdf_answer_key?.[qNum];

                        return (
                          <div
                            key={qNum}
                            className={`p-1.5 rounded-lg border flex items-center justify-between text-xs ${
                              selectedLetter ? 'bg-purple-50/50 border-purple-300' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <span className="font-bold text-[11px] text-slate-700 w-9">
                              C.{i + 1}:
                            </span>
                            <div className="flex items-center gap-1">
                              {['A', 'B', 'C', 'D'].map((letter) => {
                                const isSelected = selectedLetter === letter;
                                return (
                                  <button
                                    key={letter}
                                    type="button"
                                    onClick={() => handleTogglePdfAnswer(qNum, letter)}
                                    className={`w-6 h-6 rounded-md font-bold text-[10px] transition-all cursor-pointer ${
                                      isSelected
                                        ? 'bg-purple-600 text-white shadow-xs scale-105'
                                        : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                                    }`}
                                  >
                                    {letter}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* BANK RANDOMIZER SPECIFIC SECTION */
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Cơ Cấu Số Lượng Câu Hỏi Bốc Ngẫu Nhiên</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">Trắc nghiệm chọn 1 đáp án (Single Choice):</span>
                        <span className="text-slate-400">Có {singleChoiceBankCount} câu</span>
                      </div>
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
                              single_choice: Number(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">Trắc nghiệm Đúng / Sai (True / False):</span>
                        <span className="text-slate-400">Có {trueFalseBankCount} câu</span>
                      </div>
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
                              true_false: Number(e.target.value) || 0
                            }
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Duration and Violation Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Thời gian làm bài (Phút)</span>
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({ ...formData, duration_minutes: Number(e.target.value) || 45 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                    <span>Giới hạn vi phạm tối đa (Thu bài)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.max_violations_allowed}
                    onChange={(e) =>
                      setFormData({ ...formData, max_violations_allowed: Number(e.target.value) || 3 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* PIN Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mã PIN phòng thi (Tùy chọn, để trống nếu không bắt buộc)</span>
                </label>
                <input
                  type="text"
                  value={formData.access_pin || ''}
                  onChange={(e) => setFormData({ ...formData, access_pin: e.target.value })}
                  placeholder="Ví dụ: 2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-fadeIn">
                    <Check className="w-4 h-4" /> Đã lưu cấu hình bài thi thành công!
                  </span>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu & Kích Hoạt Đề Thi</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right 1 col: Quick Info & Simulation */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tóm Tắt Đề Thi Hiện Tại</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Chế độ thi:</span>
                <span className="font-bold text-slate-800">
                  {examMode === 'pdf' ? 'Tài liệu PDF gốc + Phiếu OMR' : 'Trộn từ Ngân hàng đề'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Môn học:</span>
                <span className="font-semibold text-indigo-700">{formData.target_subject || 'Tin học'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Tổng số câu hỏi:</span>
                <span className="font-mono font-bold text-slate-800">{totalCalculated} câu</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Thời gian làm bài:</span>
                <span className="font-mono font-bold text-slate-800">{formData.duration_minutes} phút</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Giới hạn vi phạm:</span>
                <span className="font-bold text-rose-600">{formData.max_violations_allowed} lần</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onLaunchExamMode}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-emerald-400" />
              <span>Chạy Thử Nghiệm Làm Bài</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
