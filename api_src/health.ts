import type { IncomingMessage, ServerResponse } from 'http';
import { isRedisConfigured, getSubmissions, handleCors, sendJson } from './_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (handleCors(req, res)) return;
    const submissions = await getSubmissions();
    const redisOk = isRedisConfigured();

    return sendJson(res, 200, {
      status: 'ok',
      platform: 'Vercel Serverless',
      redis_connected: redisOk,
      total_submissions: submissions.length,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return sendJson(res, 200, {
      status: 'fallback',
      platform: 'Vercel Serverless',
      redis_connected: false,
      error: err?.message,
      timestamp: new Date().toISOString()
    });
  }
}
