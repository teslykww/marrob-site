import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HeroBackgroundPicture } from '@/components/HeroBackgroundPicture';
import { handleSectionLinkClick } from '@/lib/scrollToSection';

const benefitLines: React.ReactNode[] = [
  'Утепление и отделка в одной системе',
  <>
    Более <strong className="font-semibold text-white">100</strong> фактур и оттенков камня
  </>,
  'Замковая геометрия — без мостиков холода',
];

const glassClassName =
  'rounded-2xl border border-white/15 bg-black/35 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[2px] sm:p-5 md:p-6 lg:bg-black/40 lg:p-7 lg:backdrop-blur-sm';

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

function HeroGlassContent({
  onSectionClick,
}: {
  onSectionClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2 sm:mb-4 sm:gap-3">
        <span className="badge-premium badge-liquid shadow-lg">Собственное производство</span>
        <span className="badge-premium badge-liquid bg-accent-light text-accent shadow-lg">
          30 лет гарантии
        </span>
      </div>

      <h1 className="type-hero-title mb-4 md:mb-5">
        <span className="block tracking-tight">Фасадные</span>
        <span className="mt-1 block tracking-tight text-primary-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] lg:text-primary">
          термопанели
        </span>
        <span className="type-hero-title__line3">с облицовкой под камень</span>
      </h1>

      <p className="mb-5 text-base leading-snug text-white/95 drop-shadow-sm md:mb-6 md:text-lg md:leading-relaxed lg:text-xl">
        <strong className="font-semibold text-amber-200">Экономия до 50–60%</strong> на теплопотерях.
        <br />
        Напрямую от производителя.
        <br />
        Покупка панелей отдельно или монтаж под ключ.
      </p>

      <ul className="mb-4 space-y-2 md:mb-5 md:space-y-2.5">
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

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a
          href="#contact"
          className="btn-premium btn-premium--primary text-center shadow-lg"
          onClick={(e) => onSectionClick(e, '#contact')}
        >
          Рассчитать фасад
        </a>
        <a
          href="#catalog"
          className="btn-premium text-center border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
          onClick={(e) => onSectionClick(e, '#catalog')}
        >
          Купить панели
        </a>
      </div>
    </>
  );
}

const Hero: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const onSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) =>
    handleSectionLinkClick(e, href, { navigate, location });

  return (
    <section className="relative flex min-h-[75svh] flex-col overflow-hidden pt-20 md:pt-24 lg:pt-28">
      {/* Фон: фото на весь экран */}
      <div className="absolute inset-0 z-0">
        <HeroBackgroundPicture
          imgClassName="absolute inset-0 h-full w-full object-cover object-[72%_center] lg:object-[56%_center] transform-gpu"
        />
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
        <div className="container-premium flex w-full min-w-0 flex-1 items-center justify-start py-4 pb-3 md:py-6">
          <div className="max-w-xl w-full min-w-0">
            {reduced ? (
              <div className={glassClassName}>
                <HeroGlassContent onSectionClick={onSectionClick} />
              </div>
            ) : (
              <motion.div
                className={glassClassName}
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <div className="mb-4 flex flex-wrap gap-2 sm:gap-3">
                    <span className="badge-premium badge-liquid shadow-lg">Собственное производство</span>
                    <span className="badge-premium badge-liquid bg-accent-light text-accent shadow-lg">
                      30 лет гарантии
                    </span>
                  </div>
                </motion.div>

                <motion.h1 className="type-hero-title mb-4 md:mb-5" variants={itemVariants}>
                  <span className="block tracking-tight">Фасадные</span>
                  <span className="mt-1 block tracking-tight text-primary-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] lg:text-primary">
                    термопанели
                  </span>
                  <span className="type-hero-title__line3">с облицовкой под камень</span>
                </motion.h1>

                <motion.p
                  className="mb-5 text-base leading-snug text-white/95 drop-shadow-sm md:mb-6 md:text-lg md:leading-relaxed lg:text-xl"
                  variants={itemVariants}
                >
                  <strong className="font-semibold text-amber-200">Экономия до 50–60%</strong> на теплопотерях.
                  <br />
                  Напрямую от производителя.
                  <br />
                  Покупка панелей отдельно или монтаж под ключ.
                </motion.p>

                <motion.ul className="mb-4 space-y-2 md:mb-5 md:space-y-2.5" variants={itemVariants}>
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
                </motion.ul>

                <motion.div className="flex flex-col gap-3 sm:flex-row sm:gap-4" variants={itemVariants}>
                  <a
                    href="#contact"
                    className="btn-premium btn-premium--primary text-center shadow-lg"
                    onClick={(e) => onSectionClick(e, '#contact')}
                  >
                    Рассчитать фасад
                  </a>
                  <a
                    href="#catalog"
                    className="btn-premium text-center border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
                    onClick={(e) => onSectionClick(e, '#catalog')}
                  >
                    Купить панели
                  </a>
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
            <div className="border-b border-r border-white/10 px-3 py-3 md:border-b-0 md:px-6 md:py-3.5">
              <p className="font-display text-lg font-medium tabular-nums text-primary md:text-2xl">
                6500+
              </p>
              <p className="type-trust-label mt-1 text-white/45">
                реализованных объектов
              </p>
            </div>
            <div className="border-b border-white/10 px-3 py-3 md:border-b-0 md:border-r md:px-6 md:py-3.5">
              <p className="font-display text-lg font-medium text-white md:text-2xl">
                с <span className="text-primary">2016</span>
              </p>
              <p className="type-trust-label mt-1 text-white/45">года на рынке</p>
            </div>
            <div className="border-r border-white/10 px-3 py-3 md:px-6 md:py-3.5">
              <p className="font-display text-lg font-medium text-white md:text-2xl">
                <span className="text-primary">3000</span> м²
              </p>
              <p className="type-trust-label mt-1 text-white/45">
                производство в месяц
              </p>
            </div>
            <div className="px-3 py-3 md:px-6 md:py-3.5">
              <p className="font-display text-lg font-medium text-primary md:text-2xl">100+</p>
              <p className="type-trust-label mt-1 text-white/45">
                фактур и оттенков
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Примечание: индикатор прокрутки ("Прокрутите вниз") убран,
          чтобы не перекрывал контент trust-bar на некоторых ширинах. */}
    </section>
  );
};

export default Hero;
