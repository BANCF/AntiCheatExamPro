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

// api_src/_storage.ts
var redisInstance = null;
var redisInitialized = false;
var memoryConfig = DEFAULT_EXAM_CONFIG;
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
async function saveExamConfig(config) {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("exam:config", config);
    } catch (err) {
      console.error("Error saving config to Redis:", err);
    }
  }
  memoryConfig = config;
}

// api_src/config.ts
async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;
    const method = (req.method || "GET").toUpperCase();
    if (method === "GET") {
      const config = await getExamConfig();
      return sendJson(res, 200, config);
    }
    if (method === "POST") {
      const body = await parseJsonBody(req);
      if (body && body.title) {
        await saveExamConfig(body);
        return sendJson(res, 200, { success: true, config: body });
      }
      return sendJson(res, 400, { error: "Invalid config payload" });
    }
    return sendJson(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error in /api/config:", err);
    return sendJson(res, 500, { error: err?.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
