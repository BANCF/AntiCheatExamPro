import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Lightweight mock socket for serverless environments (e.g. Vercel) where no persistent WebSocket daemon exists
class SafeMockSocket {
  public id = 'mock-session';
  public connected = false;
  private listeners: Record<string, Function[]> = {};

  on(event: string, fn: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
    return this;
  }
  off(event: string, fn?: Function) {
    if (!fn) {
      delete this.listeners[event];
    } else if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== fn);
    }
    return this;
  }
  emit(_event: string, ..._args: any[]) {
    // No-op on serverless, zero network lag!
    return this;
  }
}

export function getSocket(): Socket {
  if (!socket) {
    const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
    const customUrl = import.meta.env.VITE_API_URL;

    // On Vercel without a dedicated external WebSocket server, use SafeMockSocket to avoid 404 poll storm
    if (isVercel && !customUrl) {
      socket = (new SafeMockSocket() as unknown) as Socket;
      return socket;
    }

    const url = customUrl
      ? customUrl.replace(/\/$/, '')
      : window.location.port === '5173'
        ? `http://${window.location.hostname}:3000`
        : window.location.origin;

    try {
      socket = io(url, {
        transports: ['websocket'], // Prefer WebSocket only to prevent failing HTTP polling loops
        reconnectionAttempts: 3,
        reconnectionDelay: 5000,
        timeout: 3000
      });

      socket.on('connect', () => {
        console.log('📡 Connected to Realtime Proctoring Server:', socket?.id);
      });

      socket.on('connect_error', () => {
        // Silently handle connection error without freezing the browser
      });
    } catch {
      socket = (new SafeMockSocket() as unknown) as Socket;
    }
  }

  return socket;
}

