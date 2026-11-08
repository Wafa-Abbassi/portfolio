import { useEffect, useRef } from 'react';

/**
 * Subtle particle field behind the hero: a few dozen points drifting slowly, linked when close.
 * Pauses when off-screen; renders a single static frame when the visitor prefers reduced motion.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const styles = getComputedStyle(document.documentElement);
    const colorA = styles.getPropertyValue('--accent').trim() || '#5ee6b8';
    const colorB = styles.getPropertyValue('--accent-2').trim() || '#a78bfa';

    let w = 0, h = 0, raf = 0, running = true;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    type P = { x: number; y: number; vx: number; vy: number; c: string };
    let pts: P[] = [];

    const resize = () => {
      const r = canvas.parentElement?.getBoundingClientRect();
      w = Math.max(1, Math.floor(r?.width ?? 800));
      h = Math.max(1, Math.floor(r?.height ?? 400));
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, Math.max(28, (w * h) / 22000)));
      pts = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        c: i % 3 === 0 ? colorB : colorA,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fillStyle = p.c; ctx.globalAlpha = 0.9; ctx.fill();
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 120) { ctx.globalAlpha = (1 - d / 120) * 0.35; ctx.strokeStyle = pts[i].c; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
      }
      ctx.globalAlpha = 1;
      if (!reduce && running) raf = requestAnimationFrame(draw);
    };

    resize(); draw();
    const onResize = () => { resize(); if (reduce) draw(); };
    window.addEventListener('resize', onResize);
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      if (running && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    });
    io.observe(canvas);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); io.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
