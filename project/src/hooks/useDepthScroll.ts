import { useState, useEffect } from 'react';

function isTouchDevice() {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

export function useDepthScroll() {
  const [depth, setDepthRaw] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const isTouch = isTouchDevice();

  // Đảm bảo trên mobile chỉ set depth là số nguyên
  const setDepth = (updater: number | ((prev: number) => number)) => {
    setDepthRaw(prev => {
      let next = typeof updater === 'function' ? updater(prev) : updater;
      if (isTouch) {
        next = Math.round(next);
        next = Math.max(0, Math.min(3, next));
      } else {
        next = Math.max(0, Math.min(4, next));
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isUnlocked || isTouch) return;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      setDepth(prev => {
        const delta = e.deltaY > 0 ? 0.1 : -0.1;
        return Math.max(0, Math.min(4, prev + delta));
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setDepth(prev => Math.min(4, prev + 0.2));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setDepth(prev => Math.max(0, prev - 0.2));
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUnlocked, isTouch]);

  return { depth, setDepth, isUnlocked, setIsUnlocked };
}
