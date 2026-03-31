import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '../components/icons/BuildingIcons';
import { handleSectionLinkClick } from '@/lib/scrollToSection';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const faqs = [
    {
      question: 'Сколько стоит утепление дома термопанелями?',
      answer: 'Стоимость зависит от площади фасада и выбранной коллекции. Средняя цена — от 7 500 руб./м² под ключ (панели + монтаж). Точную стоимость рассчитаем после замера.',
    },
    {
      question: 'Какой срок службы термопанелей?',
      answer: 'Срок службы фасадной системы — более 40 лет. Мы предоставляем гарантию 30 лет на панели и 5 лет на монтажные работы.',
    },
    {
      question: 'Можно ли монтировать панели зимой?',
      answer: 'Да, монтаж термопанелей возможен при температуре до −15°C. Это одно из ключевых преимуществ системы — отсутствие мокрых процессов.',
    },
    {
      question: 'Нужна ли подготовка стен перед монтажом?',
      answer: 'Стены должны быть ровными, без существенных выступов. Небольшие неровности допустимы — система компенсирует их. При необходимости выполняем подготовку.',
    },
    {
      question: 'Как ухаживать за фасадом из термопанелей?',
      answer: 'Фасад практически не требует ухода. Достаточно периодически промывать водой под давлением для удаления пыли и загрязнений.',
    },
    {
      question: 'Есть ли ограничения по типу стен?',
      answer: 'Термопанели подходят для большинства типов стен: кирпич, газобетон, пеноблок, дерево. Проводим консультацию и подбираем оптимальное решение.',
    },
    {
      question: 'Какой утеплитель используется в панелях?',
      answer: 'Мы используем пенополистирол (ППС) повышенной плотности 15–25 кг/м³. Он обеспечивает отличную теплоизоляцию и долговечность.',
    },
    {
      question: 'Сколько времени занимает монтаж?',
      answer: 'Средний срок монтажа — 5–7 дней для дома площадью 150–200 м². Точный срок зависит от сложности фасада и погодных условий.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-premium bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">FAQ</span>
          <h2 className="type-section-title mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="type-section-lead mb-4">
            Ответы на популярные вопросы о термопанелях и монтаже
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-sand-light rounded-xl overflow-hidden transition-all ${
                openIndex === index ? 'shadow-premium-md' : 'shadow-premium'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display font-medium text-text pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <p className="text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <p className="text-text-muted mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="#contact"
            className="btn-premium btn-premium--primary"
            onClick={(e) =>
              handleSectionLinkClick(e, '#contact', {
                navigate,
                location,
              })
            }
          >
            Задать вопрос специалисту
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
