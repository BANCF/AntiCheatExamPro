import { Redis } from '@upstash/redis';
import { Question, ExamConfig, SubmissionRecord, TeacherAccount, ClassRoom } from '../src/types/exam';
import { DEFAULT_QUESTION_BANK, DEFAULT_EXAM_CONFIG } from '../src/data/defaultQuestionBank';
import { DEFAULT_CLASSES, DEFAULT_TEACHERS } from '../src/data/defaultClasses';

let redisInstance: Redis | null = null;
let redisInitialized = false;

// Fallback in-memory store for local testing or when Redis is not yet configured
let memorySubmissions: SubmissionRecord[] = [];
let memoryBank: Question[] = DEFAULT_QUESTION_BANK;
let memoryConfig: ExamConfig = DEFAULT_EXAM_CONFIG;
let memoryClasses: ClassRoom[] = DEFAULT_CLASSES;
let memoryTeachers: TeacherAccount[] = DEFAULT_TEACHERS;

export function getRedis(): Redis | null {
  if (redisInitialized) return redisInstance;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_KV_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_TOKEN;

  if (url && token) {
    try {
      redisInstance = new Redis({ url, token });
      console.log('✅ Connected to Upstash Redis Cloud Storage');
    } catch (err) {
      console.error('❌ Failed to initialize Upstash Redis:', err);
      redisInstance = null;
    }
  } else {
    console.warn('⚠️ No Upstash Redis env detected (UPSTASH_REDIS_REST_URL / KV_REST_API_URL). Using in-memory fallback.');
    redisInstance = null;
  }

  redisInitialized = true;
  return redisInstance;
}

export function handleCors(req: any, res: any): boolean {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if ((req.method || '').toUpperCase() === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return true;
  }
  return false;
}

export async function parseJsonBody(req: any): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  if (req.readableEnded) {
    return {};
  }
  return new Promise((resolve) => {
    let raw = '';
    const timer = setTimeout(() => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    }, 1500);

    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      clearTimeout(timer);
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      clearTimeout(timer);
      resolve({});
    });
  });
}

export function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

export function isRedisConfigured(): boolean {
  return getRedis() !== null;
}

// ---------------- SUBMISSIONS ----------------
export async function getSubmissions(): Promise<SubmissionRecord[]> {
  const redis = getRedis();
  if (redis) {
    try {
      let list = await redis.get<any>('exam:submissions');
      if (typeof list === 'string') {
        try {
          list = JSON.parse(list);
        } catch {}
      }
      if (Array.isArray(list)) return list;
    } catch (err) {
      console.error('Error fetching submissions from Redis:', err);
    }
  }
  return memorySubmissions;
}

export async function addSubmission(sub: SubmissionRecord): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      let list = await redis.get<any>('exam:submissions');
      if (typeof list === 'string') {
        try {
          list = JSON.parse(list);
        } catch {
          list = [];
        }
      }
      const currentList = Array.isArray(list) ? list : [];
      const filtered = currentList.filter((s: any) => s.submission_id !== sub.submission_id);
      const updated = [sub, ...filtered].slice(0, 2000);
      await redis.set('exam:submissions', updated);
      return;
    } catch (err) {
      console.error('Error saving submission to Redis:', err);
    }
  }
  memorySubmissions = [sub, ...memorySubmissions.filter((s) => s.submission_id !== sub.submission_id)];
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    try {
      let list = await redis.get<any>('exam:submissions');
      if (typeof list === 'string') {
        try {
          list = JSON.parse(list);
        } catch {
          list = [];
        }
      }
      const currentList = Array.isArray(list) ? list : [];
      const updated = currentList.filter((s: any) => s.submission_id !== id && s.attempt_id !== id);
      await redis.set('exam:submissions', updated);
      return true;
    } catch (err) {
      console.error('Error deleting submission in Redis:', err);
    }
  }
  const prevCount = memorySubmissions.length;
  memorySubmissions = memorySubmissions.filter((s) => s.submission_id !== id && (s as any).attempt_id !== id);
  return memorySubmissions.length !== prevCount;
}

export async function clearSubmissions(): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.del('exam:submissions');
    } catch (err) {
      console.error('Error clearing submissions in Redis:', err);
    }
  }
  memorySubmissions = [];
}

// ---------------- QUESTION BANK ----------------
export async function getQuestionBank(): Promise<Question[]> {
  const redis = getRedis();
  if (redis) {
    try {
      let bank = await redis.get<any>('exam:bank');
      if (typeof bank === 'string') {
        try {
          bank = JSON.parse(bank);
        } catch {}
      }
      if (Array.isArray(bank) && bank.length > 0) {
        const existingIds = new Set(bank.map((q: any) => q.id));
        const missing = DEFAULT_QUESTION_BANK.filter((q) => !existingIds.has(q.id));
        if (missing.length > 0) {
          const merged = [...bank, ...missing];
          await redis.set('exam:bank', merged);
          return merged;
        }
        return bank;
      }
    } catch (err) {
      console.error('Error reading bank from Redis:', err);
    }
  }
  return memoryBank.length > 0 ? memoryBank : DEFAULT_QUESTION_BANK;
}

export async function saveQuestionBank(bank: Question[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('exam:bank', bank);
    } catch (err) {
      console.error('Error saving bank to Redis:', err);
    }
  }
  memoryBank = bank;
}

// ---------------- CONFIG ----------------
export async function getExamConfig(): Promise<ExamConfig> {
  const redis = getRedis();
  if (redis) {
    try {
      let config = await redis.get<any>('exam:config');
      if (typeof config === 'string') {
        try {
          config = JSON.parse(config);
        } catch {}
      }
      if (config && config.title) return config;
    } catch (err) {
      console.error('Error reading config from Redis:', err);
    }
  }
  return memoryConfig;
}

