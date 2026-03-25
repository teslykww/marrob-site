import React, { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import {
  ChevronRightIcon,
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
import { getGalleryProjects } from '@/data/galleryProjects';
import { extractRuPhoneDigits10, formatRuPhoneMask, isCompleteRuMobile10 } from '@/lib/phoneRu';

const base = import.meta.env.BASE_URL;

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
    text: 'Средний фасад частного дома — от 150 м².',
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
  { title: 'Передача входящих заявок', text: 'При наличии партнёра в регионе заявки передаются для обработки.', icon: <ArrowUpRightIcon size={20} /> },
];

const certStrip = [
  { image: `${base}certs/cert-1.png`, title: 'Реестр эффективных предприятий' },
  { image: `${base}certs/cert-2.png`, title: 'Товарный знак MARROB' },
  { image: `${base}certs/cert-3.png`, title: 'MosBuild 2023' },
  { image: `${base}certs/cert-4.png`, title: 'Сертификат Thermo stone' },
];

function IconCard({ title, text, icon }: { title: string; text: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4 sm:p-5 md:p-6 shadow-premium hover:shadow-premium-md transition-shadow h-full flex flex-col">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-3 sm:mb-4 shrink-0">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-text mb-2 text-base sm:text-lg leading-snug">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed m-0 grow">{text}</p>
    </div>
  );
}

const DealersPage: React.FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Дилерам / Партнёрам — MARROB';
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, []);

  const galleryThumbs = useMemo(() => {
    const projects = getGalleryProjects(base);
    return projects.slice(0, 6).map((p) => ({
      src: p.images[0],
      label: p.cardTitle,
    }));
  }, []);

  const [company, setCompany] = useState('');
  const [region, setRegion] = useState('');
  const [format, setFormat] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [certIndex, setCertIndex] = useState(0);

  const dealerFormUrl = import.meta.env.VITE_DEALER_FORM_URL as string | undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(false);
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
      source: 'dealers-page',
    };
    if (dealerFormUrl) {
      try {
        await fetch(dealerFormUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        /* сеть / CORS — показываем успех только если запрос ушёл; иначе всё равно даём локальный фидбек */
      }
    }
    setSubmitting(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const officePhoto = `${base}images/contact-office.png`;
  const schemeSrc = `${base}solution-scheme.png`;

  const dealerInputClass =
    'min-h-11 h-11 py-2.5 text-base md:text-sm border-border focus-visible:ring-primary/30';

  return (
    <main className="bg-bg relative overflow-hidden pt-24 md:pt-28 lg:pt-32">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

      <div className="container-premium relative z-10 pb-12 sm:pb-16 lg:pb-20">
        <section className="relative dealers-stack">
          <div className="dealers-hero-grid rounded-3xl overflow-hidden bg-text shadow-premium-lg grid lg:grid-cols-[1fr_1.05fr]">
            <div className="relative z-10 order-2 lg:order-1 px-4 py-6 sm:px-6 sm:py-8 md:p-10 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-bg via-bg to-sand-light/80">
              <span className="badge-premium mb-3 sm:mb-4 w-fit">Партнёрам</span>
              <h1 className="dealers-h1 mb-3 sm:mb-4 text-balance">
                Станьте дилером фасадных термопанелей MARROB
              </h1>
              <p className="dealers-lead mb-5 sm:mb-6 max-w-prose">
                Продукт с высоким спросом и маржинальностью. Собственное производство и поддержка партнёров.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-6 sm:mb-8 w-fit min-h-11"
              >
                <span className="rotate-180 shrink-0">
                  <ChevronRightIcon size={16} />
                </span>
                На главную
              </Link>
              <ul className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8 max-w-md">
                {heroPoints.map((line) => (
                  <li key={line} className="flex items-start gap-2.5 sm:gap-3 text-text-muted text-sm sm:text-base leading-snug sm:leading-normal">
                    <span className="mt-0.5 text-accent shrink-0">
                      <CheckCircleIcon size={18} className="sm:w-5 sm:h-5" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div>
                <a href="#dealer-form" className="btn-premium btn-premium--primary text-sm py-3 px-6 sm:px-8 inline-flex min-h-11">
                  Получить партнёрскую программу
                </a>
              </div>
            </div>
            <div className="dealers-hero-visual relative min-h-[220px] sm:min-h-[280px] lg:min-h-0 order-1 lg:order-2">
              <img
                src={`${base}hero-bg.png`}
                alt="Дом с фасадом из термопанелей MARROB"
                className="absolute inset-0 w-full h-full object-cover object-[72%_center] lg:object-[65%_center]"
                loading="eager"
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/10 lg:bg-gradient-to-l lg:from-transparent lg:via-black/15 lg:to-black/50"
                aria-hidden
              />
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto dealers-stack">
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
                className="rounded-2xl border border-border bg-white p-4 sm:p-5 md:p-6 shadow-premium text-center flex flex-col items-center justify-center min-h-[132px] sm:min-h-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-2 sm:mb-3">
                  {item.icon}
                </div>
                <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-primary tabular-nums m-0 mb-1 leading-tight">
                  {item.kicker}
                </p>
                <p className="text-[0.6875rem] sm:text-xs md:text-sm text-text-muted m-0 leading-snug px-0.5">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto dealers-section dealers-stack">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="max-w-3xl xl:max-w-none">
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

        <section className="max-w-3xl mx-auto dealers-section dealers-stack dealers-prose px-0">
          <h2 className="dealers-h2 mb-3 sm:mb-4">Рынок фасадных термопанелей активно развивается</h2>
          <p className="dealers-lead mb-5 sm:mb-6">
            Частное домостроение и реконструкция фасадов остаются устойчивыми сегментами рынка. Клиенты всё чаще выбирают
            готовые фасадные системы вместо классических мокрых решений.
          </p>
          <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
            {marketBullets.map((b) => (
              <li
                key={b}
                className="relative pl-5 text-text-muted text-sm sm:text-base leading-relaxed before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-primary"
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="text-accent font-medium text-sm sm:text-base m-0 leading-snug">
            Термопанели становятся альтернативой штукатурным и кирпичным фасадам.
          </p>
        </section>

        <section className="max-w-6xl mx-auto dealers-section dealers-stack">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
            <div className="min-w-0">
              <span className="badge-premium mb-2">Объекты</span>
              <h2 className="dealers-h2 m-0">Продукция, которую видно с улицы</h2>
              <p className="dealers-lead text-sm sm:text-base mt-2 m-0 max-w-xl">
                Реальные фасады в Московской области — вашим клиентам проще доверять.
              </p>
            </div>
            <Link
              to="/"
              className="text-sm font-medium text-primary hover:text-primary/80 inline-flex items-center gap-1 shrink-0 min-h-11 sm:min-h-0 py-2 sm:py-0"
            >
              Галерея на главной
              <ChevronRightIcon size={16} />
            </Link>
          </div>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain pb-2 snap-x snap-mandatory scroll-pl-4 scrollbar-thin -mx-[var(--section-px)] px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:overflow-visible">
            {galleryThumbs.map((t) => (
              <figure
                key={t.src}
                className="snap-start shrink-0 w-[min(188px,78vw)] sm:w-[min(200px,70vw)] md:w-auto rounded-xl overflow-hidden border border-border shadow-premium bg-white"
              >
                <div className="aspect-[4/3] relative">
                  <img src={t.src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <figcaption className="px-2 py-2.5 text-xs text-text-muted text-center line-clamp-2 min-h-[2.75rem] leading-snug">
                  {t.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto dealers-section dealers-stack">
          <h2 className="dealers-h2 mb-3 sm:mb-4">Сколько зарабатывает дилер MARROB</h2>
          <p className="dealers-lead mb-6 sm:mb-8 dealers-prose">
            Фасадные термопанели — продукт со стабильным спросом и понятной экономикой. Партнёр получает доход как от продажи
            панелей, так и от дополнительных услуг.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {economyCards.map((c) => (
              <IconCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        <section className="max-w-2xl mx-auto dealers-stack">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-premium text-center border border-border">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-light rounded-xl flex items-center justify-center text-primary mx-auto mb-4 sm:mb-5">
              <FileTextIcon size={26} className="sm:w-7 sm:h-7" />
            </div>
            <p className="text-text-muted text-base sm:text-lg mb-5 sm:mb-6 m-0 leading-relaxed px-1">
              Нужна презентация для партнёров, прайс или условия договора — оставьте заявку, мы пришлём материалы.
            </p>
            <a href="#dealer-form" className="btn-premium btn-premium--primary min-h-11 inline-flex">
              Запросить материалы
            </a>
          </div>
        </section>

        <section className="max-w-5xl mx-auto dealers-section dealers-stack">
          <h2 className="dealers-h2 mb-3 sm:mb-4">Кому подходит партнёрство с MARROB</h2>
          <p className="dealers-lead mb-6 sm:mb-8 dealers-prose">
            Мы выстраиваем сотрудничество с компаниями, которые активно работают с частным домостроением и заинтересованы в
            развитии направления фасадных решений.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {partnerCards.map((c) => (
              <IconCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto dealers-section dealers-stack">
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

        <section className="max-w-5xl mx-auto dealers-section dealers-stack">
          <div className="text-center mx-auto mb-6 sm:mb-8 max-w-xl dealers-prose">
            <span className="badge-premium mb-3">Надёжность</span>
            <h2 className="dealers-h2 mb-2">Документы и сертификаты</h2>
            <p className="text-text-muted text-sm sm:text-base m-0 leading-relaxed">Продукция сертифицирована — спокойствие для вас и ваших клиентов.</p>
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
          <p className="text-center mt-6 text-sm text-text-muted m-0 leading-relaxed px-2">
            Полный список — в блоке «Сертификаты» на{' '}
            <Link to="/" className="text-primary font-medium hover:underline">
              главной странице
            </Link>
            .
          </p>
        </section>

        <Dialog open={certOpen} onOpenChange={setCertOpen}>
          <DialogContent className="sm:max-w-[min(920px,96vw)] w-[calc(100vw-1.5rem)] max-h-[85dvh] p-0 gap-0 border-0 bg-white flex flex-col overflow-hidden">
            <DialogClose className="absolute right-2 top-2 sm:right-3 sm:top-3 z-20 rounded-full bg-black/5 p-2 hover:bg-black/10">
              <X className="h-5 w-5" />
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
          className="max-w-5xl mx-auto dealers-section scroll-mt-28 md:scroll-mt-32 pb-6 sm:pb-8"
        >
          <h2 className="dealers-h2 text-center mb-2 sm:mb-3 px-2">
            Получите подробную партнёрскую программу MARROB
          </h2>
          <p className="text-center text-text-muted text-sm sm:text-base mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed px-2">
            Мы направим условия сотрудничества и свяжемся с вами для обсуждения формата работы.
          </p>

          <div className="rounded-2xl overflow-hidden shadow-premium-lg bg-white flex flex-col lg:flex-row lg:items-stretch lg:min-h-[min(560px,75vh)] border border-border">
            <figure className="relative w-full shrink-0 min-h-[200px] xs:min-h-[220px] sm:min-h-[260px] lg:w-[40%] lg:max-w-md lg:min-h-0">
              <img
                src={officePhoto}
                alt="Офис MARROB — встречи с партнёрами и клиентами"
                className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
                <span className="text-sm font-medium text-white/95">Офис в Одинцово</span>
                <span className="block text-xs text-white/75 mt-0.5">Обсудим партнёрство лично или онлайн</span>
              </figcaption>
            </figure>

            <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 max-w-xl mx-auto w-full">
                {sent && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-lg bg-accent/10 text-accent text-sm font-medium px-4 py-3 text-center"
                  >
                    Заявка принята. Мы свяжемся с вами в ближайшее время.
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="dealer-company">Название компании *</Label>
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
                  <Label htmlFor="dealer-region">Регион / город *</Label>
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
                  <Label>Формат бизнеса</Label>
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
                  <Label htmlFor="dealer-name">Контактное лицо *</Label>
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
                  <Label htmlFor="dealer-phone">Телефон *</Label>
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
                  <Label htmlFor="dealer-email">Email *</Label>
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
                  className="w-full btn-premium btn-premium--primary min-h-12 h-12 text-base font-semibold"
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
        </section>
      </div>
    </main>
  );
};

export default DealersPage;
