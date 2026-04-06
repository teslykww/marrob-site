import React from 'react';

const base = import.meta.env.BASE_URL;

type HeroBackgroundPictureProps = {
  imgClassName: string;
  /** Decorative overlay ring etc. stays outside */
  pictureClassName?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  alt?: string;
};

/**
 * WebP first (hero-bg.webp), PNG fallback. Add hero-bg.webp next to hero-bg.png in public/ —
 * ~10× меньше по весу при том же визуале, сильно улучшает LCP на мобильной сети.
 */
export const HeroBackgroundPicture: React.FC<HeroBackgroundPictureProps> = ({
  imgClassName,
  pictureClassName = 'absolute inset-0 block h-full w-full',
  fetchPriority = 'high',
  alt = 'Дом с фасадными термопанелями',
}) => (
  <picture className={pictureClassName}>
    <source srcSet={`${base}hero-bg.webp`} type="image/webp" />
    <img
      src={`${base}hero-bg.webp`}
      alt={alt}
      width={2752}
      height={1536}
      sizes="100vw"
      className={imgClassName}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  </picture>
);
