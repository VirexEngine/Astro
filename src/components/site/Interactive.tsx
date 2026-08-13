import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (!visible) return null;
  return (
    <div
      className="pointer-events-none fixed z-[100] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen transition-transform duration-100"
      style={{
        left: pos.x, top: pos.y,
        background: "radial-gradient(circle, oklch(0.68 0.18 295 / 0.25), transparent 60%)",
      }}
    />
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(scrolled * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[90] h-[2px] w-full">
      <div
        className="h-full transition-[width] duration-100"
        style={{ width: `${p}%`, background: "linear-gradient(90deg, var(--royal), var(--gold))", boxShadow: "0 0 12px var(--gold)" }}
      />
    </div>
  );
}
