import { useEffect, useRef, useState } from 'react';

type Props = { value: number; suffix?: string; label: string; duration?: number };

/** Counts up when scrolled into view. Shows the final value immediately when motion is reduced. */
export default function Counter({ value, suffix = '', label, duration = 900 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(value); return; }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <div className="stat" ref={ref}>
      <b>{shown}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}
