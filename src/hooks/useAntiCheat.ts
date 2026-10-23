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

  // Warning toast/modal state
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [currentWarning, setCurrentWarning] = useState<{
    title: string;
    message: string;
    type: ViolationType;
    count: number;
  } | null>(null);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Refs for tracking timestamps and preventing duplicate triggers
  const hiddenStartTimeRef = useRef<number | null>(null);
  const lastViolationTimeRef = useRef<number>(0);
  const violationCountRef = useRef<number>(0);
  const violationsLogRef = useRef<ViolationLog[]>([]);
  const hasForceSubmittedRef = useRef<boolean>(false);

  // Sync refs
  useEffect(() => {
    violationCountRef.current = violationCount;
  }, [violationCount]);

  useEffect(() => {
    violationsLogRef.current = violationsLog;
  }, [violationsLog]);

  const onForceSubmitRef = useRef(onForceSubmit);
  useEffect(() => {
    onForceSubmitRef.current = onForceSubmit;
  }, [onForceSubmit]);

  // Record a violation with a 3-second cooldown to prevent double-counting
  const recordViolation = useCallback(
    (type: ViolationType, note?: string, durationSeconds?: number) => {
      if (!enabled || hasForceSubmittedRef.current) return;

      const now = Date.now();
      // Enforce 3-second cooldown between violations to avoid burst glitches
      if (now - lastViolationTimeRef.current < 3000) {
        return;
      }
      lastViolationTimeRef.current = now;

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
        onForceSubmitRef.current(updatedLogs);
        return;
      }

      // Show warning modal
      let title = 'Cảnh Báo Vi Phạm Quy Chế!';
      let message = `Hệ thống ghi nhận thao tác không được phép. Lần vi phạm: ${newCount}/${maxViolationsAllowed}.`;
      if (type === 'TAB_SWITCH') {
        title = 'Cảnh Báo Chuyển Tab / Ẩn Cửa Sổ!';
        message = `Bạn vừa rời khỏi màn hình bài thi${
          durationSeconds ? ` trong ${durationSeconds} giây` : ''
        }. Vui lòng chỉ tập trung làm bài thi tại tab này! (Vi phạm: ${newCount}/${maxViolationsAllowed})`;
      } else if (type === 'DEVTOOLS' || type === 'SHORTCUT_ATTEMPT') {
        title = 'Cảnh Báo Phím Tắt Bị Chặn!';
        message = `Phím tắt công cụ hoặc thao tác hệ thống bị nghiêm cấm trong phòng thi. (Vi phạm: ${newCount}/${maxViolationsAllowed})`;
      } else if (type === 'CONTEXT_MENU') {
        title = 'Cảnh Báo Chuột Phải!';
        message = `Thao tác bấm chuột phải bị cấm trong phòng thi. (Vi phạm: ${newCount}/${maxViolationsAllowed})`;
      }

      setCurrentWarning({
        title,
        message,
        type,
        count: newCount
      });
      setIsWarningModalOpen(true);
    },
    [enabled, maxViolationsAllowed]
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
    } catch (err) {
      console.warn('Fullscreen request bypassed:', err);
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
      console.warn('Exit fullscreen failed:', err);
    }
  }, []);

  // Fullscreen status tracker (without aggressive penalties)
  useEffect(() => {
    if (!enabled) return;

    const handleFullscreenChange = () => {
      const isCurrentlyFs = Boolean(
        document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFs);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [enabled]);

  // Tab switch detection via standard document.visibilitychange ONLY
  // (We deliberately DO NOT listen to window.blur to prevent Unikey/EVKey focus-loss false positives!)
  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenStartTimeRef.current = Date.now();
      } else {
        if (hiddenStartTimeRef.current) {
          const duration = Math.round((Date.now() - hiddenStartTimeRef.current) / 1000);
          hiddenStartTimeRef.current = null;
          // Only trigger if actually hidden for 2+ seconds
          if (duration >= 2) {
            recordViolation('TAB_SWITCH', `Chuyển sang tab hoặc ứng dụng khác`, duration);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, recordViolation]);

  // Block ContextMenu, Copy, Cut, Paste, and DevTools/Shortcuts
  useEffect(() => {
    if (!enabled) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Gentle notification without forcing modal
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
    requestFullscreen,
    exitFullscreen,
    recordViolation
  };
}
