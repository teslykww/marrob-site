import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRightIcon } from '../components/icons/BuildingIcons';
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
    if (!manifest || !currentCollection?.files?.length) return '';
    return `${base}${manifest.basePath}/${currentCollection.name}/${currentCollection.files[0]}`;
  }, [manifest, currentCollection]);

  const thumbs = useMemo(() => {
    if (!manifest || !currentCollection?.files?.length) return [];
    return currentCollection.files.slice(0, 4).map((f) => `${base}${manifest.basePath}/${currentCollection.name}/${f}`);
  }, [manifest, currentCollection]);

  return (
    <section id="catalog" className="section-premium bg-white relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Каталог</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Коллекции термопанелей <span className="text-primary">MARROB</span>
          </h2>
          <p className="text-text-muted text-lg">
            Более 100 вариантов фактур и оттенков под натуральный камень
          </p>
        </div>

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

        {/* Collection Display */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-premium-lg group">
            {coverImage ? (
              <img
                src={coverImage}
                alt={displayName(currentCollection.name)}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[400px] bg-sand-light" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="font-display font-semibold text-2xl mb-2">
                {currentCollection ? displayName(currentCollection.name) : 'Коллекция'}
              </h3>
              <p className="text-white/80 text-sm">{currentDescription}</p>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-display font-semibold text-2xl text-text mb-3">
              {currentCollection ? displayName(currentCollection.name) : 'Каталог'}
            </h3>
            <p className="text-text-muted mb-8">
              {currentDescription}
            </p>

            {/* Thumbnails */}
            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-text-light mb-4">
                Примеры фактур
              </p>
              <div className="grid grid-cols-4 gap-4">
                {thumbs.map((src, index) => (
                  <div key={`${src}-${index}`} className="text-center">
                    <div className="w-full aspect-square rounded-xl border-2 border-border mb-2 shadow-premium hover:shadow-premium-md transition-shadow overflow-hidden bg-sand-light">
                      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link to="/catalog" className="inline-flex items-center gap-2 btn-premium btn-premium--primary">
              Смотреть каталог
              <ChevronRightIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
