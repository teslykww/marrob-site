import React, { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ZapIcon,
  ClockIcon,
  ShieldIcon,
  HomeIcon,
  SunIcon,
  MonitorIcon,
  TargetIcon,
  CheckCircleIcon,
} from '../components/icons/BuildingIcons';

type CatalogManifest = {
  basePath: string;
  collections: Array<{
    name: string;
    files: string[];
  }>;
};

type GlassBenefitCard = {
  icon: ReactNode;
  kicker: string;
  title: string;
  description: string;
};

const base = import.meta.env.BASE_URL;
const ICON = 24;

function toSrc(manifest: CatalogManifest, collectionName: string, fileName: string) {
  return `${base}${manifest.basePath}/${collectionName}/${fileName}`;
}

function displayName(name: string) {
  return name.replace(/_+$/g, '');
}

/** Текстовый блок + иконка (без внешних границ строки) */
function GlassBenefitCell({ item }: { item: GlassBenefitCard }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-xl border border-primary/45 bg-white/[0.06] text-primary flex items-center justify-center shrink-0 mt-0.5 [&_svg]:shrink-0">
        {item.icon}
      </div>
      <div className="min-w-0 flex-1 flex flex-col gap-1">
        <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-primary tabular-nums leading-[1.2] min-h-[2.75rem] sm:min-h-[3rem] md:min-h-[3.5rem] [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
          {item.kicker}
        </p>
        <h3 className="font-display font-semibold text-base text-white leading-snug [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
          {item.title}
        </h3>
        <p className="text-white/75 text-sm leading-relaxed min-h-[4.5rem] [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function GlassBenefitRowMobile({ item, index }: { item: GlassBenefitCard; index: number }) {
  return (
    <div className={`py-4 ${index > 0 ? 'border-t border-white/10' : ''}`}>
      <GlassBenefitCell item={item} />
    </div>
  );
}

const BenefitsVisual: React.FC = () => {
  const [manifest, setManifest] = useState<CatalogManifest | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${base}catalog/manifest.json`)
      .then((r) => r.json())
      .then((data: CatalogManifest) => {
        if (!cancelled) setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setManifest(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const collections = manifest?.collections ?? [];

  const collage = useMemo(() => {
    if (!manifest) return [];
    const picks: Array<{ title: string; src: string }> = [];
    for (const c of collections) {
      if (!c.files?.length) continue;
      picks.push({ title: displayName(c.name), src: toSrc(manifest, c.name, c.files[0]) });
      if (picks.length >= 4) break;
    }
    return picks;
  }, [manifest, collections]);

  const collageCells = useMemo(() => {
    const out = collage.map((c) => ({ ...c }));
    while (out.length < 4) {
      out.push({ title: '', src: '' });
    }
    return out.slice(0, 4);
  }, [collage]);

  const leftColumnCards: GlassBenefitCard[] = [
    {
      icon: <ClockIcon size={ICON} />,
      kicker: 'до 60%',
      title: 'Снижение теплопотерь',
      description: 'Экономия на отоплении уже в первый сезон. Дом теряет вдвое меньше тепла.',
    },
    {
      icon: <SunIcon size={ICON} />,
      kicker: '100+ вариантов',
      title: 'Фактуры и оттенки',
      description: 'Клинкер, натуральный камень, сланец — широкий выбор под любой стиль.',
    },
    {
      icon: <ZapIcon size={ICON} />,
      kicker: '1 этап',
      title: 'Монтаж без лишних работ',
      description:
        'Утепление и отделка в одном процессе. Не нужны штукатуры и два подрядчика.',
    },
    {
      icon: <ShieldIcon size={ICON} />,
      kicker: '40+ лет',
      title: 'Срок службы',
      description:
        'Не выцветает, не трескается, не требует покраски. Гарантия на панели — 30 лет.',
    },
    {
      icon: <MonitorIcon size={ICON} />,
      kicker: '150 м² за 10 дней',
      title: 'Бригада из 2 человек',
      description: 'Полная облицовка частного дома без задержек и простоев на стройке.',
    },
  ];

  const rightColumnCards: GlassBenefitCard[] = [
    {
      icon: <ShieldIcon size={ICON} />,
      kicker: '−50°C до +70°C',
      title: 'Стойкость к внешним воздействиям',
      description:
        'Не впитывает влагу, не подвержен коррозии. Выдерживает 200+ циклов заморозки.',
    },
    {
      icon: <TargetIcon size={ICON} />,
      kicker: 'Класс Г2',
      title: 'Огнестойкость и безопасность',
      description:
        'Декоративный камень огнеупорен и соответствует нормам пожарной безопасности.',
    },
    {
      icon: <HomeIcon size={ICON} />,
      kicker: 'Перепады до 20 мм/м²',
      title: 'Монтаж на существующие фасады',
      description: 'Подходит для реконструкции. Не нужно выравнивать стены перед установкой.',
    },
    {
      icon: <SunIcon size={ICON} />,
      kicker: '0,037 Вт/м·К',
      title: 'Энергоэффективность',
      description:
        'Низкая теплопроводность ядра — меньше теплопотери. Экономия на отоплении и кондиционировании круглый год.',
    },
    {
      icon: <CheckCircleIcon size={ICON} />,
      kicker: 'Сухой монтаж',
      title: 'Без мокрых процессов',
      description:
        'Нет зависимости от температуры. Монтаж возможен даже при минусовых температурах.',
    },
  ];

  const benefitPairs = leftColumnCards.map((left, i) => ({
    left,
    right: rightColumnCards[i] as GlassBenefitCard,
  }));

  return (
    <section id="benefits" className="section-premium bg-white relative overflow-hidden scroll-mt-24 lg:scroll-mt-32">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-premium relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Преимущества</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Что вы получаете при выборе{' '}
            <span className="text-primary">термопанелей</span>
          </h2>
          <p className="text-text-muted text-lg">Ключевые преимущества фасадной системы MARROB</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-premium-lg min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {collageCells.map((item, i) => (
              <div key={item.src || `ph-${i}`} className="relative min-h-[140px] sm:min-h-0">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.title || 'Фактура из каталога'}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.72] saturate-[0.82] contrast-[1.06]"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-stone-600" aria-hidden />
                )}
              </div>
            ))}
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/88 to-slate-950/90"
            aria-hidden
          />
          <div className="absolute inset-0 bg-emerald-950/15 pointer-events-none" aria-hidden />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_0%,rgba(15,23,42,0.55)_100%)] pointer-events-none"
            aria-hidden
          />

          <div className="relative z-10 px-4 py-7 sm:px-6 sm:py-9 md:px-8 md:py-10 lg:px-10">
            <div className="max-w-6xl mx-auto rounded-2xl border border-white/12 bg-slate-950/58 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.45)] p-6 sm:p-8 md:p-10">
              {/* Мобилка: две колонки стеком, как раньше */}
              <div className="flex flex-col md:hidden gap-0">
                <div className="min-w-0 flex-1 pb-8 border-b border-white/10">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-5 min-h-[2.5rem] flex items-end [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    В цифрах
                  </p>
                  <div className="flex flex-col">
                    {leftColumnCards.map((item, index) => (
                      <GlassBenefitRowMobile key={`left-${index}`} item={item} index={index} />
                    ))}
                  </div>
                </div>
                <div className="min-w-0 flex-1 pt-8">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-5 min-h-[2.5rem] flex items-end [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                    Надёжность и комфорт
                  </p>
                  <div className="flex flex-col">
                    {rightColumnCards.map((item, index) => (
                      <GlassBenefitRowMobile key={`right-${index}`} item={item} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Десктоп: 5 пар в одной сетке — общие горизонтальные разделители */}
              <div className="hidden md:block">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-6 lg:gap-x-8 items-end pb-5 border-b border-white/15">
                  <div className="min-w-0 pr-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary min-h-[2.5rem] flex items-end [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                      В цифрах
                    </p>
                  </div>
                  <div
                    className="w-px shrink-0 self-stretch min-h-[2.5rem] bg-gradient-to-b from-white/10 via-white/22 to-white/10 shadow-[1px_0_0_rgba(0,0,0,0.2)]"
                    aria-hidden
                  />
                  <div className="min-w-0 pl-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary min-h-[2.5rem] flex items-end [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                      Надёжность и комфорт
                    </p>
                  </div>
                </div>
                {benefitPairs.map(({ left, right }, index) => (
                  <div
                    key={`pair-${index}`}
                    className={`grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-6 lg:gap-x-8 ${index > 0 ? 'border-t border-white/10' : ''}`}
                  >
                    <div className="min-w-0 py-4 pr-1">
                      <GlassBenefitCell item={left} />
                    </div>
                    <div
                      className="w-px shrink-0 self-stretch bg-gradient-to-b from-white/8 via-white/20 to-white/8 shadow-[1px_0_0_rgba(0,0,0,0.25)]"
                      aria-hidden
                    />
                    <div className="min-w-0 py-4 pl-1">
                      <GlassBenefitCell item={right} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsVisual;
