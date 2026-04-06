import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useLeadModal } from '@/hooks/useLeadModal';

const base = import.meta.env.BASE_URL;

const benefitLines: React.ReactNode[] = [
  'Утепление и отделка в одной системе',
  <>
    Более <strong className="font-semibold text-white">100</strong> фактур и оттенков камня
  </>,
  'Замковая геометрия — без мостиков холода',
];

const glassClassName =
  'rounded-2xl border border-white/15 bg-black/35 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[2px] sm:p-6 md:p-7 lg:bg-black/40 lg:p-8 lg:backdrop-blur-sm';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** Единый контент Hero-блока. open передаётся из Hero. */
function HeroGlassContent({ open }: { open: (intent?: string) => void }) {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <span className="badge-premium badge-liquid shadow-lg">Собственное производство</span>
        <span className="badge-premium badge-liquid bg-accent-light text-accent shadow-lg">
          30 лет гарантии
        </span>
      </div>

      <h1 className="type-hero-title mb-6">
        <span className="block tracking-tight">Фасадные</span>
        <span className="mt-1 block tracking-tight text-primary-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] lg:text-primary">
          термопанели
        </span>
        <span className="type-hero-title__line3">с облицовкой под камень</span>
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-white/95 drop-shadow-sm md:text-xl">
        <strong className="font-semibold text-amber-200">Экономия до 50–60%</strong> на теплопотерях.
        <br />
        Напрямую от производителя.
        <br />
        Покупка панелей отдельно или монтаж под ключ.
      </p>

      <ul className="mb-6 space-y-2.5">
        {benefitLines.map((line, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-sm text-white/90 md:text-base md:items-center"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary md:mt-0"
              aria-hidden
            />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            open('calculate');
          }}
          className="btn-premium btn-premium--primary text-center shadow-lg"
        >
          Рассчитать фасад
        </button>

        <a
          href="#catalog"
          className="btn-premium text-center border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
        >
          Купить панели
        </a>
      </div>
    </>
  );
}

const Hero: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  // Единственное место объявления open — теперь доступен в обеих ветках (reduced / motion)
  const { open } = useLeadModal();

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28 lg:pt-32">
      {/* Фон: фото на весь экран */}
      <div className="absolute inset-0 z-0">
        {/* WebP с PNG fallback */}
        <picture>
          <source srcSet={`${base}hero-bg.webp`} type="image/webp" />
          <img
            src={`${base}hero-bg.webp`}
            alt="Дом с фасадными термопанелями"
            width={2752}
            height={1536}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center] lg:object-[56%_center] transform-gpu"
            fetchPriority="high"
          />
        </picture>
        <div
          className="absolute inset-0 lg:hidden bg-gradient-to-b from-black/25 via-black/38 to-black/60"
          aria-hidden
        />
        {/* Затемнение слева под текст (десктоп) */}
        <div
          className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/80 from-[5%] via-black/50 via-[38%] to-transparent to-[62%]"
          aria-hidden
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 items-center justify-start py-7 pb-5 md:py-9 w-full max-w-[1280px] mx-auto px-[var(--section-px)]">
          <div className="max-w-xl w-full min-w-0">
            {reduced ? (
              <div className={glassClassName}>
                <HeroGlassContent open={open} />
              </div>
            ) : (
              <motion.div
                className={glassClassName}
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <HeroGlassContent open={open} />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Trust-bar: полная ширина, внизу первого экрана */}
        <div
          className="relative z-10 mt-auto w-full shrink-0 border-t border-white/10 bg-black/70"
          aria-label="Показатели компании"
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
            <div className="border-b border-r border-white/10 px-4 py-4 md:border-b-0 md:px-6 md:py-4">
              <p className="font-display text-xl font-medium tabular-nums text-primary md:text-2xl">
                6500+
              </p>
              <p className="type-trust-label mt-1 text-white/45">
                реализованных объектов
              </p>
            </div>
            <div className="border-b border-white/10 px-4 py-4 md:border-b-0 md:border-r md:px-6 md:py-4">
              <p className="font-display text-xl font-medium text-white md:text-2xl">
                с <span className="text-primary">2016</span>
              </p>
              <p className="type-trust-label mt-1 text-white/45">года на рынке</p>
            </div>
            <div className="border-r border-white/10 px-4 py-4 md:px-6 md:py-4">
              <p className="font-display text-xl font-medium text-white md:text-2xl">
                <span className="text-primary">3000</span> м²
              </p>
              <p className="type-trust-label mt-1 text-white/45">
                производство в месяц
              </p>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-4">
              <p className="font-display text-xl font-medium text-primary md:text-2xl">100+</p>
              <p className="type-trust-label mt-1 text-white/45">
                фактур и оттенков
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Примечание: индикатор прокрутки убран, чтобы не перекрывал trust-bar. */}
    </section>
  );
};

export default Hero;
