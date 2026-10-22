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
async function addSubmission(sub) {
  const redis = getRedis();
  if (redis) {
    try {
      let list = await redis.get("exam:submissions");
      if (typeof list === "string") {
        try {
          list = JSON.parse(list);
        } catch {
          list = [];
        }
      }
      const currentList = Array.isArray(list) ? list : [];
      const filtered = currentList.filter((s) => s.submission_id !== sub.submission_id);
      const updated = [sub, ...filtered].slice(0, 2e3);
      await redis.set("exam:submissions", updated);
      return;
    } catch (err) {
      console.error("Error saving submission to Redis:", err);
    }
  }
  memorySubmissions = [sub, ...memorySubmissions.filter((s) => s.submission_id !== sub.submission_id)];
}
async function deleteSubmission(id) {
  const redis = getRedis();
  if (redis) {
    try {
      let list = await redis.get("exam:submissions");
      if (typeof list === "string") {
        try {
          list = JSON.parse(list);
        } catch {
          list = [];
        }
      }
      const currentList = Array.isArray(list) ? list : [];
      const updated = currentList.filter((s) => s.submission_id !== id && s.attempt_id !== id);
      await redis.set("exam:submissions", updated);
      return true;
    } catch (err) {
      console.error("Error deleting submission in Redis:", err);
    }
  }
  const prevCount = memorySubmissions.length;
  memorySubmissions = memorySubmissions.filter((s) => s.submission_id !== id && s.attempt_id !== id);
  return memorySubmissions.length !== prevCount;
}
async function clearSubmissions() {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.del("exam:submissions");
    } catch (err) {
      console.error("Error clearing submissions in Redis:", err);
    }
  }
  memorySubmissions = [];
}

// api_src/submissions.ts
async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;
    const method = (req.method || "GET").toUpperCase();
    if (method === "GET") {
      const list = await getSubmissions();
      return sendJson(res, 200, list);
    }
    if (method === "DELETE") {
      const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      const id = url.searchParams.get("id");
      const pathSegments = url.pathname.split("/").filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const pathId = lastSegment && lastSegment !== "submissions" ? lastSegment : null;
      const body = await parseJsonBody(req);
      const targetId = id || pathId || body?.id;
      if (targetId) {
        await deleteSubmission(targetId);
        return sendJson(res, 200, { success: true, message: `Submission ${targetId} deleted` });
      }
      await clearSubmissions();
      return sendJson(res, 200, { success: true, message: "All submissions cleared" });
    }
    if (method === "POST") {
      const body = await parseJsonBody(req);
      if (body && body.submission_id) {
        await addSubmission(body);
        return sendJson(res, 200, { success: true, submission: body });
      }
      return sendJson(res, 400, { error: "Invalid submission record" });
    }
    return sendJson(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error in /api/submissions:", err);
    return sendJson(res, 500, { error: err?.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
