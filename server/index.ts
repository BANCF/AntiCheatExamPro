import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { serverStore } from './store';
import { ViolationLog } from '../src/types/exam';

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
app.use(express.json({ limit: '10mb' }));

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

// Start Student Exam
app.post('/api/exam/start', (req, res) => {
  const { student_name, student_class, pin } = req.body;

  if (!student_name || !student_class) {
    return res.status(400).json({ error: 'Vui lòng cung cấp Họ tên và Lớp học' });
  }

  if (serverStore.config.access_pin && pin !== serverStore.config.access_pin) {
    return res.status(403).json({ error: 'Mã PIN phòng thi không hợp lệ!' });
  }

  const examSession = serverStore.startStudentExam(student_name, student_class);

  // Notify teacher of new student joined
  io.to('teacher_room').emit('student:new_session', {
    attemptId: examSession.attemptId,
    studentName: student_name,
    studentClass: student_class,
    assignedCode: examSession.assignedCode,
    startTime: examSession.startTime,
    durationSeconds: examSession.durationSeconds
  });

  res.json(examSession);
});

// Submit Exam
app.post('/api/exam/submit', (req, res) => {
  const { attempt_id, student_name, student_class, assigned_code, answers, status, violations_log } = req.body;

  if (!attempt_id) {
    return res.status(400).json({ error: 'Thiếu attempt_id' });
  }

  const submission = serverStore.submitStudentExam({
    attemptId: attempt_id,
    studentName: student_name || 'Học sinh',
    studentClass: student_class || 'Lớp',
    assignedCode: assigned_code || '101',
    answers: answers || {},
    status: status === 'FORCE_SUBMITTED' ? 'FORCE_SUBMITTED' : 'SUBMITTED',
    violationsLog: violations_log || []
  });

  // Notify teacher room in real-time
  io.to('teacher_room').emit('student:submitted', {
    submission,
    attemptId: attempt_id
  });

  // Send receipt without score
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
    const student = serverStore.activeStudents.get(attemptId);
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
