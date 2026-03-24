import React from 'react';

const base = import.meta.env.BASE_URL;

const Certs: React.FC = () => {
  const certs = [
    {
      image: `${base}certs/cert-1.png`,
      title: 'Реестр эффективных предприятий. Выбор клиентов и партнёров 2023',
    },
    {
      image: `${base}certs/cert-2.png`,
      title: 'Свидетельство на товарный знак MARROB № 954317',
    },
    {
      image: `${base}certs/cert-3.png`,
      title: 'Участие в выставке MosBuild 2023',
    },
    {
      image: `${base}certs/cert-4.png`,
      title: 'Сертификат соответствия панели «Thermo stone»',
    },
    {
      image: `${base}certs/cert-5.png`,
      title: 'Сертификат участника MosBuild 2023',
    },
  ];

  return (
    <section id="certs" className="section-premium bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container-premium relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Надёжность</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Сертификаты
          </h2>
          <p className="text-text-muted text-lg">
            Соответствие ГОСТ и современным стандартам качества
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
          {certs.map((cert, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[180px] md:w-[200px] bg-white rounded-xl overflow-hidden border border-border shadow-premium hover:shadow-premium-md transition-shadow"
            >
              <div className="aspect-[3/4] overflow-hidden bg-sand-light">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="p-3 text-sm font-medium text-text text-center border-t border-border">
                {cert.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certs;
