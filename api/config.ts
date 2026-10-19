import type { IncomingMessage, ServerResponse } from 'http';
import { getExamConfig, saveExamConfig, parseJsonBody, sendJson } from './_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const method = (req.method || 'GET').toUpperCase();

  if (method === 'GET') {
    const config = await getExamConfig();
    return sendJson(res, 200, config);
  }

  if (method === 'POST') {
    const body = await parseJsonBody(req);
    if (body && body.title) {
      await saveExamConfig(body);
      return sendJson(res, 200, { success: true, config: body });
    }
    return sendJson(res, 400, { error: 'Invalid config payload' });
  }

  return sendJson(res, 405, { error: 'Method Not Allowed' });
}
