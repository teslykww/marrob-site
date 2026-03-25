import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '../components/icons/BuildingIcons';
import { Input } from '@/components/ui/input';

const base = import.meta.env.BASE_URL;
const ctaHouseImage = `${base}images/solution-cta-house.png`;

const Solution: React.FC = () => {
  const [ctaSent, setCtaSent] = useState(false);

  return (
    <section className="section-premium bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-premium mb-4">Решение</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Термопанель — <span className="text-primary">утепление и фасад</span> в одной системе
          </h2>
          <p className="text-text-muted text-lg">
            Готовая фасадная система 2 в 1: современное решение для дома
          </p>
        </div>

        {/* Схема термопанели на всю ширину */}
        <div className="rounded-2xl overflow-hidden shadow-premium-lg bg-white mb-8">
          <img
            src={`${base}solution-scheme.png`}
            alt="Двухслойная конструкция термопанелей MARROB"
            className="w-full h-auto object-contain max-h-[min(400px,48vh)] md:max-h-[min(476px,52vh)] scale-[0.92] md:scale-[0.9] origin-center"
          />
        </div>

        {/* Короткое пояснение под схемой */}
        <p className="text-center text-text-muted text-lg max-w-3xl mx-auto mb-10">
          Термопанель объединяет утеплитель и декоративную облицовку в единой конструкции. Монтаж
          выполняется в один этап, без мокрых процессов и дополнительной отделки.
        </p>

        {/* Нижний CTA: фото + форма */}
        <div className="bg-gradient-to-r from-primary to-green-dark rounded-2xl overflow-hidden shadow-premium-lg text-white">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="relative min-h-[200px] sm:min-h-[260px] lg:min-h-[320px]">
              <img
                src={ctaHouseImage}
                alt="Стопка термопанелей MARROB с утеплителем и каменной облицовкой, замковая геометрия на объекте"
                className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20" />
            </div>

            <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              <p className="text-white/75 text-xs uppercase tracking-wider mb-2 text-center lg:text-left">
                Один монтаж — два результата
              </p>
              <h3 className="font-display font-semibold text-2xl md:text-3xl mb-4 text-center lg:text-left leading-tight">
                Утепление и каменный фасад за один проход
              </h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto lg:mx-0 text-center lg:text-left text-base md:text-lg leading-relaxed">
                Панели MARROB соединяются по замковой геометрии: плотный шов без щелей и лишних мостиков
                холода — дом сразу теплее и выглядит как с отделкой под камень.
              </p>

              {ctaSent ? (
                <p className="text-center lg:text-left text-white font-medium">
                  Спасибо! Переходите в раздел контактов — мы на связи.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCtaSent(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="solution-cta-name" className="block text-xs font-medium text-white/90 mb-1.5">
                        Имя
                      </label>
                      <Input
                        id="solution-cta-name"
                        name="name"
                        placeholder="Как к вам обращаться"
                        className="h-11 bg-white/95 border-white/40 text-text placeholder:text-text-light"
                      />
                    </div>
                    <div>
                      <label htmlFor="solution-cta-phone" className="block text-xs font-medium text-white/90 mb-1.5">
                        Телефон *
                      </label>
                      <Input
                        id="solution-cta-phone"
                        name="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        required
                        className="h-11 bg-white/95 border-white/40 text-text placeholder:text-text-light"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center lg:justify-start sm:items-center sm:gap-4 pt-1">
                    <div className="flex flex-col items-center text-white/75 sm:hidden">
                      <ChevronDownIcon size={22} />
                      <span className="text-[11px] uppercase tracking-wider mt-1">Далее</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-white/75 shrink-0">
                      <ChevronRightIcon size={26} className="animate-pulse" />
                      <span className="text-xs uppercase tracking-wider max-w-[100px] leading-tight">
                        Получить консультацию
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3.5 rounded-xl font-display font-semibold hover:bg-white/90 transition-colors shadow-md"
                    >
                      Получить консультацию
                    </button>
                  </div>
                </form>
              )}

              {!ctaSent && (
                <p className="mt-4 text-center lg:text-left text-white/60 text-xs">
                  Или напишите нам напрямую в разделе{' '}
                  <a href="#contact" className="underline underline-offset-2 hover:text-white">
                    Контакты
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
