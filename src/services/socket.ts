import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    // In dev with Vite on port 5173, backend runs on 3000
    // In production, both are on the same origin
    const url =
      window.location.port === '5173'
        ? `http://${window.location.hostname}:3000`
        : window.location.origin;

    socket = io(url, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    socket.on('connect', () => {
      console.log('📡 Connected to Realtime Proctoring Server:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.warn('⚠️ Disconnected from Realtime Proctoring Server');
    });
  }

  return socket;
}
