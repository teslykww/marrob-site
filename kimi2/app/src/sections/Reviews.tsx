import React from 'react';
import { StarIcon } from '../components/icons/BuildingIcons';

/** Превью карточек — те же кейсы, что в галерее: public/projects/moscow (см. galleryProjects.ts). */
const Reviews: React.FC = () => {
  const base = import.meta.env.BASE_URL;
  const reviews = [
    {
      // Подменяем превью на фото, где лучше видна облицовка фасада
      image: `${base}projects/moscow/01/klinker-brick-orange-pr-523-4.webp`,
      text: 'Долго выбирали между штукатуркой и панелями. Выбрали MARROB и не пожалели. Дом 180 м² обшили за 2 недели. Зимой стало заметно теплее, а выглядит как настоящий кирпич.',
      author: 'Михаил В.',
      location: 'Московская область, Истра',
      rating: 5,
      imageAlt: 'Фасад частного дома, клинкер — объект из портфолио MARROB',
    },
    {
      image: `${base}projects/moscow/04/loft-brick-chilli-serrad-s-kryukivshchina-pr-511-01.webp`,
      text: 'Отличная команда! Приехали, сделали замеры, через 3 недели привезли панели. Монтажники работали аккуратно, мусор убрали. Фасад радует каждый день.',
      author: 'Елена С.',
      location: 'КП «Новорижский»',
      rating: 5,
      imageAlt: 'Фасад Loft brick — объект из портфолио MARROB',
    },
    {
      image: `${base}projects/moscow/03/brickstyle-baker-street-beige-kiev-pr-514-01.webp`,
      text: 'Искал надёжное решение для утепления старого дома из пеноблока. Термопанели решили сразу две задачи: дом стал тёплым и выглядит как новая усадьба. Рекомендую!',
      author: 'Дмитрий К.',
      location: 'Дмитровский район',
      rating: 5,
      imageAlt: 'Фасад Brickstyle Baker Street — объект из портфолио MARROB',
    },
  ];

  return (
    <section className="section-premium bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Отзывы</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Что говорят наши клиенты
          </h2>
          <p className="text-text-muted text-lg">
            Реальные истории владельцев домов, которые выбрали MARROB. На фото — реальные объекты из портфолио.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-sand-light rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={review.image}
                  alt={review.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-text-muted text-sm leading-relaxed mb-6 italic">
                  «{review.text}»
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-display font-semibold text-text">{review.author}</p>
                  <p className="text-text-light text-xs">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
