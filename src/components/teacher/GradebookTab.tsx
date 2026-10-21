import React, { useState, useMemo, useEffect } from 'react';
import { SubmissionRecord, Question, ClassRoom } from '../../types/exam';
import { exportGradebookToExcel } from '../../utils/excelHelper';
import { fetchSubmissionsApi } from '../../services/api';
import { getSocket } from '../../services/socket';
import { MathRenderer } from '../common/MathRenderer';
import {
  FileSpreadsheet,
  Search,
  Trash2,
  ShieldAlert,
  Clock,
  Award,
  Users,
  CheckCircle2,
  AlertTriangle,
  X,
  FileCheck,
  PlusCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  GraduationCap,
  BookOpen,
  Trophy,
  RefreshCw,
  Sparkles,
  Check,
  FileText
} from 'lucide-react';

interface GradebookTabProps {
  submissions: SubmissionRecord[];
  examTitle: string;
  bank: Question[];
  classes?: ClassRoom[];
  initialClassFilter?: string;
  onClearSubmissions: () => void;
  onDeleteSubmission?: (id: string) => void;
  onDeduplicateSubmissions?: () => void;
  onAddSampleSubmissions?: () => void;
}

type SortOption = 'time_desc' | 'time_asc' | 'score_desc' | 'score_asc' | 'name_asc';
type ScoreBracketFilter = 'all' | 'gioi' | 'kha' | 'trung_binh' | 'yeu';

