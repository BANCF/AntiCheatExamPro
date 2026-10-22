// Pre-bundled Vercel Serverless Function (AntiCheatExamPro)


// api_src/_storage.ts
import { Redis } from "@upstash/redis";

// src/data/defaultQuestionBank.ts
var DEFAULT_EXAM_CONFIG = {
  exam_id: "exam_tin7_giuaki1",
  title: "\u0110\u1EC1 C\u01B0\u01A1ng \xD4n T\u1EADp Gi\u1EEFa H\u1ECDc K\xEC I - M\xF4n Tin H\u1ECDc 7",
  duration_minutes: 45,
  max_violations_allowed: 3,
  total_questions_to_pick: 20,
  distribution: {
    single_choice: 16,
    true_false: 4
  },
  access_pin: "",
  teacher_password: "admin2026",
  variants_count: 12,
  base_code: 101,
  session_salt: 2026
};

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
var memoryConfig = DEFAULT_EXAM_CONFIG;
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
async function getExamConfig() {
  const redis = getRedis();
  if (redis) {
    try {
      let config = await redis.get("exam:config");
      if (typeof config === "string") {
        try {
          config = JSON.parse(config);
        } catch {
        }
      }
      if (config && config.title) return config;
    } catch (err) {
      console.error("Error reading config from Redis:", err);
    }
  }
  return memoryConfig;
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

// api_src/auth/teacher.ts
async function handler(req, res) {
  if (handleCors(req, res)) return;
  if ((req.method || "GET").toUpperCase() !== "POST") {
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }
  try {
    const body = await parseJsonBody(req);
    const { username, password } = body;
    const cleanPass = (password || "").trim();
    const cleanUser = (username || "").trim().toLowerCase();
    if (!cleanPass) {
      return sendJson(res, 400, { success: false, error: "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u qu\u1EA3n tr\u1ECB!" });
    }
    const teachers = await getTeachers();
    const config = await getExamConfig();
    if (!cleanUser) {
      const match = teachers.find((t) => t.password.trim() === cleanPass) || (cleanPass === (config.teacher_password || "admin2026").trim() ? teachers[0] : null);
      if (match) {
        const { password: _, ...safe } = match;
        return sendJson(res, 200, { success: true, teacher: safe });
      }
      return sendJson(res, 401, { success: false, error: "M\u1EADt kh\u1EA9u gi\xE1o vi\xEAn kh\xF4ng ch\xEDnh x\xE1c!" });
    }
    const found = teachers.find(
      (t) => t.username.toLowerCase() === cleanUser && t.password.trim() === cleanPass
    );
    if (found) {
      const { password: _, ...safe } = found;
      return sendJson(res, 200, { success: true, teacher: safe });
    }
    if (cleanUser === "admin" && cleanPass === (config.teacher_password || "admin2026").trim()) {
      const adminTeacher = teachers[0] || {
        id: "tc_admin",
        username: "admin",
        fullName: "Qu\u1EA3n Tr\u1ECB Vi\xEAn (Admin Tr\u01B0\u1EDDng)",
        role: "admin",
        subject: "T\u1EA5t c\u1EA3"
      };
      const { password: _, ...safe } = adminTeacher;
      return sendJson(res, 200, { success: true, teacher: safe });
    }
    return sendJson(res, 401, {
      success: false,
      error: "T\xEAn \u0111\u0103ng nh\u1EADp ho\u1EB7c m\u1EADt kh\u1EA9u kh\xF4ng ch\xEDnh x\xE1c! Vui l\xF2ng ki\u1EC3m tra l\u1EA1i."
    });
  } catch (err) {
    return sendJson(res, 500, { error: "L\u1ED7i x\xE1c th\u1EF1c: " + (err?.message || err) });
  }
}
export {
  handler as default
};
