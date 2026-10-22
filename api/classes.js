// Pre-bundled Vercel Serverless Function (AntiCheatExamPro)


// api_src/_storage.ts
import { Redis } from "@upstash/redis";

// src/data/defaultClasses.ts
var DEFAULT_CLASSES = [
  {
    id: "cls_6ontap",
    code: "6ONTAP",
    name: "L\u1EDBp 6 - \xD4n T\u1EADp Th\u01B0\u1EDDng Xuy\xEAn (Test)",
    grade: "L\u1EDBp 6",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "6666",
    examTitle: "\u0110\u1EC1 \xD4n T\u1EADp Th\u01B0\u1EDDng Xuy\xEAn - Tin H\u1ECDc 6",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: "L\u1EDBp 6",
      target_subject: "Tin h\u1ECDc",
      target_term: "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn",
      exam_mode: "bank",
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: "\u0110\u1EC1 \xF4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn Tin h\u1ECDc 6 (Ng\xE2n h\xE0ng 50 c\xE2u: 44 tr\u1EAFc nghi\u1EC7m \u0111\u01A1n + 6 tr\u1EAFc nghi\u1EC7m \u0111\xFAng/sai)"
  },
  {
    id: "cls_6g01",
    code: "6G01",
    name: "L\u1EDBp 6G01 - Tin H\u1ECDc 6",
    grade: "L\u1EDBp 6",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "6001",
    examTitle: "\u0110\u1EC1 \xD4n T\u1EADp Th\u01B0\u1EDDng Xuy\xEAn - Tin H\u1ECDc 6 (L\u1EDBp 6G01)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: "L\u1EDBp 6",
      target_subject: "Tin h\u1ECDc",
      target_term: "\xD4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn",
      exam_mode: "bank",
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: "\u0110\u1EC1 thi \xF4n t\u1EADp th\u01B0\u1EDDng xuy\xEAn Tin h\u1ECDc 6 (16 tr\u1EAFc nghi\u1EC7m + 4 \u0111\xFAng/sai)"
  },
  {
    id: "cls_7a1",
    code: "7A1",
    name: "L\u1EDBp 7A1 - Tin H\u1ECDc 7",
    grade: "L\u1EDBp 7",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "2026",
    examTitle: "Ki\u1EC3m Tra Tin H\u1ECDc 7 - H\u1ECDc K\xEC II (L\u1EDBp 7A1)",
    examConfig: {
      duration_minutes: 15,
      total_questions_to_pick: 10,
      target_grade: "L\u1EDBp 7",
      target_subject: "Tin h\u1ECDc",
      exam_mode: "bank",
      distribution: {
        single_choice: 8,
        true_false: 2
      }
    },
    isActive: true,
    description: "B\xE0i thi tr\u1EAFc nghi\u1EC7m kh\xE1ch quan ng\u1EABu nhi\xEAn h\xF3a \u0111\u1EC1 cho l\u1EDBp 7A1"
  },
  {
    id: "cls_7a2",
    code: "7A2",
    name: "L\u1EDBp 7A2 - Tin H\u1ECDc 7",
    grade: "L\u1EDBp 7",
    subject: "Tin h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n Tin H\u1ECDc",
    pinCode: "7226",
    examTitle: "Ki\u1EC3m Tra Tin H\u1ECDc 7 - \u0110\u1EC1 S\u1ED1 2 (L\u1EDBp 7A2)",
    examConfig: {
      duration_minutes: 15,
      total_questions_to_pick: 10,
      target_grade: "L\u1EDBp 7",
      target_subject: "Tin h\u1ECDc",
      exam_mode: "bank",
      distribution: {
        single_choice: 8,
        true_false: 2
      }
    },
    isActive: true,
    description: "B\xE0i thi tr\u1EAFc nghi\u1EC7m ri\xEAng bi\u1EC7t cho h\u1ECDc sinh l\u1EDBp 7A2"
  },
  {
    id: "cls_10a1",
    code: "10A1",
    name: "L\u1EDBp 10A1 - To\xE1n H\u1ECDc 10",
    grade: "L\u1EDBp 10",
    subject: "To\xE1n h\u1ECDc",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n To\xE1n H\u1ECDc",
    pinCode: "1010",
    examTitle: "Ki\u1EC3m Tra \u0110\u1EA1i S\u1ED1 & H\xECnh H\u1ECDc 10 (L\u1EDBp 10A1)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: "L\u1EDBp 10",
      target_subject: "To\xE1n h\u1ECDc",
      exam_mode: "bank",
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: "Ph\xF2ng thi To\xE1n l\u1EDBp 10A1 c\xF3 c\xF4ng th\u1EE9c LaTeX"
  },
  {
    id: "cls_12a3",
    code: "12A3",
    name: "L\u1EDBp 12A3 - V\u1EADt L\xED 12",
    grade: "L\u1EDBp 12",
    subject: "V\u1EADt l\xED",
    teacherName: "Th\u1EA7y/C\xF4 B\u1ED9 M\xF4n V\u1EADt L\xED",
    pinCode: "1234",
    examTitle: "Ki\u1EC3m Tra Chuy\xEAn \u0110\u1EC1 S\xF3ng \xC1nh S\xE1ng (L\u1EDBp 12A3)",
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 25,
      target_grade: "L\u1EDBp 12",
      target_subject: "V\u1EADt l\xED",
      exam_mode: "bank",
      distribution: {
        single_choice: 20,
        true_false: 5
      }
    },
    isActive: true,
    description: "Ph\xF2ng thi V\u1EADt l\xED 12A3 ch\u1ED1ng gian l\u1EADn \u0111a l\u1EDBp"
  }
];

