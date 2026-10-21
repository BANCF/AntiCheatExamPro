import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { serverStore } from './store';
import { ViolationLog, ClassRoom } from '../src/types/exam';

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ---------------- REST API ----------------

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    active_students_count: serverStore.activeStudents.size,
    total_submissions: serverStore.submissions.length,
    timestamp: new Date().toISOString()
  });
});

// Question Bank
app.get('/api/bank', (_req, res) => {
  res.json(serverStore.bank);
});

app.post('/api/bank', (req, res) => {
  if (Array.isArray(req.body)) {
    serverStore.bank = req.body;
    serverStore.persist();
    res.json({ success: true, count: serverStore.bank.length });
  } else {
    res.status(400).json({ error: 'Data must be an array of questions' });
  }
});

// Exam Config
app.get('/api/config', (_req, res) => {
  res.json(serverStore.config);
});

app.post('/api/config', (req, res) => {
  if (req.body && req.body.title) {
    serverStore.config = req.body;
    serverStore.persist();
    res.json({ success: true, config: serverStore.config });
  } else {
    res.status(400).json({ error: 'Invalid config payload' });
  }
});

// Teacher Auth (Multi-Account & Legacy Support)
app.post('/api/auth/teacher', (req, res) => {
  const { username, password } = req.body;
  const cleanPass = (password || '').trim();
  const cleanUser = (username || '').trim().toLowerCase();

  if (!cleanPass) {
    return res.status(400).json({ success: false, error: 'Vui lòng nhập mật khẩu quản trị!' });
  }

  // If no username provided (legacy mode), check password only
  if (!cleanUser) {
    const match = serverStore.teachers.find((t) => t.password.trim() === cleanPass) ||
      (cleanPass === (serverStore.config.teacher_password || 'admin2026').trim() ? serverStore.teachers[0] : null);
    if (match) {
      const { password: _, ...safeTeacher } = match;
      return res.json({ success: true, teacher: safeTeacher });
    }
    return res.status(401).json({ success: false, error: 'Mật khẩu giáo viên không chính xác!' });
  }

  // Match username & password
  const found = serverStore.teachers.find(
    (t) => t.username.toLowerCase() === cleanUser && t.password.trim() === cleanPass
  );

  if (found) {
    const { password: _, ...safeTeacher } = found;
    return res.json({ success: true, teacher: safeTeacher });
  }

  // Fallback check for admin account
  if (cleanUser === 'admin' && cleanPass === (serverStore.config.teacher_password || 'admin2026').trim()) {
    const adminTeacher = serverStore.teachers[0] || {
      id: 'tc_admin',
      username: 'admin',
      fullName: 'Quản Trị Viên (Admin Trường)',
      role: 'admin',
      subject: 'Tất cả'
    };
    const { password: _, ...safeTeacher } = adminTeacher as any;
    return res.json({ success: true, teacher: safeTeacher });
  }

  return res.status(401).json({ success: false, error: 'Tên đăng nhập hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại.' });
});

// Teachers Management APIs (Admin)
app.get('/api/teachers', (_req, res) => {
  const list = serverStore.teachers.map(({ password: _, ...safe }) => safe);
  res.json(list);
});

app.post('/api/teachers', (req, res) => {
  const { username, password, fullName, role, subject, assignedClasses } = req.body;
  if (!username || !password || !fullName) {
    return res.status(400).json({ error: 'Vui lòng điền đủ Tên đăng nhập, Mật khẩu và Họ tên' });
  }

  const existingIdx = serverStore.teachers.findIndex(
    (t) => t.username.toLowerCase() === username.trim().toLowerCase()
  );
  const teacherAccount = {
    id: existingIdx >= 0 ? serverStore.teachers[existingIdx].id : `tc_${Date.now()}`,
    username: username.trim(),
    password: password.trim(),
    fullName: fullName.trim(),
    role: role === 'admin' ? ('admin' as const) : ('teacher' as const),
    subject: subject || 'Tin học',
    assignedClasses: assignedClasses || []
  };

  if (existingIdx >= 0) {
    serverStore.teachers[existingIdx] = teacherAccount;
  } else {
    serverStore.teachers.push(teacherAccount);
  }
  serverStore.persist();
  const { password: _, ...safe } = teacherAccount;
  res.json({ success: true, teacher: safe });
});

app.delete('/api/teachers/:id', (req, res) => {
  const { id } = req.params;
  if (id === 'tc_admin' || id === serverStore.teachers[0]?.id) {
    return res.status(400).json({ error: 'Không thể xóa tài khoản Quản trị viên mặc định!' });
  }
  serverStore.teachers = serverStore.teachers.filter((t) => t.id !== id);
  serverStore.persist();
  res.json({ success: true });
});

