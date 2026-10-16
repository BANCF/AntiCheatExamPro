import React, { useState, useEffect, useCallback } from 'react';
import {
  Question,
  ExamConfig,
  SubmissionRecord,
  SanitizedQuestion,
  StudentAnswers,
  SubmissionStatus,
  ViolationLog,
  ExamSessionState
} from './types/exam';
import {
  getStoredQuestionBank,
  saveQuestionBank,
  getStoredExamConfig,
  saveExamConfig,
  getStoredSubmissions,
  addSubmission,
  saveSubmissions,
  getStoredActiveSession,
  saveActiveSession,
  clearActiveSession
} from './utils/storage';
import { generateStudentExam, buildSubmissionRecord } from './utils/randomEngine';
import { TeacherConsole } from './components/teacher/TeacherConsole';
import { ExamLobby } from './components/student/ExamLobby';
import { ExamRunner } from './components/student/ExamRunner';
import { ExamCompleted } from './components/student/ExamCompleted';
import { TeacherLoginModal } from './components/teacher/TeacherLoginModal';
import { Shield, GraduationCap, School, Lock, LogOut, KeyRound } from 'lucide-react';

export function App() {
  // Global Data States
  const [bank, setBank] = useState<Question[]>(getStoredQuestionBank);
  const [config, setConfig] = useState<ExamConfig>(getStoredExamConfig);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(getStoredSubmissions);

  // Active View Mode: 'student' by default for security!
  const [appMode, setAppMode] = useState<'teacher' | 'student'>('student');
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('anticheat_teacher_logged') === 'true';
  });
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState<boolean>(false);

  // Student Flow States: 'lobby' | 'running' | 'completed'
  const [studentFlow, setStudentFlow] = useState<'lobby' | 'running' | 'completed'>('lobby');

  // Active Student Exam Session State
  const [currentSession, setCurrentSession] = useState<{
    attemptId: string;
    studentName: string;
    studentClass: string;
    assignedCode: string;
    seed: number;
    sanitizedQuestions: SanitizedQuestion[];
    pickedOriginalQuestions: Question[];
    answers: StudentAnswers;
    durationSeconds: number;
    remainingSeconds: number;
    startTime: string;
    violationsLog: ViolationLog[];
    violationCount: number;
  } | null>(null);

  // Completed receipt state
  const [completedReceipt, setCompletedReceipt] = useState<{
    studentName: string;
    studentClass: string;
    assignedCode: string;
    status: SubmissionStatus;
    submissionId: string;
    submitTime: string;
  } | null>(null);

  // Sync state to local storage when changed
  const handleUpdateBank = (newBank: Question[]) => {
    setBank(newBank);
    saveQuestionBank(newBank);
  };

  const handleUpdateConfig = (newConfig: ExamConfig) => {
    setConfig(newConfig);
    saveExamConfig(newConfig);
  };

  const handleClearSubmissions = () => {
    setSubmissions([]);
    saveSubmissions([]);
  };

  // Add realistic mock submissions for quick teacher evaluation
  const handleAddSampleSubmissions = () => {
    const mock1: SubmissionRecord = {
      submission_id: `sub_demo_101_${Date.now()}`,
      student_name: 'Trần Thị Mai',
      student_class: '10A1',
      assigned_code: '102',
      start_time: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      submit_time: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      status: 'SUBMITTED',
      violation_count: 0,
      violations_log: [],
      student_answers: { q1: 'opt_1_1', q2: 'opt_2_1' },
      calculated_score: 9.5,
      total_questions: 10,
      correct_points_earned: 9.5,
      max_possible_points: 10
    };

    const mock2: SubmissionRecord = {
      submission_id: `sub_demo_102_${Date.now()}`,
      student_name: 'Lê Hoàng Nam',
      student_class: '10A1',
      assigned_code: '105',
      start_time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      submit_time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: 'SUBMITTED',
      violation_count: 1,
      violations_log: [
        {
          id: 'v_demo_1',
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
          type: 'TAB_SWITCH',
          duration: 3,
          note: 'Chuyển tab trình duyệt'
        }
      ],
      student_answers: { q1: 'opt_1_1' },
      calculated_score: 7.25,
      total_questions: 10,
      correct_points_earned: 7.25,
      max_possible_points: 10
    };

    const mock3: SubmissionRecord = {
      submission_id: `sub_demo_103_${Date.now()}`,
      student_name: 'Nguyễn Văn Đạt',
      student_class: '10A2',
      assigned_code: '108',
      start_time: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      submit_time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      status: 'FORCE_SUBMITTED',
      violation_count: 3,
      violations_log: [
        {
          id: 'v_demo_2',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          type: 'TAB_SWITCH',
          duration: 6,
          note: 'Chuyển tab tra cứu đáp án'
        },
        {
          id: 'v_demo_3',
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          type: 'SHORTCUT_ATTEMPT',
          note: 'Cố tình bấm chuột phải contextmenu'
        },
        {
          id: 'v_demo_4',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          type: 'DEVTOOLS',
          note: 'Bấm phím F12 mở Developer Tools'
        }
      ],
      student_answers: { q1: 'opt_1_2' },
      calculated_score: 4.5,
      total_questions: 10,
      correct_points_earned: 4.5,
      max_possible_points: 10
    };

    const updated = [mock1, mock2, mock3, ...submissions];
    setSubmissions(updated);
    saveSubmissions(updated);
  };

  // Check URL parameters for direct exam link (?mode=exam or ?mode=teacher)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'teacher') {
      if (sessionStorage.getItem('anticheat_teacher_logged') === 'true') {
        setAppMode('teacher');
      } else {
        setIsTeacherLoginOpen(true);
      }
    } else {
      // Default to student room
      setAppMode('student');
    }
  }, []);

  const handleTeacherLoginSuccess = () => {
    setIsTeacherAuthenticated(true);
    sessionStorage.setItem('anticheat_teacher_logged', 'true');
    setIsTeacherLoginOpen(false);
    setAppMode('teacher');
  };

  const handleTeacherLogout = () => {
    setIsTeacherAuthenticated(false);
    sessionStorage.removeItem('anticheat_teacher_logged');
    setAppMode('student');
    setStudentFlow('lobby');
  };

  // Restore active student session on reload if exists
  useEffect(() => {
    const active = getStoredActiveSession();
    if (active && !active.is_submitted) {
      // Re-sample or reconstruct pickedOriginalQuestions for scoring
      const examGen = generateStudentExam(active.seed, bank, config);
      setCurrentSession({
        attemptId: active.attempt_id,
        studentName: active.student_name,
        studentClass: active.student_class,
        assignedCode: active.assigned_code,
        seed: active.seed,
        sanitizedQuestions: active.questions,
        pickedOriginalQuestions: examGen.pickedOriginalQuestions,
        answers: active.answers,
        durationSeconds: active.duration_seconds,
        remainingSeconds: active.remaining_seconds,
        startTime: active.start_time,
        violationsLog: active.violations_log,
        violationCount: active.violation_count
      });
      setStudentFlow('running');
      setAppMode('student');
    }
  }, [bank, config]);

  // Start Exam Handler
  const handleStartExam = (studentName: string, studentClass: string) => {
    const seed = Date.now();
    const { sanitizedQuestions, pickedOriginalQuestions, assignedCode } = generateStudentExam(
      seed,
      bank,
      config
    );

    const durationSeconds = config.duration_minutes * 60;
    const startTime = new Date().toISOString();
    const attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const sessionData = {
      attemptId,
      studentName,
      studentClass,
      assignedCode,
      seed,
      sanitizedQuestions,
      pickedOriginalQuestions,
      answers: {},
      durationSeconds,
      remainingSeconds: durationSeconds,
      startTime,
      violationsLog: [],
      violationCount: 0
    };

    setCurrentSession(sessionData);

    // Save initial session to localStorage
    const storableSession: ExamSessionState = {
      attempt_id: attemptId,
      assigned_code: assignedCode,
      seed,
      student_name: studentName,
      student_class: studentClass,
      questions: sanitizedQuestions,
      answers: {},
      start_time: startTime,
      duration_seconds: durationSeconds,
      remaining_seconds: durationSeconds,
      violation_count: 0,
      violations_log: [],
      is_submitted: false,
      exam_id: config.exam_id
    };
    saveActiveSession(storableSession);

    // Enter fullscreen if supported
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {
      // Ignore if browser restricts
    }

    setStudentFlow('running');
  };

  // Progress auto-save callback
  const handleSaveProgress = useCallback(
    (
      answers: StudentAnswers,
      remainingSeconds: number,
      logs: ViolationLog[],
      violationsCount: number
    ) => {
      if (!currentSession) return;
      const storableSession: ExamSessionState = {
        attempt_id: currentSession.attemptId,
        assigned_code: currentSession.assignedCode,
        seed: currentSession.seed,
        student_name: currentSession.studentName,
        student_class: currentSession.studentClass,
        questions: currentSession.sanitizedQuestions,
        answers,
        start_time: currentSession.startTime,
        duration_seconds: currentSession.durationSeconds,
        remaining_seconds: remainingSeconds,
        violation_count: violationsCount,
        violations_log: logs,
        is_submitted: false,
        exam_id: config.exam_id
      };
      saveActiveSession(storableSession);
    },
    [currentSession, config.exam_id]
  );

  // Submit Exam Handler
  const handleSubmitExam = (
    answers: StudentAnswers,
    status: SubmissionStatus,
    finalLogs: ViolationLog[]
  ) => {
    if (!currentSession) return;

    const submitTime = new Date().toISOString();

    // Score the exam on teacher/protected side
    const record = buildSubmissionRecord({
      studentName: currentSession.studentName,
      studentClass: currentSession.studentClass,
      assignedCode: currentSession.assignedCode,
      startTime: currentSession.startTime,
      submitTime,
      status,
      violationCount: finalLogs.length,
      violationsLog: finalLogs,
      studentAnswers: answers,
      originalQuestions: currentSession.pickedOriginalQuestions
    });

    // Save to submissions
    const updatedSubmissions = addSubmission(record);
    setSubmissions(updatedSubmissions);

    // Clear active session from localStorage
    clearActiveSession();

    // Exit fullscreen if still in fullscreen
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {}

    // Prepare receipt (NEVER include score or correct answers)
    setCompletedReceipt({
      studentName: currentSession.studentName,
      studentClass: currentSession.studentClass,
      assignedCode: currentSession.assignedCode,
      status,
      submissionId: record.submission_id,
      submitTime
    });

    setCurrentSession(null);
    setStudentFlow('completed');
  };

  // Exit from completed view
  const handleExitCompleted = () => {
    setCompletedReceipt(null);
    setStudentFlow('lobby');
    setAppMode('teacher');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Top Navigation Bar (Hidden during running exam to maintain strict anti-cheat focus) */}
      {studentFlow !== 'running' && (
        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
                  AntiCheat Exam Pro
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-mono font-normal">
                    v2.0
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">
                  Hệ thống kiểm tra trực tuyến chống gian lận
                </span>
              </div>
            </div>

            {/* Role / Access Control */}
            {appMode === 'teacher' ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Giáo Viên Đã Đăng Nhập
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAppMode('student');
                    setStudentFlow('lobby');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Phòng thi Học sinh</span>
                </button>
                <button
                  type="button"
                  onClick={handleTeacherLogout}
                  title="Đăng xuất khỏi bảng điều khiển giáo viên"
                  className="p-1.5 px-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-rose-500/20 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              /* Student mode: Only show lock button if teacher wants to log in */
              <button
                type="button"
                onClick={() => {
                  if (isTeacherAuthenticated) {
                    setAppMode('teacher');
                  } else {
                    setIsTeacherLoginOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-medium cursor-pointer transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Khu Vực Giáo Viên</span>
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Main Content Router */}
      <div className="flex-1 flex flex-col">
        {appMode === 'teacher' ? (
          <TeacherConsole
            bank={bank}
            config={config}
            submissions={submissions}
            onUpdateBank={handleUpdateBank}
            onUpdateConfig={handleUpdateConfig}
            onClearSubmissions={handleClearSubmissions}
            onAddSampleSubmissions={handleAddSampleSubmissions}
            onLaunchStudentExam={() => {
              setAppMode('student');
              setStudentFlow('lobby');
            }}
          />
        ) : (
          <>
            {studentFlow === 'lobby' && (
              <ExamLobby config={config} onStartExam={handleStartExam} />
            )}

            {studentFlow === 'running' && currentSession && (
              <ExamRunner
                config={config}
                attemptId={currentSession.attemptId}
                studentName={currentSession.studentName}
                studentClass={currentSession.studentClass}
                assignedCode={currentSession.assignedCode}
                questions={currentSession.sanitizedQuestions}
                initialAnswers={currentSession.answers}
                durationSeconds={currentSession.durationSeconds}
                initialRemainingSeconds={currentSession.remainingSeconds}
                startTime={currentSession.startTime}
                onSubmit={handleSubmitExam}
                onSaveProgress={handleSaveProgress}
              />
            )}

            {studentFlow === 'completed' && completedReceipt && (
              <ExamCompleted
                studentName={completedReceipt.studentName}
                studentClass={completedReceipt.studentClass}
                assignedCode={completedReceipt.assignedCode}
                status={completedReceipt.status}
                submissionId={completedReceipt.submissionId}
                submitTime={completedReceipt.submitTime}
                onExit={handleExitCompleted}
              />
            )}
          </>
        )}
      </div>

      {/* Footer (Hidden during exam) */}
      {studentFlow !== 'running' && (
        <footer className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
          <p>© 2026 AntiCheat Exam Pro • Hệ thống bảo mật & ngẫu nhiên hóa đề thi trực tuyến</p>
        </footer>
      )}

      {/* Teacher Authentication Gatekeeper Modal */}
      {isTeacherLoginOpen && (
        <TeacherLoginModal
          correctPassword={config.teacher_password || 'admin2026'}
          onSuccess={handleTeacherLoginSuccess}
          onCancel={() => setIsTeacherLoginOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