export const GradebookTab: React.FC<GradebookTabProps> = ({
  submissions: initialSubmissions,
  examTitle,
  bank,
  classes = [],
  initialClassFilter = 'all',
  onClearSubmissions,
  onDeleteSubmission,
  onDeduplicateSubmissions,
  onAddSampleSubmissions
}) => {
  // Local active submissions state synced with WebSocket and background polling
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'SUBMITTED' | 'FORCE_SUBMITTED'>('all');
  const [scoreBracket, setScoreBracket] = useState<ScoreBracketFilter>('all');

  // Classification Filters: Theo Bài Kiểm Tra & Theo Lớp
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>(initialClassFilter || 'all');

  // Sort Option: 'score_desc' | 'score_asc' | 'time_desc' | 'time_asc' | 'name_asc'
  const [sortOption, setSortOption] = useState<SortOption>('score_desc');

  // Modal detail
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);
  const [detailTab, setDetailTab] = useState<'answers' | 'violations'>('answers');

  // Real-time flash alert indicator when new submission arrives
  const [latestSubmissionId, setLatestSubmissionId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Sync with prop updates
  useEffect(() => {
    if (initialSubmissions) {
      setSubmissions((prev) => {
        const map = new Map<string, SubmissionRecord>();
        prev.forEach((s) => map.set(s.submission_id, s));
        initialSubmissions.forEach((s) => map.set(s.submission_id, s));
        return Array.from(map.values());
      });
    }
  }, [initialSubmissions]);

  // Sync initial class filter from prop
  useEffect(() => {
    if (initialClassFilter) {
      setSelectedClass(initialClassFilter);
    }
  }, [initialClassFilter]);

  // Manual refresh from backend
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const remote = await fetchSubmissionsApi();
      if (remote && Array.isArray(remote)) {
        setSubmissions((prev) => {
          const map = new Map<string, SubmissionRecord>();
          prev.forEach((s) => map.set(s.submission_id, s));
          remote.forEach((s) => map.set(s.submission_id, s));
          return Array.from(map.values());
        });
        showToast('Đã làm mới dữ liệu bảng điểm từ máy chủ!');
      }
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // 📡 REAL-TIME WEBSOCKET LISTENER FOR CONTINUOUS LIVE UPDATES
  useEffect(() => {
    const socket = getSocket();
    socket.emit('teacher:join');

    const handleSubmitted = (data: { submission: SubmissionRecord }) => {
      if (data && data.submission) {
        setSubmissions((prev) => {
          const filtered = prev.filter((s) => s.submission_id !== data.submission.submission_id);
          return [data.submission, ...filtered];
        });
        setLatestSubmissionId(data.submission.submission_id);
        setTimeout(() => setLatestSubmissionId(null), 5000);
      }
    };

    const handleDeleted = (data: { submissionId: string }) => {
      if (data && data.submissionId) {
        setSubmissions((prev) => prev.filter((s) => s.submission_id !== data.submissionId));
      }
    };

    socket.on('student:submitted', handleSubmitted);
    socket.on('submission:deleted', handleDeleted);

    return () => {
      socket.off('student:submitted', handleSubmitted);
      socket.off('submission:deleted', handleDeleted);
    };
  }, []);

  // 🔄 BACKGROUND POLLING (Every 4s) to guarantee zero desync
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const remote = await fetchSubmissionsApi();
        if (remote && Array.isArray(remote) && remote.length > 0) {
          setSubmissions((prev) => {
            const map = new Map<string, SubmissionRecord>();
            prev.forEach((s) => map.set(s.submission_id, s));
            remote.forEach((s) => map.set(s.submission_id, s));
            return Array.from(map.values());
          });
        }
      } catch {
        // Ignore silent background network errors
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Collect unique exams
  const availableExams = useMemo(() => {
    const map = new Map<string, string>();
    if (examTitle) {
      map.set('default', examTitle);
    }
    submissions.forEach((s) => {
      const title = s.exam_title || examTitle;
      map.set(title, title);
    });
    return Array.from(map.values());
  }, [submissions, examTitle]);

  // Collect unique classes and count per class
  const classStats = useMemo(() => {
    const map: Record<string, number> = {};
    submissions.forEach((s) => {
      const cls = s.student_class ? s.student_class.trim().toUpperCase() : 'KHÁC';
      map[cls] = (map[cls] || 0) + 1;
    });
    return map;
  }, [submissions]);

  const uniqueClasses = useMemo(() => {
    return Object.keys(classStats).sort();
  }, [classStats]);

  // Filter Submissions by Exam, Class, Status, Score Bracket, and Search
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const subExam = sub.exam_title || examTitle;
      const matchesExam = selectedExam === 'all' || subExam === selectedExam;
      const matchesClass = selectedClass === 'all' || sub.student_class.trim().toUpperCase() === selectedClass.trim().toUpperCase();
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;

      let matchesScore = true;
      if (scoreBracket === 'gioi') matchesScore = sub.calculated_score >= 8.0;
      else if (scoreBracket === 'kha') matchesScore = sub.calculated_score >= 6.5 && sub.calculated_score < 8.0;
      else if (scoreBracket === 'trung_binh') matchesScore = sub.calculated_score >= 5.0 && sub.calculated_score < 6.5;
      else if (scoreBracket === 'yeu') matchesScore = sub.calculated_score < 5.0;

      const matchesSearch =
        searchTerm.trim() === '' ||
        sub.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.student_class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.assigned_code.includes(searchTerm);

      return matchesExam && matchesClass && matchesStatus && matchesScore && matchesSearch;
    });
  }, [submissions, selectedExam, selectedClass, statusFilter, scoreBracket, searchTerm, examTitle]);

  // Sort Submissions
  const sortedSubmissions = useMemo(() => {
    const list = [...filteredSubmissions];

    switch (sortOption) {
      case 'score_desc':
        return list.sort((a, b) => b.calculated_score - a.calculated_score);
      case 'score_asc':
        return list.sort((a, b) => a.calculated_score - b.calculated_score);
      case 'time_desc':
        return list.sort((a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime());
      case 'time_asc':
        return list.sort((a, b) => new Date(a.submit_time).getTime() - new Date(b.submit_time).getTime());
      case 'name_asc':
        return list.sort((a, b) => a.student_name.localeCompare(b.student_name, 'vi'));
      default:
        return list;
    }
  }, [filteredSubmissions, sortOption]);

  // Summary Metrics dynamically calculated for selected scope
  const totalCount = filteredSubmissions.length;
  const forceSubmittedCount = filteredSubmissions.filter((s) => s.status === 'FORCE_SUBMITTED').length;
  const avgScore = totalCount > 0
    ? (filteredSubmissions.reduce((acc, s) => acc + s.calculated_score, 0) / totalCount).toFixed(2)
    : '0.00';
  const highestScore = totalCount > 0
    ? Math.max(...filteredSubmissions.map((s) => s.calculated_score)).toFixed(2)
    : '0.00';

  // Performance Bracket Counts (for selected scope)
  const countGioi = filteredSubmissions.filter((s) => s.calculated_score >= 8.0).length;
  const countKha = filteredSubmissions.filter((s) => s.calculated_score >= 6.5 && s.calculated_score < 8.0).length;
  const countTB = filteredSubmissions.filter((s) => s.calculated_score >= 5.0 && s.calculated_score < 6.5).length;
  const countYeu = filteredSubmissions.filter((s) => s.calculated_score < 5.0).length;

  const pctGioi = totalCount > 0 ? Math.round((countGioi / totalCount) * 100) : 0;
  const pctKha = totalCount > 0 ? Math.round((countKha / totalCount) * 100) : 0;
  const pctTB = totalCount > 0 ? Math.round((countTB / totalCount) * 100) : 0;
  const pctYeu = totalCount > 0 ? Math.round((countYeu / totalCount) * 100) : 0;

  // Single submission deletion handler
  const handleDeleteSingle = (sub: SubmissionRecord) => {
    if (window.confirm(`Bạn có chắc muốn xóa bài thi của thí sinh "${sub.student_name}" (Lớp ${sub.student_class})?\nThao tác này không thể hoàn tác.`)) {
      setSubmissions((prev) => prev.filter((s) => s.submission_id !== sub.submission_id));
      if (onDeleteSubmission) {
        onDeleteSubmission(sub.submission_id);
      }
      if (selectedSubmission?.submission_id === sub.submission_id) {
        setSelectedSubmission(null);
      }
      showToast(`Đã xóa bài thi của ${sub.student_name}`);
    }
  };

  // Deduplicate submissions handler
  const handleTriggerDeduplicate = () => {
    if (onDeduplicateSubmissions) {
      onDeduplicateSubmissions();
    }
    const seen = new Set<string>();
    const unique: SubmissionRecord[] = [];
    const sorted = [...submissions].sort(
      (a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime()
    );
    for (const s of sorted) {
      const key = `${s.student_name.trim().toLowerCase()}_${s.student_class.trim().toLowerCase()}_${s.assigned_code}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(s);
      }
    }
    const removedCount = submissions.length - unique.length;
    setSubmissions(unique);
    showToast(removedCount > 0 ? `Đã dọn dẹp ${removedCount} bài nộp trùng lặp!` : 'Bảng điểm sạch, không có bài trùng lặp!');
  };

  const handleExport = () => {
    const scopeLabel = selectedClass !== 'all' ? `Lop_${selectedClass}` : 'Tat_Ca_Lop';
    exportGradebookToExcel(sortedSubmissions, `${examTitle}_${scopeLabel}`);
  };

  // Helper to resolve question details for modal
  const resolveExamQuestionsForSubmission = (sub: SubmissionRecord) => {
    const matchedClass = classes.find(
      (c) => c.code.trim().toUpperCase() === sub.student_class.trim().toUpperCase()
    );
    const isPdf = matchedClass?.examConfig?.exam_mode === 'pdf';
    const pdfKey = matchedClass?.examConfig?.pdf_answer_key;

    return { isPdf, pdfKey };
  };

  return (
    <div className="space-y-6">
      {/* Toast alert notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-3.5 px-5 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Real-time Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-950">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Bảng Điểm Trực Tiếp (Live Gradebook): Tự động cập nhật tức thì khi học sinh nộp bài</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-700">
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-indigo-200 font-mono font-medium">
            Đồng bộ: Tự động 4s / WebSocket
          </span>
        </div>
      </div>

      {/* Metrics Banner (Dynamic based on selected class and filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Tổng bài nộp {selectedClass !== 'all' ? `(${selectedClass})` : ''}</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Điểm trung bình</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {avgScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Điểm cao nhất</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {highestScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Bị thu do vi phạm</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {forceSubmittedCount}{' '}
            <span className="text-xs text-slate-400 font-normal">
              ({totalCount > 0 ? Math.round((forceSubmittedCount / totalCount) * 100) : 0}%)
            </span>
          </div>
        </div>
      </div>

      {/* 📊 PHỔ ĐIỂM & XẾP LOẠI HỌC LỰC (FEATURE 1: VISUAL GRADE DISTRIBUTION) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Phổ Điểm & Xếp Loại Học Lực {selectedClass !== 'all' ? `(Lớp ${selectedClass})` : '(Toàn bộ)'}</span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {totalCount} học sinh tham gia
          </span>
        </div>

        {/* Multi-segment progress bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
          <div style={{ width: `${pctGioi}%` }} className="bg-emerald-500 transition-all" title={`Giỏi: ${countGioi} (${pctGioi}%)`} />
          <div style={{ width: `${pctKha}%` }} className="bg-blue-500 transition-all" title={`Khá: ${countKha} (${pctKha}%)`} />
          <div style={{ width: `${pctTB}%` }} className="bg-amber-500 transition-all" title={`Trung bình: ${countTB} (${pctTB}%)`} />
          <div style={{ width: `${pctYeu}%` }} className="bg-rose-500 transition-all" title={`Chưa đạt: ${countYeu} (${pctYeu}%)`} />
        </div>

        {/* Filter buttons by score tier */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <button
            type="button"
            onClick={() => setScoreBracket(scoreBracket === 'gioi' ? 'all' : 'gioi')}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
              scoreBracket === 'gioi'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-500/30'
                : 'bg-slate-50/70 border-slate-200 hover:bg-emerald-50/40 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Giỏi (≥ 8.0)</span>
            </div>
            <span className="font-mono font-bold text-emerald-700">{countGioi} HS ({pctGioi}%)</span>
          </button>

          <button
            type="button"
            onClick={() => setScoreBracket(scoreBracket === 'kha' ? 'all' : 'kha')}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
              scoreBracket === 'kha'
                ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-500/30'
                : 'bg-slate-50/70 border-slate-200 hover:bg-blue-50/40 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Khá (6.5 - 7.9)</span>
            </div>
            <span className="font-mono font-bold text-blue-700">{countKha} HS ({pctKha}%)</span>
          </button>

          <button
            type="button"
            onClick={() => setScoreBracket(scoreBracket === 'trung_binh' ? 'all' : 'trung_binh')}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
              scoreBracket === 'trung_binh'
                ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-500/30'
                : 'bg-slate-50/70 border-slate-200 hover:bg-amber-50/40 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>TB (5.0 - 6.4)</span>
            </div>
            <span className="font-mono font-bold text-amber-700">{countTB} HS ({pctTB}%)</span>
          </button>

          <button
            type="button"
            onClick={() => setScoreBracket(scoreBracket === 'yeu' ? 'all' : 'yeu')}
            className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
              scoreBracket === 'yeu'
                ? 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-500/30'
                : 'bg-slate-50/70 border-slate-200 hover:bg-rose-50/40 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Chưa đạt (&lt; 5.0)</span>
            </div>
            <span className="font-mono font-bold text-rose-700">{countYeu} HS ({pctYeu}%)</span>
          </button>
        </div>
      </div>

      {/* 🌟 1. PHÂN LOẠI THEO LỚP & BÀI KIỂM TRA */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Tier A: Chọn Bài Kiểm Tra */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0 w-32">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Bài Kiểm Tra:</span>
          </div>
          <div className="flex-1">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full sm:w-auto min-w-[280px] px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 cursor-pointer shadow-xs"
            >
              <option value="all">Tất cả bài kiểm tra ({submissions.length} bài)</option>
              {availableExams.map((ex) => (
                <option key={ex} value={ex}>
                  📝 {ex}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tier B: Chọn Lớp Học (Xếp riêng từng lớp) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0 w-32">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Xếp Theo Lớp:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedClass('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedClass === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              Tất cả các lớp ({submissions.length})
            </button>
            {uniqueClasses.map((cls) => {
              const count = classStats[cls] || 0;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedClass.toUpperCase() === cls.toUpperCase()
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Lớp {cls}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedClass.toUpperCase() === cls.toUpperCase()
                        ? 'bg-purple-800 text-purple-100'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🌟 2. BỘ LỌC TÌM KIẾM, SẮP XẾP & CÔNG CỤ DỌN DẸP */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh, mã đề..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="SUBMITTED">Hợp lệ</option>
            <option value="FORCE_SUBMITTED">Bị thu bài (Vi phạm)</option>
          </select>

          {/* SẮP XẾP BẢNG XẾP HẠNG */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
              Sắp xếp:
            </span>

            <button
              type="button"
              onClick={() => setSortOption('score_desc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                sortOption === 'score_desc'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70'
              }`}
              title="Điểm số từ cao xuống thấp (Top BXH)"
            >
              <span>Điểm cao ➔ thấp</span>
            </button>

            <button
              type="button"
              onClick={() => setSortOption('score_asc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                sortOption === 'score_asc'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70'
              }`}
              title="Điểm số từ thấp đến cao"
            >
              <span>Điểm thấp ➔ cao</span>
            </button>

            <button
              type="button"
              onClick={() => setSortOption('time_desc')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                sortOption === 'time_desc'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70'
              }`}
              title="Theo thời gian nộp bài mới nhất"
            >
              <Clock className="w-3 h-3" />
              <span>Nộp mới nhất</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <button
            type="button"
            onClick={handleManualRefresh}
            className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200"
            title="Tải lại toàn bộ bài nộp mới nhất từ máy chủ"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Đang tải...' : 'Làm mới điểm'}</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerDeduplicate}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-purple-200"
            title="Tự động lọc và loại bỏ các bài nộp trùng lặp của cùng một học sinh"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Lọc bài trùng lặp</span>
          </button>

          {onAddSampleSubmissions && (
            <button
              type="button"
              onClick={onAddSampleSubmissions}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Nạp mẫu bài thi</span>
            </button>
          )}

          <button
            type="button"
            disabled={sortedSubmissions.length === 0}
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel {selectedClass !== 'all' ? `Lớp ${selectedClass}` : ''} (.xlsx)</span>
          </button>

          {submissions.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa TOÀN BỘ bài nộp của tất cả các lớp trên hệ thống? Thao tác này không thể hoàn tác!')) {
                  onClearSubmissions();
                }
              }}
              title="Xóa toàn bộ bài nộp trên hệ thống"
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Gradebook Leaderboard Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Hạng / STT</th>
                <th
                  onClick={() => setSortOption(sortOption === 'name_asc' ? 'score_desc' : 'name_asc')}
                  className="py-3.5 px-4 cursor-pointer hover:text-indigo-600 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Họ và Tên</span>
                    {sortOption === 'name_asc' && <ArrowUp className="w-3 h-3 text-indigo-600" />}
                  </div>
                </th>
                <th className="py-3.5 px-4">Lớp</th>
                <th className="py-3.5 px-4">Mã Đề</th>
                <th
                  onClick={() =>
                    setSortOption(sortOption === 'score_desc' ? 'score_asc' : 'score_desc')
                  }
                  className="py-3.5 px-4 cursor-pointer hover:text-amber-600 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Điểm Số (10)</span>
                    {sortOption === 'score_desc' && <ArrowDown className="w-3.5 h-3.5 text-amber-600" />}
                    {sortOption === 'score_asc' && <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                </th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Vi Phạm</th>
                <th
                  onClick={() =>
                    setSortOption(sortOption === 'time_desc' ? 'time_asc' : 'time_desc')
                  }
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Thời Gian Nộp</span>
                    {sortOption === 'time_desc' && <ArrowDown className="w-3.5 h-3.5 text-slate-700" />}
                    {sortOption === 'time_asc' && <ArrowUp className="w-3.5 h-3.5 text-slate-700" />}
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sortedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                    Không tìm thấy bài thi nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                sortedSubmissions.map((sub, idx) => {
                  const isForced = sub.status === 'FORCE_SUBMITTED';
                  const isNewlySubmitted = sub.submission_id === latestSubmissionId;

                  const scoreColor =
                    sub.calculated_score >= 8.0
                      ? 'text-emerald-700 font-bold'
                      : sub.calculated_score >= 5.0
                      ? 'text-amber-700 font-semibold'
                      : 'text-rose-700 font-semibold';

                  // Rank Badges when sorted by highest score
                  const isLeaderboardMode = sortOption === 'score_desc';
                  const isRank1 = isLeaderboardMode && idx === 0 && sub.calculated_score > 0;
                  const isRank2 = isLeaderboardMode && idx === 1 && sub.calculated_score > 0;
                  const isRank3 = isLeaderboardMode && idx === 2 && sub.calculated_score > 0;

                  return (
                    <tr
                      key={sub.submission_id}
                      className={`transition-colors ${
                        isNewlySubmitted
                          ? 'bg-emerald-50/80 animate-pulse'
                          : isRank1
                          ? 'bg-amber-50/40 hover:bg-amber-50/70'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono">
                        {isRank1 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs shadow-xs">
                            🥇 #1
                          </span>
                        ) : isRank2 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs shadow-xs">
                            🥈 #2
                          </span>
                        ) : isRank3 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100/70 border border-amber-200 text-amber-800 font-bold text-xs shadow-xs">
                            🥉 #3
                          </span>
                        ) : (
                          <span className="text-slate-400 font-semibold">#{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{sub.student_name}</span>
                          {isNewlySubmitted && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-semibold">
                              Vừa nộp
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold border border-purple-200 text-[11px]">
                          {sub.student_class}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">
                        {sub.assigned_code}
                      </td>
                      <td className={`py-3.5 px-4 font-mono text-sm ${scoreColor}`}>
                        {sub.calculated_score.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        {isForced ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-[10px] animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> BỊ THU BÀI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> Hợp lệ
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-semibold ${
                            sub.violation_count > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'
                          }`}
                        >
                          {sub.violation_count} lần
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {new Date(sub.submit_time).toLocaleTimeString('vi-VN')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSubmission(sub);
                              setDetailTab('answers');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold cursor-pointer transition-colors border border-indigo-200"
                          >
                            Xem bài làm
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSingle(sub)}
                            title="Xóa riêng bài nộp này"
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🌟 3. MODAL XEM CHI TIẾT BÀI LÀM VÀ ĐÁP ÁN (CRITICAL FEATURE) */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-3xl w-full p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Bài Thi:</span>
                  <span className="text-indigo-600">{selectedSubmission.student_name}</span>
                  <span className="text-xs text-slate-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Lớp {selectedSubmission.student_class}
                  </span>
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-1 flex flex-wrap items-center gap-3">
                  <span>Mã đề: <strong>{selectedSubmission.assigned_code}</strong></span>
                  <span>•</span>
                  <span>Bài: {selectedSubmission.exam_title || examTitle}</span>
                  <span>•</span>
                  <span>Nộp: {new Date(selectedSubmission.submit_time).toLocaleString('vi-VN')}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Status Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
                <span className="text-[11px] text-indigo-700 font-medium block">Điểm số (Thang 10)</span>
                <span className="text-2xl font-black text-indigo-900 font-mono">
                  {selectedSubmission.calculated_score.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-600 font-medium block">Điểm đạt</span>
                <span className="text-base font-bold text-slate-800 font-mono">
                  {selectedSubmission.correct_points_earned ?? 0} /{' '}
                  {selectedSubmission.max_possible_points ?? selectedSubmission.total_questions}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-600 font-medium block">Trạng thái</span>
                <span
                  className={`text-xs font-bold ${
                    selectedSubmission.status === 'FORCE_SUBMITTED'
                      ? 'text-rose-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {selectedSubmission.status === 'FORCE_SUBMITTED' ? 'Bị thu bài' : 'Hợp lệ'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-600 font-medium block">Số lần vi phạm</span>
                <span
                  className={`text-base font-bold font-mono ${
                    selectedSubmission.violation_count > 0 ? 'text-rose-600' : 'text-slate-700'
                  }`}
                >
                  {selectedSubmission.violation_count} lần
                </span>
              </div>
            </div>

            {/* Modal Internal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDetailTab('answers')}
                className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  detailTab === 'answers'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. Chi Tiết Bài Làm & Đáp Án</span>
              </button>

              <button
                type="button"
                onClick={() => setDetailTab('violations')}
                className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  detailTab === 'violations'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>2. Nhật Ký Gian Lận ({selectedSubmission.violations_log.length})</span>
              </button>
            </div>

            {/* TAB 1: CHI TIẾT BÀI LÀM CỦA HỌC SINH */}
            {detailTab === 'answers' && (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {(() => {
                  const { isPdf, pdfKey } = resolveExamQuestionsForSubmission(selectedSubmission);

                  // 1. PDF EXAM MODE ANSWER MATRIX
                  if (isPdf && pdfKey) {
                    const totalQ = Object.keys(pdfKey).length || 40;
                    return (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-purple-900 text-xs flex items-center justify-between">
                          <span className="font-semibold">Hình thức: Đề thi PDF • Đối chiếu phiếu làm bài trực tiếp</span>
                          <span className="text-purple-700 font-mono">Tổng cộng: {totalQ} câu</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                          {Array.from({ length: totalQ }, (_, i) => i + 1).map((qNum) => {
                            const rawStudentAns = selectedSubmission.student_answers[String(qNum)];
                            const studentAns = typeof rawStudentAns === 'string' ? rawStudentAns : '';
                            const correctAns = pdfKey[String(qNum)];
                            const isCorrect = Boolean(studentAns && correctAns && studentAns.trim().toUpperCase() === String(correctAns).trim().toUpperCase());
                            const isSkipped = !studentAns;

                            return (
                              <div
                                key={qNum}
                                className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                                  isCorrect
                                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                                    : isSkipped
                                    ? 'bg-slate-50 border-slate-200 text-slate-500'
                                    : 'bg-rose-50/70 border-rose-300 text-rose-950'
                                }`}
                              >
                                <div className="font-bold text-[11px] text-slate-500 mb-1">
                                  Câu {qNum}
                                </div>
                                <div className="flex items-center justify-around font-mono">
                                  <div>
                                    <span className="text-[10px] text-slate-400 block font-sans">HS</span>
                                    <span className={`font-black text-sm ${isCorrect ? 'text-emerald-700' : isSkipped ? 'text-slate-400' : 'text-rose-700'}`}>
                                      {studentAns || '-'}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[10px] text-slate-400 block font-sans">Đúng</span>
                                    <span className="font-black text-sm text-indigo-700">
                                      {correctAns || '?'}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-1 text-[10px] font-bold">
                                  {isCorrect ? (
                                    <span className="text-emerald-600 flex items-center justify-center gap-0.5">
                                      <Check className="w-3 h-3" /> Đúng
                                    </span>
                                  ) : isSkipped ? (
                                    <span className="text-slate-400">Chưa làm</span>
                                  ) : (
                                    <span className="text-rose-600 flex items-center justify-center gap-0.5">
                                      <X className="w-3 h-3" /> Sai
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // 2. QUESTION BANK EXAM MODE: RENDER FULL QUESTION CARDS
                  const studentAnswerKeys = Object.keys(selectedSubmission.student_answers || {});
                  if (studentAnswerKeys.length === 0) {
                    return (
                      <div className="p-8 text-center text-slate-400 text-xs">
                        Thí sinh không làm hoặc không có câu trả lời nào được ghi nhận.
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-3">
                      {studentAnswerKeys.map((qId, qIdx) => {
                        const matchedQuestion = bank.find((q) => q.id === qId);
                        const studentAnswer = selectedSubmission.student_answers[qId];

                        if (!matchedQuestion) {
                          return (
                            <div key={qId} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                              <span className="font-bold text-slate-700">Câu {qIdx + 1} (Mã: {qId})</span>
                              <div className="mt-1 text-slate-600 font-mono">
                                Lựa chọn của học sinh: {JSON.stringify(studentAnswer)}
                              </div>
                            </div>
                          );
                        }

                        if (matchedQuestion.type === 'single_choice') {
                          const correctOpt = matchedQuestion.options.find((opt) => opt.is_correct);
                          const isCorrect = studentAnswer === correctOpt?.id;
                          const isSkipped = !studentAnswer;

                          return (
                            <div
                              key={qId}
                              className={`p-4 rounded-2xl border text-xs space-y-2.5 transition-all ${
                                isCorrect
                                  ? 'bg-emerald-50/40 border-emerald-300'
                                  : isSkipped
                                  ? 'bg-slate-50 border-slate-200'
                                  : 'bg-rose-50/40 border-rose-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">
                                  Câu {qIdx + 1}:
                                </span>
                                {isCorrect ? (
                                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                                    <Check className="w-3 h-3" /> ĐÚNG (+1.0 điểm)
                                  </span>
                                ) : isSkipped ? (
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[10px]">
                                    CHƯA LÀM (0 điểm)
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] flex items-center gap-1">
                                    <X className="w-3 h-3" /> SAI (0 điểm)
                                  </span>
                                )}
                              </div>

                              <div className="font-semibold text-slate-900 leading-relaxed">
                                <MathRenderer text={matchedQuestion.prompt} />
                              </div>

                              {/* Options breakdown */}
                              <div className="space-y-1.5 pl-2">
                                {matchedQuestion.options.map((opt, optIndex) => {
                                  const letters = ['A', 'B', 'C', 'D', 'E'];
                                  const letter = letters[optIndex] || String(optIndex + 1);
                                  const isStudentSelected = studentAnswer === opt.id;
                                  const isOptionCorrect = opt.is_correct;

                                  let optClass = 'bg-white border-slate-200 text-slate-700';
                                  if (isStudentSelected && isOptionCorrect) {
                                    optClass = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold';
                                  } else if (isStudentSelected && !isOptionCorrect) {
                                    optClass = 'bg-rose-100/80 border-rose-400 text-rose-950 font-bold';
                                  } else if (!isStudentSelected && isOptionCorrect) {
                                    optClass = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium';
                                  }

                                  return (
                                    <div
                                      key={opt.id}
                                      className={`p-2 rounded-xl border flex items-center justify-between text-xs ${optClass}`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                                          {letter}
                                        </span>
                                        <span>
                                          <MathRenderer text={opt.text} />
                                        </span>
                                      </div>
                                      <div className="text-[11px] shrink-0 font-bold">
                                        {isStudentSelected && isOptionCorrect && (
                                          <span className="text-emerald-700">✓ HS chọn (Đúng)</span>
                                        )}
                                        {isStudentSelected && !isOptionCorrect && (
                                          <span className="text-rose-700">✗ HS chọn (Sai)</span>
                                        )}
                                        {!isStudentSelected && isOptionCorrect && (
                                          <span className="text-emerald-700">★ Đáp án chuẩn</span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        // True/False question
                        const userAnsObj = (studentAnswer as Record<string, boolean>) || {};
                        return (
                          <div
                            key={qId}
                            className="p-4 rounded-2xl border border-slate-200 bg-white text-xs space-y-2.5 shadow-2xs"
                          >
                            <span className="font-bold text-slate-800">
                              Câu {qIdx + 1} (Trắc nghiệm Đúng / Sai):
                            </span>
                            <div className="font-semibold text-slate-900 leading-relaxed">
                              <MathRenderer text={matchedQuestion.prompt} />
                            </div>
                            <div className="space-y-1.5 pl-2">
                              {matchedQuestion.items.map((subItem) => {
                                const userVal = userAnsObj[subItem.id];
                                const isItemCorrect = userVal === subItem.is_correct;

                                return (
                                  <div
                                    key={subItem.id}
                                    className={`p-2 rounded-xl border flex items-center justify-between ${
                                      isItemCorrect
                                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                                        : 'bg-rose-50/50 border-rose-200 text-rose-900'
                                    }`}
                                  >
                                    <span>
                                      <MathRenderer text={subItem.text} />
                                    </span>
                                    <div className="text-[11px] font-bold shrink-0">
                                      HS chọn: <strong>{userVal !== undefined ? (userVal ? 'ĐÚNG' : 'SAI') : 'Chưa làm'}</strong> | Chuẩn:{' '}
                                      <strong>{subItem.is_correct ? 'ĐÚNG' : 'SAI'}</strong>{' '}
                                      {isItemCorrect ? '✓' : '✗'}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB 2: NHẬT KÝ GIAN LẬN */}
            {detailTab === 'violations' && (
              <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                {selectedSubmission.violations_log.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Thí sinh làm bài nghiêm túc, không có ghi nhận vi phạm rời màn hình hay chuyển tab.</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedSubmission.violations_log.map((v, i) => (
                      <div
                        key={v.id || i}
                        className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px]">
                            {i + 1}
                          </span>
                          <span className="font-semibold text-rose-900">
                            {v.type === 'TAB_SWITCH'
                              ? 'Chuyển tab trình duyệt'
                              : v.type === 'WINDOW_BLUR'
                              ? 'Mất tiêu điểm (Rời cửa sổ)'
                              : v.type === 'FULLSCREEN_EXIT'
                              ? 'Thoát chế độ toàn màn hình'
                              : v.type === 'DEVTOOLS'
                              ? 'Mở DevTools'
                              : 'Thao tác vi phạm'}
                          </span>
                          {v.note && <span className="text-slate-500 text-[11px]">({v.note})</span>}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(v.timestamp).toLocaleTimeString('vi-VN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleDeleteSingle(selectedSubmission)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa bài nộp này</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
