import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const url =
      import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
        : window.location.port === '5173'
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
