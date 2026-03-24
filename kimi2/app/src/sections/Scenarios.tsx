import React from 'react';
import { 
  PackageIcon, 
  ToolIcon, 
  CheckCircleIcon,
  ChevronRightIcon 
} from '../components/icons/BuildingIcons';

const Scenarios: React.FC = () => {
  const scenarios = [
    {
      icon: <PackageIcon size={28} />,
      title: 'Панели отдельно',
      subtitle: 'Для самостоятельного монтажа',
      description: 'Поставка панелей с крепежом и инструкцией. Вы организуете монтаж самостоятельно.',
      features: [
        'Полный комплект панелей',
        'Крепёжные элементы',
        'Монтажная инструкция',
        'Техническая поддержка',
      ],
      cta: 'Получить прайс',
      color: 'bg-blue-50 text-blue-600',
      accent: 'border-blue-200',
    },
    {
      icon: <ToolIcon size={28} />,
      title: 'Монтаж под ключ',
      subtitle: 'Полный комплекс услуг',
      description: 'Всё включено: материалы, монтаж, гарантия на работы 5 лет.',
      features: [
        'Панели и крепёж',
        'Монтаж бригадой',
        'Выезд на замер',
        'Гарантия 5 лет',
      ],
      cta: 'Рассчитать стоимость',
      color: 'bg-primary-light text-primary',
      accent: 'border-primary',
      highlighted: true,
    },
  ];

  return (
    <section className="section-premium bg-sand-light relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Варианты покупки</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Выберите удобный формат сотрудничества
          </h2>
          <p className="text-text-muted text-lg">
            Покупка панелей отдельно или полный комплекс под ключ
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 md:p-8 shadow-premium hover:shadow-premium-md transition-all duration-300 relative ${
                scenario.highlighted ? `border-2 ${scenario.accent}` : 'border border-border'
              }`}
            >
              {/* Popular badge */}
              {scenario.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-medium px-4 py-1.5 rounded-full">
                    Популярный выбор
                  </span>
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl ${scenario.color} flex items-center justify-center mb-5`}>
                {scenario.icon}
              </div>

              <div className="mb-4">
                <h3 className="font-display font-semibold text-xl text-text mb-1">
                  {scenario.title}
                </h3>
                <p className="text-text-light text-sm">{scenario.subtitle}</p>
              </div>

              <p className="text-text-muted text-sm mb-6">
                {scenario.description}
              </p>

              <ul className="space-y-2 mb-6">
                {scenario.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                    <CheckCircleIcon size={16} className="text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full btn-premium flex items-center justify-center gap-2 ${
                  scenario.highlighted
                    ? 'btn-premium--primary'
                    : 'btn-premium--outline'
                }`}
              >
                {scenario.cta}
                <ChevronRightIcon size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-text-muted text-base md:text-lg font-semibold">
            Не знаете, что выбрать?{' '}
            <a href="#contact" className="text-primary font-semibold hover:underline">
              Получите бесплатную консультацию
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scenarios;
