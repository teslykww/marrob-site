import React, { useEffect, useMemo, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { ChevronRightIcon } from '../components/icons/BuildingIcons';
import MagnetLeadForm from '@/components/MagnetLeadForm';
import { Link } from 'react-router-dom';

type CatalogManifest = {
  basePath: string;
  collections: Array<{
    name: string;
    files: string[];
  }>;
};

const base = import.meta.env.BASE_URL;

function displayName(name: string) {
  return name.replace(/_+$/g, '');
}

function normalizeName(name: string) {
  return displayName(name).trim().toLowerCase();
}

/** Крупное превью: не всегда files[0] — часто там однотипные светлые кадры. */
function pickCoverFileIndex(files: string[]): number {
  if (!files.length) return 0;
  const pngIdx = files.findIndex((f) => /\.png$/i.test(f));
  if (pngIdx >= 0) return pngIdx;
  const mid = Math.floor(files.length / 2);
  return Math.min(Math.max(1, mid), files.length - 1);
}

/** До `count` индексов по всей длине массива для разнообразных миниатюр. */
function spreadFileIndices(len: number, count: number): number[] {
  if (len <= 0) return [];
  if (len <= count) return Array.from({ length: len }, (_, i) => i);
  const idx = new Set<number>();
  for (let i = 0; i < count; i++) {
    idx.add(Math.min(len - 1, Math.round((i * (len - 1)) / Math.max(1, count - 1))));
  }
  let n = 0;
  while (idx.size < count && n < len) {
    idx.add(n);
    n += 1;
  }
  return [...idx].sort((a, b) => a - b).slice(0, count);
}

/**
 * Крупное фото слева: примеры домов из Media/дома (скопированы в public/images/catalog-houses).
 * Ключ = normalizeName(имя коллекции из manifest).
 * Подбор: визуальный характер фасада ↔ позиционирование коллекции.
 */
const CATALOG_HOUSE_IMAGE: Record<string, string> = {
  'версальский кирпич': 'versailles.jpg', // классика, белый декор, «дворцовые» наличники
  'византийский кирпич': 'byzantine.jpg', // кладка + светлый камень, богатый патио (восточное/средиземноморское)
  'клинкерный кирпич': 'clinker.jpg', // тёмный клинкер + цоколь, фото про термопанели под кирпич
  'скандинавский кирпич': 'scandinavian.jpg', // минимализм: тёмная кладка, белый акцент, чистые линии
  'туринский кирпич': 'turin.jpg', // терракотовая черепица, тёплая кладка, итальянский настрой
  'шумерский кирпич': 'sumerian.jpg', // горизонтальные пояса кирпич/светлый цоколь, монументальный силуэт
};

const Catalog: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState(0);
  const [manifest, setManifest] = useState<CatalogManifest | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${base}catalog/manifest.json`)
      .then((r) => r.json())
      .then((data: CatalogManifest) => {
        if (!cancelled) setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setManifest(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const descriptionByName = useMemo(() => {
    const pairs: Array<[string, string]> = [
      ['Клинкерный кирпич', 'Классический клинкер с характерной текстурой и насыщенными цветами'],
      ['Версальский кирпич', 'Элегантный стиль французского дворца с изысканными оттенками'],
      ['Византийский кирпич', 'Восточная роскошь и богатство деталей в каждой панели'],
      ['Скандинавский кирпич', 'Северная простота и функциональность в минималистичном дизайне'],
      ['Туринский кирпич', 'Итальянская классика и изысканность для элитных проектов'],
      ['Шумерский кирпич', 'Древние мотивы в современном исполнении для уникальных фасадов'],
    ];
    const map = new Map<string, string>();
    for (const [k, v] of pairs) map.set(normalizeName(k), v);
    return map;
  }, []);

  const collections = manifest?.collections ?? [];
  const currentCollection = collections[activeCollection];
  const currentDescription = currentCollection
    ? descriptionByName.get(normalizeName(currentCollection.name)) ?? 'Коллекция фасадных термопанелей MARROB'
    : '';

  const coverImage = useMemo(() => {
    if (!currentCollection) return '';
    const houseFile = CATALOG_HOUSE_IMAGE[normalizeName(currentCollection.name)];
    if (houseFile) return `${base}images/catalog-houses/${houseFile}`;
    if (!manifest || !currentCollection.files?.length) return '';
    const files = currentCollection.files;
    const i = pickCoverFileIndex(files);
    return `${base}${manifest.basePath}/${currentCollection.name}/${files[i]}`;
  }, [manifest, currentCollection]);

  const thumbs = useMemo(() => {
    if (!manifest || !currentCollection?.files?.length) return [];
    const files = currentCollection.files;
    const indices = spreadFileIndices(files.length, 8);
    return indices.map((i) => `${base}${manifest.basePath}/${currentCollection.name}/${files[i]}`);
  }, [manifest, currentCollection]);

  return (
    <section id="catalog" className="section-premium bg-white relative overflow-hidden main-rhythm-rule">
      {/* Decorative blob */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge-premium mb-4">Каталог</span>
            <h2 className="type-section-title mb-4">
              Коллекции термопанелей <span className="text-primary">MARROB</span>
            </h2>
            <p className="type-section-lead mb-4">
              Более 100 вариантов фактур и оттенков под натуральный камень
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
        {/* Collection Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {collections.map((collection, index) => (
            <button
              key={index}
              onClick={() => setActiveCollection(index)}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                activeCollection === index
                  ? 'bg-primary text-white shadow-premium-md'
                  : 'bg-sand-light text-text-muted hover:bg-primary-light hover:text-primary'
              }`}
            >
              {displayName(collection.name)}
            </button>
          ))}
        </div>

        {/* Collection Display: слева крупное фото, справа текст + две колонки миниатюр.
            На lg высота левой колонки = высоте правой (нижний край крупного фото совпадает с миниатюрами). */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="relative flex min-h-[280px] h-[min(400px,52svh)] lg:h-full lg:min-h-[260px] rounded-2xl overflow-hidden shadow-premium-lg group">
            {coverImage ? (
              <img
                src={coverImage}
                alt={`Пример объекта — ${displayName(currentCollection.name)}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="h-full min-h-[280px] w-full bg-sand-light" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="type-card-title mb-2 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                {currentCollection ? displayName(currentCollection.name) : 'Коллекция'}
              </h3>
              <p className="text-white/90 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]">{currentDescription}</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="type-card-title mb-3 text-text">
                {currentCollection ? displayName(currentCollection.name) : 'Каталог'}
              </h3>
              <p className="text-text-muted mb-6">{currentDescription}</p>
              <Link to="/catalog" className="inline-flex items-center gap-2 btn-premium btn-premium--primary">
                Смотреть каталог
                <ChevronRightIcon size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-light mb-3">Варианты оттенков</p>
                <div className="grid grid-cols-2 gap-3">
                  {thumbs.slice(0, 4).map((src, index) => (
                    <div
                      key={`${src}-a-${index}`}
                      className="aspect-square rounded-xl border-2 border-border shadow-premium overflow-hidden bg-sand-light"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-text-light mb-3">Ещё фактуры коллекции</p>
                <div className="grid grid-cols-2 gap-3">
                  {thumbs.slice(4, 8).map((src, index) => (
                    <div
                      key={`${src}-b-${index}`}
                      className="aspect-square rounded-xl border-2 border-border shadow-premium overflow-hidden bg-sand-light"
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        <div
          id="catalog-form"
          className="layout-content mt-12 scroll-mt-24 lg:scroll-mt-32 sm:mt-14 lg:mt-16"
        >
          <MagnetLeadForm
            idPrefix="catalog"
            source="catalog-section"
            intent="price-catalog"
            showTopIcon={false}
            sideImageSrc={`${base}images/catalog-lead-house.png`}
            sideImageAlt="Дом с фасадом из термопанелей MARROB"
            cardClassName="ring-0"
            title="Запросить прайс и каталог"
            description="Оставьте контакты — отправим актуальные цены и подборку фактур по выбранным коллекциям."
            submitLabel="Получить прайс и каталог"
          />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
