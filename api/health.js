// Pre-bundled Vercel Serverless Function (AntiCheatExamPro)


// api_src/_storage.ts
import { Redis } from "@upstash/redis";
var redisInstance = null;
var redisInitialized = false;
var memorySubmissions = [];
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
function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.end(JSON.stringify(data));
}
function isRedisConfigured() {
  return getRedis() !== null;
}
async function getSubmissions() {
  const redis = getRedis();
  if (redis) {
    try {
      let list = await redis.get("exam:submissions");
      if (typeof list === "string") {
        try {
          list = JSON.parse(list);
        } catch {
        }
      }
      if (Array.isArray(list)) return list;
    } catch (err) {
      console.error("Error fetching submissions from Redis:", err);
    }
  }
  return memorySubmissions;
}

// api_src/health.ts
async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;
    const submissions = await getSubmissions();
    const redisOk = isRedisConfigured();
    return sendJson(res, 200, {
      status: "ok",
      platform: "Vercel Serverless",
      redis_connected: redisOk,
      total_submissions: submissions.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (err) {
    return sendJson(res, 200, {
      status: "fallback",
      platform: "Vercel Serverless",
      redis_connected: false,
      error: err?.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
}
export {
  handler as default
};
