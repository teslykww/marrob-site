import React, { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  XIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  GridIcon,
  ZapIcon,
  TargetIcon,
  BriefcaseIcon,
  HomeIcon,
  ToolIcon,
  MonitorIcon,
  UsersIcon,
  PackageIcon,
  FileTextIcon,
  PhoneIcon,
  ArrowUpRightIcon,
  FactoryIcon,
  ShieldIcon,
} from '@/components/icons/BuildingIcons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { HeroBackgroundPicture } from '@/components/HeroBackgroundPicture';
import { getGalleryProjects } from '@/data/galleryProjects';
import { extractRuPhoneDigits10, formatRuPhoneMask, isCompleteRuMobile10 } from '@/lib/phoneRu';
import { postLeadJson } from '@/lib/postLead';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useDealersReveal } from '@/hooks/useDealersReveal';
import { useAnimatedInteger } from '@/hooks/useAnimatedInteger';

const base = import.meta.env.BASE_URL;

/** Быстрая правка текста у формы (FOMO) */
const DEALER_FORM_FOMO_LINE = 'Уточните условия для вашего региона в заявке';

const heroPoints = [
  'Более 100 фактур и оттенков термопанелей',
  'Маржинальность до 40%',
  'Поставка по всей России',
  'Стабильные сроки производства',
  'Защита территории для активных партнёров',
];

const kpiItems: { kicker: string; label: string; icon: ReactNode }[] = [
  { kicker: '3000 м²', label: 'производство в месяц', icon: <FactoryIcon size={20} /> },
  { kicker: '6500+', label: 'реализованных объектов', icon: <HomeIcon size={20} /> },
  { kicker: 'ГОСТ', label: 'сертифицированная продукция', icon: <ShieldIcon size={20} /> },
  { kicker: '2016', label: 'год основания', icon: <TrendingUpIcon size={20} /> },
];

const chainSteps = [
  { title: 'Производство', text: 'Собственные мощности и контроль качества', icon: <FactoryIcon size={20} /> },
  { title: 'Поставки', text: 'По всей России, стабильные сроки', icon: <PackageIcon size={20} /> },
  { title: 'Поддержка', text: 'Обучение, расчёты, маркетинг', icon: <UsersIcon size={20} /> },
  { title: 'Ваш рост', text: 'Маржа и повторные продажи в регионе', icon: <TrendingUpIcon size={20} /> },
];

const marketBullets = [
  'Рост частного строительства',
  'Повышение требований к энергоэффективности',
  'Популярность фасадов под натуральный камень',
  'Сокращение сроков строительства',
  'Спрос на готовые фасадные решения',
];

const economyCards: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: 'Маржинальность до 40%',
    text: 'Партнёр получает фиксированную дилерскую скидку от рекомендованной розничной цены.',
    icon: <TrendingUpIcon size={20} />,
  },
  {
    title: 'Средний объём заказа',
    text: 'Средний фасад частного дома — от 150 м². Объём типового проекта позволяет планировать закупки и логистику, а партнёру — прогнозировать выручку и маржу по сделке без скачков по мелким заявкам.',
    icon: <GridIcon size={20} />,
  },
  {
    title: 'Дополнительная прибыль',
    text: 'Монтаж, доборные элементы, сопутствующие материалы, повторные заказы. Фасад — это комплексное решение, позволяющее увеличивать средний чек.',
    icon: <ZapIcon size={20} />,
  },
  {
    title: 'Эффект повторных продаж',
    text: 'Фасад — хорошо заметный продукт. Один реализованный объект привлекает новых клиентов и соседей.',
    icon: <TargetIcon size={20} />,
  },
];

const partnerCards: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: 'Строительные магазины и шоу-румы',
    text: 'С активными продажами фасадных материалов и собственной клиентской базой.',
    icon: <BriefcaseIcon size={20} />,
  },
  {
    title: 'Компании по строительству частных домов',
    text: 'Добавьте фасадные термопанели в свои проекты и увеличьте средний чек объекта.',
    icon: <HomeIcon size={20} />,
  },
  {
    title: 'Подрядные организации',
    text: 'Решение, которое усиливает вашу экспертизу и повышает доверие заказчиков.',
    icon: <ToolIcon size={20} />,
  },
  {
    title: 'Интернет-продавцы',
    text: 'Продажи через онлайн-каналы и работа с собственной клиентской базой.',
    icon: <MonitorIcon size={20} />,
  },
];

