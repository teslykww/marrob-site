import React from 'react';
import { Reveal } from '@/components/Reveal';
import {
  ChevronDownIcon,
  ThermometerIcon,
  Volume2Icon,
  DropletIcon,
  FeatherIcon,
  ClockIcon,
  ShieldIcon,
  SunIcon,
  TargetIcon,
} from '../components/icons/BuildingIcons';

const ICON = 36;

type Advantage = {
  icon: React.ReactNode;
  kicker?: string;
  title: string;
  description: string;
  color: string;
};

function AdvantageCard({ item }: { item: Advantage }) {
  const hasKicker = Boolean(item.kicker);

  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-md motion-reduce:transform-none motion-reduce:transition-none">
      <div
        className={`mb-5 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl ${item.color} [&_svg]:shrink-0`}
      >
        {item.icon}
      </div>
      {hasKicker ? (
        <div className="mb-3 flex min-h-[8.75rem] flex-col gap-2 sm:min-h-[9rem]">
          <p className="font-display text-lg font-bold tabular-nums leading-snug text-primary">{item.kicker}</p>
          <h3 className="type-card-title hyphens-auto break-words [overflow-wrap:anywhere]">{item.title}</h3>
        </div>
      ) : (
        <div className="mb-3 flex min-h-[5.5rem] flex-col justify-start sm:min-h-[5.75rem]">
          <h3 className="type-card-title hyphens-auto break-words [overflow-wrap:anywhere]">{item.title}</h3>
        </div>
      )}
      <p className="type-body-sm m-0 grow text-text-muted">{item.description}</p>
    </div>
  );
}

const Problem: React.FC = () => {
  const advantages: Advantage[] = [
    {
      icon: <ThermometerIcon size={ICON} />,
      title: 'Качественная теплоизоляция',
      description:
        'Низкая теплопроводность ядра панели — меньше теплопотери и расходы на отопление круглый год.',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      icon: <Volume2Icon size={ICON} />,
      title: 'Высокая шумоизоляция',
      description:
        'Многослойная конструкция гасит уличный шум и делает интерьер заметно комфортнее.',
      color: 'bg-sky-50 text-sky-700',
    },
    {
      icon: <DropletIcon size={ICON} />,
      title: 'Водонепроницаемость',
      description:
        'Защитный декоративный слой и геометрия стыков снижают риск промокания утеплителя.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: <FeatherIcon size={ICON} />,
      title: 'Небольшой вес',
      description:
        'Панели легче мокрой штукатурки и навесного камня — меньше нагрузка на фундамент и несущие конструкции.',
      color: 'bg-amber-50 text-amber-700',
    },
    {
      icon: <ClockIcon size={ICON} />,
      kicker: 'до 60%',
      title: 'Снижение теплопотерь',
      description: 'Экономия на отоплении уже в первый сезон. Дом теряет вдвое меньше тепла.',
      color: 'bg-violet-50 text-violet-700',
    },
    {
      icon: <ShieldIcon size={ICON} />,
      kicker: '−50°C до +70°C',
      title: 'Стойкость к внешним воздействиям',
      description:
        'Не впитывает влагу, не подвержен коррозии. Выдерживает 200+ циклов заморозки.',
      color: 'bg-rose-50 text-rose-700',
    },
    {
      icon: <SunIcon size={ICON} />,
      kicker: '100+ вариантов',
      title: 'Фактуры и оттенки',
      description: 'Клинкер, натуральный камень, сланец — широкий выбор под любой стиль.',
      color: 'bg-lime-50 text-lime-800',
    },
    {
      icon: <TargetIcon size={ICON} />,
      kicker: 'Класс Г2',
      title: 'Огнестойкость и безопасность',
      description:
        'Декоративный камень огнеупорен и соответствует нормам пожарной безопасности.',
      color: 'bg-cyan-50 text-cyan-800',
    },
  ];

  return (
    <section
      id="about"
      className="section-premium relative overflow-hidden bg-sand-light scroll-mt-24 lg:scroll-mt-32"
    >
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="container-premium relative z-10">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="badge-premium mb-4">Преимущества</span>
            <h2 className="type-section-title mb-4">
              Почему выбирают <span className="text-primary">фасадные термопанели</span>
            </h2>
            <p className="type-section-lead mb-6">
              Ключевые свойства системы MARROB для тёплого и долговечного фасада
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
        <div className="mb-12 flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.slice(0, 4).map((item, index) => (
              <AdvantageCard key={index} item={item} />
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.slice(4, 8).map((item, index) => (
              <AdvantageCard key={index + 4} item={item} />
            ))}
          </div>
        </div>
        </Reveal>

        <div className="flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light animate-bounce motion-reduce:animate-none">
            <ChevronDownIcon size={24} className="text-primary" />
          </div>
          <p className="max-w-lg text-center text-text-muted">
            <span className="font-medium text-primary">Дальше</span> — как устроена панель и как проходит
            монтаж
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