// ---------------- Class Rooms Management APIs ----------------
app.get('/api/classes', (_req, res) => {
  res.json(serverStore.classes);
});

app.post('/api/classes', (req, res) => {
  const { id, code, name, grade, subject, teacherName, pinCode, examTitle, examConfig, isActive, description } = req.body;
  if (!code || !name) {
    return res.status(400).json({ error: 'Mã lớp và Tên lớp là bắt buộc!' });
  }

  const normalizedCode = code.trim().toUpperCase();
  const existingIdx = serverStore.classes.findIndex(
    (c) => (id && c.id === id) || c.code.trim().toUpperCase() === normalizedCode
  );

  const classItem: ClassRoom = {
    id: id || (existingIdx >= 0 ? serverStore.classes[existingIdx].id : `cls_${Date.now()}`),
    code: normalizedCode,
    name: name.trim(),
    grade: grade || 'Lớp 7',
    subject: subject || 'Tin học',
    teacherName: teacherName || 'Giáo viên bộ môn',
    pinCode: (pinCode || '2026').trim(),
    examTitle: examTitle?.trim() || `Kiểm tra ${subject || 'Bộ môn'} - ${normalizedCode}`,
    examConfig: examConfig || {},
    isActive: isActive !== undefined ? Boolean(isActive) : true,
    description: description || '',
    createdAt: existingIdx >= 0 ? serverStore.classes[existingIdx].createdAt : new Date().toISOString()
  };

  if (existingIdx >= 0) {
    serverStore.classes[existingIdx] = classItem;
  } else {
    serverStore.classes.push(classItem);
  }

  serverStore.persist();
  res.json({ success: true, classItem });
});

app.delete('/api/classes/:id', (req, res) => {
  const { id } = req.params;
  serverStore.classes = serverStore.classes.filter((c) => c.id !== id && c.code !== id);
  serverStore.persist();
  res.json({ success: true });
});

// Start Student Exam
app.post('/api/exam/start', (req, res) => {
  const { student_name, student_class, pin, forceNew } = req.body;

  if (!student_name?.trim() || !student_class?.trim()) {
    return res.status(400).json({ error: 'Vui lòng cung cấp Họ tên và Mã lớp học' });
  }

  const normClass = student_class.trim().toUpperCase();
  const matchedClass = serverStore.classes.find(
    (c) => c.code.trim().toUpperCase() === normClass
  );

  // If classes are configured, enforce exact class verification
  if (serverStore.classes.length > 0) {
    if (!matchedClass) {
      return res.status(404).json({
        error: `Mã lớp "${student_class}" không tồn tại trên hệ thống! Vui lòng nhập đúng mã lớp đã được giáo viên tạo (VD: 7A1, 7A2, 10A1...).`
      });
    }

    if (!matchedClass.isActive) {
      return res.status(403).json({
        error: `Phòng thi của lớp ${matchedClass.code} (${matchedClass.name}) hiện đang ĐÓNG. Vui lòng liên hệ giáo viên để mở phòng thi!`
      });
    }

    const cleanPin = (pin || '').trim();
    if (matchedClass.pinCode && cleanPin !== matchedClass.pinCode.trim()) {
      return res.status(403).json({
        error: `Mã PIN bài thi cho lớp ${matchedClass.code} không chính xác! Vui lòng hỏi giáo viên bộ môn.`
      });
    }
  } else if (serverStore.config.access_pin && pin?.trim() !== serverStore.config.access_pin.trim()) {
    return res.status(403).json({ error: 'Mã PIN phòng thi không hợp lệ!' });
  }

  const examSession = serverStore.getOrCreateStudentExam(student_name.trim(), normClass, matchedClass, Boolean(forceNew));

  // Notify teacher of new student joined
  io.to('teacher_room').emit('student:new_session', {
    attemptId: examSession.attemptId,
    studentName: student_name.trim(),
    studentClass: normClass,
    assignedCode: examSession.assignedCode,
    startTime: examSession.startTime,
    durationSeconds: examSession.durationSeconds
  });

  res.json({
    ...examSession,
    classInfo: matchedClass
      ? {
          code: matchedClass.code,
          name: matchedClass.name,
          subject: matchedClass.subject,
          examTitle: matchedClass.examTitle
        }
      : undefined
  });
});

