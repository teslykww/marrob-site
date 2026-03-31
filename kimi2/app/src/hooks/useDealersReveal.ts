import { useEffect, type RefObject } from 'react';

/**
 * Один IntersectionObserver на контейнер: элементы с классом .dealers-reveal
 * получают .dealers-reveal--visible при появлении во viewport.
 */
export function useDealersReveal(
  rootRef: RefObject<HTMLElement | null>,
  reducedMotion: boolean,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>('.dealers-reveal');
    if (nodes.length === 0) return;

    if (reducedMotion) {
      nodes.forEach((el) => el.classList.add('dealers-reveal--visible'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('dealers-reveal--visible');
            obs.unobserve(e.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );

    nodes.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef, reducedMotion]);
}
