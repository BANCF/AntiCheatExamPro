import React, { useState, useEffect, useRef } from 'react';
import { getSocket } from '../../services/socket';
import { ViolationLog } from '../../types/exam';
import {
  ShieldAlert,
  Clock,
  Send,
  PlusCircle,
  XCircle,
  Radio,
  Volume2,
  VolumeX,
  AlertTriangle,
  Users,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';

interface ActiveStudent {
  attemptId: string;
  socketId?: string;
  studentName: string;
  studentClass: string;
  assignedCode: string;
  startTime: string;
  durationSeconds: number;
  remainingSeconds: number;
  currentQuestionIndex: number;
  answeredCount: number;
  totalQuestions: number;
  violationCount: number;
  violationsLog: ViolationLog[];
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'FORCE_SUBMITTED' | 'DISCONNECTED';
  lastPing: number;
}

interface LiveAlertEvent {
  id: string;
  timestamp: string;
  studentName: string;
  studentClass: string;
  assignedCode: string;
  violationCount: number;
  violation: ViolationLog;
}

export const LiveProctoringTab: React.FC = () => {
  const [students, setStudents] = useState<Map<string, ActiveStudent>>(new Map());
  const [alertFeed, setAlertFeed] = useState<LiveAlertEvent[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Message modal state
  const [targetStudent, setTargetStudent] = useState<ActiveStudent | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Beep sound generator for violations
  const playAlertSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3); // Drop to A4
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio not supported or blocked
    }
  };

  useEffect(() => {
    const socket = getSocket();

    // Join teacher monitoring room
    socket.emit('teacher:join');

    // Initial snapshot sync
    socket.on('active_students_sync', (list: ActiveStudent[]) => {
      const map = new Map<string, ActiveStudent>();
      list.forEach((s) => map.set(s.attemptId, s));
      setStudents(map);
    });

    // New student session started
    socket.on('student:new_session', (newStudent: ActiveStudent) => {
      setStudents((prev) => {
        const next = new Map(prev);
        next.set(newStudent.attemptId, {
          ...newStudent,
          remainingSeconds: newStudent.durationSeconds,
          currentQuestionIndex: 0,
          answeredCount: 0,
          totalQuestions: 10,
          violationCount: 0,
          violationsLog: [],
          status: 'IN_PROGRESS',
          lastPing: Date.now()
        });
        return next;
      });
    });

    // Student status change (online / disconnected)
    socket.on('student:status_change', ({ attemptId, status }) => {
      setStudents((prev) => {
        const next = new Map(prev);
        const existing = next.get(attemptId);
        if (existing) {
          next.set(attemptId, { ...existing, status });
        }
        return next;
      });
    });

    // Student progress update
    socket.on('student:progress_update', ({ attemptId, currentQuestionIndex, answeredCount, remainingSeconds }) => {
      setStudents((prev) => {
        const next = new Map(prev);
        const existing = next.get(attemptId);
        if (existing) {
          next.set(attemptId, {
            ...existing,
            currentQuestionIndex: currentQuestionIndex !== undefined ? currentQuestionIndex : existing.currentQuestionIndex,
            answeredCount: answeredCount !== undefined ? answeredCount : existing.answeredCount,
            remainingSeconds: remainingSeconds !== undefined ? remainingSeconds : existing.remainingSeconds,
            lastPing: Date.now()
          });
        }
        return next;
      });
    });

    // Student submitted
    socket.on('student:submitted', ({ attemptId, submission }) => {
      setStudents((prev) => {
        const next = new Map(prev);
        const existing = next.get(attemptId);
        if (existing) {
          next.set(attemptId, {
            ...existing,
            status: submission.status,
            answeredCount: existing.totalQuestions
          });
        }
        return next;
      });
    });

    // Real-time violation alert
    socket.on('alert:violation', (data) => {
      playAlertSound();

      // Add to alert feed
      const newEvent: LiveAlertEvent = {
        id: `ev_${Date.now()}_${Math.random()}`,
        timestamp: new Date().toISOString(),
        studentName: data.studentName,
        studentClass: data.studentClass,
        assignedCode: data.assignedCode,
        violationCount: data.violationCount,
        violation: data.violation
      };

      setAlertFeed((prev) => [newEvent, ...prev.slice(0, 49)]);

      // Update student violation count in map
      setStudents((prev) => {
        const next = new Map(prev);
        const existing = next.get(data.attemptId);
        if (existing) {
          next.set(data.attemptId, {
            ...existing,
            violationCount: data.violationCount,
            violationsLog: [...existing.violationsLog, data.violation]
          });
        }
        return next;
      });
    });

    return () => {
      socket.off('active_students_sync');
      socket.off('student:new_session');
      socket.off('student:status_change');
      socket.off('student:progress_update');
      socket.off('student:submitted');
      socket.off('alert:violation');
    };
  }, [soundEnabled]);

  const studentList = Array.from(students.values());

  const inProgressCount = studentList.filter((s) => s.status === 'IN_PROGRESS').length;
  const violatingCount = studentList.filter((s) => s.violationCount > 0 && s.status === 'IN_PROGRESS').length;
  const submittedCount = studentList.filter((s) => s.status === 'SUBMITTED' || s.status === 'FORCE_SUBMITTED').length;
  const disconnectedCount = studentList.filter((s) => s.status === 'DISCONNECTED').length;

  // Actions
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent || !customMessage.trim()) return;

    const socket = getSocket();
    socket.emit('teacher:send_message', {
      attemptId: targetStudent.attemptId,
      message: customMessage.trim()
    });

    setCustomMessage('');
    setTargetStudent(null);
  };

  const handleAddTime = (student: ActiveStudent, minutes: number) => {
    if (confirm(`Cộng thêm ${minutes} phút cho thí sinh ${student.studentName}?`)) {
      const socket = getSocket();
      socket.emit('teacher:add_time', {
        attemptId: student.attemptId,
        extraMinutes: minutes
      });
    }
  };

  const handleForceTerminate = (student: ActiveStudent) => {
    if (confirm(`CẢNH BÁO: Bạn có chắc chắn muốn ĐÌNH CHỈ THI và thu bài ngay lập tức đối với thí sinh ${student.studentName}?`)) {
      const socket = getSocket();
      socket.emit('teacher:terminate_student', {
        attemptId: student.attemptId,
        reason: 'Giám thị đình chỉ bài thi do vi phạm quy chế nghiêm trọng'
      });
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    const socket = getSocket();
    // Send to each active student
    studentList.forEach((s) => {
      socket.emit('teacher:send_message', {
        attemptId: s.attemptId,
        message: `📢 THÔNG BÁO TỪ GIÁM THỊ: ${broadcastMessage.trim()}`
      });
    });
    setBroadcastMessage('');
    setIsBroadcastOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Live Stats & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Đang làm bài online</div>
            <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
              {inProgressCount}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>
          <Radio className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Có vi phạm đang thi</div>
            <div className="text-2xl font-black text-amber-400">{violatingCount}</div>
          </div>
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Đã nộp bài</div>
            <div className="text-2xl font-black text-indigo-400">{submittedCount}</div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Mất kết nối / Rời mạng</div>
            <div className="text-2xl font-black text-slate-500">{disconnectedCount}</div>
          </div>
          <WifiOff className="w-5 h-5 text-slate-500" />
        </div>

        {/* Action button */}
        <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Âm thanh cảnh báo</span>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                soundEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsBroadcastOpen(true)}
            className="w-full mt-2 py-1.5 px-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Phát thanh cả phòng</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Student Cards (Left 3 cols) & Real-time Violation Feed (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 cols: Active Student Roster */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Danh Sách Thí Sinh Trong Phòng ({studentList.length})</span>
            </h3>
            <span className="text-xs text-slate-400">
              Tự động cập nhật thời gian thực qua WebSocket
            </span>
          </div>

          {studentList.length === 0 ? (
            <div className="p-12 rounded-2xl bg-slate-800/40 border border-slate-800 text-center text-slate-400 text-xs space-y-2">
              <Radio className="w-8 h-8 mx-auto text-indigo-400 opacity-60 animate-pulse" />
              <p className="font-semibold text-slate-300">Phòng thi đang mở và chờ thí sinh vào làm bài...</p>
              <p className="text-slate-500 text-[11px]">
                Khi học sinh bấm "Bắt đầu làm bài" trên điện thoại hoặc máy tính, thông tin và camera/tiến độ sẽ xuất hiện tức thì tại đây.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studentList.map((st) => {
                const isOnline = st.status === 'IN_PROGRESS';
                const isDone = st.status === 'SUBMITTED' || st.status === 'FORCE_SUBMITTED';
                const isDisconnected = st.status === 'DISCONNECTED';

                const minutes = Math.floor((st.remainingSeconds || 0) / 60);
                const seconds = (st.remainingSeconds || 0) % 60;
                const formattedRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                return (
                  <div
                    key={st.attemptId}
                    className={`p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                      st.violationCount >= 2
                        ? 'bg-rose-950/20 border-rose-500/50 shadow-lg shadow-rose-950/30'
                        : st.violationCount === 1
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : 'bg-slate-800/70 border-slate-700/70'
                    }`}
                  >
                    {/* Card Top: Student Identity & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{st.studentName}</span>
                          <span className="text-xs text-slate-400">({st.studentClass})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                            Mã đề: {st.assignedCode}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Bắt đầu: {new Date(st.startTime).toLocaleTimeString('vi-VN')}
                          </span>
                        </div>
                      </div>

                      {/* Online status indicator */}
                      <div>
                        {isOnline ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Đang thi
                          </span>
                        ) : isDone ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã nộp bài
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            <WifiOff className="w-3 h-3" /> Mất mạng
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress & Timer */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 flex items-center gap-1">
                          Tiến độ: <strong className="text-slate-200">{st.answeredCount}/{st.totalQuestions} câu</strong>
                        </span>
                        <span className="font-mono font-bold text-sky-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {formattedRemaining}
                        </span>
                      </div>

                      {/* Mini progress bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                          style={{
                            width: `${Math.min(100, ((st.answeredCount || 0) / (st.totalQuestions || 10)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Violations Badge */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/50">
                      <div className="flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                        <span
                          className={`font-semibold ${
                            st.violationCount > 0 ? 'text-rose-400' : 'text-slate-400'
                          }`}
                        >
                          Số lần vi phạm: {st.violationCount}
                        </span>
                      </div>

                      {/* Quick Action Buttons */}
                      {!isDone && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setTargetStudent(st)}
                            title="Gửi tin nhắn cảnh báo"
                            className="p-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddTime(st, 5)}
                            title="Cộng thêm 5 phút"
                            className="p-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-colors cursor-pointer font-mono text-[10px] font-bold"
                          >
                            +5m
                          </button>
                          <button
                            type="button"
                            onClick={() => handleForceTerminate(st)}
                            title="Đình chỉ thi ngay"
                            className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 1 col: Real-time Live Violation Feed */}
        <div className="lg:col-span-1 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 sticky top-20 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>Nhật Ký Vi Phạm Trực Tiếp</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">{alertFeed.length} sự kiện</span>
            </div>

            {alertFeed.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                Chưa có sự kiện vi phạm nào được ghi nhận.
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {alertFeed.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1 animate-fadeIn"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-rose-400">
                        {ev.studentName} ({ev.studentClass})
                      </span>
                      <span className="text-slate-400 font-mono">
                        {new Date(ev.timestamp).toLocaleTimeString('vi-VN')}
                      </span>
                    </div>
                    <div className="text-slate-200 text-[11px] leading-tight">
                      [{ev.violation.type}] {ev.violation.note || 'Rời màn hình thi'}
                      {ev.violation.duration ? ` (${ev.violation.duration}s)` : ''}
                    </div>
                    <div className="text-[10px] text-amber-400 font-semibold">
                      Tổng vi phạm: {ev.violationCount} lần
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Send Private Warning to Student */}
      {targetStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSendMessage}
            className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-400" />
              Gửi Cảnh Báo Trực Tiếp Đến Thí Sinh
            </h3>
            <p className="text-xs text-slate-300">
              Gửi tin nhắn cảnh báo hiển thị ngay trên màn hình của thí sinh{' '}
              <strong className="text-white">{targetStudent.studentName}</strong> ({targetStudent.studentClass}).
            </p>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                'Vui lòng quay lại làm bài ngay!',
                'Cảnh báo: Không chuyển tab tra cứu!',
                'Tập trung nhìn vào màn hình máy tính!',
                'Đã vi phạm quy chế, chú ý!'
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCustomMessage(preset)}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            <textarea
              required
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Nhập nội dung cảnh báo..."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTargetStudent(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                Gửi ngay
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Broadcast to all students */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleBroadcast}
            className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              Phát Thanh Toàn Phòng Thi
            </h3>
            <p className="text-xs text-slate-300">
              Thông báo này sẽ lập tức hiển thị trên màn hình của <strong>toàn bộ thí sinh</strong> đang trong phòng thi.
            </p>

            <textarea
              required
              rows={3}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="VD: Còn 5 phút nữa hết giờ, các em khẩn trương kiểm tra lại các câu chưa làm..."
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBroadcastOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 cursor-pointer"
              >
                Phát thanh ngay
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