// api_src/_storage.ts
var redisInstance = null;
var redisInitialized = false;
var memoryClasses = DEFAULT_CLASSES;
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
async function getClasses() {
  const redis = getRedis();
  if (redis) {
    try {
      let classes = await redis.get("exam:classes");
      if (typeof classes === "string") {
        try {
          classes = JSON.parse(classes);
        } catch {
        }
      }
      if (Array.isArray(classes) && classes.length > 0) return classes;
    } catch (err) {
      console.error("Error reading classes from Redis:", err);
    }
  }
  return memoryClasses;
}
async function saveClass(classItem) {
  const current = await getClasses();
  const normalizedCode = classItem.code.trim().toUpperCase();
  const existingIdx = current.findIndex(
    (c) => c.id === classItem.id || c.code.trim().toUpperCase() === normalizedCode
  );
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = classItem;
  } else {
    updated = [...current, classItem];
  }
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("exam:classes", updated);
    } catch (err) {
      console.error("Error saving class to Redis:", err);
    }
  }
  memoryClasses = updated;
}
async function deleteClass(idOrCode) {
  const current = await getClasses();
  const target = idOrCode.trim().toUpperCase();
  const updated = current.filter((c) => c.id !== idOrCode && c.code.trim().toUpperCase() !== target);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("exam:classes", updated);
    } catch (err) {
      console.error("Error deleting class in Redis:", err);
    }
  }
  memoryClasses = updated;
}

// api_src/classes.ts
async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;
    const method = (req.method || "GET").toUpperCase();
    if (method === "GET") {
      const classes = await getClasses();
      return sendJson(res, 200, classes);
    }
    if (method === "POST") {
      const body = await parseJsonBody(req);
      const { id, code, name, grade, subject, teacherName, pinCode, examTitle, examConfig, isActive, description, createdAt } = body;
      if (!code || !name) {
        return sendJson(res, 400, { error: "M\xE3 l\u1EDBp v\xE0 T\xEAn l\u1EDBp l\xE0 b\u1EAFt bu\u1ED9c!" });
      }
      const classes = await getClasses();
      const normalizedCode = code.trim().toUpperCase();
      const existing = classes.find(
        (c) => id && c.id === id || c.code.trim().toUpperCase() === normalizedCode
      );
      const classItem = {
        id: id || existing?.id || `cls_${Date.now()}`,
        code: normalizedCode,
        name: name.trim(),
        grade: grade || existing?.grade || "L\u1EDBp 6",
        subject: subject || existing?.subject || "Tin h\u1ECDc",
        teacherName: teacherName || existing?.teacherName || "Gi\xE1o vi\xEAn b\u1ED9 m\xF4n",
        pinCode: (pinCode || existing?.pinCode || "2026").trim(),
        examTitle: examTitle?.trim() || existing?.examTitle || `Ki\u1EC3m tra ${subject || "B\u1ED9 m\xF4n"} - ${normalizedCode}`,
        examConfig: examConfig || existing?.examConfig || {},
        isActive: isActive !== void 0 ? Boolean(isActive) : existing?.isActive ?? true,
        description: description !== void 0 ? description : existing?.description || "",
        createdAt: existing ? existing.createdAt : createdAt || (/* @__PURE__ */ new Date()).toISOString()
      };
      await saveClass(classItem);
      return sendJson(res, 200, { success: true, classItem });
    }
    if (method === "DELETE") {
      const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
      const id = url.searchParams.get("id");
      const pathSegments = url.pathname.split("/").filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const pathId = lastSegment && lastSegment !== "classes" ? lastSegment : null;
      const body = await parseJsonBody(req);
      const targetId = id || pathId || body?.id;
      if (!targetId) {
        return sendJson(res, 400, { error: "Thi\u1EBFu ID l\u1EDBp c\u1EA7n x\xF3a" });
      }
      await deleteClass(targetId);
      return sendJson(res, 200, { success: true });
    }
    return sendJson(res, 405, { error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error in /api/classes:", err);
    return sendJson(res, 500, { error: err?.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
