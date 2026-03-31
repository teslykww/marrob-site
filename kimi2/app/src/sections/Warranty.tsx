import React from 'react';
import { 
  ShieldIcon, 
  FactoryIcon, 
  CheckCircleIcon,
  AwardIcon,
  TrendingUpIcon,
  UsersIcon
} from '../components/icons/BuildingIcons';

const Warranty: React.FC = () => {
  const warrantyPoints = [
    'Гарантия на панели — 30 лет',
    'Гарантия на монтаж — 5 лет',
    'Пожизненное обслуживание',
    'Бесплатная консультация',
  ];

  const factoryStats = [
    { icon: <TrendingUpIcon size={20} />, value: '15 000+', label: 'м² в месяц' },
    { icon: <UsersIcon size={20} />, value: '120+', label: 'сотрудников' },
    { icon: <AwardIcon size={20} />, value: 'ISO 9001', label: 'сертификация' },
  ];

  const features = [
    'Современное оборудование и контроль качества',
    'Склад готовой продукции',
  ];

  return (
    <section className="section-premium bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Warranty Block */}
          <div className="bg-gradient-to-br from-primary to-green-dark rounded-2xl p-8 md:p-10 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldIcon size={32} />
              </div>
              <div>
                <span className="text-white/70 text-sm uppercase tracking-wider">Гарантия</span>
                <h3 className="type-card-title">30 лет на панели</h3>
              </div>
            </div>

            <p className="text-white/80 mb-6">
              Мы уверены в качестве своей продукции и предоставляем расширенную гарантию 
              на все компоненты фасадной системы.
            </p>

            <ul className="space-y-2 mb-8">
              {warrantyPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-3 leading-snug">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon size={14} />
                  </div>
                  <span className="text-white/90 text-[0.9375rem]">{point}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white/10 rounded-xl p-5">
              <p className="text-white/70 text-sm mb-2">Срок службы конструкции</p>
              <p className="font-display font-bold text-4xl">40+ лет</p>
            </div>
          </div>

          {/* Factory Block */}
          <div className="bg-sand-light rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                <FactoryIcon size={32} />
              </div>
              <div>
                <span className="text-text-light text-sm uppercase tracking-wider">Производство</span>
                <h3 className="type-card-title text-text">Собственный завод</h3>
              </div>
            </div>

            <p className="text-text-muted mb-6 text-base leading-relaxed">
              Полный цикл от проектирования до отгрузки готовой продукции.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {factoryStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <div className="font-display font-bold text-text">{stat.value}</div>
                  <div className="text-text-light text-xs">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <ul className="space-y-2.5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-base text-text-muted leading-snug">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon size={10} className="text-white" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Warranty;
