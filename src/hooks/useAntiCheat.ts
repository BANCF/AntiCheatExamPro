import { useState, useEffect, useRef, useCallback } from 'react';
import { ViolationLog, ViolationType } from '../types/exam';

interface UseAntiCheatOptions {
  enabled: boolean;
  maxViolationsAllowed: number;
  onForceSubmit: (finalLogs: ViolationLog[]) => void;
}

export function useAntiCheat({
  enabled,
  maxViolationsAllowed,
  onForceSubmit
}: UseAntiCheatOptions) {
  const [violationCount, setViolationCount] = useState<number>(0);
  const [violationsLog, setViolationsLog] = useState<ViolationLog[]>([]);

  // Warning modal state
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [currentWarning, setCurrentWarning] = useState<{
    title: string;
    message: string;
    type: ViolationType;
    count: number;
  } | null>(null);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFullscreenWarningOpen, setIsFullscreenWarningOpen] = useState<boolean>(false);
  const [fullscreenCountdown, setFullscreenCountdown] = useState<number>(10);

  // Refs for tracking timestamps and preventing double counting
  const blurStartTimeRef = useRef<number | null>(null);
  const violationCountRef = useRef<number>(0);
  const violationsLogRef = useRef<ViolationLog[]>([]);
  const hasForceSubmittedRef = useRef<boolean>(false);
  const fullscreenTimerRef = useRef<number | null>(null);

  // Sync refs
  useEffect(() => {
    violationCountRef.current = violationCount;
  }, [violationCount]);

  useEffect(() => {
    violationsLogRef.current = violationsLog;
  }, [violationsLog]);

  // Record a violation
  const recordViolation = useCallback(
    (type: ViolationType, note?: string, durationSeconds?: number) => {
      if (!enabled || hasForceSubmittedRef.current) return;

      const newCount = violationCountRef.current + 1;
      violationCountRef.current = newCount;
      setViolationCount(newCount);

      const logEntry: ViolationLog = {
        id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        type,
        duration: durationSeconds,
        note
      };

      const updatedLogs = [...violationsLogRef.current, logEntry];
      violationsLogRef.current = updatedLogs;
      setViolationsLog(updatedLogs);

      // Check if threshold reached
      if (newCount >= maxViolationsAllowed) {
        hasForceSubmittedRef.current = true;
        setIsWarningModalOpen(false);
        setIsFullscreenWarningOpen(false);
        onForceSubmit(updatedLogs);
        return;
      }

      // Show warning modal
      let title = 'Cảnh báo Vi phạm!';
      let message = `Hệ thống ghi nhận bạn đã thực hiện thao tác không được phép. Lần vi phạm: ${newCount}/${maxViolationsAllowed}.`;
      if (type === 'TAB_SWITCH' || type === 'WINDOW_BLUR') {
        title = 'Cảnh báo Rời màn hình thi!';
        message = `Bạn đã chuyển tab hoặc mở ứng dụng khác${
          durationSeconds ? ` trong ${durationSeconds} giây` : ''
        }. Vui lòng chỉ làm bài trên trang này! (Lần vi phạm: ${newCount}/${maxViolationsAllowed})`;
      } else if (type === 'DEVTOOLS' || type === 'SHORTCUT_ATTEMPT') {
        title = 'Cảnh báo Phím tắt bị chặn!';
        message = `Phím tắt nhà phát triển hoặc thao tác hệ thống bị cấm trong phòng thi. (Lần vi phạm: ${newCount}/${maxViolationsAllowed})`;
      } else if (type === 'FULLSCREEN_EXIT') {
        title = 'Cảnh báo Thoát Toàn Màn Hình!';
        message = `Bạn đã thoát chế độ toàn màn hình quá thời gian cho phép. (Lần vi phạm: ${newCount}/${maxViolationsAllowed})`;
      }

      setCurrentWarning({
        title,
        message,
        type,
        count: newCount
      });
      setIsWarningModalOpen(true);
    },
    [enabled, maxViolationsAllowed, onForceSubmit]
  );

  // Request Fullscreen
  const requestFullscreen = useCallback(async () => {
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if ((docEl as any).webkitRequestFullscreen) {
        await (docEl as any).webkitRequestFullscreen();
      } else if ((docEl as any).msRequestFullscreen) {
        await (docEl as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
      setIsFullscreenWarningOpen(false);
      if (fullscreenTimerRef.current) {
        window.clearInterval(fullscreenTimerRef.current);
        fullscreenTimerRef.current = null;
      }
    } catch (err) {
      console.warn('Failed to enter fullscreen:', err);
    }
  }, []);

  // Exit Fullscreen
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch (err) {
      console.warn('Failed to exit fullscreen:', err);
    }
  }, []);

  // Security Blind state (hides questions if user exits fullscreen or switches window)
  const [isScreenBlinded, setIsScreenBlinded] = useState<boolean>(false);

  // Fullscreen change listener
  useEffect(() => {
    if (!enabled) return;

    const handleFullscreenChange = () => {
      const isCurrentlyFs = Boolean(
        document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).msFullscreenElement
      );

      setIsFullscreen(isCurrentlyFs);

      if (!isCurrentlyFs && !hasForceSubmittedRef.current) {
        // Exited fullscreen -> blind screen immediately and start 5s countdown modal
        setIsScreenBlinded(true);
        setIsFullscreenWarningOpen(true);
        setFullscreenCountdown(5);

        if (fullscreenTimerRef.current) {
          window.clearInterval(fullscreenTimerRef.current);
        }

        let remaining = 5;
        fullscreenTimerRef.current = window.setInterval(() => {
          remaining -= 1;
          setFullscreenCountdown(remaining);

          if (remaining <= 0) {
            if (fullscreenTimerRef.current) {
              window.clearInterval(fullscreenTimerRef.current);
              fullscreenTimerRef.current = null;
            }
            setIsFullscreenWarningOpen(false);
            recordViolation('FULLSCREEN_EXIT', 'Không quay lại toàn màn hình trong 5 giây');
          }
        }, 1000);
      } else if (isCurrentlyFs) {
        setIsFullscreenWarningOpen(false);
        setIsScreenBlinded(false);
        if (fullscreenTimerRef.current) {
          window.clearInterval(fullscreenTimerRef.current);
          fullscreenTimerRef.current = null;
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      if (fullscreenTimerRef.current) {
        window.clearInterval(fullscreenTimerRef.current);
      }
    };
  }, [enabled, recordViolation]);

  // Tab switch & Blur detection
  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        blurStartTimeRef.current = Date.now();
      } else {
        if (blurStartTimeRef.current) {
          const duration = Math.round((Date.now() - blurStartTimeRef.current) / 1000);
          blurStartTimeRef.current = null;
          recordViolation('TAB_SWITCH', `Chuyển tab hoặc ẩn cửa sổ`, duration);
        }
      }
    };

    const handleWindowBlur = () => {
      if (!blurStartTimeRef.current) {
        blurStartTimeRef.current = Date.now();
      }
    };

    const handleWindowFocus = () => {
      if (blurStartTimeRef.current) {
        const duration = Math.round((Date.now() - blurStartTimeRef.current) / 1000);
        blurStartTimeRef.current = null;
        // If window blurred for more than 1 second, trigger violation
        if (duration >= 1) {
          recordViolation('WINDOW_BLUR', `Mất tiêu điểm cửa sổ (rời màn hình thi)`, duration);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [enabled, recordViolation]);

  // Block ContextMenu, Copy, Cut, Paste, and DevTools/Shortcuts
  useEffect(() => {
    if (!enabled) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      recordViolation('CONTEXT_MENU', 'Cố tình bấm chuột phải');
      return false;
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      recordViolation('SHORTCUT_ATTEMPT', `Thao tác ${e.type} bị cấm`);
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        recordViolation('DEVTOOLS', 'Bấm phím F12 (Developer Tools)');
        return false;
      }

      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
        e.preventDefault();
        recordViolation('DEVTOOLS', 'Tổ hợp phím DevTools (Ctrl+Shift+I/J/C)');
        return false;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        recordViolation('SHORTCUT_ATTEMPT', 'Tổ hợp Ctrl+U (Xem mã nguồn)');
        return false;
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        recordViolation('SHORTCUT_ATTEMPT', 'Tổ hợp Ctrl+P (In trang bài thi)');
        return false;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        recordViolation('SHORTCUT_ATTEMPT', 'Tổ hợp Ctrl+S (Lưu trang)');
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, recordViolation]);

  const dismissWarning = useCallback(() => {
    setIsWarningModalOpen(false);
  }, []);

  return {
    violationCount,
    violationsLog,
    isWarningModalOpen,
    currentWarning,
    dismissWarning,
    isFullscreen,
    isFullscreenWarningOpen,
    fullscreenCountdown,
    isScreenBlinded,
    requestFullscreen,
    exitFullscreen,
    recordViolation
  };
}