// Submit Exam
app.post('/api/exam/submit', (req, res) => {
  const {
    attempt_id,
    student_name,
    student_class,
    assigned_code,
    answers,
    status,
    violations_log,
    submission_id,
    submissionId,
    submission_record,
    submissionRecord
  } = req.body;

  const incomingRecord = submission_record || submissionRecord;
  const targetSubmissionId = submission_id || submissionId || incomingRecord?.submission_id;

  if (!attempt_id && !incomingRecord?.attempt_id && !targetSubmissionId) {
    return res.status(400).json({ error: 'Thiếu attempt_id' });
  }

  const submission = serverStore.submitStudentExam({
    attemptId: attempt_id || incomingRecord?.attempt_id || targetSubmissionId,
    studentName: student_name || incomingRecord?.student_name || 'Học sinh',
    studentClass: student_class || incomingRecord?.student_class || 'Lớp',
    assignedCode: assigned_code || incomingRecord?.assigned_code || '101',
    answers: answers || incomingRecord?.student_answers || {},
    status: (status === 'FORCE_SUBMITTED' || incomingRecord?.status === 'FORCE_SUBMITTED') ? 'FORCE_SUBMITTED' : 'SUBMITTED',
    violationsLog: violations_log || incomingRecord?.violations_log || [],
    submissionId: targetSubmissionId,
    incomingRecord
  });

  // Notify teacher room & all teacher dashboards in real-time
  io.to('teacher_room').emit('student:submitted', {
    submission,
    attemptId: attempt_id
  });
  io.emit('student:submitted', {
    submission,
    attemptId: attempt_id
  });

  // Send receipt without score for privacy
  res.json({
    success: true,
    submission_id: submission.submission_id,
    student_name: submission.student_name,
    student_class: submission.student_class,
    assigned_code: submission.assigned_code,
    submit_time: submission.submit_time,
    status: submission.status
  });
});

// Submissions / Gradebook
app.get('/api/submissions', (_req, res) => {
  res.json(serverStore.submissions);
});

// Save or sync submission from client
app.post('/api/submissions', (req, res) => {
  const record = req.body;
  if (!record || (!record.submission_id && !record.attempt_id)) {
    return res.status(400).json({ error: 'Bản ghi bài nộp không hợp lệ' });
  }

  const existingIdx = serverStore.submissions.findIndex(
    (s) => s.submission_id === record.submission_id || (record.attempt_id && (s as any).attempt_id === record.attempt_id)
  );

  if (existingIdx >= 0) {
    serverStore.submissions[existingIdx] = { ...serverStore.submissions[existingIdx], ...record };
  } else {
    serverStore.submissions = [record, ...serverStore.submissions];
  }
  serverStore.persist();

  io.to('teacher_room').emit('student:submitted', {
    submission: record,
    attemptId: record.attempt_id || record.submission_id
  });

  res.json({ success: true, submission: record });
});

// Delete individual submission by ID
app.delete('/api/submissions/:id', (req, res) => {
  const { id } = req.params;
  const deleted = serverStore.deleteSubmission(id);
  if (deleted) {
    io.to('teacher_room').emit('submission:deleted', { submissionId: id });
    return res.json({ success: true, message: `Đã xóa bài nộp ${id}` });
  }
  return res.status(404).json({ error: 'Không tìm thấy bài nộp cần xóa' });
});

// Deduplicate submissions
app.post('/api/submissions/deduplicate', (_req, res) => {
  const removed = serverStore.deduplicateSubmissions();
  res.json({ success: true, removedCount: removed });
});

// Clear all submissions
app.delete('/api/submissions', (_req, res) => {
  serverStore.submissions = [];
  serverStore.persist();
  io.to('teacher_room').emit('submissions:cleared');
  res.json({ success: true });
});

// Active Students
app.get('/api/active-students', (_req, res) => {
  const list = Array.from(serverStore.activeStudents.values()).map(
    ({ pickedOriginalQuestions, ...rest }) => rest
  );
  res.json(list);
});

// ---------------- SOCKET.IO REALTIME PROCTORING ----------------

