import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Calculator as CalcIcon,
  X,
  Minus,
  Maximize2,
  Delete,
  RotateCcw,
  Sparkles,
  Move
} from 'lucide-react';

interface ScientificCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  isOpen,
  onClose
}) => {
  const [expression, setExpression] = useState<string>('');
  const [displayResult, setDisplayResult] = useState<string>('0');
  const [previousAnswer, setPreviousAnswer] = useState<string>('0');
  const [isRad, setIsRad] = useState<boolean>(false); // False = DEG (default in Vietnam), True = RAD
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Dragging states
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 24, y: 80 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 24,
    posY: 80
  });

  // Calculate default position on screen right side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const defaultX = Math.max(20, window.innerWidth - 380);
      const defaultY = Math.max(70, window.innerHeight - 560);
      setPosition({ x: defaultX, y: defaultY });
    }
  }, []);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      const newX = Math.max(10, Math.min(window.innerWidth - 340, dragStartRef.current.posX + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 100, dragStartRef.current.posY + dy));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Safe Math Evaluator
  const calculateResult = useCallback((expr: string, radMode: boolean, ansVal: string): string => {
    if (!expr || expr.trim() === '') return '0';
    try {
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e(?![a-zA-Z])/g, 'Math.E')
        .replace(/Ans/g, ansVal);

      // Handle powers: x^y -> Math.pow(x, y)
      sanitized = sanitized.replace(/(\d+(\.\d+)?|\bMath\.\w+)\s*\^\s*(\d+(\.\d+)?)/g, 'Math.pow($1, $3)');

      // Handle square roots: √(x) or √x
      sanitized = sanitized.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
      sanitized = sanitized.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

      // Handle Trigonometry (DEG vs RAD)
      if (!radMode) {
        // DEG mode: convert inside args to radians
        sanitized = sanitized.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        sanitized = sanitized.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        sanitized = sanitized.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      } else {
        sanitized = sanitized.replace(/sin\(/g, 'Math.sin(');
        sanitized = sanitized.replace(/cos\(/g, 'Math.cos(');
        sanitized = sanitized.replace(/tan\(/g, 'Math.tan(');
      }

      // Handle Logs
      sanitized = sanitized.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
      sanitized = sanitized.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');

      // Security check: only allow numbers, math operators, Math functions
      if (!/^[0-9+\-*/().\s,MathPIEpowsqrtcosintanlged]+$/.test(sanitized)) {
        return 'Lỗi cú pháp';
      }

      // Evaluate safely
      const fn = new Function(`"use strict"; return (${sanitized})`);
      const res = fn();

      if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
        return 'Lỗi phép tính';
      }

      // Round clean floats
      const rounded = Math.round(res * 1e10) / 1e10;
      return String(rounded);
    } catch {
      return 'Lỗi cú pháp';
    }
  }, []);

  const handleAppend = (token: string) => {
    setExpression((prev) => prev + token);
  };

  const handleClear = () => {
    setExpression('');
    setDisplayResult('0');
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    const res = calculateResult(expression, isRad, previousAnswer);
    setDisplayResult(res);
    if (res !== 'Lỗi phép tính' && res !== 'Lỗi cú pháp') {
      setPreviousAnswer(res);
    }
  };

  const handleToggleSign = () => {
    if (!expression) return;
    if (expression.startsWith('-')) {
      setExpression(expression.slice(1));
    } else {
      setExpression('-' + expression);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      className={`fixed z-50 select-none shadow-2xl transition-shadow ${
        isDragging ? 'cursor-grabbing opacity-95' : 'cursor-default'
      }`}
    >
      <div className="w-[340px] sm:w-[350px] rounded-3xl bg-slate-900 border-2 border-slate-700/80 text-white overflow-hidden shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
        {/* Casio Metallic Top Bar (Draggable handle) */}
        <div
          onMouseDown={handleMouseDown}
          className="bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-700/60 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
              CASIO fx-580VN X
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
              CLASSWIZ
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
              title={isMinimized ? "Phóng to" : "Thu nhỏ"}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
              title="Đóng máy tính"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimized Bar */}
        {isMinimized ? (
          <div className="p-3 bg-slate-950 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">Kết quả:</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{displayResult}</span>
          </div>
        ) : (
          <div className="p-4 space-y-3 bg-slate-900/95">
            {/* Casio LCD Glass Display */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#b7c4a8] to-[#9fae90] p-3.5 text-slate-900 shadow-inner border border-[#8a987d]">
              {/* LCD Indicator Bar */}
              <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-slate-800/80 pb-1 mb-1 border-b border-slate-700/20">
                <div className="flex items-center gap-2">
                  <span className={`px-1 rounded ${!isRad ? 'bg-slate-900 text-[#b7c4a8]' : ''}`}>
                    DEG
                  </span>
                  <span className={`px-1 rounded ${isRad ? 'bg-slate-900 text-[#b7c4a8]' : ''}`}>
                    RAD
                  </span>
                  <span>M</span>
                  <span>MATH</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] opacity-70">
                  <span>SOLAR CELL</span>
                  <span className="w-2.5 h-1.5 rounded-xs border border-slate-800 bg-slate-700 inline-block" />
                </div>
              </div>

              {/* Expression Input Line */}
              <div className="min-h-[22px] text-right font-mono text-xs text-slate-800 tracking-wider truncate overflow-x-auto whitespace-nowrap">
                {expression || ' '}
              </div>

              {/* Output Result Line */}
              <div className="text-right font-mono text-2xl font-black tracking-tight text-slate-950 truncate">
                {displayResult}
              </div>
            </div>

            {/* Scientific Function Keypad */}
            <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsRad(!isRad)}
                className={`py-1.5 rounded-xl font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
                  isRad
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700'
                }`}
                title="Chuyển đổi giữa Độ (DEG) và Radian (RAD)"
              >
                {isRad ? 'RAD' : 'DEG'}
              </button>
              <button
                type="button"
                onClick={() => handleAppend('^2')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                x²
              </button>
              <button
                type="button"
                onClick={() => handleAppend('^')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                xʸ
              </button>
              <button
                type="button"
                onClick={() => handleAppend('√(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                √
              </button>
              <button
                type="button"
                onClick={() => handleAppend('π')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                π
              </button>

              <button
                type="button"
                onClick={() => handleAppend('sin(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                sin
              </button>
              <button
                type="button"
                onClick={() => handleAppend('cos(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                cos
              </button>
              <button
                type="button"
                onClick={() => handleAppend('tan(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                tan
              </button>
              <button
                type="button"
                onClick={() => handleAppend('(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                (
              </button>
              <button
                type="button"
                onClick={() => handleAppend(')')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                )
              </button>

              <button
                type="button"
                onClick={() => handleAppend('log(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                log
              </button>
              <button
                type="button"
                onClick={() => handleAppend('ln(')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                ln
              </button>
              <button
                type="button"
                onClick={() => handleAppend('%')}
                className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold active:scale-95 cursor-pointer"
              >
                %
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-white font-bold active:scale-95 cursor-pointer shadow-xs"
              >
                DEL
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold active:scale-95 cursor-pointer shadow-xs"
              >
                AC
              </button>
            </div>

            {/* Standard Keypad */}
            <div className="grid grid-cols-4 gap-1.5 font-mono text-sm">
              {/* Row 1 */}
              <button
                type="button"
                onClick={() => handleAppend('7')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                7
              </button>
              <button
                type="button"
                onClick={() => handleAppend('8')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                8
              </button>
              <button
                type="button"
                onClick={() => handleAppend('9')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                9
              </button>
              <button
                type="button"
                onClick={() => handleAppend('÷')}
                className="py-2.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold border border-indigo-500/40 active:scale-95 transition-all cursor-pointer"
              >
                ÷
              </button>

              {/* Row 2 */}
              <button
                type="button"
                onClick={() => handleAppend('4')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                4
              </button>
              <button
                type="button"
                onClick={() => handleAppend('5')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                5
              </button>
              <button
                type="button"
                onClick={() => handleAppend('6')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                6
              </button>
              <button
                type="button"
                onClick={() => handleAppend('×')}
                className="py-2.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold border border-indigo-500/40 active:scale-95 transition-all cursor-pointer"
              >
                ×
              </button>

              {/* Row 3 */}
              <button
                type="button"
                onClick={() => handleAppend('1')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                onClick={() => handleAppend('2')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                2
              </button>
              <button
                type="button"
                onClick={() => handleAppend('3')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                3
              </button>
              <button
                type="button"
                onClick={() => handleAppend('-')}
                className="py-2.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold border border-indigo-500/40 active:scale-95 transition-all cursor-pointer"
              >
                -
              </button>

              {/* Row 4 */}
              <button
                type="button"
                onClick={() => handleAppend('0')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handleAppend('.')}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                .
              </button>
              <button
                type="button"
                onClick={handleToggleSign}
                className="py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700/80 active:scale-95 transition-all cursor-pointer shadow-xs"
                title="Đổi dấu âm dương"
              >
                ±
              </button>
              <button
                type="button"
                onClick={() => handleAppend('+')}
                className="py-2.5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-bold border border-indigo-500/40 active:scale-95 transition-all cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Bottom Action Bar: Ans & Equals */}
            <div className="grid grid-cols-3 gap-1.5 font-mono text-sm pt-1">
              <button
                type="button"
                onClick={() => handleAppend('Ans')}
                className="py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Lấy kết quả vừa tính trước đó"
              >
                Ans
              </button>
              <button
                type="button"
                onClick={handleCalculate}
                className="col-span-2 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-lg active:scale-95 transition-all cursor-pointer shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-1.5"
              >
                <span>=</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Tính</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
