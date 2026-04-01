import { useEffect, useRef } from 'react';
import type { NavigateFunction, Location } from 'react-router-dom';

type ScrollOptions = {
  /** When not on home route, navigate first then scroll. */
  navigate?: NavigateFunction;
  location?: Location;
  /** Current pathname, typically location.pathname. */
  pathname?: string;
  /** If provided, called before scrolling (e.g. close menu). */
  beforeScroll?: () => void;
};

function isSectionHash(href: string) {
  return href.startsWith('#') && href.length > 1;
}

function scrollNow(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

/**
 * Scrolls to a `#id` section reliably in HashRouter apps.
 * - If already on `/`, scrolls immediately.
 * - If on another route, navigates to `/` with state and the home page will perform the scroll.
 */
export function handleSectionLinkClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  opts: ScrollOptions = {},
) {
  if (!isSectionHash(href)) return;
  e.preventDefault();
  opts.beforeScroll?.();

  // If we are on home already, scroll immediately.
  const pathname = opts.pathname ?? opts.location?.pathname;
  if (!opts.navigate || pathname === '/' || pathname === '' || pathname === undefined) {
    // Delay a tick so layout (e.g. menu close) can settle.
    window.requestAnimationFrame(() => {
      scrollNow(href);
    });
    return;
  }

  // Otherwise navigate home and let home page effect scroll.
  opts.navigate('/', { state: { scrollTo: href } });
}

/**
 * Call this on the home page to perform a pending scroll passed via navigation state.
 */
export function usePendingSectionScroll(location: Location, clearState?: () => void) {
  const consumedRef = useRef<string | null>(null);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const scrollTo = state?.scrollTo;
    if (!scrollTo || !isSectionHash(scrollTo)) return;
    if (consumedRef.current === scrollTo) return;
    consumedRef.current = scrollTo;

    let tries = 0;
    const maxTries = 12;
    let timer: number | undefined;

    const tick = () => {
      tries += 1;
      const ok = scrollNow(scrollTo);
      if (ok || tries >= maxTries) {
        clearState?.();
        return;
      }
      timer = window.setTimeout(tick, 60);
    };

    timer = window.setTimeout(tick, 0);
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [location.state, clearState]);
}