const supportCards: { title: string; text: string; icon: ReactNode }[] = [
  { title: 'Обучение по продукту', text: 'Разбор преимуществ, аргументация для клиента, помощь в презентации продукта.', icon: <UsersIcon size={20} /> },
  { title: 'Помощь в расчётах', text: 'Поддержка при расчёте фасадов и подборе оптимальной комплектации.', icon: <TargetIcon size={20} /> },
  { title: 'Каталоги и образцы', text: 'Предоставление печатных и демонстрационных материалов.', icon: <PackageIcon size={20} /> },
  { title: 'Маркетинговые материалы', text: 'Фото, описания, технические данные для размещения на сайте и в рекламе.', icon: <FileTextIcon size={20} /> },
  { title: 'Техническая консультация', text: 'Оперативная поддержка по вопросам монтажа и характеристик.', icon: <PhoneIcon size={20} /> },
  { title: 'Передача входящих заявок', text: 'Если в регионе уже есть партнёр, заявку направим соответствующему менеджеру.', icon: <ArrowUpRightIcon size={20} /> },
];

const PATH_ICON_SIZE = 20;

type PathIcon = ComponentType<{ size?: number; className?: string }>;

const partnerAfterSubmitSteps: {
  step: number;
  title: string;
  text: string;
  Icon: PathIcon;
}[] = [
  {
    step: 1,
    title: 'Первый контакт',
    text: 'Руководитель дилерского направления свяжется с вами по телефону или email в рабочее время.',
    Icon: PhoneIcon,
  },
  {
    step: 2,
    title: 'Материалы и условия',
    text: 'Направим презентацию, ориентиры по продукту и формат партнёрской программы под вашу модель бизнеса.',
    Icon: FileTextIcon,
  },
  {
    step: 3,
    title: 'Обсуждение',
    text: 'Согласуем регион, объёмы, поддержку и следующие шаги — встреча в офисе, онлайн или в вашем городе.',
    Icon: UsersIcon,
  },
  {
    step: 4,
    title: 'Старт сотрудничества',
    text: 'После договорённостей — поставки, обучение и сопровождение, чтобы вы уверенно продавали MARROB.',
    Icon: PackageIcon,
  },
];

const certStrip = [
  { image: `${base}certs/cert-1.png`, title: 'Реестр эффективных предприятий' },
  { image: `${base}certs/cert-2.png`, title: 'Товарный знак MARROB' },
  { image: `${base}certs/cert-3.png`, title: 'MosBuild 2023' },
  { image: `${base}certs/cert-4.png`, title: 'Сертификат Thermo stone' },
];

function parseKpiKicker(kicker: string): { kind: 'num'; n: number; rest: string } | { kind: 'text' } {
  if (kicker === 'ГОСТ' || !/^\d/.test(kicker)) return { kind: 'text' };
  const m = kicker.match(/^(\d+)(.*)$/);
  if (!m) return { kind: 'text' };
  return { kind: 'num', n: parseInt(m[1], 10), rest: m[2] ?? '' };
}

function KpiAnimatedPart({
  target,
  rest,
  reducedMotion,
  active,
}: {
  target: number;
  rest: string;
  reducedMotion: boolean;
  active: boolean;
}) {
  const animated = useAnimatedInteger(target, active && !reducedMotion, 1200);
  const show = active || reducedMotion;
  const value = show ? (reducedMotion ? target : animated) : 0;
  return (
    <span className="tabular-nums">
      {value}
      {rest}
    </span>
  );
}

function DealerKpiKicker({
  kicker,
  reducedMotion,
}: {
  kicker: string;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          o.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, [kicker, reducedMotion]);

  const parsed = parseKpiKicker(kicker);

  return (
    <p
      ref={ref}
      className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#c5d4b8] m-0 mb-1 leading-tight"
    >
      {parsed.kind === 'text' ? (
        kicker
      ) : (
        <KpiAnimatedPart target={parsed.n} rest={parsed.rest} reducedMotion={reducedMotion} active={inView} />
      )}
    </p>
  );
}

