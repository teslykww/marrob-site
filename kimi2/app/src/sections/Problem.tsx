import React from 'react';
import { UsersIcon, DropletIcon, ThermometerIcon, ClockIcon, ChevronDownIcon } from '../components/icons/BuildingIcons';

const Problem: React.FC = () => {
  const problems = [
    {
      icon: <UsersIcon size={28} />,
      title: 'Два подрядчика',
      description: 'Отдельное утепление и отдельная облицовка — два подрядчика, разные сроки и координация работ',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: <DropletIcon size={28} />,
      title: 'Мокрые процессы',
      description: 'Зависимость от погоды и сезонности — работы невозможны при дожде и минусовой температуре',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <ThermometerIcon size={28} />,
      title: 'Мостики холода',
      description: 'Ошибки стыковки слоёв приводят к мостикам холода, трещинам и потере тепла',
      color: 'bg-red-50 text-red-600',
    },
    {
      icon: <ClockIcon size={28} />,
      title: 'Длительный монтаж',
      description: 'Растянутые сроки строительства — классическая схема занимает в 2–3 раза больше времени',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section id="about" className="section-premium bg-sand-light relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-premium mb-4">Проблема</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Почему классическое утепление фасада — это{' '}
            <span className="text-accent">несколько этапов и лишние риски?</span>
          </h2>
          <p className="text-text-muted text-lg">
            Традиционные схемы утепления сложны и создают множество проблем на каждом этапе
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl ${problem.color} flex items-center justify-center mb-4`}>
                {problem.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-text mb-2">
                {problem.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition to solution */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-4 animate-bounce">
            <ChevronDownIcon size={24} className="text-primary" />
          </div>
          <p className="text-center text-text-muted max-w-lg">
            <span className="text-primary font-medium">Современные фасадные системы</span> объединяют утепление и отделку в одном продукте
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
