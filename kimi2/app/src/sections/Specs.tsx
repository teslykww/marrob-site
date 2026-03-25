import React from 'react';
import { CheckCircleIcon } from '../components/icons/BuildingIcons';

const Specs: React.FC = () => {
  const assetBase = import.meta.env.BASE_URL;
  const diagramSrc = `${assetBase}images/specs-panel-diagram.png`;

  const specs = [
    {
      title: 'Размеры и масса',
      items: [
        { label: 'Длина панели', value: '500–1000 мм' },
        { label: 'Ширина панели', value: '300–600 мм' },
        { label: 'Толщина утеплителя', value: '50–100 мм' },
        { label: 'Масса панели', value: '3,5–7,5 кг' },
      ],
    },
    {
      title: 'Теплотехника',
      items: [
        { label: 'Коэфф. теплопроводности', value: '0,038 Вт/м·К' },
        { label: 'Теплосопротивление', value: '2,0 м²·К/Вт' },
        { label: 'Морозостойкость', value: 'F100' },
        { label: 'Водопоглощение', value: '≤ 2%' },
      ],
    },
    {
      title: 'Прочность и безопасность',
      items: [
        { label: 'Прочность на сжатие', value: '≥ 0,15 МПа' },
        { label: 'Прочность на изгиб', value: '≥ 0,25 МПа' },
        { label: 'Класс горючести', value: 'Г2' },
        { label: 'Срок службы', value: '40+ лет' },
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
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Параметры термопанелей <span className="text-primary">MARROB</span>
          </h2>
          <p className="text-text-muted text-lg">
            Соответствие ГОСТ и современным стандартам качества
          </p>
        </div>

        <div className="relative left-1/2 mb-10 w-screen max-w-[100vw] -translate-x-1/2 bg-white py-8 md:py-12 px-4 sm:px-6">
          <img
            src={diagramSrc}
            alt="Схема термопанели MARROB: декоративно-защитный слой из керамобетона, утеплитель, монолитное соединение слоёв при производстве, окрашивание в массе, скрытые монтажные отверстия в основании"
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
              <h3 className="font-display font-semibold text-lg text-text mb-4">
                {spec.title}
              </h3>
              <ul className="space-y-3">
                {spec.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-medium text-text">{item.value}</span>
                  </li>
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
