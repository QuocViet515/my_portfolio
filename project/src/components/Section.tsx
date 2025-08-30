import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean; // chỉ panel active mới nhận tương tác
};

export default function Section({ children, onNext, onPrev, enabled = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

  useEffect(() => {
    if (!isTouch || !enabled || !ref.current) return;
    const el = ref.current;

    let startY = 0;
    let lastY = 0;

    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      lastY = startY;
    };
    const onMove = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };
    const onEnd = () => {
      const dy = startY - lastY; // vuốt lên > 0, vuốt xuống < 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      const atTop = el.scrollTop <= 4;

      if (dy > 40 && atBottom) onNext();   // vuốt lên khi đã tới cuối -> next
      if (dy < -40 && atTop) onPrev();     // vuốt xuống khi ở đầu -> prev
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [isTouch, enabled, onNext, onPrev]);

  return (
    <div
      ref={ref}
      className="panel-scroll"
      style={{ pointerEvents: enabled ? "auto" : "none" }}
    >
      {children}
    </div>
  );
}