io.on('connection', (socket) => {
  // Student registers socket with their attemptId
  socket.on('student:register', ({ attemptId, studentName, studentClass, assignedCode }) => {
    socket.join(`student_${attemptId}`);
    let student = serverStore.activeStudents.get(attemptId);
    if (!student && studentName && studentClass) {
      student = {
        attemptId,
        studentName,
        studentClass,
        assignedCode: assignedCode || '101',
        seed: 2026,
        startTime: new Date().toISOString(),
        durationSeconds: (serverStore.config.duration_minutes || 45) * 60,
        remainingSeconds: (serverStore.config.duration_minutes || 45) * 60,
        currentQuestionIndex: 0,
        answeredCount: 0,
        totalQuestions: serverStore.config.total_questions_to_pick || 20,
        violationCount: 0,
        violationsLog: [],
        status: 'IN_PROGRESS',
        lastPing: Date.now(),
        pickedOriginalQuestions: []
      };
      serverStore.activeStudents.set(attemptId, student);
    }
    if (student) {
      student.socketId = socket.id;
      student.status = 'IN_PROGRESS';
      student.lastPing = Date.now();
    }

    // Broadcast updated active list to teacher
    io.to('teacher_room').emit('student:status_change', {
      attemptId,
      socketId: socket.id,
      studentName,
      studentClass,
      assignedCode,
      status: 'IN_PROGRESS'
    });
  });

  // Student reports progress
  socket.on('student:progress', ({ attemptId, currentQuestionIndex, answeredCount, remainingSeconds }) => {
    const student = serverStore.activeStudents.get(attemptId);
    if (student) {
      student.currentQuestionIndex = currentQuestionIndex;
      student.answeredCount = answeredCount;
      student.remainingSeconds = remainingSeconds;
      student.lastPing = Date.now();

      io.to('teacher_room').emit('student:progress_update', {
        attemptId,
        currentQuestionIndex,
        answeredCount,
        remainingSeconds
      });
    }
  });

  // Student reports violation
  socket.on('student:violation', ({ attemptId, violation }: { attemptId: string; violation: ViolationLog }) => {
    const student = serverStore.activeStudents.get(attemptId);
    if (student) {
      student.violationCount += 1;
      student.violationsLog.push(violation);
      student.lastPing = Date.now();

      // Trigger high priority alarm on teacher dashboard
      io.to('teacher_room').emit('alert:violation', {
        attemptId,
        studentName: student.studentName,
        studentClass: student.studentClass,
        assignedCode: student.assignedCode,
        violationCount: student.violationCount,
        violation
      });
    }
  });

  // Teacher joins monitoring room
  socket.on('teacher:join', () => {
    socket.join('teacher_room');
    // Send full current active students snapshot
    const list = Array.from(serverStore.activeStudents.values()).map(
      ({ pickedOriginalQuestions, ...rest }) => rest
    );
    socket.emit('active_students_sync', list);
  });

  // Teacher sends private message / warning to student screen
  socket.on('teacher:send_message', ({ attemptId, message }: { attemptId: string; message: string }) => {
    io.to(`student_${attemptId}`).emit('teacher:message_received', { message });
  });

  // Teacher broadcasts announcement to ALL students
  socket.on('teacher:broadcast_all', ({ message }: { message: string }) => {
    io.emit('teacher:broadcast_received', { message, timestamp: new Date().toISOString() });
  });

  // Teacher adds time to student exam
  socket.on('teacher:add_time', ({ attemptId, extraMinutes }: { attemptId: string; extraMinutes: number }) => {
    const student = serverStore.activeStudents.get(attemptId);
    if (student) {
      student.durationSeconds += extraMinutes * 60;
      student.remainingSeconds += extraMinutes * 60;
    }
    io.to(`student_${attemptId}`).emit('teacher:time_added', { extraSeconds: extraMinutes * 60 });
    io.to('teacher_room').emit('student:progress_update', {
      attemptId,
      remainingSeconds: student?.remainingSeconds
    });
  });

  // Teacher force terminates student exam remotely
  socket.on('teacher:terminate_student', ({ attemptId, reason }: { attemptId: string; reason: string }) => {
    const student = serverStore.activeStudents.get(attemptId);
    if (student) {
      student.status = 'FORCE_SUBMITTED';
    }
    io.to(`student_${attemptId}`).emit('teacher:force_terminate', { reason });
  });

  socket.on('disconnect', () => {
    for (const [_attemptId, student] of serverStore.activeStudents.entries()) {
      if (student.socketId === socket.id && student.status === 'IN_PROGRESS') {
        student.status = 'DISCONNECTED';
        io.to('teacher_room').emit('student:status_change', {
          attemptId: student.attemptId,
          status: 'DISCONNECTED'
        });
        break;
      }
    }
  });
});

// Static files (Production)
const distPath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Fallback to index.html for SPA routes (Express 5 compatible)
  app.use((_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`🚀 AntiCheat Exam Server running at http://localhost:${PORT}`);
  console.log(`📡 WebSocket Proctoring active on port ${PORT}`);
});
