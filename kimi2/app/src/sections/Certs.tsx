import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog';

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

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };

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
            <button
              key={index}
              type="button"
              onClick={() => openAt(index)}
              className="flex-shrink-0 w-[180px] md:w-[200px] text-left bg-white rounded-xl overflow-hidden border border-border shadow-premium hover:shadow-premium-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="aspect-[3/4] overflow-hidden bg-sand-light">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="p-3 text-sm font-medium text-text text-center border-t border-border leading-snug">
                {cert.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-[min(920px,95vw)] max-h-[min(90dvh,calc(100vh-2rem))] p-0 overflow-hidden bg-white"
        >
          <DialogClose
            type="button"
            aria-label="Закрыть"
            className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white text-text shadow-md ring-1 ring-black/10 hover:bg-white/95"
          >
            <X className="size-5" strokeWidth={2.25} />
          </DialogClose>
          <div className="max-h-[min(85dvh,calc(100vh-3rem))] overflow-auto p-4 sm:p-6">
            <img
              src={certs[active]?.image}
              alt={certs[active]?.title ?? ''}
              className="mx-auto block w-full h-auto max-h-[min(72dvh,70vh)] object-contain"
            />
            <p className="mt-4 text-center text-sm font-medium text-text px-2">{certs[active]?.title}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certs;
