import React, { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronRightIcon } from '@/components/icons/BuildingIcons';
import { Link } from 'react-router-dom';
import {
  collectionFallbackCaption,
  extractVariantPrefix,
  lookupVariantCaption,
} from '@/lib/catalogVariantCaption';

type CatalogManifest = {
  basePath: string;
  collections: Array<{
    name: string;
    files: string[];
  }>;
};

type VariantCaptionsFile = {
  captions?: Record<string, string>;
};

const base = import.meta.env.BASE_URL;

function toSrc(manifest: CatalogManifest, collectionName: string, fileName: string) {
  return `${base}${manifest.basePath}/${collectionName}/${fileName}`;
}

const CatalogPage: React.FC = () => {
  const [manifest, setManifest] = useState<CatalogManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [variantCaptions, setVariantCaptions] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    fetch(`${base}catalog/manifest.json`)
      .then((r) => r.json())
      .then((data: CatalogManifest) => {
        if (cancelled) return;
        setManifest(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setManifest(null);
        setLoading(false);
        setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`${base}catalog/variant-captions.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: VariantCaptionsFile | null) => {
        if (cancelled || !data?.captions) return;
        setVariantCaptions(data.captions);
      })
      .catch(() => {
        if (!cancelled) setVariantCaptions(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const collections = manifest?.collections ?? [];

  const activeFiles = useMemo(() => {
    if (!manifest) return [];
    const c = collections.find((x) => x.name === activeCollection);
    return c?.files ?? [];
  }, [manifest, collections, activeCollection]);

  const activeSrc = useMemo(() => {
    if (!manifest || !activeFiles.length) return '';
    return toSrc(manifest, activeCollection, activeFiles[activeIndex]);
  }, [manifest, activeCollection, activeFiles, activeIndex]);

  const activeCaption = useMemo(() => {
    const file = activeFiles[activeIndex];
    if (!file) return collectionFallbackCaption(activeCollection);
    const fromMarrob = lookupVariantCaption(variantCaptions, activeCollection, file);
    return fromMarrob ?? collectionFallbackCaption(activeCollection);
  }, [activeCollection, activeFiles, activeIndex, variantCaptions]);

  const activeVariantLabel = useMemo(() => {
    const file = activeFiles[activeIndex];
    if (!file) return '';
    return extractVariantPrefix(file);
  }, [activeFiles, activeIndex]);

  const openCollection = (name: string) => {
    setActiveCollection(name);
    setActiveIndex(0);
    setOpen(true);
  };

  const next = () => {
    if (!activeFiles.length) return;
    setActiveIndex((p) => (p + 1) % activeFiles.length);
  };

  const prev = () => {
    if (!activeFiles.length) return;
    setActiveIndex((p) => (p - 1 + activeFiles.length) % activeFiles.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeFiles.length]);

  return (
    <main className="section-premium bg-sand-light relative overflow-hidden main-rhythm-rule pt-24 md:pt-28 lg:pt-32">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-premium relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Каталог</span>
          <h1 className="type-page-title mb-4">
            Все коллекции термопанелей <span className="text-primary">MARROB</span>
          </h1>
          <p className="type-section-lead">Выберите коллекцию — откроется галерея фактур и оттенков</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span className="rotate-180">
                <ChevronRightIcon size={16} />
              </span>
              На главную
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-premium text-center text-text-muted">Загружаем каталог…</div>
        ) : loadError || !manifest ? (
          <div className="bg-white rounded-2xl p-6 shadow-premium text-center">
            <div className="text-text font-medium mb-2">Не удалось загрузить каталог</div>
            <div className="text-text-muted text-sm">
              Проверьте, что файл <span className="font-mono">public/catalog/manifest.json</span> доступен.
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((c) => {
              const cover = c.files[0] ? toSrc(manifest, c.name, c.files[0]) : '';
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => openCollection(c.name)}
                  className="text-left group bg-white rounded-[var(--radius-lg)] overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {cover && (
                      <img
                        src={cover}
                        alt={c.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="font-display font-semibold text-lg">{c.name.replace(/_+$/g, '')}</div>
                      <div className="text-white/80 text-xs mt-1">{c.files.length} фото</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-text-muted text-sm">Смотреть коллекцию</div>
                      <ChevronRightIcon size={18} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[min(100dvh,920px)] overflow-y-auto overflow-x-hidden p-0 sm:max-w-[980px] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
            <div className="relative bg-black min-h-0">
              <div className="relative w-full" style={{aspectRatio: '4/3'}}>
                {activeSrc && (
                  <img
                    src={activeSrc}
                    alt={
                      activeVariantLabel
                        ? `${activeCollection.replace(/_+$/g, '')} ${activeVariantLabel}`
                        : activeCollection
                    }
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {/* Overlay: collection + variant label */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="text-white font-display font-semibold text-base leading-tight">
                    {activeCollection.replace(/_+$/g, '')}
                  </div>
                  {activeVariantLabel && (
                    <div className="text-white/80 text-xs mt-0.5">{activeVariantLabel}</div>
                  )}
                </div>
              </div>

              <button
                type="button"
                aria-label="Предыдущее фото"
                onClick={prev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 touch-manipulation"
              >
                <span className="rotate-180">
                  <ChevronRightIcon size={22} />
                </span>
              </button>
              <button
                type="button"
                aria-label="Следующее фото"
                onClick={next}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 touch-manipulation"
              >
                <ChevronRightIcon size={22} />
              </button>

              <div className="absolute left-4 bottom-4 text-white/80 text-xs px-2 py-1 rounded-full bg-black/50">
                {activeFiles.length ? `${activeIndex + 1} / ${activeFiles.length}` : '—'}
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-border min-h-0 flex flex-col">
              <DialogHeader className="text-left">
                <DialogTitle className="font-display text-text text-balance">
                  {activeCollection.replace(/_+$/g, '') || 'Коллекция'}
                </DialogTitle>
              </DialogHeader>
              {activeVariantLabel ? (
                <p className="mt-1 text-xs font-medium text-text-muted tracking-wide">{activeVariantLabel}</p>
              ) : null}
              <div className="mt-3 max-h-36 sm:max-h-44 overflow-y-auto text-sm text-text-muted leading-snug pr-1">
                {activeCaption}
              </div>

              <div
                className="mt-4 sm:mt-5 grid grid-cols-3 lg:grid-cols-4 gap-2 overflow-y-auto pr-1 pb-1"
                style={{ maxHeight: 'min(44vh, 320px)' }}
              >
                {manifest &&
                  activeFiles.map((file, i) => {
                    const src = toSrc(manifest, activeCollection, file);
                    return (
                      <button
                        key={file}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className={[
                          'block w-full min-w-0 p-0 m-0 rounded-[var(--radius)] overflow-hidden border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                          i === activeIndex ? 'border-primary ring-1 ring-primary' : 'border-transparent hover:border-primary/60',
                        ].join(' ')}
                        aria-label={`Открыть фото ${i + 1}`}
                      >
                        {/* padding-bottom trick: 75% = 4:3 ratio, works in every browser */}
                        <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                          <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CatalogPage;

