import type { IncomingMessage, ServerResponse } from 'http';
import { getSubmissions, clearSubmissions, addSubmission, parseJsonBody, sendJson } from './_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const method = (req.method || 'GET').toUpperCase();

  if (method === 'GET') {
    const list = await getSubmissions();
    return sendJson(res, 200, list);
  }

  if (method === 'DELETE') {
    await clearSubmissions();
    return sendJson(res, 200, { success: true, message: 'All submissions cleared' });
  }

  if (method === 'POST') {
    const body = await parseJsonBody(req);
    if (body && body.submission_id) {
      await addSubmission(body);
      return sendJson(res, 200, { success: true, submission: body });
    }
    return sendJson(res, 400, { error: 'Invalid submission record' });
  }

  return sendJson(res, 405, { error: 'Method Not Allowed' });
}
