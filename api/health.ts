import type { IncomingMessage, ServerResponse } from 'http';
import { isRedisConfigured, getSubmissions } from './_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const submissions = await getSubmissions();
  const redisOk = isRedisConfigured();

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: 'ok',
      platform: 'Vercel Serverless',
      redis_connected: redisOk,
      total_submissions: submissions.length,
      timestamp: new Date().toISOString()
    })
  );
}