export async function saveExamConfig(config: ExamConfig): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('exam:config', config);
    } catch (err) {
      console.error('Error saving config to Redis:', err);
    }
  }
  memoryConfig = config;
}

// ---------------- CLASSES ----------------
export async function getClasses(): Promise<ClassRoom[]> {
  const redis = getRedis();
  if (redis) {
    try {
      let classes = await redis.get<any>('exam:classes');
      if (typeof classes === 'string') {
        try {
          classes = JSON.parse(classes);
        } catch {}
      }
      if (Array.isArray(classes) && classes.length > 0) {
        const map = new Map<string, ClassRoom>();
        classes.forEach((c: ClassRoom) => map.set(c.code.trim().toUpperCase(), c));
        let changed = false;

        for (const def of DEFAULT_CLASSES) {
          const code = def.code.trim().toUpperCase();
          if (!map.has(code)) {
            map.set(code, def);
            changed = true;
          } else if (def.code === '7C') {
            const cur = map.get(code)!;
            // Ensure 7C is updated with the official 45-min, 34-question exam if it was an old stub
            if (cur.examConfig?.total_questions_to_pick !== 34 || cur.examTitle !== def.examTitle) {
              map.set(code, { ...cur, ...def });
              changed = true;
            }
          }
        }

        const merged = Array.from(map.values());
        if (changed) {
          await redis.set('exam:classes', merged);
        }
        return merged;
      }
    } catch (err) {
      console.error('Error reading classes from Redis:', err);
    }
  }
  return memoryClasses.length > 0 ? memoryClasses : DEFAULT_CLASSES;
}

export async function saveClass(classItem: ClassRoom): Promise<void> {
  const current = await getClasses();
  const normalizedCode = classItem.code.trim().toUpperCase();
  const existingIdx = current.findIndex(
    (c) => c.id === classItem.id || c.code.trim().toUpperCase() === normalizedCode
  );
  let updated: ClassRoom[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = classItem;
  } else {
    updated = [...current, classItem];
  }

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('exam:classes', updated);
    } catch (err) {
      console.error('Error saving class to Redis:', err);
    }
  }
  memoryClasses = updated;
}

export async function deleteClass(idOrCode: string): Promise<void> {
  const current = await getClasses();
  const target = idOrCode.trim().toUpperCase();
  const updated = current.filter((c) => c.id !== idOrCode && c.code.trim().toUpperCase() !== target);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('exam:classes', updated);
    } catch (err) {
      console.error('Error deleting class in Redis:', err);
    }
  }
  memoryClasses = updated;
}

// ---------------- TEACHERS ----------------
export async function getTeachers(): Promise<TeacherAccount[]> {
  const redis = getRedis();
  if (redis) {
    try {
      let teachers = await redis.get<any>('exam:teachers');
      if (typeof teachers === 'string') {
        try {
          teachers = JSON.parse(teachers);
        } catch {}
      }
      if (Array.isArray(teachers) && teachers.length > 0) return teachers;
    } catch (err) {
      console.error('Error reading teachers from Redis:', err);
    }
  }
  return memoryTeachers;
}

export async function saveTeacher(teacher: TeacherAccount): Promise<void> {
  const current = await getTeachers();
  const existingIdx = current.findIndex(
    (t) => t.id === teacher.id || t.username.toLowerCase() === teacher.username.toLowerCase()
  );
  let updated: TeacherAccount[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = teacher;
  } else {
    updated = [...current, teacher];
  }

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('exam:teachers', updated);
    } catch (err) {
      console.error('Error saving teacher to Redis:', err);
    }
  }
  memoryTeachers = updated;
}

export async function deleteTeacher(id: string): Promise<void> {
  const current = await getTeachers();
  const updated = current.filter((t) => t.id !== id);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set('exam:teachers', updated);
    } catch (err) {
      console.error('Error deleting teacher in Redis:', err);
    }
  }
  memoryTeachers = updated;
}

// ---------------- ACTIVE EXAM SESSIONS ----------------
export interface ActiveStudentSession {
  attemptId: string;
  studentName: string;
  studentClass: string;
  assignedCode: string;
  sanitizedQuestions: any[];
  durationSeconds: number;
  startTime: string;
  totalQuestions: number;
}

const memorySessions = new Map<string, ActiveStudentSession>();

function getSessionKey(studentClass: string, studentName: string): string {
  return `exam:session:${studentClass.trim().toUpperCase()}:${studentName.trim().toUpperCase()}`;
}

export async function getActiveStudentSession(
  studentClass: string,
  studentName: string
): Promise<ActiveStudentSession | null> {
  const key = getSessionKey(studentClass, studentName);
  const redis = getRedis();
  if (redis) {
    try {
      const session = await redis.get<ActiveStudentSession>(key);
      if (session && session.attemptId) return session;
    } catch (err) {
      console.error('Error reading active session from Redis:', err);
    }
  }
  return memorySessions.get(key) || null;
}

export async function saveActiveStudentSession(session: ActiveStudentSession): Promise<void> {
  const key = getSessionKey(session.studentClass, session.studentName);
  const redis = getRedis();
  const ttl = Math.max(300, (session.durationSeconds || 900) + 600);
  if (redis) {
    try {
      await redis.set(key, session, { ex: ttl });
    } catch (err) {
      console.error('Error saving active session to Redis:', err);
    }
  }
  memorySessions.set(key, session);
}

export async function deleteActiveStudentSession(
  studentClass: string,
  studentName: string
): Promise<void> {
  const key = getSessionKey(studentClass, studentName);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.del(key);
    } catch (err) {
      console.error('Error deleting active session from Redis:', err);
    }
  }
  memorySessions.delete(key);
}

