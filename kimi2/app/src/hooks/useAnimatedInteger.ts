import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Анимирует целое от 0 до target за durationMs (один раз), если animate true.
 */
export function useAnimatedInteger(
  target: number,
  animate: boolean,
  durationMs = 1400,
): number {
  const [value, setValue] = useState(animate ? 0 : target);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }

    startRef.current = null;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      setValue(Math.round(target * eased));
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, animate, durationMs]);

  return value;
}
