import React, { useState } from 'react';
import { Question, ExamConfig, SubmissionRecord, TeacherAccount, ClassRoom } from '../../types/exam';
import { QuestionBankTab } from './QuestionBankTab';
import { ExamConfigTab } from './ExamConfigTab';
import { GradebookTab } from './GradebookTab';
import { LiveProctoringTab } from './LiveProctoringTab';
import { TeacherManagementTab } from './TeacherManagementTab';
import { ClassManagementTab } from './ClassManagementTab';
import { Database, Sliders, Award, Sparkles, Play, Radio, Users, LogOut, BookOpen, School } from 'lucide-react';

interface TeacherConsoleProps {
  bank: Question[];
  config: ExamConfig;
  submissions: SubmissionRecord[];
  classes: ClassRoom[];
  currentTeacher?: TeacherAccount | null;
  onUpdateBank: (bank: Question[]) => void;
  onUpdateConfig: (config: ExamConfig) => void;
  onSaveClass: (classItem: ClassRoom) => void;
  onDeleteClass: (classId: string) => void;
  onClearSubmissions: () => void;
  onAddSampleSubmissions: () => void;
  onLaunchStudentExam: (classItem?: ClassRoom) => void;
  onLogoutTeacher?: () => void;
  onSwitchTeacher?: (teacher: TeacherAccount) => void;
}

export const TeacherConsole: React.FC<TeacherConsoleProps> = ({
  bank,
  config,
  submissions,
  classes,
  currentTeacher,
  onUpdateBank,
  onUpdateConfig,
  onSaveClass,
  onDeleteClass,
  onClearSubmissions,
  onAddSampleSubmissions,
  onLaunchStudentExam,
  onLogoutTeacher,
  onSwitchTeacher
}) => {
  const [activeTab, setActiveTab] = useState<'live' | 'classes' | 'bank' | 'config' | 'gradebook' | 'teachers'>('classes');

  const isAdmin = currentTeacher?.role === 'admin';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            BẢNG ĐIỀU KHIỂN GIÁO VIÊN BỘ MÔN (TEACHER DASHBOARD)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Quản Lý Kiểm Tra & Chấm Điểm Chống Gian Lận
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Hỗ trợ toàn diện môn Tin học, Toán học, Vật lí, Hóa học, Sinh học... Hỗ trợ công thức LaTeX & Đề thi PDF.
          </p>
        </div>

        {/* Right action & Teacher identity */}
        <div className="flex flex-wrap items-center gap-3">
          {currentTeacher && (
            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div>
                <div className="text-xs font-bold text-slate-900">{currentTeacher.fullName}</div>
                <div className="text-[10px] text-indigo-700 font-semibold flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Bộ môn: {currentTeacher.subject}</span>
                </div>
              </div>
              {onLogoutTeacher && (
                <button
                  type="button"
                  onClick={onLogoutTeacher}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Đổi tài khoản hoặc đăng xuất"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => onLaunchStudentExam()}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mở Giao Diện Học Sinh Thi</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('classes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'classes'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <School className="w-4 h-4 text-indigo-400" />
          <span>1. Lớp Học & Phòng Thi ({classes.length})</span>
        </button>

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
          <span>2. Giám Thị Trực Tiếp (Live)</span>
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
          <span>3. Ngân Hàng Đề ({bank.length})</span>
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
          <span>4. Cấu Hình Đề Chung (PDF / Bank)</span>
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
          <span>5. Bảng Điểm & Kết Quả ({submissions.length})</span>
        </button>

        {isAdmin && (
          <button
            type="button"
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'teachers'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 hover:bg-purple-50 text-purple-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>6. Phân Quyền Giáo Viên (Admin)</span>
          </button>
        )}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'classes' && (
          <ClassManagementTab
            classes={classes}
            config={config}
            bank={bank}
            currentTeacher={currentTeacher}
            onSaveClass={onSaveClass}
            onDeleteClass={onDeleteClass}
            onLaunchClassExam={(c) => onLaunchStudentExam(c)}
            onViewClassSubmissions={(_classCode) => {
              setActiveTab('gradebook');
            }}
          />
        )}
        {activeTab === 'live' && <LiveProctoringTab />}
        {activeTab === 'bank' && (
          <QuestionBankTab questions={bank} onUpdateQuestions={onUpdateBank} />
        )}
        {activeTab === 'config' && (
          <ExamConfigTab
            config={config}
            bank={bank}
            onSaveConfig={onUpdateConfig}
            onLaunchExamMode={() => onLaunchStudentExam()}
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
        {activeTab === 'teachers' && isAdmin && (
          <TeacherManagementTab
            currentTeacher={currentTeacher}
            onSwitchTeacher={onSwitchTeacher}
          />
        )}
      </div>
    </div>
  );
};
