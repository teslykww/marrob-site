import React from 'react';

const base = import.meta.env.BASE_URL;

const benefitLines: React.ReactNode[] = [
  'Утепление и отделка в одной системе',
  <>
    Более <strong className="font-semibold text-white">100</strong> фактур и оттенков камня
  </>,
  'Замковая геометрия — без мостиков холода',
];

const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28 lg:pt-32">
      {/* Фон: фото на весь экран */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${base}hero-bg.png`}
          alt="Дом с фасадными термопанелями"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 lg:hidden bg-gradient-to-b from-black/30 via-black/50 to-black/82"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden lg:block bg-gradient-to-r from-black/75 via-black/50 to-black/10"
          aria-hidden
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="container-premium flex flex-1 items-center py-8 pb-6 md:py-10">
          <div className="max-w-xl">
            <div className="max-lg:rounded-2xl max-lg:border max-lg:border-white/15 max-lg:bg-black/30 max-lg:p-5 max-lg:backdrop-blur-md max-lg:shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="badge-premium badge-liquid shadow-lg">Собственное производство</span>
                <span className="badge-premium badge-liquid bg-accent-light text-accent shadow-lg">
                  30 лет гарантии
                </span>
              </div>

              <h1 className="mb-6 font-display text-4xl font-semibold leading-[1.15] text-white drop-shadow-sm md:text-5xl lg:text-[3.25rem]">
                Фасадные термопанели
                <span className="mt-2 block text-primary-light lg:text-primary">
                  с облицовкой под камень
                </span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-white/95 drop-shadow-sm md:text-xl">
                <strong className="font-semibold text-amber-200">Экономия до 50–60%</strong> на теплопотерях.
                Напрямую от производителя.
                <br />
                Покупка панелей отдельно или монтаж под ключ.
              </p>

              <ul className="mb-8 space-y-3">
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
                <a href="#contact" className="btn-premium btn-premium--primary text-center shadow-lg">
                  Рассчитать фасад
                </a>
                <a
                  href="#catalog"
                  className="btn-premium text-center border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
                >
                  Купить панели
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust-bar: полная ширина, внизу первого экрана */}
        <div
          className="relative z-10 mt-auto w-full shrink-0 border-t border-white/10 bg-black/55 backdrop-blur-sm"
          aria-label="Показатели компании"
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
            <div className="border-b border-r border-white/10 px-4 py-4 md:border-b-0 md:px-6 md:py-4">
              <p className="font-display text-xl font-medium tabular-nums text-primary md:text-2xl">
                6500+
              </p>
              <p className="mt-1 text-[11px] leading-snug text-white/45 md:text-xs">
                реализованных объектов
              </p>
            </div>
            <div className="border-b border-white/10 px-4 py-4 md:border-b-0 md:border-r md:px-6 md:py-4">
              <p className="font-display text-xl font-medium text-white md:text-2xl">
                с <span className="text-primary">2016</span>
              </p>
              <p className="mt-1 text-[11px] leading-snug text-white/45 md:text-xs">года на рынке</p>
            </div>
            <div className="border-r border-white/10 px-4 py-4 md:px-6 md:py-4">
              <p className="font-display text-xl font-medium text-white md:text-2xl">
                <span className="text-primary">3000</span> м²
              </p>
              <p className="mt-1 text-[11px] leading-snug text-white/45 md:text-xs">
                производство в месяц
              </p>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-4">
              <p className="font-display text-xl font-medium text-primary md:text-2xl">100+</p>
              <p className="mt-1 text-[11px] leading-snug text-white/45 md:text-xs">
                фактур и оттенков
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Индикатор прокрутки — выше trust-bar */}
      <div className="pointer-events-none absolute bottom-[5.5rem] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:bottom-[6.25rem]">
        <span className="text-xs uppercase tracking-widest">Прокрутите вниз</span>
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/40 pt-2">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
