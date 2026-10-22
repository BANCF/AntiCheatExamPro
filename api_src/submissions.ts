import type { IncomingMessage, ServerResponse } from 'http';
import { getSubmissions, clearSubmissions, addSubmission, deleteSubmission, parseJsonBody, sendJson, handleCors } from './_storage';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    if (handleCors(req, res)) return;

    const method = (req.method || 'GET').toUpperCase();

    if (method === 'GET') {
      const list = await getSubmissions();
      return sendJson(res, 200, list);
    }

    if (method === 'DELETE') {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id');
      const pathSegments = url.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];
      const pathId = lastSegment && lastSegment !== 'submissions' ? lastSegment : null;
      const body = await parseJsonBody(req);
      const targetId = id || pathId || body?.id;

      if (targetId) {
        await deleteSubmission(targetId);
        return sendJson(res, 200, { success: true, message: `Submission ${targetId} deleted` });
      }
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
  } catch (err: any) {
    console.error('API Error in /api/submissions:', err);
    return sendJson(res, 500, { error: err?.message || 'Internal Server Error' });
  }
}
