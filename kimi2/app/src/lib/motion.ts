/**
 * Единый motion language (см. --motion-* в index.css).
 * Значения должны совпадать с CSS-переменными для согласованности Reveal / hover-карточек.
 */
export const MOTION = {
  durationMd: 0.45,
  durationSm: 0.3,
  /** premium ease — совпадает с --motion-ease-premium */
  ease: [0.22, 1, 0.36, 1] as const,
  liftY: 14,
} as const;
