import type { IncomingMessage, ServerResponse } from 'http';
import { getQuestionBank, saveQuestionBank, parseJsonBody, sendJson, handleCors } from './_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (handleCors(req, res)) return;

    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const bank = await getQuestionBank();
      return sendJson(res, 200, bank);
    }

    if (method === 'POST') {
      const body = await parseJsonBody(req);
      if (Array.isArray(body)) {
        await saveQuestionBank(body);
        return sendJson(res, 200, { success: true, count: body.length });
      }
      return sendJson(res, 400, { error: 'Data must be an array of questions' });
    }

    return sendJson(res, 405, { error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('API Error in /api/bank:', err);
    return sendJson(res, 500, { error: err?.message || 'Internal Server Error' });
  }
}
