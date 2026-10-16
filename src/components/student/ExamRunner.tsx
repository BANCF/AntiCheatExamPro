import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  SanitizedQuestion,
  SanitizedSingleChoiceQuestion,
  SanitizedTrueFalseQuestion,
  StudentAnswers,
  ExamConfig,
  ViolationLog,
  SubmissionStatus
} from '../../types/exam';
import { useAntiCheat } from '../../hooks/useAntiCheat';
import { getSocket } from '../../services/socket';
import {
  Clock,
  ShieldAlert,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Send,
  Maximize2,
  CheckCircle,
  HelpCircle,
  ListOrdered,
  BellRing,
  Sparkles,
  Lock,
  Megaphone
} from 'lucide-react';

interface ExamRunnerProps {
  config: ExamConfig;
  attemptId: string;
  studentName: string;
  studentClass: string;
  assignedCode: string;
  questions: SanitizedQuestion[];
  initialAnswers?: StudentAnswers;
  durationSeconds: number;
  initialRemainingSeconds?: number;
  startTime: string;
  onSubmit: (answers: StudentAnswers, status: SubmissionStatus, logs: ViolationLog[]) => void;
  onSaveProgress: (answers: StudentAnswers, remainingSeconds: number, logs: ViolationLog[], violationsCount: number) => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  config,
  attemptId,
  studentName,
  studentClass,
  assignedCode,
  questions,
  initialAnswers = {},
  durationSeconds,
  initialRemainingSeconds,
  onSubmit,
  onSaveProgress
}) => {
  const [answers, setAnswers] = useState<StudentAnswers>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    initialRemainingSeconds !== undefined ? initialRemainingSeconds : durationSeconds
  );
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState<boolean>(false);
  const [teacherMessage, setTeacherMessage] = useState<string | null>(null);
  const [timeBonusNotice, setTimeBonusNotice] = useState<string | null>(null);

  const [broadcastNotice, setBroadcastNotice] = useState<string | null>(null);

  // Auto Force Submit handler from anti-cheat hook
  const handleForceSubmit = useCallback(
    (finalLogs: ViolationLog[]) => {
      onSubmit(answers, 'FORCE_SUBMITTED', finalLogs);
    },
    [answers, onSubmit]
  );

  // Anti-cheat engine integration
  const {
    violationCount,
    violationsLog,
    isWarningModalOpen,
    currentWarning,
    dismissWarning,
    isFullscreen,
    requestFullscreen
  } = useAntiCheat({
    enabled: true,
    maxViolationsAllowed: config.max_violations_allowed,
    onForceSubmit: handleForceSubmit
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          onSubmit(answers, 'SUBMITTED', violationsLog);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, onSubmit, violationsLog]);

  // Connect to Socket.IO and register student session
  useEffect(() => {
    const socket = getSocket();
    socket.emit('student:register', {
      attemptId,
      studentName,
      studentClass,
      assignedCode
    });

    socket.on('teacher:message_received', ({ message }: { message: string }) => {
      setTeacherMessage(message);
    });

    socket.on('teacher:broadcast_received', ({ message }: { message: string }) => {
      setBroadcastNotice(message);
    });

    socket.on('teacher:time_added', ({ extraSeconds }: { extraSeconds: number }) => {
      setRemainingSeconds((prev) => prev + extraSeconds);
      setTimeBonusNotice(`Giám thị vừa cộng thêm ${Math.round(extraSeconds / 60)} phút vào bài thi của bạn!`);
      setTimeout(() => setTimeBonusNotice(null), 5000);
    });

    socket.on('teacher:force_terminate', ({ reason }: { reason: string }) => {
      alert(`BÀI THI BỊ ĐÌNH CHỈ: ${reason}`);
      onSubmit(answers, 'FORCE_SUBMITTED', violationsLog);
    });

    return () => {
      socket.off('teacher:message_received');
      socket.off('teacher:broadcast_received');
      socket.off('teacher:time_added');
      socket.off('teacher:force_terminate');
    };
  }, [attemptId, studentName, studentClass, assignedCode, answers, violationsLog, onSubmit]);

  // Real-time progress emit to teacher
  useEffect(() => {
    const socket = getSocket();
    const answeredCount = questions.filter((q) => isQuestionAnswered(q)).length;
    socket.emit('student:progress', {
      attemptId,
      currentQuestionIndex: currentIndex,
      answeredCount,
      remainingSeconds
    });
  }, [currentIndex, answers, remainingSeconds, attemptId, questions]);

  // Real-time violation emit to teacher
  const lastEmittedViolationRef = useRef(0);
  useEffect(() => {
    if (violationsLog.length > lastEmittedViolationRef.current) {
      const latest = violationsLog[violationsLog.length - 1];
      const socket = getSocket();
      socket.emit('student:violation', {
        attemptId,
        violation: latest
      });
      lastEmittedViolationRef.current = violationsLog.length;
    }
  }, [violationsLog, attemptId]);

  // Save progress periodically & on answers change
  useEffect(() => {
    onSaveProgress(answers, remainingSeconds, violationsLog, violationCount);
  }, [answers, remainingSeconds, violationsLog, violationCount, onSaveProgress]);

  // Format time MM:SS
  const formattedTime = useMemo(() => {
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, [remainingSeconds]);

  // Answer handler for Single Choice
  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Answer handler for True/False sub items
  const handleSelectTrueFalse = (questionId: string, subItemId: string, value: boolean) => {
    setAnswers((prev) => {
      const existing = (prev[questionId] as Record<string, boolean>) || {};
      return {
        ...prev,
        [questionId]: {
          ...existing,
          [subItemId]: value
        }
      };
    });
  };

  // Check if a question is answered
  const isQuestionAnswered = useCallback(
    (q: SanitizedQuestion): boolean => {
      const ans = answers[q.id];
      if (!ans) return false;
      if (q.type === 'single_choice') {
        return typeof ans === 'string' && ans.length > 0;
      }
      if (q.type === 'true_false') {
        const obj = ans as Record<string, boolean>;
        // Answered if every sub-item has a choice
        return q.items.every((item) => typeof obj[item.id] === 'boolean');
      }
      return false;
    },
    [answers]
  );

  // Total answered questions count
  const answeredCount = useMemo(() => {
    return questions.filter((q) => isQuestionAnswered(q)).length;
  }, [questions, isQuestionAnswered]);

  const currentQuestion = questions[currentIndex];

  // Timer urgency style
  const timerColorClass = useMemo(() => {
    if (remainingSeconds < 60) return 'text-rose-700 animate-pulse bg-rose-50 border-rose-300';
    if (remainingSeconds < 300) return 'text-amber-800 bg-amber-50 border-amber-300';
    return 'text-indigo-700 bg-indigo-50 border-indigo-200';
  }, [remainingSeconds]);

  return (
    <div className="exam-secure-mode min-h-screen flex flex-col bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Info */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>{config.title}</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-mono font-semibold">
                  Mã đề: {assignedCode}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Thí sinh: <span className="text-slate-800 font-semibold">{studentName}</span> ({studentClass})
              </div>
            </div>
          </div>

          {/* Center & Right: Timer, Violation, Submit */}
          <div className="flex items-center gap-3">
            {/* Violation Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                violationCount === 0
                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                  : violationCount === 1
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                Vi phạm: {violationCount}/{config.max_violations_allowed}
              </span>
            </div>

            {/* Countdown Timer */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-bold ${timerColorClass}`}>
              <Clock className="w-4 h-4" />
              <span>{formattedTime}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setIsSubmitConfirmOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Exam Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 cols: Question Card */}
        <section className="lg:col-span-3 space-y-4">
          {currentQuestion && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
              {/* Question Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
                    Câu {currentIndex + 1} / {questions.length}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
                    {currentQuestion.type === 'single_choice'
                      ? 'Trắc nghiệm chọn 1 đáp án'
                      : 'Trắc nghiệm Đúng / Sai'}
                  </span>
                </div>
                {currentQuestion.tags && currentQuestion.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {currentQuestion.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Question Prompt */}
              <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed mb-6">
                {currentQuestion.prompt}
              </div>

              {/* Options Section */}
              {currentQuestion.type === 'single_choice' ? (
                // Single Choice A-B-C-D
                <div className="space-y-3">
                  {(currentQuestion as SanitizedSingleChoiceQuestion).options.map((opt, optIndex) => {
                    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                    const letter = letters[optIndex] || String(optIndex + 1);
                    const isSelected = answers[currentQuestion.id] === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 group cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50/90 border-indigo-600 shadow-sm text-indigo-950 font-medium ring-1 ring-indigo-500'
                            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm pt-0.5 leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                // True / False Sub-Items
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 mb-2 italic">
                    Chọn Đúng hoặc Sai cho từng nhận định dưới đây:
                  </div>
                  {(currentQuestion as SanitizedTrueFalseQuestion).items.map((item, itemIdx) => {
                    const subLetters = ['a', 'b', 'c', 'd', 'e'];
                    const subLetter = subLetters[itemIdx] || `${itemIdx + 1}`;
                    const currentAnsObj = (answers[currentQuestion.id] as Record<string, boolean>) || {};
                    const selectedValue = currentAnsObj[item.id];

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-2.5 flex-1">
                          <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {subLetter})
                          </span>
                          <span className="text-sm text-slate-800 leading-relaxed font-medium">{item.text}</span>
                        </div>

                        {/* True / False Toggle Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleSelectTrueFalse(currentQuestion.id, item.id, true)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              selectedValue === true
                                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500'
                                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            ĐÚNG
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSelectTrueFalse(currentQuestion.id, item.id, false)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              selectedValue === false
                                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500'
                                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            SAI
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Prev / Next Navigation Footer */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                <div className="text-xs text-slate-500 font-mono">
                  {isQuestionAnswered(currentQuestion) ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-sans font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" /> Đã trả lời
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1 font-sans">
                      <HelpCircle className="w-3.5 h-3.5" /> Chưa trả lời
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (currentIndex === questions.length - 1) {
                      setIsSubmitConfirmOpen(true);
                    } else {
                      setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
                    }
                  }}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-white text-xs font-bold cursor-pointer transition-all shadow-sm ${
                    currentIndex === questions.length - 1
                      ? 'bg-emerald-600 hover:bg-emerald-700 ring-2 ring-emerald-400'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  <span>{currentIndex === questions.length - 1 ? 'Nộp bài thi' : 'Câu tiếp theo'}</span>
                  {currentIndex === questions.length - 1 ? (
                    <Send className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right 1 col: Question Matrix Navigator */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm sticky top-20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ListOrdered className="w-4 h-4 text-indigo-600" />
                <span>Danh Sách Câu Hỏi</span>
              </div>
              <span className="text-xs font-mono text-indigo-600 font-bold">
                {answeredCount}/{questions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>

            {/* Grid Matrix of Buttons */}
            <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const answered = isQuestionAnswered(q);
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg font-bold text-xs transition-all flex items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-indigo-600 font-extrabold scale-105 shadow-sm'
                        : ''
                    } ${
                      answered
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-around text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300" />
                <span>Đã làm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-white border border-slate-300" />
                <span>Chưa làm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded ring-2 ring-indigo-500 bg-white" />
                <span>Đang xem</span>
              </div>
            </div>

            {/* Big Unmissable Sidebar Submit Button */}
            <div className="mt-5 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsSubmitConfirmOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>NỘP BÀI THI</span>
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* ---------------- MODALS ---------------- */}

      {/* 1. Generic Violation Warning Modal */}
      {isWarningModalOpen && currentWarning && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-white border-2 border-rose-500 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">{currentWarning.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{currentWarning.message}</p>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              Cảnh báo: Nếu bạn vi phạm quá <strong>{config.max_violations_allowed} lần</strong>, bài thi sẽ bị hệ thống tự động khóa và thu ngay lập tức!
            </div>

            <button
              type="button"
              onClick={dismissWarning}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all cursor-pointer shadow-sm"
            >
              Tôi đã hiểu và tiếp tục làm bài
            </button>
          </div>
        </div>
      )}

      {/* 2. Submit Confirmation Modal (High z-index to guarantee clickability) */}
      {isSubmitConfirmOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl space-y-4 relative z-[101]">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              Xác Nhận Nộp Bài Thi
            </h2>

            <div className="space-y-2 text-sm text-slate-600">
              <p>Bạn có chắc chắn muốn kết thúc và nộp bài kiểm tra?</p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Số câu đã làm:</span>
                  <span className="font-bold text-emerald-600">
                    {answeredCount} / {questions.length} câu
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Số câu chưa chọn:</span>
                  <span className="font-bold text-rose-600">
                    {questions.length - answeredCount} câu
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian còn lại:</span>
                  <span className="font-mono text-slate-800 font-semibold">{formattedTime}</span>
                </div>
              </div>
              <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                Lưu ý: Sau khi nộp bài, bạn sẽ không thể quay lại làm tiếp hoặc chỉnh sửa đáp án!
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsSubmitConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                Làm tiếp
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitConfirmOpen(false);
                  onSubmit(answers, 'SUBMITTED', violationsLog);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-colors"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Direct Message from Teacher Modal */}
      {teacherMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-white border-2 border-indigo-500 shadow-2xl text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center mx-auto">
              <BellRing className="w-7 h-7 animate-bounce" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Tin Nhắn Từ Giám Thị Phòng Thi</h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium leading-relaxed">
              "{teacherMessage}"
            </div>
            <button
              type="button"
              onClick={() => setTeacherMessage(null)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              Tôi đã nhận được thông báo
            </button>
          </div>
        </div>
      )}

      {/* 4. Time Bonus Toast */}
      {timeBonusNotice && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{timeBonusNotice}</span>
        </div>
      )}

      {/* 5. Broadcast Announcement Modal */}
      {broadcastNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-white border-2 border-purple-500 shadow-2xl text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center mx-auto">
              <Megaphone className="w-7 h-7 animate-bounce" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Thông Báo Chung Từ Giám Thị</h2>
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 text-sm text-purple-900 font-medium leading-relaxed">
              "{broadcastNotice}"
            </div>
            <button
              type="button"
              onClick={() => setBroadcastNotice(null)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              Đã hiểu thông báo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
