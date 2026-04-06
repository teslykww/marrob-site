import React from 'react';
import { CheckCircleIcon } from '../components/icons/BuildingIcons';

const Specs: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;
  const diagramSrc = `${assetBase}images/specs-panel-diagram.webp`;

  const specs: Array<{ title: string; items: Array<{ label: string; value?: string }> }> = [
    {
      title: 'Основные параметры',
      items: [
        { label: 'Толщина панели', value: '62–112 мм' },
        { label: 'Толщина утеплителя', value: '50–100 мм' },
        { label: 'Плотность утеплителя', value: '15–25 кг/м³' },
        { label: 'Размер панели', value: '600 × 990 мм' },
        { label: 'Вес панели', value: '14–16 кг' },
        { label: 'Теплопроводность', value: '0,037 Вт/м·К' },
        { label: 'Водопоглощение', value: '≤ 2% по объёму' },
      ],
    },
    {
      title: 'Эксплуатационные свойства',
      items: [
        { label: 'Срок службы', value: '30–40 лет' },
        { label: 'УФ-излучение', value: 'Устойчива' },
        { label: 'Влага и перепады темп.', value: 'Стойкая' },
        { label: 'Морозостойкость', value: '150–200 циклов' },
        { label: 'Класс горючести', value: 'Г2' },
        { label: 'Темп. эксплуатации', value: '−50 °C ... +70 °C' },
      ],
    },
    {
      title: 'Область применения',
      items: [
        { label: 'Фасады и цоколи' },
        { label: 'Частные дома и коммерческие объекты' },
        { label: 'Новое строительство и реконструкция' },
        { label: 'Монтаж на кирпичные, бетонные, деревянные и блочные стены' },
      ],
    },
  ];

  const certifications = [
    'Соответствует ГОСТ 32699-2021',
    'Сертификат пожарной безопасности',
    'Санитарно-эпидемиологическое заключение',
  ];

  return (
    <section id="specs" className="section-premium bg-sand-light relative">
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="badge-premium mb-4">Технические характеристики</span>
          <h2 className="type-section-title mb-4">
            Параметры термопанелей <span className="text-primary">MARROB</span>
          </h2>
          <p className="type-section-lead mb-4">
            Соответствие ГОСТ и современным стандартам качества
          </p>
        </div>

        <div className="relative mb-10 -mx-[var(--section-px)] w-[calc(100%_+_2_*_var(--section-px))] max-w-none bg-white py-8 md:py-12 px-4 sm:px-6">
          <img
            src={diagramSrc}
            alt="Схема термопанели MARROB: декоративно-защитный слой из керамобетона, утеплитель, монолитное соединение слоёв при производстве, окрашивание в массе, скрытые монтажные отверстия в основании"
            width={1024}
            height={576}
            className="mx-auto block h-auto w-full max-h-[min(360px,48vh)] md:max-h-[min(380px,50vh)] object-contain scale-[0.88] md:scale-[0.9] origin-center"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-md transition-all duration-300"
            >
              <h3 className="type-card-title mb-4 text-text">
                {spec.title}
              </h3>
              <ul className="space-y-3">
                {spec.items.map((item, i) => (
                  item.value ? (
                    <li key={i} className="flex justify-between items-center text-sm gap-2">
                      <span className="text-text-muted">{item.label}</span>
                      <span className="font-medium text-text text-right shrink-0">{item.value}</span>
                    </li>
                  ) : (
                    <li key={i} className="flex items-start text-sm gap-2">
                      <span className="text-primary mt-[2px] opacity-70">•</span>
                      <span className="text-text-muted leading-tight">{item.label}</span>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-6 shadow-premium">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center text-primary">
                <CheckCircleIcon size={24} />
              </div>
              <span className="font-display font-semibold text-text">Сертификация</span>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-sand-light text-text-muted text-sm rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
