import React, { useState, useEffect, useCallback } from 'react';
import {
  Question,
  ExamConfig,
  SubmissionRecord,
  SanitizedQuestion,
  StudentAnswers,
  SubmissionStatus,
  ViolationLog,
  ExamSessionState,
  TeacherAccount,
  ClassRoom
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
  clearActiveSession,
  getStoredClasses,
  saveStoredClasses
} from './utils/storage';
import { generateAllExamVariants, generateStudentExam, buildSubmissionRecord } from './utils/randomEngine';
import { TeacherConsole } from './components/teacher/TeacherConsole';
import { ExamLobby } from './components/student/ExamLobby';
import { ExamRunner } from './components/student/ExamRunner';
import { ExamCompleted } from './components/student/ExamCompleted';
import { TeacherLoginModal } from './components/teacher/TeacherLoginModal';
import { Shield, GraduationCap, Lock, LogOut } from 'lucide-react';
import {
  fetchQuestionBank,
  saveQuestionBankApi,
  fetchExamConfig,
  saveExamConfigApi,
  fetchSubmissionsApi,
  clearSubmissionsApi,
  deleteSubmissionApi,
  deduplicateSubmissionsApi,
  startStudentExamApi,
  submitStudentExamApi,
  fetchClassesApi,
  saveClassApi,
  deleteClassApi
} from './services/api';
import { getSocket } from './services/socket';

