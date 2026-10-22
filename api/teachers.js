// Pre-bundled Vercel Serverless Function (AntiCheatExamPro)


// api_src/_storage.ts
import { Redis } from "@upstash/redis";

// src/data/defaultClasses.ts
var DEFAULT_TEACHERS = [
  {
    id: "tc_admin",
    username: "admin",
    password: "admin2026",
    fullName: "Qu\u1EA3n Tr\u1ECB Vi\xEAn (Admin Tr\u01B0\u1EDDng)",
    role: "admin",
    subject: "T\u1EA5t c\u1EA3"
  },
  {
    id: "tc_tin",
    username: "gv_tin",
    password: "tin2026",
    fullName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    role: "teacher",
    subject: "Tin h\u1ECDc",
    assignedClasses: ["6G01", "7A1", "7A2"]
  },
  {
    id: "tc_toan",
    username: "gv_toan",
    password: "toan2026",
    fullName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n To\xE1n H\u1ECDc",
    role: "teacher",
    subject: "To\xE1n h\u1ECDc",
    assignedClasses: ["10A1"]
  },
  {
    id: "tc_ly",
    username: "gv_ly",
    password: "ly2026",
    fullName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n V\u1EADt L\xED",
    role: "teacher",
    subject: "V\u1EADt l\xED",
    assignedClasses: ["12A3"]
  },
  {
    id: "tc_hoa",
    username: "gv_hoa",
    password: "hoa2026",
    fullName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n H\xF3a H\u1ECDc",
    role: "teacher",
    subject: "H\xF3a h\u1ECDc"
  },
  {
    id: "tc_sinh",
    username: "gv_sinh",
    password: "sinh2026",
    fullName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Sinh H\u1ECDc",
    role: "teacher",
    subject: "Sinh h\u1ECDc"
  }
];

// api_src/_storage.ts
var redisInstance = null;
var redisInitialized = false;
var memoryTeachers = DEFAULT_TEACHERS;
function getRedis() {
  if (redisInitialized) return redisInstance;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_KV_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_KV_TOKEN;
  if (url && token) {
    try {
      redisInstance = new Redis({ url, token });
      console.log("\u2705 Connected to Upstash Redis Cloud Storage");
    } catch (err) {
      console.error("\u274C Failed to initialize Upstash Redis:", err);
      redisInstance = null;
    }
  } else {
    console.warn("\u26A0\uFE0F No Upstash Redis env detected (UPSTASH_REDIS_REST_URL / KV_REST_API_URL). Using in-memory fallback.");
    redisInstance = null;
  }
  redisInitialized = true;
  return redisInstance;
}
function handleCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if ((req.method || "").toUpperCase() === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return true;
  }
  return false;
}
async function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  if (typeof req.body === "string") {
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
    let raw = "";
    const timer = setTimeout(() => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    }, 1500);
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      clearTimeout(timer);
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => {
      clearTimeout(timer);
      resolve({});
    });
  });
}
function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.end(JSON.stringify(data));
}
async function getTeachers() {
  const redis = getRedis();
  if (redis) {
    try {
      let teachers = await redis.get("exam:teachers");
      if (typeof teachers === "string") {
        try {
          teachers = JSON.parse(teachers);
        } catch {
        }
      }
      if (Array.isArray(teachers) && teachers.length > 0) return teachers;
    } catch (err) {
      console.error("Error reading teachers from Redis:", err);
    }
  }
  return memoryTeachers;
}
async function saveTeacher(teacher) {
  const current = await getTeachers();
  const existingIdx = current.findIndex(
    (t) => t.id === teacher.id || t.username.toLowerCase() === teacher.username.toLowerCase()
  );
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = teacher;
  } else {
    updated = [...current, teacher];
  }
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("exam:teachers", updated);
    } catch (err) {
      console.error("Error saving teacher to Redis:", err);
    }
  }
  memoryTeachers = updated;
}
async function deleteTeacher(id) {
  const current = await getTeachers();
  const updated = current.filter((t) => t.id !== id);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("exam:teachers", updated);
    } catch (err) {
      console.error("Error deleting teacher in Redis:", err);
    }
  }
  memoryTeachers = updated;
}

// api_src/teachers.ts
async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;
    const method = (req.method || "GET").toUpperCase();
    if (method === "GET") {
      const teachers = await getTeachers();
      const safeList = teachers.map(({ password: _, ...rest }) => rest);
      return sendJson(res, 200, safeList);
    }
    if (method === "POST") {
      const body = await parseJsonBody(req);
      const { id, username, password, fullName, role, subject, assignedClasses } = body;
      if (!username || !password || !fullName) {
        return sendJson(res, 400, { error: "Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EE7 T\xEAn \u0111\u0103ng nh\u1EADp, M\u1EADt kh\u1EA9u v\xE0 H\u1ECD t\xEAn" });
      }
      const teacherAccount = {
        id: id || `tc_${Date.now()}`,
        username: username.trim(),
        password: password.trim(),
        fullName: fullName.trim(),
        role: role === "admin" ? "admin" : "teacher",
        subject: subject || "Tin h\u1ECDc",
        assignedClasses: assignedClasses || []
      };
      await saveTeacher(teacherAccount);
      const { password: _, ...safe } = teacherAccount;
      return sendJson(res, 200, { success: true, teacher: safe });
    }
    if (method === "DELETE") {
      const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      const id = url.searchParams.get("id");
      const pathSegments = url.pathname.split("/").filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const pathId = lastSegment && lastSegment !== "teachers" ? lastSegment : null;
      const body = await parseJsonBody(req);
      const targetId = id || pathId || body?.id;
      if (!targetId) {
        return sendJson(res, 400, { error: "Thi\u1EBFu ID gi\xE1o vi\xEAn c\u1EA7n x\xF3a" });
      }
      if (targetId === "tc_admin") {
        return sendJson(res, 400, { error: "Kh\xF4ng th\u1EC3 x\xF3a t\xE0i kho\u1EA3n Qu\u1EA3n tr\u1ECB vi\xEAn m\u1EB7c \u0111\u1ECBnh!" });
      }
      await deleteTeacher(targetId);
      return sendJson(res, 200, { success: true });
    }
    return sendJson(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error in /api/teachers:", err);
    return sendJson(res, 500, { error: err?.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
