import React from 'react';
import { ChevronDownIcon } from '../components/icons/BuildingIcons';
import { Thermometer, Volume2, Droplets, Feather } from 'lucide-react';

const ICON = 36;

const Problem: React.FC = () => {
  const advantages = [
    {
      icon: <Thermometer size={ICON} strokeWidth={1.75} />,
      title: 'Качественная теплоизоляция',
      description:
        'Низкая теплопроводность ядра панели — меньше теплопотери и расходы на отопление круглый год.',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      icon: <Volume2 size={ICON} strokeWidth={1.75} />,
      title: 'Высокая шумоизоляция',
      description:
        'Многослойная конструкция гасит уличный шум и делает интерьер заметно комфортнее.',
      color: 'bg-sky-50 text-sky-700',
    },
    {
      icon: <Droplets size={ICON} strokeWidth={1.75} />,
      title: 'Водонепроницаемость',
      description:
        'Защитный декоративный слой и геометрия стыков снижают риск промокания утеплителя.',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      icon: <Feather size={ICON} strokeWidth={1.75} />,
      title: 'Небольшой вес',
      description:
        'Панели легче мокрой штукатурки и навесного камня — меньше нагрузка на фундамент и несущие конструкции.',
      color: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <section id="about" className="section-premium bg-sand-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container-premium relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-premium mb-4">Преимущества</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Почему выбирают <span className="text-primary">фасадные термопанели</span>
          </h2>
          <p className="text-text-muted text-lg">
            Ключевые свойства системы MARROB для тёплого и долговечного фасада
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-[4.5rem] h-[4.5rem] rounded-2xl ${item.color} flex items-center justify-center mb-5 [&_svg]:shrink-0`}
              >
                {item.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-text mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-4 animate-bounce">
            <ChevronDownIcon size={24} className="text-primary" />
          </div>
          <p className="text-center text-text-muted max-w-lg">
            <span className="text-primary font-medium">Дальше</span> — как устроена панель и как проходит
            монтаж
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
