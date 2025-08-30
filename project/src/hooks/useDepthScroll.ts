import { useState, useEffect } from 'react';

export function useDepthScroll() {
  const [depth, setDepth] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!isUnlocked) return;
    const isTouch = 'ontouchstart' in window;

    const handleScroll = (e: WheelEvent) => {
      if (isTouch) return; // mobile: không đụng vào touch cuộn panel
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
  }, [isUnlocked]);

  return { depth, setDepth, isUnlocked, setIsUnlocked };
}
