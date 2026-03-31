import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CalendarIcon,
  CheckSquareIcon,
  BriefcaseIcon,
  ToolIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
} from '../components/icons/BuildingIcons';
import { handleSectionLinkClick } from '@/lib/scrollToSection';

const ICON = 22;

const stageIconBox =
  'w-11 h-11 rounded-lg border border-primary/40 bg-primary/10 text-primary flex items-center justify-center shrink-0';

type StageItem = {
  num: string;
  timeLabel: string;
  title: string;
  description: string;
  bullets: [string, string];
  icon: React.ReactNode;
  highlight?: boolean;
};

const Stages: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stages: StageItem[] = [
    {
      num: '01',
      timeLabel: 'День 1',
      title: 'Заявка и первый контакт',
      description:
        'Оставляете заявку на сайте или по телефону — специалист перезвонит в тот же рабочий день и уточнит задачу.',
      bullets: ['Без обязательств', 'Ответ в течение дня'],
      icon: <CalendarIcon size={ICON} />,
    },
    {
      num: '02',
      timeLabel: '1–2 дня',
      title: 'Замер и расчёт — бесплатно',
      description:
        'Выезд на объект при необходимости, точный расчёт объёма и стоимости, подбор коллекции и цвета.',
      bullets: ['Выезд бесплатный', 'Смета в тот же день'],
      icon: <CheckSquareIcon size={ICON} />,
    },
    {
      num: '03',
      timeLabel: '7–14 дней',
      title: 'Производство и поставка',
      description:
        'Изготовление панелей на собственном производстве. Доставка на объект в согласованные сроки.',
      bullets: ['До 3000 м² производства в месяц', 'Поставка по всей России'],
      icon: <BriefcaseIcon size={ICON} />,
    },
    {
      num: '04',
      timeLabel: 'от 5 дней',
      title: 'Монтаж и сдача объекта',
      description:
        'Профессиональный монтаж бригадой компании. Сдача объекта с актом выполненных работ.',
      bullets: ['Гарантия на монтаж 12 мес.', 'Уборка после работ'],
      icon: <ToolIcon size={ICON} />,
      highlight: true,
    },
  ];

  return (
    <section
      id="stages"
      className="section-premium relative overflow-hidden scroll-mt-24 lg:scroll-mt-32 bg-[#171b18] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,154,107,0.12),transparent)]"
        aria-hidden
      />

      <div className="container-premium relative z-10">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <span className="mb-4 inline-block rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Процесс
          </span>
          <h2 className="type-section-title mb-4 text-white">
            Как мы работаем
          </h2>
          <p className="text-lg text-white/65">От заявки до сдачи объекта под ключ</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-center">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.num}>
              <article
                className={`flex min-w-0 flex-1 flex-col rounded-2xl border p-5 backdrop-blur-sm transition-shadow duration-300 sm:p-6 ${
                  stage.highlight
                    ? 'border-primary/70 bg-white/[0.06] shadow-[0_0_0_1px_rgba(124,154,107,0.25)]'
                    : 'border-white/10 bg-white/[0.04] hover:border-white/15'
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-white/90">
                    {stage.num}
                  </span>
                  <div className={stageIconBox} aria-hidden>
                    {stage.icon}
                  </div>
                </div>

                <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {stage.timeLabel}
                </div>

                <h3 className="type-card-title mb-2 leading-snug text-white">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">{stage.description}</p>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {stage.bullets.map((line) => (
                    <li key={line} className="flex gap-2.5 text-sm text-white/70">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {index < stages.length - 1 && (
                <div
                  className="flex shrink-0 items-center justify-center self-center py-3 text-primary/90 lg:w-11 lg:py-0"
                  aria-hidden
                >
                  <ChevronRightIcon size={24} className="hidden lg:block" />
                  <ChevronDownIcon size={24} className="lg:hidden" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-6">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/80 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            onClick={(e) =>
              handleSectionLinkClick(e, '#contact', {
                navigate,
                location,
              })
            }
          >
            Начать — оставить заявку
            <ArrowUpRightIcon size={18} />
          </a>
          <p className="max-w-xs text-center text-sm text-white/55 sm:max-w-none sm:text-left">
            Ответим в течение рабочего дня. Без навязчивых продаж.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stages;
