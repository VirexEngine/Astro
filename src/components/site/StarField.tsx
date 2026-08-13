import { useEffect, useRef } from "react";

export function StarField({ density = 80 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0, h = 0;
    const stars: { x: number; y: number; r: number; a: number; da: number; vx: number; vy: number; c: string }[] = [];
    const colors = ["#F8FAFC", "#F59E0B", "#E9D5FF", "#C4B5FD"];
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    const seed = () => {
      stars.length = 0;
      for (let i = 0; i < density; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.4 + 0.3) * devicePixelRatio,
          a: Math.random(),
          da: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? -1 : 1),
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          c: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    resize(); seed();
    const onResize = () => { resize(); seed(); };
    window.addEventListener("resize", onResize);
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.da;
        if (s.a > 1 || s.a < 0.1) s.da *= -1;
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        ctx.beginPath();
        ctx.fillStyle = s.c;
        ctx.globalAlpha = s.a;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [density]);
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
