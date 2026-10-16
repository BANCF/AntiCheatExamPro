import React, { useState, useRef, useMemo } from 'react';
import { Question, SingleChoiceQuestion, TrueFalseQuestion, QuestionType } from '../../types/exam';
import {
  parseExcelQuestions,
  parseJsonQuestions,
  downloadSampleExcelTemplate,
  downloadSampleJsonTemplate
} from '../../utils/excelHelper';
import { DEFAULT_QUESTION_BANK } from '../../data/defaultQuestionBank';
import {
  getQuestionClassification,
  KNOWN_GRADES,
  KNOWN_SUBJECTS,
  KNOWN_TERMS
} from '../../utils/questionClassification';
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
  GraduationCap,
  BookOpen,
  Calendar,
  Filter,
  X,
  Layers
} from 'lucide-react';
import { MathRenderer } from '../common/MathRenderer';

interface QuestionBankTabProps {
  questions: Question[];
  onUpdateQuestions: (questions: Question[]) => void;
}

export const QuestionBankTab: React.FC<QuestionBankTabProps> = ({
  questions,
  onUpdateQuestions
}) => {
  // Search & Type Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | QuestionType>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Hierarchical Classification Filters (Lớp - Môn - Phần/Kì)
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');

  // Upload feedback state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // New Question Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newType, setNewType] = useState<QuestionType>('single_choice');
  const [newGrade, setNewGrade] = useState<string>('Lớp 7');
  const [newSubject, setNewSubject] = useState<string>('Tin học');
  const [newTerm, setNewTerm] = useState<string>('Giữa kì I');
  const [newPrompt, setNewPrompt] = useState('');
  const [newTags, setNewTags] = useState('tin_hoc_7, bai_hoc');

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

  // Map each question with its classification info
  const classifiedQuestions = useMemo(() => {
    return questions.map((q) => ({
      raw: q,
      info: getQuestionClassification(q)
    }));
  }, [questions]);

  // Collect all unique tags
  const allTags = useMemo(() => {
    return Array.from(new Set(questions.flatMap((q) => q.tags || [])));
  }, [questions]);

  // Count distribution by Grade
  const gradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    classifiedQuestions.forEach(({ info }) => {
      counts[info.grade] = (counts[info.grade] || 0) + 1;
    });
    return counts;
  }, [classifiedQuestions]);

  // Count distribution by Subject
  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    classifiedQuestions.forEach(({ info }) => {
      counts[info.subject] = (counts[info.subject] || 0) + 1;
    });
    return counts;
  }, [classifiedQuestions]);

  // Count distribution by Term
  const termCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    classifiedQuestions.forEach(({ info }) => {
      counts[info.term] = (counts[info.term] || 0) + 1;
    });
    return counts;
  }, [classifiedQuestions]);

  // Filter questions based on all criteria
  const filteredQuestions = useMemo(() => {
    return classifiedQuestions.filter(({ raw, info }) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        raw.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        raw.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = typeFilter === 'all' || raw.type === typeFilter;
      const matchesTag = selectedTag === 'all' || raw.tags.includes(selectedTag);

      const matchesGrade = selectedGrade === 'all' || info.grade === selectedGrade;
      const matchesSubject = selectedSubject === 'all' || info.subject === selectedSubject;
      const matchesTerm = selectedTerm === 'all' || info.term === selectedTerm;

      return (
        matchesSearch &&
        matchesType &&
        matchesTag &&
        matchesGrade &&
        matchesSubject &&
        matchesTerm
      );
    });
  }, [classifiedQuestions, searchTerm, typeFilter, selectedTag, selectedGrade, selectedSubject, selectedTerm]);

  const singleChoiceCount = questions.filter((q) => q.type === 'single_choice').length;
  const trueFalseCount = questions.filter((q) => q.type === 'true_false').length;

  const hasActiveFilters =
    selectedGrade !== 'all' ||
    selectedSubject !== 'all' ||
    selectedTerm !== 'all' ||
    typeFilter !== 'all' ||
    selectedTag !== 'all' ||
    searchTerm.trim() !== '';

  const handleResetFilters = () => {
    setSelectedGrade('all');
    setSelectedSubject('all');
    setSelectedTerm('all');
    setTypeFilter('all');
    setSelectedTag('all');
    setSearchTerm('');
  };

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
    if (confirm('Khôi phục ngân hàng câu hỏi gốc mặc định?')) {
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
        tags,
        grade: newGrade,
        subject: newSubject,
        term: newTerm
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
        tags,
        grade: newGrade,
        subject: newSubject,
        term: newTerm
      };
      onUpdateQuestions([newQ, ...questions]);
    }

    setIsAddModalOpen(false);
    setNewPrompt('');
    setUploadSuccess('Đã thêm câu hỏi mới vào ngân hàng!');
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Tổng câu hỏi trong kho</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{questions.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
            <span>Số khối lớp quản lý</span>
          </div>
          <div className="text-2xl font-black text-purple-700">
            {Object.keys(gradeCounts).length} <span className="text-xs text-slate-500 font-normal">khối lớp</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>Số môn học đã có đề</span>
          </div>
          <div className="text-2xl font-black text-blue-700">
            {Object.keys(subjectCounts).length} <span className="text-xs text-slate-500 font-normal">môn</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-1">Cơ cấu câu hỏi</div>
            <div className="text-xs font-semibold text-slate-800 space-y-0.5">
              <div>A-B-C-D: <span className="text-indigo-600 font-bold">{singleChoiceCount}</span></div>
              <div>Đúng/Sai: <span className="text-purple-600 font-bold">{trueFalseCount}</span></div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetToDefault}
            title="Khôi phục câu hỏi mẫu mặc định"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Action Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              Nạp Ngân Hàng Câu Hỏi Mới
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Nhập tự động qua tệp Excel (.xlsx) có sẵn cột Lớp, Môn học, Kì thi hoặc tệp JSON chuẩn hóa
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm câu hỏi mới</span>
            </button>
          </div>
        </div>

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

      {/* 🌟 HIERARCHICAL CLASSIFICATION TOOLBAR (Lớp - Môn - Phần / Kì thi) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Tier 1: Khối Lớp */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0 w-28">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Khối Lớp:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedGrade === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              Tất cả các lớp ({questions.length})
            </button>
            {KNOWN_GRADES.map((grade) => {
              const count = gradeCounts[grade] || 0;
              return (
                <button
                  key={grade}
                  type="button"
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedGrade === grade
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{grade}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedGrade === grade ? 'bg-purple-800 text-purple-100' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 2: Môn Học */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0 w-28">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Môn Học:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              Tất cả môn
            </button>
            {KNOWN_SUBJECTS.map((subj) => {
              const count = subjectCounts[subj] || 0;
              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedSubject === subj
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{subj}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedSubject === subj ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 3: Phần / Kì Thi */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0 w-28">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Phần / Kì Thi:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTerm('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedTerm === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              Tất cả kì
            </button>
            {KNOWN_TERMS.map((term) => {
              const count = termCounts[term] || 0;
              return (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSelectedTerm(term)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedTerm === term
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{term}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedTerm === term ? 'bg-amber-800 text-amber-100' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary Search & Type Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo nội dung câu hỏi, từ khóa, tag..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs cursor-pointer"
          >
            <option value="all">Tất cả dạng câu hỏi</option>
            <option value="single_choice">Trắc nghiệm A-B-C-D</option>
            <option value="true_false">Đúng / Sai (Chùm ý)</option>
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-xs cursor-pointer"
          >
            <option value="all">Tất cả chủ đề / tag</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-indigo-900">
            <span className="font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              Đang lọc:
            </span>
            {selectedGrade !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold border border-purple-200">
                {selectedGrade}
              </span>
            )}
            {selectedSubject !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold border border-blue-200">
                {selectedSubject}
              </span>
            )}
            {selectedTerm !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                {selectedTerm}
              </span>
            )}
            {typeFilter !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
                {typeFilter === 'single_choice' ? 'Trắc nghiệm A-B-C-D' : 'Đúng / Sai'}
              </span>
            )}
            {searchTerm.trim() !== '' && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-medium border border-slate-200">
                Từ khóa: "{searchTerm}"
              </span>
            )}
            <span className="text-slate-600 ml-1">
              (Tìm thấy <strong>{filteredQuestions.length}</strong> câu)
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5 text-rose-500" />
            <span>Xóa bộ lọc</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-3">
        <div className="text-xs text-slate-500 flex items-center justify-between">
          <span>
            Hiển thị <strong className="text-slate-800">{filteredQuestions.length}</strong> / {questions.length} câu hỏi
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-800">Không tìm thấy câu hỏi phù hợp</div>
            <p className="text-xs text-slate-500">
              Hãy thử chọn lại Khối Lớp, Môn học, Phần kì thi hoặc xóa từ khóa tìm kiếm.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 cursor-pointer transition-colors"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : (
          filteredQuestions.map(({ raw: q, info }, idx) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  {/* Category Classification Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-slate-400 mr-1">#{idx + 1}</span>

                    {/* Grade Badge */}
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-purple-600" />
                      <span>{info.grade}</span>
                    </span>

                    {/* Subject Badge */}
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-blue-600" />
                      <span>{info.subject}</span>
                    </span>

                    {/* Term Badge */}
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-600" />
                      <span>{info.term}</span>
                    </span>

                    {/* Type Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        q.type === 'single_choice'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {q.type === 'single_choice' ? 'Trắc nghiệm 1 đáp án' : 'Đúng / Sai (Chùm)'}
                    </span>

                    {q.tags && q.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 pt-1 leading-relaxed">
                    <MathRenderer text={q.prompt} />
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(q.id)}
                  title="Xóa câu hỏi khỏi ngân hàng"
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
                          <span className="truncate">
                            <MathRenderer text={opt.text} />
                          </span>
                        </div>
                        {opt.is_correct && (
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 shrink-0">
                            <CheckCircle className="w-3 h-3" />
                            <span>Đúng</span>
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
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-600">{letters[itemIdx]})</span>
                          <span className="text-slate-800">
                            <MathRenderer text={item.text} />
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.is_correct
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
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

      {/* New Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                Tạo Câu Hỏi Mới Vào Ngân Hàng
              </h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4">
              {/* Classification dropdowns: Lớp, Môn, Kì thi */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Khối Lớp
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                  >
                    {KNOWN_GRADES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Môn Học
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                  >
                    {KNOWN_SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phần / Kì Thi
                  </label>
                  <select
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-medium"
                  >
                    {KNOWN_TERMS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          className="px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 shrink-0 cursor-pointer"
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
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Lưu vào ngân hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
