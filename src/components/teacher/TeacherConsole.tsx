import React, { useState } from 'react';
import { Question, ExamConfig, SubmissionRecord } from '../../types/exam';
import { QuestionBankTab } from './QuestionBankTab';
import { ExamConfigTab } from './ExamConfigTab';
import { GradebookTab } from './GradebookTab';
import { LiveProctoringTab } from './LiveProctoringTab';
import { Database, Sliders, Award, Sparkles, Play, Radio } from 'lucide-react';

interface TeacherConsoleProps {
  bank: Question[];
  config: ExamConfig;
  submissions: SubmissionRecord[];
  onUpdateBank: (bank: Question[]) => void;
  onUpdateConfig: (config: ExamConfig) => void;
  onClearSubmissions: () => void;
  onAddSampleSubmissions: () => void;
  onLaunchStudentExam: () => void;
}

export const TeacherConsole: React.FC<TeacherConsoleProps> = ({
  bank,
  config,
  submissions,
  onUpdateBank,
  onUpdateConfig,
  onClearSubmissions,
  onAddSampleSubmissions,
  onLaunchStudentExam
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'bank' | 'config' | 'gradebook'>('live');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            BẢNG ĐIỀU KHIỂN GIÁO VIÊN (TEACHER DASHBOARD)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quản Lý Kiểm Tra & Chấm Điểm Chống Gian Lận
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Quản trị ngân hàng câu hỏi, thiết lập đề thi xáo trộn động, theo dõi vi phạm và trích xuất bảng điểm Excel.
          </p>
        </div>

        <button
          type="button"
          onClick={onLaunchStudentExam}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Mở Giao Diện Học Sinh Thi</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'live'
              ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-500'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
          <span>Giám Thị Trực Tiếp (Live)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bank')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'bank'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>1. Ngân Hàng Đề ({bank.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('config')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'config'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>2. Thiết Lập Đề Thi</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gradebook')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'gradebook'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Bảng Điểm & Kết Quả ({submissions.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'live' && <LiveProctoringTab />}
        {activeTab === 'bank' && (
          <QuestionBankTab questions={bank} onUpdateQuestions={onUpdateBank} />
        )}
        {activeTab === 'config' && (
          <ExamConfigTab
            config={config}
            bank={bank}
            onSaveConfig={onUpdateConfig}
            onLaunchExamMode={onLaunchStudentExam}
          />
        )}
        {activeTab === 'gradebook' && (
          <GradebookTab
            submissions={submissions}
            examTitle={config.title}
            bank={bank}
            onClearSubmissions={onClearSubmissions}
            onAddSampleSubmissions={onAddSampleSubmissions}
          />
        )}
      </div>
    </div>
  );
};
