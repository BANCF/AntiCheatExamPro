import React, { useState, useRef } from 'react';
import { Question, SingleChoiceQuestion, TrueFalseQuestion, QuestionType } from '../../types/exam';
import {
  parseExcelQuestions,
  parseJsonQuestions,
  downloadSampleExcelTemplate,
  downloadSampleJsonTemplate
} from '../../utils/excelHelper';
import { DEFAULT_QUESTION_BANK } from '../../data/defaultQuestionBank';
import {
  Upload,
  Download,
  Plus,
  Trash2,
  Search,
  FileSpreadsheet,
  FileCode,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Check,
  X
} from 'lucide-react';

interface QuestionBankTabProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
}

export const QuestionBankTab: React.FC<QuestionBankTabProps> = ({
  questions,
  onUpdateQuestions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | QuestionType>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // New Question Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newType, setNewType] = useState<QuestionType>('single_choice');
  const [newPrompt, setNewPrompt] = useState('');
  const [newTags, setNewTags] = useState('tin_hoc_10, easy');
  // Single choice options state
  const [scOptions, setScOptions] = useState([
    { text: '', is_correct: true },
    { text: '', is_correct: false },
    { text: '', is_correct: false },
    { text: '', is_correct: false }
  ]);
  // True false sub-items state
  const [tfItems, setTfItems] = useState([
    { text: '', is_correct: true },
    { text: '', is_correct: true },
    { text: '', is_correct: false },
    { text: '', is_correct: false }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Collect all unique tags
  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags || [])));

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || q.type === typeFilter;
    const matchesTag = selectedTag === 'all' || q.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesTag;
  });

  const singleChoiceCount = questions.filter((q) => q.type === 'single_choice').length;
  const trueFalseCount = questions.filter((q) => q.type === 'true_false').length;

  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      let imported: Question[] = [];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        imported = await parseExcelQuestions(file);
      } else if (fileName.endsWith('.json')) {
        imported = await parseJsonQuestions(file);
      } else {
        throw new Error('Định dạng file không được hỗ trợ. Vui lòng chọn .xlsx, .xls hoặc .json');
      }

      if (imported.length === 0) {
        throw new Error('Không tìm thấy câu hỏi hợp lệ trong file');
      }

      // Append to existing bank
      const updated = [...questions, ...imported];
      onUpdateQuestions(updated);
      setUploadSuccess(`Đã nạp thành công ${imported.length} câu hỏi mới vào ngân hàng!`);
    } catch (err: any) {
      setUploadError(err.message || 'Lỗi khi nạp file');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng?')) {
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (confirm('Khôi phục ngân hàng câu hỏi gốc mặc định (24 câu hỏi mẫu)?')) {
      onUpdateQuestions(DEFAULT_QUESTION_BANK);
      setUploadSuccess('Đã khôi phục ngân hàng câu hỏi mặc định!');
    }
  };

  // Submit new question
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    const tags = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (newType === 'single_choice') {
      const options = scOptions.map((opt, i) => ({
        id: `opt_${Date.now()}_${i}`,
        text: opt.text.trim() || `Phương án ${i + 1}`,
        is_correct: opt.is_correct
      }));
      const newQ: SingleChoiceQuestion = {
        id: `q_${Date.now()}`,
        type: 'single_choice',
        prompt: newPrompt.trim(),
        options,
        tags
      };
      onUpdateQuestions([newQ, ...questions]);
    } else {
      const items = tfItems.map((item, i) => ({
        id: `sub_${Date.now()}_${i}`,
        text: item.text.trim() || `Ý ${i + 1}`,
        is_correct: item.is_correct
      }));
      const newQ: TrueFalseQuestion = {
        id: `q_${Date.now()}`,
        type: 'true_false',
        prompt: newPrompt.trim(),
        items,
        tags
      };
      onUpdateQuestions([newQ, ...questions]);
    }

    setIsAddModalOpen(false);
    setNewPrompt('');
    setUploadSuccess('Đã thêm câu hỏi mới vào ngân hàng!');
  };

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Tổng câu hỏi trong kho</div>
          <div className="text-2xl font-black text-slate-900">{questions.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Trắc nghiệm 1 đáp án (A-B-C-D)</div>
          <div className="text-2xl font-black text-indigo-600">{singleChoiceCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 mb-1">Trắc nghiệm Đúng / Sai (Chùm ý)</div>
          <div className="text-2xl font-black text-purple-600">{trueFalseCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-1">Chủ đề & Nhãn tag</div>
            <div className="text-2xl font-black text-emerald-600">{allTags.length}</div>
          </div>
          <button
            type="button"
            onClick={handleResetToDefault}
            title="Khôi phục câu hỏi mẫu"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Action Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              Nạp Ngân Hàng Câu Hỏi Mới
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hỗ trợ nhập câu hỏi tự động qua tệp Excel (.xlsx) hoặc JSON chuẩn hóa
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Download Templates */}
            <button
              type="button"
              onClick={downloadSampleExcelTemplate}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tải mẫu Excel</span>
              <Download className="w-3 h-3 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={downloadSampleJsonTemplate}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <FileCode className="w-3.5 h-3.5 text-sky-600" />
              <span>Tải mẫu JSON</span>
              <Download className="w-3 h-3 text-slate-400" />
            </button>
            {/* Add Manually */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tạo câu hỏi mới</span>
            </button>
          </div>
        </div>

        {/* Drag Drop or File Upload Box */}
        <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-slate-50 hover:bg-indigo-50/30">
          <Upload className="w-6 h-6 text-indigo-600" />
          <span className="text-xs font-medium text-slate-700">
            {isUploading ? 'Đang phân tích và nạp dữ liệu...' : 'Kéo thả tệp hoặc bấm vào đây để chọn file (.xlsx, .json)'}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls, .json"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>

        {uploadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {uploadError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
            <HelpCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo nội dung, từ khóa, tag..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm cursor-pointer"
          >
            <option value="all">Tất cả dạng câu hỏi</option>
            <option value="single_choice">Trắc nghiệm A-B-C-D</option>
            <option value="true_false">Đúng / Sai (Chùm)</option>
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-sm cursor-pointer"
          >
            <option value="all">Tất cả chủ đề</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        <div className="text-xs text-slate-500 flex items-center justify-between">
          <span>
            Hiển thị <strong className="text-slate-800">{filteredQuestions.length}</strong> câu hỏi
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-sm">
            Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all space-y-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">#{idx + 1}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        q.type === 'single_choice'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {q.type === 'single_choice' ? 'Trắc nghiệm 1 đáp án' : 'Đúng / Sai'}
                    </span>
                    {q.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 pt-1 leading-relaxed">
                    {q.prompt}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                  title="Xóa câu hỏi"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options breakdown */}
              {q.type === 'single_choice' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {(q as SingleChoiceQuestion).options.map((opt, optIdx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl text-xs flex items-center justify-between border ${
                          opt.is_correct
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center font-bold text-[10px]">
                            {letters[optIdx] || optIdx + 1}
                          </span>
                          <span className="truncate">{opt.text}</span>
                        </div>
                        {opt.is_correct && (
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 shrink-0">
                            <Check className="w-3 h-3" /> Đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1.5 pt-1">
                  {(q as TrueFalseQuestion).items.map((item, itemIdx) => {
                    const letters = ['a', 'b', 'c', 'd'];
                    return (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-white border border-slate-200 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                            {letters[itemIdx] || itemIdx + 1}
                          </span>
                          <span className="text-slate-800 font-medium">{item.text}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            item.is_correct
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {item.is_correct ? 'ĐÚNG' : 'SAI'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal: Create Question Manually */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateQuestion}
            className="max-w-2xl w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                Thêm Câu Hỏi Mới
              </h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Loại câu hỏi</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as QuestionType)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                >
                  <option value="single_choice">Trắc nghiệm chọn 1 đáp án (A-B-C-D)</option>
                  <option value="true_false">Trắc nghiệm Đúng / Sai (Chùm 4 ý)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nhãn / Chủ đề (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="bai_1_thiet_bi_vao_ra, easy"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nội dung câu hỏi</label>
              <textarea
                required
                rows={3}
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Nhập nội dung câu hỏi..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            {/* If Single Choice */}
            {newType === 'single_choice' ? (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Phương án lựa chọn (chọn 1 phương án ĐÚNG)
                </label>
                {scOptions.map((opt, i) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                        {letters[i]}
                      </span>
                      <input
                        type="text"
                        required
                        value={opt.text}
                        onChange={(e) => {
                          const updated = [...scOptions];
                          updated[i].text = e.target.value;
                          setScOptions(updated);
                        }}
                        placeholder={`Nội dung phương án ${letters[i]}`}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                      />
                      <label className="flex items-center gap-1 text-xs text-slate-700 shrink-0 cursor-pointer">
                        <input
                          type="radio"
                          name="sc_correct_choice"
                          checked={opt.is_correct}
                          onChange={() => {
                            const updated = scOptions.map((item, idx) => ({
                              ...item,
                              is_correct: idx === i
                            }));
                            setScOptions(updated);
                          }}
                          className="accent-indigo-600"
                        />
                        <span>Đúng</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Các nhận định chùm Đúng / Sai
                </label>
                {tfItems.map((item, i) => {
                  const letters = ['a', 'b', 'c', 'd'];
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {letters[i]})
                      </span>
                      <input
                        type="text"
                        required
                        value={item.text}
                        onChange={(e) => {
                          const updated = [...tfItems];
                          updated[i].text = e.target.value;
                          setTfItems(updated);
                        }}
                        placeholder={`Nội dung nhận định ${letters[i]}`}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                      />
                      <select
                        value={item.is_correct ? 'true' : 'false'}
                        onChange={(e) => {
                          const updated = [...tfItems];
                          updated[i].is_correct = e.target.value === 'true';
                          setTfItems(updated);
                        }}
                        className="px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 shrink-0"
                      >
                        <option value="true">ĐÚNG</option>
                        <option value="false">SAI</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Lưu vào ngân hàng
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