export function App() {
  // Global Data States
  const [bank, setBank] = useState<Question[]>(getStoredQuestionBank);
  const [config, setConfig] = useState<ExamConfig>(getStoredExamConfig);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(getStoredSubmissions);
  const [classes, setClasses] = useState<ClassRoom[]>(getStoredClasses);
  const [targetClassCode, setTargetClassCode] = useState<string>('');

  // Active View Mode: persists across page refresh (F5)
  const [appMode, setAppMode] = useState<'teacher' | 'student'>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('class')) return 'student';
    const isTeacher = sessionStorage.getItem('anticheat_teacher_logged') === 'true';
    const savedMode = sessionStorage.getItem('anticheat_app_mode');
    if (params.get('mode') === 'teacher' || (isTeacher && savedMode === 'teacher')) {
      return 'teacher';
    }
    return 'student';
  });
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('anticheat_teacher_logged') === 'true';
  });
  const [currentTeacher, setCurrentTeacher] = useState<TeacherAccount | null>(() => {
    try {
      const saved = sessionStorage.getItem('anticheat_teacher_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
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
    examId?: string;
    examTitle?: string;
    effectiveConfig?: ExamConfig;
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

  // Fetch initial data from backend API
  useEffect(() => {
    fetchQuestionBank().then((serverBank) => {
      if (serverBank && serverBank.length > 0) {
        setBank(serverBank);
        saveQuestionBank(serverBank);
      }
    });

    fetchExamConfig().then((serverConfig) => {
      if (serverConfig && serverConfig.title) {
        setConfig(serverConfig);
        saveExamConfig(serverConfig);
      }
    });

    fetchSubmissionsApi().then((serverSubmissions) => {
      if (serverSubmissions && Array.isArray(serverSubmissions) && serverSubmissions.length > 0) {
        setSubmissions((prev) => {
          const map = new Map<string, SubmissionRecord>();
          prev.forEach((s) => map.set(s.submission_id, s));
          serverSubmissions.forEach((s) => map.set(s.submission_id, s));
          const merged = Array.from(map.values());
          saveSubmissions(merged);
          return merged;
        });
      }
    });

    fetchClassesApi().then((serverClasses) => {
      if (serverClasses && Array.isArray(serverClasses) && serverClasses.length > 0) {
        setClasses(serverClasses);
        saveStoredClasses(serverClasses);
      }
    });
  }, []);

  // Real-time listener for submissions from remote students
  useEffect(() => {
    const socket = getSocket();
    const handleRemoteSubmitted = ({ submission }: { submission: SubmissionRecord }) => {
      setSubmissions((prev) => {
        const filtered = prev.filter((s) => s.submission_id !== submission.submission_id);
        const updated = [submission, ...filtered];
        saveSubmissions(updated);
        return updated;
      });
    };

    socket.on('student:submitted', handleRemoteSubmitted);
    return () => {
      socket.off('student:submitted', handleRemoteSubmitted);
    };
  }, []);

  // Sync state to local storage and server when changed
  const handleUpdateBank = (newBank: Question[]) => {
    setBank(newBank);
    saveQuestionBank(newBank);
    saveQuestionBankApi(newBank);
  };

  const handleUpdateConfig = (newConfig: ExamConfig) => {
    setConfig(newConfig);
    saveExamConfig(newConfig);
    saveExamConfigApi(newConfig);
  };

  const handleClearSubmissions = () => {
    setSubmissions([]);
    saveSubmissions([]);
    clearSubmissionsApi();
  };

  const handleDeleteSubmission = (submissionId: string) => {
    setSubmissions((prev) => {
      const updated = prev.filter((s) => s.submission_id !== submissionId);
      saveSubmissions(updated);
      return updated;
    });
    deleteSubmissionApi(submissionId);
  };

  const handleDeduplicateSubmissions = async () => {
    const seen = new Set<string>();
    const unique: SubmissionRecord[] = [];
    const sorted = [...submissions].sort(
      (a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime()
    );
    for (const sub of sorted) {
      const key = `${sub.student_name.trim().toLowerCase()}_${sub.student_class.trim().toLowerCase()}_${sub.assigned_code}_${sub.exam_id || 'def'}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(sub);
      }
    }
    setSubmissions(unique);
    saveSubmissions(unique);
    await deduplicateSubmissionsApi();
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

  // Check URL parameters for direct exam link (?mode=exam or ?mode=teacher or ?class=7A1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const classParam = params.get('class');
    if (classParam) {
      setTargetClassCode(classParam.trim().toUpperCase());
      setAppMode('student');
      sessionStorage.setItem('anticheat_app_mode', 'student');
      setStudentFlow('lobby');
    } else if (params.get('mode') === 'teacher' || sessionStorage.getItem('anticheat_app_mode') === 'teacher') {
      if (sessionStorage.getItem('anticheat_teacher_logged') === 'true') {
        setAppMode('teacher');
      } else {
        setIsTeacherLoginOpen(true);
      }
    }
  }, []);

  const handleSaveClass = (classItem: ClassRoom) => {
    setClasses((prev) => {
      const idx = prev.findIndex((c) => c.id === classItem.id || c.code.toUpperCase() === classItem.code.toUpperCase());
      const updated = idx >= 0 ? prev.map((c, i) => (i === idx ? classItem : c)) : [...prev, classItem];
      saveStoredClasses(updated);
      return updated;
    });
    saveClassApi(classItem);
  };

  const handleDeleteClass = (classId: string) => {
    setClasses((prev) => {
      const updated = prev.filter((c) => c.id !== classId && c.code !== classId);
      saveStoredClasses(updated);
      return updated;
    });
    deleteClassApi(classId);
  };

  const handleTeacherLoginSuccess = (teacher: TeacherAccount) => {
    setCurrentTeacher(teacher);
    setIsTeacherAuthenticated(true);
    sessionStorage.setItem('anticheat_teacher_logged', 'true');
    sessionStorage.setItem('anticheat_teacher_profile', JSON.stringify(teacher));
    sessionStorage.setItem('anticheat_app_mode', 'teacher');
    setIsTeacherLoginOpen(false);
    setAppMode('teacher');
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', 'teacher');
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  // Join teacher realtime monitoring room whenever in teacher console
  useEffect(() => {
    if (appMode === 'teacher' && isTeacherAuthenticated) {
      const socket = getSocket();
      socket.emit('teacher:join');
    }
  }, [appMode, isTeacherAuthenticated]);

  const handleTeacherLogout = () => {
    setCurrentTeacher(null);
    setIsTeacherAuthenticated(false);
    sessionStorage.removeItem('anticheat_teacher_logged');
    sessionStorage.removeItem('anticheat_teacher_profile');
    sessionStorage.removeItem('anticheat_app_mode');
    setAppMode('student');
    setStudentFlow('lobby');
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('mode');
      window.history.replaceState({}, '', url.toString());
    } catch {}
  };

  const handleSwitchTeacher = (teacher: TeacherAccount) => {
    setCurrentTeacher(teacher);
    sessionStorage.setItem('anticheat_teacher_profile', JSON.stringify(teacher));
  };

  // Restore active student session on reload if exists
  useEffect(() => {
    const active = getStoredActiveSession();
    if (active && !active.is_submitted) {
      // Find matching variant or reconstruct with exact seed & assigned code
      const allVariants = generateAllExamVariants(bank, config);
      const matched = allVariants.find((v) => v.assignedCode === active.assigned_code);
      const examGen = matched || generateStudentExam(active.seed, bank, config, active.assigned_code);

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

  // Start Exam Handler - Connects to Server for Random Variant (or fallbacks locally)
  const handleStartExam = async (
    studentName: string,
    studentClass: string,
    pin: string,
    matchedClass?: ClassRoom
  ) => {
    const effectiveConfig: ExamConfig = matchedClass?.examConfig
      ? {
          ...config,
          ...matchedClass.examConfig,
          title: matchedClass.examTitle || config.title,
          duration_minutes: matchedClass.examConfig.duration_minutes || config.duration_minutes
        }
      : {
          ...config,
          title: matchedClass?.examTitle || config.title
        };

    // 1. Try starting via Backend Server
    const serverSession = await startStudentExamApi({
      studentName,
      studentClass,
      pin
    });

    if (serverSession && (serverSession as any).error) {
      alert((serverSession as any).error);
      return;
    }

    let attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    let assignedCode = '101';
    let seed = 2026;
    let sanitizedQuestions: SanitizedQuestion[] = [];
    let pickedOriginalQuestions: Question[] = [];
    let durationSeconds = effectiveConfig.duration_minutes * 60;
    let remainingSeconds = durationSeconds;
    let startTime = new Date().toISOString();

    if (serverSession && !serverSession.error) {
      attemptId = serverSession.attemptId;
      assignedCode = serverSession.assignedCode;
      sanitizedQuestions = serverSession.sanitizedQuestions;
      durationSeconds = serverSession.durationSeconds;
      remainingSeconds = serverSession.remainingSeconds !== undefined ? serverSession.remainingSeconds : durationSeconds;
      startTime = serverSession.startTime;
    } else {
      // Offline fallback: generate locally using effectiveConfig
      if (effectiveConfig.exam_mode === 'pdf') {
        const totalQ = effectiveConfig.pdf_total_questions || (effectiveConfig.pdf_answer_key ? Object.keys(effectiveConfig.pdf_answer_key).length : 40);
        assignedCode = String(100 + Math.floor(Math.random() * 15));
        sanitizedQuestions = Array.from({ length: totalQ }, (_, i) => ({
          id: String(i + 1),
          type: 'single_choice' as const,
          prompt: `Câu ${i + 1}`,
          tags: [effectiveConfig.target_subject || 'Đề PDF'],
          options: [
            { id: 'A', text: 'A' },
            { id: 'B', text: 'B' },
            { id: 'C', text: 'C' },
            { id: 'D', text: 'D' }
          ]
        }));
        pickedOriginalQuestions = sanitizedQuestions;
      } else {
        const variants = generateAllExamVariants(bank, effectiveConfig);
        const pickedVariant = variants[Math.floor(Math.random() * variants.length)];
        assignedCode = pickedVariant.assignedCode;
        seed = pickedVariant.seed;
        sanitizedQuestions = pickedVariant.sanitizedQuestions;
        pickedOriginalQuestions = pickedVariant.pickedOriginalQuestions;
      }
    }

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
      remainingSeconds,
      startTime,
      violationsLog: [],
      violationCount: 0,
      examId: matchedClass?.id || config.exam_id,
      examTitle: matchedClass?.examTitle || config.title,
      effectiveConfig
    };

    setCurrentSession(sessionData);

    // Save initial session to localStorage for reload recovery
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
      remaining_seconds: remainingSeconds,
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

  // Submit Exam Handler - Submits to Backend Server and shows receipt
  const handleSubmitExam = async (
    answers: StudentAnswers,
    status: SubmissionStatus,
    finalLogs: ViolationLog[]
  ) => {
    if (!currentSession) return;

    const submitTime = new Date().toISOString();
    let submissionId = `sub_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const effectiveCfg = currentSession.effectiveConfig || config;

    // Build the complete submission record locally IMMEDIATELY
    const record = buildSubmissionRecord({
      submissionId,
      studentName: currentSession.studentName,
      studentClass: currentSession.studentClass,
      assignedCode: currentSession.assignedCode,
      startTime: currentSession.startTime,
      submitTime,
      status,
      violationCount: finalLogs.length,
      violationsLog: finalLogs,
      studentAnswers: answers,
      originalQuestions: currentSession.pickedOriginalQuestions.length > 0 ? currentSession.pickedOriginalQuestions : bank,
      examId: currentSession.examId || effectiveCfg.exam_id,
      examTitle: currentSession.examTitle || effectiveCfg.title,
      config: effectiveCfg
    });

    // Save locally immediately to guarantee it is NEVER lost
    const updatedSubmissions = addSubmission(record);
    setSubmissions(updatedSubmissions);

    // Call Backend API to register submission on server if available
    try {
      const apiResult = await submitStudentExamApi({
        attemptId: currentSession.attemptId,
        studentName: currentSession.studentName,
        studentClass: currentSession.studentClass,
        assignedCode: currentSession.assignedCode,
        answers,
        status,
        violationsLog: finalLogs,
        submissionRecord: record
      });

      if (apiResult && apiResult.submission_id) {
        submissionId = apiResult.submission_id;
        if (submissionId !== record.submission_id) {
          record.submission_id = submissionId;
          const currentList = getStoredSubmissions().filter((s) => s.submission_id !== record.submission_id);
          saveSubmissions([record, ...currentList]);
        }
      }
    } catch (err) {
      console.warn('Backend submit sync failed, preserved locally:', err);
    }

    // Refresh and merge submissions from server to update gradebook
    fetchSubmissionsApi().then((serverSubmissions) => {
      if (serverSubmissions && Array.isArray(serverSubmissions) && serverSubmissions.length > 0) {
        setSubmissions((prev) => {
          const map = new Map<string, SubmissionRecord>();
          const seenKey = new Set<string>();
          const all = [...prev, ...serverSubmissions];
          all.sort((a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime());
          const deduped: SubmissionRecord[] = [];
          for (const s of all) {
            const key = `${s.student_name.trim().toLowerCase()}_${s.student_class.trim().toLowerCase()}_${s.assigned_code}`;
            if (!seenKey.has(key) && !map.has(s.submission_id)) {
              seenKey.add(key);
              map.set(s.submission_id, s);
              deduped.push(s);
            }
          }
          saveSubmissions(deduped);
          return deduped;
        });
      }
    });

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
      submissionId,
      submitTime
    });

    setCurrentSession(null);
    setStudentFlow('completed');
  };

  // Exit from completed view - ALWAYS return to student lobby for security!
  const handleExitCompleted = () => {
    setCompletedReceipt(null);
    setStudentFlow('lobby');
    setAppMode('student');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation Bar (Hidden during running exam to maintain strict anti-cheat focus) */}
      {studentFlow !== 'running' && (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                  AntiCheat Exam Pro
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono font-medium">
                    v2.1
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 block -mt-0.5">
                  Hệ thống kiểm tra trực tuyến chống gian lận
                </span>
              </div>
            </div>

            {/* Role / Access Control */}
            {appMode === 'teacher' && isTeacherAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Giáo Viên Đã Đăng Nhập
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAppMode('student');
                    sessionStorage.setItem('anticheat_app_mode', 'student');
                    setStudentFlow('lobby');
                    try {
                      const url = new URL(window.location.href);
                      url.searchParams.delete('mode');
                      window.history.replaceState({}, '', url.toString());
                    } catch {}
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-200"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Phòng thi Học sinh</span>
                </button>
                <button
                  type="button"
                  onClick={handleTeacherLogout}
                  title="Đăng xuất khỏi bảng điều khiển giáo viên"
                  className="p-1.5 px-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-rose-200 transition-colors"
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
                    sessionStorage.setItem('anticheat_app_mode', 'teacher');
                    try {
                      const url = new URL(window.location.href);
                      url.searchParams.set('mode', 'teacher');
                      window.history.replaceState({}, '', url.toString());
                    } catch {}
                  } else {
                    setIsTeacherLoginOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium cursor-pointer transition-colors shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Khu Vực Giáo Viên</span>
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Main Content Router */}
      <div className="flex-1 flex flex-col">
        {appMode === 'teacher' && isTeacherAuthenticated ? (
          <TeacherConsole
            bank={bank}
            config={config}
            submissions={submissions}
            classes={classes}
            currentTeacher={currentTeacher}
            onUpdateBank={handleUpdateBank}
            onUpdateConfig={handleUpdateConfig}
            onSaveClass={handleSaveClass}
            onDeleteClass={handleDeleteClass}
            onClearSubmissions={handleClearSubmissions}
            onDeleteSubmission={handleDeleteSubmission}
            onDeduplicateSubmissions={handleDeduplicateSubmissions}
            onAddSampleSubmissions={handleAddSampleSubmissions}
            onLaunchStudentExam={(classItem) => {
              if (classItem) {
                setTargetClassCode(classItem.code);
              }
              setAppMode('student');
              sessionStorage.setItem('anticheat_app_mode', 'student');
              setStudentFlow('lobby');
              try {
                const url = new URL(window.location.href);
                url.searchParams.delete('mode');
                if (classItem) url.searchParams.set('class', classItem.code);
                window.history.replaceState({}, '', url.toString());
              } catch {}
            }}
            onLogoutTeacher={handleTeacherLogout}
            onSwitchTeacher={handleSwitchTeacher}
          />
        ) : (
          <>
            {studentFlow === 'lobby' && (
              <ExamLobby
                config={config}
                classes={classes}
                initialClassCode={targetClassCode}
                onStartExam={handleStartExam}
              />
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
          onSuccess={handleTeacherLoginSuccess}
          onCancel={() => setIsTeacherLoginOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
