import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SubmissionRecord, Question } from '../../types/exam';
import { exportGradebookToExcel } from '../../utils/excelHelper';
import { fetchSubmissionsApi } from '../../services/api';
import { getSocket } from '../../services/socket';
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
  Trophy
} from 'lucide-react';

interface GradebookTabProps {
  submissions: SubmissionRecord[];
  examTitle: string;
  bank: Question[];
  onClearSubmissions: () => void;
  onAddSampleSubmissions?: () => void;
}

type SortOption = 'time_desc' | 'time_asc' | 'score_desc' | 'score_asc' | 'name_asc';

export const GradebookTab: React.FC<GradebookTabProps> = ({
  submissions: initialSubmissions,
  examTitle,
  bank,
  onClearSubmissions,
  onAddSampleSubmissions
}) => {
  // Local active submissions state synced with WebSocket and background polling
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'SUBMITTED' | 'FORCE_SUBMITTED'>('all');

  // Classification Filters: Theo Bài Kiểm Tra & Theo Lớp
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  // Sort Option: 'score_desc' | 'score_asc' | 'time_desc' | 'time_asc' | 'name_asc'
  const [sortOption, setSortOption] = useState<SortOption>('score_desc');

  // Modal detail
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);

  // Real-time flash alert indicator when new submission arrives
  const [latestSubmissionId, setLatestSubmissionId] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  // Sync with prop updates
  useEffect(() => {
    if (initialSubmissions) {
      setSubmissions(initialSubmissions);
    }
  }, [initialSubmissions]);

  // 📡 REAL-TIME WEBSOCKET LISTENER FOR CONTINUOUS LIVE UPDATES
  useEffect(() => {
    const socket = getSocket();

    // Ensure socket joins teacher monitoring room
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

    const handleConnect = () => {
      setIsLiveConnected(true);
      socket.emit('teacher:join');
    };

    const handleDisconnect = () => {
      setIsLiveConnected(false);
    };

    socket.on('student:submitted', handleSubmitted);
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('student:submitted', handleSubmitted);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  // 🔄 BACKGROUND POLLING (Every 3.5s) to guarantee zero desync
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const remote = await fetchSubmissionsApi();
        if (remote && Array.isArray(remote)) {
          setSubmissions(remote);
        }
      } catch {
        // Ignore silent background network errors
      }
    }, 3500);

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
      const cls = s.student_class ? s.student_class.trim() : 'Không rõ';
      map[cls] = (map[cls] || 0) + 1;
    });
    return map;
  }, [submissions]);

  const uniqueClasses = useMemo(() => {
    return Object.keys(classStats).sort();
  }, [classStats]);

  // Filter Submissions by Exam, Class, Status, and Search
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const subExam = sub.exam_title || examTitle;
      const matchesExam = selectedExam === 'all' || subExam === selectedExam;
      const matchesClass = selectedClass === 'all' || sub.student_class.trim() === selectedClass;
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesSearch =
        searchTerm.trim() === '' ||
        sub.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.student_class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.assigned_code.includes(searchTerm);

      return matchesExam && matchesClass && matchesStatus && matchesSearch;
    });
  }, [submissions, selectedExam, selectedClass, statusFilter, searchTerm, examTitle]);

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

  const handleExport = () => {
    const scopeLabel = selectedClass !== 'all' ? `Lop_${selectedClass}` : 'Tat_Ca_Lop';
    exportGradebookToExcel(sortedSubmissions, `${examTitle}_${scopeLabel}`);
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 px-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-950">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>Bảng Điểm Trực Tiếp (Live Real-time): Tự động cập nhật tức thì khi học sinh nộp bài</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-700">
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-indigo-200 font-mono font-medium">
            Đồng bộ: 3.5s / WebSocket
          </span>
        </div>
      </div>

      {/* Metrics Banner (Dynamic based on selected class and exam) */}
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

      {/* 🌟 1. PHÂN LOẠI THEO LỚP & BÀI KIỂM TRA (REQUIREMENT 2) */}
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
                    selectedClass === cls
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Lớp {cls}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedClass === cls
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

      {/* 🌟 2. BỘ LỌC TÌM KIẾM & TÍNH NĂNG SẮP XẾP BXH (REQUIREMENT 3) */}
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

          {/* 🌟 SẮP XẾP BẢNG XẾP HẠNG (REQUIREMENT 3) */}
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
                if (confirm('Bạn có chắc muốn xóa sạch toàn bộ bảng điểm bài làm?')) {
                  onClearSubmissions();
                }
              }}
              title="Xóa toàn bộ bài nộp"
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
                <th className="py-3.5 px-4 text-right">Chi Tiết</th>
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
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(sub)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold cursor-pointer transition-colors border border-indigo-200"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Chi Tiết Bài Thi:</span>
                  <span className="text-indigo-600">{selectedSubmission.student_name}</span>
                  <span className="text-xs text-slate-500 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    Lớp {selectedSubmission.student_class}
                  </span>
                </h2>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Mã đề: {selectedSubmission.assigned_code} | Nộp lúc:{' '}
                  {new Date(selectedSubmission.submit_time).toLocaleString('vi-VN')}
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
                <span className="text-[11px] text-indigo-700 font-medium block">Điểm số</span>
                <span className="text-xl font-black text-indigo-900 font-mono">
                  {selectedSubmission.calculated_score.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] text-slate-600 font-medium block">Điểm đạt</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
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
                  className={`text-sm font-bold font-mono ${
                    selectedSubmission.violation_count > 0 ? 'text-rose-600' : 'text-slate-700'
                  }`}
                >
                  {selectedSubmission.violation_count} lần
                </span>
              </div>
            </div>

            {/* Violation Audit Log */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                <span>Nhật Ký Vi Phạm Chống Gian Lận ({selectedSubmission.violations_log.length})</span>
              </h3>
              {selectedSubmission.violations_log.length === 0 ? (
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thí sinh làm bài nghiêm túc, không có ghi nhận vi phạm rời màn hình.</span>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {selectedSubmission.violations_log.map((v, i) => (
                    <div
                      key={v.id || i}
                      className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 text-xs flex items-center justify-between"
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

            {/* Close Button */}
            <div className="flex justify-end pt-3 border-t border-slate-200">
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
