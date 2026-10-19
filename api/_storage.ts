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
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

export function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
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
      const list = await redis.get<SubmissionRecord[]>('exam:submissions');
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
      const list = (await redis.get<SubmissionRecord[]>('exam:submissions')) || [];
      const filtered = Array.isArray(list) ? list.filter((s) => s.submission_id !== sub.submission_id) : [];
      const updated = [sub, ...filtered].slice(0, 2000);
      await redis.set('exam:submissions', updated);
      return;
    } catch (err) {
      console.error('Error saving submission to Redis:', err);
    }
  }
  memorySubmissions = [sub, ...memorySubmissions.filter((s) => s.submission_id !== sub.submission_id)];
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
      const bank = await redis.get<Question[]>('exam:bank');
      if (Array.isArray(bank) && bank.length > 0) return bank;
    } catch (err) {
      console.error('Error reading bank from Redis:', err);
    }
  }
  return memoryBank;
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
      const config = await redis.get<ExamConfig>('exam:config');
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
      const classes = await redis.get<ClassRoom[]>('exam:classes');
      if (Array.isArray(classes) && classes.length > 0) return classes;
    } catch (err) {
      console.error('Error reading classes from Redis:', err);
    }
  }
  return memoryClasses;
}

export async function saveClass(classItem: ClassRoom): Promise<void> {
  const current = await getClasses();
  const existingIdx = current.findIndex((c) => c.id === classItem.id || c.code === classItem.code);
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
  const updated = current.filter((c) => c.id !== idOrCode && c.code !== idOrCode);
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
      const teachers = await redis.get<TeacherAccount[]>('exam:teachers');
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
