import React, { useState, useMemo } from 'react';
import { SubmissionRecord, Question } from '../../types/exam';
import { exportGradebookToExcel } from '../../utils/excelHelper';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Clock,
  Award,
  Users,
  CheckCircle2,
  AlertTriangle,
  X,
  FileCheck,
  PlusCircle
} from 'lucide-react';

interface GradebookTabProps {
  submissions: SubmissionRecord[];
  examTitle: string;
  bank: Question[];
  onClearSubmissions: () => void;
  onAddSampleSubmissions?: () => void;
}

export const GradebookTab: React.FC<GradebookTabProps> = ({
  submissions,
  examTitle,
  bank,
  onClearSubmissions,
  onAddSampleSubmissions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'SUBMITTED' | 'FORCE_SUBMITTED'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchSearch =
        sub.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.student_class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.assigned_code.includes(searchTerm);
      const matchStatus = statusFilter === 'all' || sub.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [submissions, searchTerm, statusFilter]);

  // Summary Metrics
  const totalCount = submissions.length;
  const forceSubmittedCount = submissions.filter((s) => s.status === 'FORCE_SUBMITTED').length;
  const avgScore = totalCount > 0
    ? (submissions.reduce((acc, s) => acc + s.calculated_score, 0) / totalCount).toFixed(2)
    : '0.00';
  const highestScore = totalCount > 0
    ? Math.max(...submissions.map((s) => s.calculated_score)).toFixed(2)
    : '0.00';

  const handleExport = () => {
    exportGradebookToExcel(submissions, examTitle);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Tổng bài nộp</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Điểm trung bình</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{avgScore} <span className="text-xs text-slate-500 font-normal">/ 10</span></div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Điểm cao nhất</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{highestScore} <span className="text-xs text-slate-500 font-normal">/ 10</span></div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Bị thu do vi phạm</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">
            {forceSubmittedCount}{' '}
            <span className="text-xs text-slate-500 font-normal">
              ({totalCount > 0 ? Math.round((forceSubmittedCount / totalCount) * 100) : 0}%)
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên, lớp, mã đề..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="SUBMITTED">Nộp hợp lệ</option>
            <option value="FORCE_SUBMITTED">Bị thu bài do vi phạm</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {onAddSampleSubmissions && (
            <button
              type="button"
              onClick={onAddSampleSubmissions}
              className="px-3.5 py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Nạp mẫu bài thi</span>
            </button>
          )}

          <button
            type="button"
            disabled={submissions.length === 0}
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Xuất Excel (.xlsx)</span>
          </button>

          {submissions.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Bạn có chắc muốn xóa sạch toàn bộ bảng điểm bài làm?')) {
                  onClearSubmissions();
                }
              }}
              title="Xóa toàn bộ"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">STT</th>
                <th className="py-3.5 px-4">Họ và Tên</th>
                <th className="py-3.5 px-4">Lớp</th>
                <th className="py-3.5 px-4">Mã Đề</th>
                <th className="py-3.5 px-4">Điểm Số (10)</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">Vi Phạm</th>
                <th className="py-3.5 px-4">Thời Gian Nộp</th>
                <th className="py-3.5 px-4 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Chưa có bài thi nào được ghi nhận. Bấm "Nạp mẫu bài thi" để xem thử bảng điểm mẫu.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, idx) => {
                  const isForced = sub.status === 'FORCE_SUBMITTED';
                  const scoreColor =
                    sub.calculated_score >= 8.0
                      ? 'text-emerald-400 font-bold'
                      : sub.calculated_score >= 5.0
                      ? 'text-amber-400 font-semibold'
                      : 'text-rose-400 font-semibold';

                  return (
                    <tr key={sub.submission_id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-white">{sub.student_name}</td>
                      <td className="py-3 px-4">{sub.student_class}</td>
                      <td className="py-3 px-4 font-mono font-bold text-purple-400">{sub.assigned_code}</td>
                      <td className={`py-3 px-4 font-mono text-sm ${scoreColor}`}>
                        {sub.calculated_score.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        {isForced ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-[10px] animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> BỊ THU BÀI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> Hợp lệ
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            sub.violation_count > 0 ? 'text-rose-400' : 'text-slate-500'
                          }`}
                        >
                          {sub.violation_count} lần
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(sub.submit_time).toLocaleTimeString('vi-VN')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(sub)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold cursor-pointer transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Chi Tiết Bài Thi:</span>
                  <span className="text-indigo-400">{selectedSubmission.student_name}</span>
                  <span className="text-xs text-slate-400">({selectedSubmission.student_class})</span>
                </h2>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Mã đề: {selectedSubmission.assigned_code} | Nộp lúc:{' '}
                  {new Date(selectedSubmission.submit_time).toLocaleString('vi-VN')}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Violation Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <div className="text-xs text-slate-400">Điểm tổng kết</div>
                <div className="text-xl font-black text-emerald-400 font-mono">
                  {selectedSubmission.calculated_score.toFixed(2)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <div className="text-xs text-slate-400">Trạng thái</div>
                <div
                  className={`text-xs font-bold mt-1 ${
                    selectedSubmission.status === 'FORCE_SUBMITTED' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {selectedSubmission.status === 'FORCE_SUBMITTED' ? 'BỊ THU DO VI PHẠM' : 'Nộp hợp lệ'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <div className="text-xs text-slate-400">Số lần vi phạm</div>
                <div className="text-xl font-black text-rose-400 font-mono">
                  {selectedSubmission.violation_count}
                </div>
              </div>
            </div>

            {/* Violation Audit Log */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Nhật Ký Vi Phạm (Audit Log)
              </h3>
              {selectedSubmission.violations_log.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-800/40 text-xs text-slate-500 italic">
                  Thí sinh không vi phạm quy chế trong suốt quá trình làm bài.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {selectedSubmission.violations_log.map((log, lIdx) => (
                    <div
                      key={log.id || lIdx}
                      className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-rose-400">[{log.type}]</span> {log.note || 'Rời màn hình thi'}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString('vi-VN')}
                        {log.duration ? ` (${log.duration}s)` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Questions breakdown */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-slate-300">Đối Chiếu Đáp Án Làm Bài:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {Object.entries(selectedSubmission.student_answers).map(([qId, answerVal], qIdx) => {
                  const originalQ = bank.find((q) => q.id === qId);
                  const prompt = originalQ ? originalQ.prompt : `Câu hỏi ${qId}`;

                  return (
                    <div key={qId} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs space-y-1.5">
                      <div className="font-semibold text-slate-200">
                        {qIdx + 1}. {prompt}
                      </div>

                      {originalQ?.type === 'single_choice' ? (
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-slate-400">Học sinh chọn:</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 font-medium text-slate-300">
                            {originalQ.options.find((opt) => opt.id === answerVal)?.text || 'Chưa chọn'}
                          </span>
                          <span className="text-slate-400 ml-2">Đáp án đúng:</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            {originalQ.options.find((opt) => opt.is_correct)?.text}
                          </span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400">
                          {typeof answerVal === 'object' && answerVal !== null
                            ? Object.entries(answerVal).map(([subId, boolVal]) => (
                                <span key={subId} className="mr-3">
                                  Ý {subId.slice(-1)}: {boolVal ? 'ĐÚNG' : 'SAI'}
                                </span>
                              ))
                            : 'Chưa làm'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer"
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