function IconCard({
  title,
  text,
  icon,
  tone = 'light',
}: {
  title: string;
  text: string;
  icon: ReactNode;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <div
      className={cn(
        'rounded-xl border p-4 sm:p-5 md:p-6 shadow-premium h-full flex flex-col',
        isDark
          ? 'border-white/10 bg-[var(--section-dark-elevated)] shadow-none transition-shadow hover:shadow-lg hover:shadow-black/20'
          : 'card-interactive border-border bg-white hover:shadow-premium-md',
      )}
    >
      <div
        className={cn(
          'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 shrink-0',
          isDark ? 'bg-white/10 text-[#c5d4b8]' : 'bg-primary-light text-primary',
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          'type-card-title-compact mb-2',
          isDark ? 'text-[var(--section-dark-text)]' : 'text-text',
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'type-card-copy m-0 grow',
          isDark ? 'text-[var(--section-dark-muted)]' : 'text-text-muted',
        )}
      >
        {text}
      </p>
    </div>
  );
}

const DealersPage: React.FC = () => {
  const mainRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useDealersReveal(mainRef, reducedMotion);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Дилерам / Партнёрам — MARROB';
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  const galleryPreviewProjects = useMemo(() => getGalleryProjects(base).slice(0, 6), [base]);

  const [company, setCompany] = useState('');
  const [region, setRegion] = useState('');
  const [format, setFormat] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [certIndex, setCertIndex] = useState(0);

  const dealerFormUrl = import.meta.env.VITE_DEALER_FORM_URL as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(false);
    setSubmitError(null);
    if (!isCompleteRuMobile10(phone)) {
      setPhoneError(true);
      return;
    }
    setSubmitting(true);
    const payload = {
      company,
      region,
      format,
      name,
      phone,
      email,
      source: 'dealers-react',
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
    const result = await postLeadJson(dealerFormUrl, payload);
    setSubmitting(false);
    if (result.success) {
      setSent(true);
      setTimeout(() => setSent(false), 5000);
      return;
    }
    setSubmitError(result.errorMessage);
  };

  const schemeSrc = `${base}solution-scheme.png`;

  const dealerInputClass =
    'min-h-11 h-11 py-2.5 text-base md:text-sm border-border bg-background focus-visible:ring-primary/30';

  return (
    <main ref={mainRef} className="bg-bg relative overflow-hidden pt-24 md:pt-28 lg:pt-32">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="container-premium relative z-10 pb-12 sm:pb-16 lg:pb-20">
        <section className="relative dealers-stack dealers-reveal">
          <div className="dealers-hero-grid rounded-3xl overflow-hidden bg-text shadow-premium-lg grid lg:grid-cols-[1fr_1.05fr]">
            <div className="relative z-10 order-2 lg:order-1 px-4 py-4 sm:px-5 sm:py-5 md:p-6 lg:p-8 flex flex-col justify-center bg-gradient-to-br from-bg via-bg to-sand-light/80">
              <span className="badge-premium mb-2 sm:mb-3 w-fit text-xs px-2 py-0.5">Партнёрам</span>
              <h1 className="dealers-h1 mb-2 sm:mb-3 text-balance">
                Станьте дилером фасадных термопанелей MARROB
              </h1>
              <p className="dealers-lead mb-3 sm:mb-4 max-w-prose text-sm sm:text-base">
                Продукт с высоким спросом и маржинальностью. Собственное производство и поддержка партнёров.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-4 sm:mb-5 w-fit min-h-8"
              >
                <span className="rotate-180 shrink-0">
                  <ChevronRightIcon size={16} />
                </span>
                На главную
              </Link>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 max-w-md">
                {heroPoints.map((line) => (
                  <li key={line} className="flex items-start gap-2 sm:gap-3 text-text-muted text-xs sm:text-sm leading-snug sm:leading-normal">
                    <span className="mt-0.5 text-accent shrink-0">
                      <CheckCircleIcon size={16} className="sm:w-5 sm:h-5" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div>
                <a
                  href="#dealer-form"
                  className="btn-premium btn-premium--primary btn-premium--shimmer text-sm py-2 px-5 sm:py-3 sm:px-8 inline-flex min-h-10"
                >
                  Получить партнёрскую программу
                </a>
              </div>
            </div>
            <div className="dealers-hero-visual relative min-h-[160px] sm:min-h-[220px] lg:min-h-0 order-1 lg:order-2">
              <HeroBackgroundPicture
                alt="Дом с фасадом из термопанелей MARROB"
                fetchPriority="low"
                imgClassName="absolute inset-0 w-full h-full object-cover object-[72%_center] lg:object-[65%_center]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/10 lg:bg-gradient-to-l lg:from-transparent lg:via-black/15 lg:to-black/50"
                aria-hidden
              />
            </div>
          </div>
        </section>

        <div className="dealers-band dealers-band--dark dealers-reveal layout-wide dealers-stack">
          <section className="layout-wide border-0 pt-0 pb-0 dealers-section !border-t-0 !pt-0">
            <div className="text-center mx-auto mb-6 sm:mb-8 dealers-prose">
              <h2 className="dealers-h2 mb-2 sm:mb-3">Производитель фасадных термопанелей MARROB</h2>
              <p className="dealers-lead m-0 mx-auto">
                Собственное производство, контроль качества и стабильные поставки — основа долгосрочного партнёрства по всей
                России.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {kpiItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-[var(--section-dark-elevated)] p-4 sm:p-5 md:p-6 text-center flex flex-col items-center justify-center min-h-[132px] sm:min-h-0"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#b8c9a8] mb-2 sm:mb-3">
                    {item.icon}
                  </div>
                  <DealerKpiKicker kicker={item.kicker} reducedMotion={reducedMotion} />
                  <p className="type-caption sm:text-xs md:text-sm m-0 px-0.5 leading-snug text-[var(--section-dark-muted)]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="layout-wide dealers-section dealers-stack dealers-reveal">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="min-w-0 w-full">
              <span className="badge-premium mb-3">Продукт</span>
              <h2 className="dealers-h2 mb-3 sm:mb-4">Термопанель — понятное предложение для вашего клиента</h2>
              <p className="dealers-lead mb-5 sm:mb-6">
                Утепление и отделка в одной системе: то же решение, что на главном сайте — проще продавать, когда продукт
                нагляден.
              </p>
              <div className="rounded-2xl border border-border bg-white p-3 sm:p-4 shadow-premium">
                <img
                  src={schemeSrc}
                  alt="Схема слоёв фасадной термопанели MARROB"
                  className="w-full h-auto max-h-[240px] sm:max-h-[300px] md:max-h-[320px] object-contain mx-auto"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <h3 className="dealers-h3 mb-5 sm:mb-6">Партнёрская цепочка</h3>
              <ul className="relative m-0 list-none p-0">
                <div
                  className="pointer-events-none absolute left-[19px] top-3 bottom-3 w-px bg-border sm:left-[21px]"
                  aria-hidden
                />
                {chainSteps.map((step) => (
                  <li key={step.title} className="relative flex gap-3 sm:gap-4 pb-7 sm:pb-8 last:pb-0 items-start">
                    <div className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-bg bg-accent/15 text-accent ring-4 ring-bg sm:h-11 sm:w-11">
                      {step.icon}
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5 pr-1 sm:pr-2">
                      <p className="font-display font-semibold text-text m-0 mb-1 text-base sm:text-lg">{step.title}</p>
                      <p className="text-sm text-text-muted m-0 leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="dealers-band dealers-band--dark dealers-reveal layout-wide dealers-stack">
          <section className="dealers-section px-0 w-full !border-t-0 !pt-0 border-0">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--section-dark-elevated)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:rounded-3xl">
              <div className="grid min-h-0 lg:grid-cols-[minmax(0,44%)_minmax(0,1fr)] lg:min-h-[min(400px,52vh)]">
                <div className="relative min-h-[200px] sm:min-h-[260px] lg:min-h-full">
                  <img
                    src={`${base}images/dealers-market-house.png`}
                    alt="Частный дом с ландшафтом — пример сегмента частного домостроения"
                    className="absolute inset-0 h-full w-full object-cover object-[center_32%]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#1c1c1a]/90 via-[#1c1c1a]/20 to-transparent lg:bg-gradient-to-r lg:from-black/25 lg:via-[#242522]/55 lg:to-[var(--section-dark-elevated)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[var(--section-dark-elevated)] to-transparent lg:block"
                    aria-hidden
                  />
                </div>
                <div className="dealers-prose flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-10 lg:pl-8 lg:pr-10">
                  <h2 className="dealers-h2 mb-3 sm:mb-4 text-balance">
                    Рынок фасадных термопанелей активно развивается
                  </h2>
                  <p className="dealers-lead mb-5 sm:mb-6">
                    Частное домостроение и реконструкция фасадов остаются устойчивыми сегментами рынка. Клиенты всё чаще
                    выбирают готовые фасадные системы вместо классических мокрых решений.
                  </p>
                  <ul className="mb-5 space-y-2.5 sm:mb-6 sm:space-y-3">
                    {marketBullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-5 text-[var(--section-dark-muted)] text-sm leading-relaxed sm:text-base before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#b8c9a8] before:content-['']"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="m-0 text-sm font-medium leading-snug text-[#e8c4b0] sm:text-base">
                    Термопанели становятся альтернативой штукатурным и кирпичным фасадам.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          id="dealers-objects"
          className="dealers-section dealers-stack dealers-reveal section-premium relative overflow-hidden rounded-2xl border border-border/60 bg-sand-light shadow-premium sm:rounded-3xl"
        >
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0 w-full lg:max-w-2xl">
                <span className="badge-premium mb-3 inline-block sm:mb-4">Объекты</span>
                <h2 className="type-section-title mb-3 text-balance sm:mb-4">
                  Продукция, которую видно с <span className="text-primary">улицы</span>
                </h2>
                <p className="type-section-lead m-0">
                  Реальные фасады в Московской области — вашим клиентам проще доверять.
                </p>
              </div>
              <Link
                to="/#gallery"
                className="text-sm font-medium text-primary hover:text-primary/80 inline-flex min-h-11 shrink-0 items-center gap-1 py-2 sm:min-h-0 sm:py-0"
              >
                Галерея на главной
                <ChevronRightIcon size={16} />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryPreviewProjects.map((project) => (
                <Link
                  key={project.id}
                  to="/#gallery"
                  className="group card-interactive block overflow-hidden rounded-2xl bg-white shadow-premium hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[4/3] cursor-pointer overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-text"
                        aria-hidden
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 border-t border-border p-4 sm:p-5">
                    <div className="flex min-w-0 items-center justify-between gap-3">
                      <span className="shrink-0 rounded-lg border border-border bg-sand-light px-3 py-1.5 text-sm font-medium text-text-muted">
                        {project.area}
                      </span>
                      <p
                        className="min-w-0 flex-1 truncate text-right text-sm font-medium text-text"
                        title={project.cardTitle}
                      >
                        {project.cardTitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="dealers-band dealers-band--dark dealers-reveal layout-wide dealers-stack">
          <section className="layout-wide dealers-section !border-t-0 !pt-0 border-0">
            <h2 className="dealers-h2 mb-5 sm:mb-6">Сколько зарабатывает дилер MARROB</h2>
            <p className="dealers-lead mb-6 sm:mb-8 dealers-prose">
              Фасадные термопанели — продукт со стабильным спросом и понятной экономикой. Партнёр получает доход как от продажи
              панелей, так и от дополнительных услуг.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {economyCards.map((c) => (
                <IconCard key={c.title} {...c} tone="dark" />
              ))}
            </div>
          </section>
        </div>

        <section className="layout-wide dealers-stack dealers-reveal">
          <div className="w-full rounded-2xl border border-border bg-white p-6 sm:p-8 md:p-10 shadow-premium text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-light rounded-xl flex items-center justify-center text-primary mx-auto mb-4 sm:mb-5">
              <FileTextIcon size={26} className="sm:w-7 sm:h-7" />
            </div>
            <p className="text-text-muted text-base sm:text-lg mb-5 sm:mb-6 m-0 leading-relaxed px-1">
              Нужна презентация для партнёров, прайс или условия договора — оставьте заявку, мы пришлём материалы.
            </p>
            <a href="#dealer-form" className="btn-premium btn-premium--primary btn-premium--shimmer min-h-11 inline-flex">
              Запросить материалы
            </a>
          </div>
        </section>

        <div className="dealers-band dealers-band--dark dealers-reveal layout-wide dealers-stack">
          <section className="layout-wide dealers-section !border-t-0 !pt-0 border-0">
            <h2 className="dealers-h2 mb-3 sm:mb-4">Кому подходит партнёрство с MARROB</h2>
            <p className="dealers-lead mb-6 sm:mb-8 dealers-prose">
              Мы выстраиваем сотрудничество с компаниями, которые активно работают с частным домостроением и заинтересованы в
              развитии направления фасадных решений.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {partnerCards.map((c) => (
                <IconCard key={c.title} {...c} tone="dark" />
              ))}
            </div>
          </section>
        </div>

        <section className="layout-wide dealers-section dealers-stack dealers-reveal">
          <h2 className="dealers-h2 mb-3 sm:mb-4">Поддержка партнёров на каждом этапе</h2>
          <p className="dealers-lead mb-6 sm:mb-8 dealers-prose">
            Наша задача — не просто поставить продукцию, а выстроить устойчивое партнёрство и помочь вам развивать
            направление фасадных решений.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {supportCards.map((c) => (
              <IconCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        <div className="dealers-band dealers-band--dark dealers-reveal layout-wide dealers-stack">
          <section className="layout-wide dealers-section !border-t-0 !pt-0 border-0">
            <div className="text-center mx-auto mb-6 sm:mb-8 layout-narrow dealers-prose">
              <span className="badge-premium mb-3">Надёжность</span>
              <h2 className="dealers-h2 mb-2">Документы и сертификаты</h2>
              <p className="text-[var(--section-dark-muted)] text-sm sm:text-base m-0 leading-relaxed">
                Продукция сертифицирована — спокойствие для вас и ваших клиентов.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {certStrip.map((c, i) => (
                <button
                  key={c.image}
                  type="button"
                  onClick={() => {
                    setCertIndex(i);
                    setCertOpen(true);
                  }}
                  className="text-left rounded-xl border border-border bg-white overflow-hidden shadow-premium hover:shadow-premium-md transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] flex flex-col"
                >
                  <div className="aspect-[3/4] bg-sand-light min-h-0 flex-1">
                    <img src={c.image} alt="" className="w-full h-full object-contain p-2" loading="lazy" />
                  </div>
                  <p className="text-xs text-text-muted px-2 sm:px-3 py-2.5 m-0 line-clamp-2 min-h-[44px] flex items-center leading-snug border-t border-border/60 bg-white">
                    {c.title}
                  </p>
                </button>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-[var(--section-dark-muted)] m-0 leading-relaxed px-2">
              Полный список — в блоке «Сертификаты» на{' '}
              <Link to="/" className="text-[#c5d4b8] font-medium hover:underline">
                главной странице
              </Link>
              .
            </p>
          </section>
        </div>

        <Dialog open={certOpen} onOpenChange={setCertOpen}>
          <DialogContent className="sm:max-w-[min(920px,96vw)] w-[calc(100vw-1.5rem)] max-h-[85dvh] p-0 gap-0 border-0 bg-white flex flex-col overflow-hidden">
            <DialogClose className="absolute right-2 top-2 sm:right-3 sm:top-3 z-20 rounded-full bg-black/5 p-2 hover:bg-black/10">
              <XIcon size={20} className="h-5 w-5 shrink-0" />
              <span className="sr-only">Закрыть</span>
            </DialogClose>
            <div className="p-4 pt-11 sm:p-6 sm:pt-12 overflow-y-auto min-h-0">
              <img
                src={certStrip[certIndex]?.image}
                alt={certStrip[certIndex]?.title ?? ''}
                className="w-full max-h-[min(70dvh,680px)] object-contain mx-auto"
              />
              <p className="text-center text-sm font-medium text-text mt-4 px-2">{certStrip[certIndex]?.title}</p>
            </div>
          </DialogContent>
        </Dialog>

        <section
          id="dealer-form"
          className="layout-wide dealers-stack scroll-mt-28 md:scroll-mt-32 pb-6 sm:pb-8 dealers-reveal"
        >
          <div className="dealers-band dealers-band--dark dealers-band--cta rounded-3xl">
            <h2 className="dealers-h2 text-center mb-2 sm:mb-3 px-2 text-[var(--section-dark-text)]">
              Получите подробную партнёрскую программу MARROB
            </h2>
            <p className="text-center text-[var(--section-dark-muted)] text-sm sm:text-base mb-5 sm:mb-6 layout-narrow leading-relaxed px-2">
              Мы направим условия сотрудничества и свяжемся с вами для обсуждения формата работы.
            </p>

            <div
              className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-9 px-2"
              role="status"
              aria-live="polite"
            >
              <span
                className="inline-flex h-2 w-2 shrink-0 rounded-full bg-[var(--success)] shadow-[0_0_0_4px_var(--success-muted)]"
                aria-hidden
              />
              <span className="text-sm sm:text-base font-medium text-[var(--section-dark-text)]">{DEALER_FORM_FOMO_LINE}</span>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-premium-lg bg-white border border-white/10">
              <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10 bg-white">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 layout-narrow w-full">
                  {sent && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-lg bg-accent/10 text-accent text-sm font-medium px-4 py-3 text-center"
                    >
                      Заявка принята. Мы свяжемся с вами в ближайшее время.
                    </div>
                  )}
                  {submitError && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="rounded-lg bg-destructive/10 text-destructive text-sm font-medium px-4 py-3 text-center"
                    >
                      {submitError}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="dealer-company" className="type-label">
                      Название компании *
                    </Label>
                    <Input
                      id="dealer-company"
                      name="company"
                      required
                      placeholder="ООО «Название»"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={dealerInputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealer-region" className="type-label">
                      Регион / город *
                    </Label>
                    <Input
                      id="dealer-region"
                      name="region"
                      required
                      placeholder="Город или область"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className={dealerInputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="type-label">Формат бизнеса</Label>
                    <Select value={format || undefined} onValueChange={setFormat}>
                      <SelectTrigger className={`w-full ${dealerInputClass}`}>
                        <SelectValue placeholder="Выберите формат" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="store">Строительный магазин</SelectItem>
                        <SelectItem value="construction">Строительство домов</SelectItem>
                        <SelectItem value="contractor">Подрядная организация</SelectItem>
                        <SelectItem value="online">Интернет-продажи</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealer-name" className="type-label">
                      Контактное лицо *
                    </Label>
                    <Input
                      id="dealer-name"
                      name="name"
                      required
                      placeholder="ФИО"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={dealerInputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealer-phone" className="type-label">
                      Телефон *
                    </Label>
                    <Input
                      id="dealer-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      aria-invalid={phoneError}
                      className={
                        phoneError
                          ? `${dealerInputClass} border-destructive focus-visible:ring-destructive/40`
                          : dealerInputClass
                      }
                      value={phone}
                      onChange={(e) => {
                        setPhoneError(false);
                        setPhone(formatRuPhoneMask(extractRuPhoneDigits10(e.target.value)));
                      }}
                    />
                    {phoneError && (
                      <p className="text-sm text-destructive m-0" role="alert" aria-live="polite">
                        Введите полный номер: 10 цифр после +7
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealer-email" className="type-label">
                      Email *
                    </Label>
                    <Input
                      id="dealer-email"
                      name="email"
                      type="email"
                      required
                      placeholder="email@company.ru"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={dealerInputClass}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-premium btn-premium--primary btn-premium--shimmer min-h-12 h-12 text-base font-semibold"
                  >
                    {submitting ? 'Отправка…' : 'Получить партнёрскую программу'}
                  </Button>
                  <p className="text-xs text-text-light text-center m-0 leading-relaxed">
                    Мы рассматриваем заявки и связываемся для обсуждения сотрудничества. Свяжется руководитель дилерского
                    направления.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          className="layout-wide dealers-section dealers-stack dealers-reveal border-t border-border rounded-3xl bg-gradient-to-b from-sand-light/80 via-bg to-bg px-4 py-10 sm:px-8 sm:py-12 ring-1 ring-border/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)]"
          aria-labelledby="dealers-partner-path-title"
        >
          <div className="text-center mx-auto mb-8 sm:mb-10 layout-narrow">
            <span className="badge-premium mb-3">После заявки</span>
            <h2 id="dealers-partner-path-title" className="dealers-h2 mb-2 sm:mb-3">
              Путь партнёра
            </h2>
            <p className="dealers-lead m-0">Что произойдёт после того, как вы нажмёте «Отправить»</p>
          </div>
          <ol className="grid sm:grid-cols-2 gap-4 sm:gap-5 list-none m-0 p-0">
            {partnerAfterSubmitSteps.map((s) => (
              <li
                key={s.step}
                className="group card-interactive relative overflow-hidden rounded-2xl border border-border bg-white/95 p-5 sm:p-6 shadow-premium backdrop-blur-[2px] hover:-translate-y-0.5 hover:border-primary/25 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary font-display text-sm font-bold ring-1 ring-primary/15"
                    aria-hidden
                  >
                    {s.step}
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary-light/50 text-primary transition-colors group-hover:border-primary/20 group-hover:bg-primary-light"
                    aria-hidden
                  >
                    <s.Icon size={PATH_ICON_SIZE} className="shrink-0" />
                  </span>
                </div>
                <h3 className="m-0 mb-2 font-display text-base font-semibold text-text sm:text-lg">{s.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
};

export default DealersPage;
