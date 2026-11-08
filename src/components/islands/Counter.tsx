import { useEffect, useRef, useState } from 'react';

type Props = { value: number; suffix?: string; label: string; duration?: number };

/**
 * Renders the final value on the server (so crawlers, agents and no-JS visitors see real numbers),
 * then counts up from zero on the client once scrolled into view. Reduced motion: no animation.
 */
export default function Counter({ value, suffix = '', label, duration = 900 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(value * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setShown(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);

  return (
    <div className="stat" ref={ref}>
      <b>{shown}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}
