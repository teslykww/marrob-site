import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRightIcon } from '../components/icons/BuildingIcons';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { getGalleryProjects } from '../data/galleryProjects';

const INITIAL_VISIBLE = 6;
const LOAD_STEP = 2;

const Gallery: React.FC = () => {
  const base = import.meta.env.BASE_URL;
  const projects = useMemo(() => getGalleryProjects(base), [base]);

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const shown = useMemo(() => projects.slice(0, visibleCount), [projects, visibleCount]);

  const [open, setOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeProject = projects[activeProjectIndex];
  const activeImages = activeProject?.images ?? [];

  const openProject = (index: number) => {
    setActiveProjectIndex(index);
    setActiveImageIndex(0);
    setOpen(true);
  };

  const nextImage = () => {
    if (!activeImages.length) return;
    setActiveImageIndex((prev) => (prev + 1) % activeImages.length);
  };

  const prevImage = () => {
    if (!activeImages.length) return;
    setActiveImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeImages.length]);

  return (
    <section id="gallery" className="section-premium bg-sand-light relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Портфолио</span>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-text mb-4">
            Дома с фасадами из термопанелей <span className="text-primary">MARROB</span>
          </h2>
          <p className="text-text-muted text-lg">
            Реальные объекты, реализованные с использованием нашей фасадной системы
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {shown.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
            >
              {/* Image */}
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() =>
                  openProject(projects.findIndex((p) => p.id === project.id))
                }
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>

              {/* Метраж слева, название справа (одна строка, ellipsis) */}
              <div className="min-w-0 border-t border-border p-4 sm:p-5">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <span className="shrink-0 rounded-lg border border-border bg-sand-light px-3 py-1.5 text-sm font-medium text-text-muted">
                    {project.area}
                  </span>
                  <p className="min-w-0 flex-1 text-right text-sm font-medium text-text truncate" title={project.title}>
                    {project.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < projects.length ? (
          <div className="flex justify-center -mt-4 mb-10">
            <button
              type="button"
              className="btn-premium btn-premium--outline px-8"
              onClick={() =>
                setVisibleCount((c) => Math.min(c + LOAD_STEP, projects.length))
              }
            >
              Показать ещё
            </button>
          </div>
        ) : null}

        {/* Stats + логотип справа */}
        <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-border bg-white p-6 shadow-premium md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 sm:flex-1 min-w-0 w-full sm:w-auto">
            <div className="text-center sm:text-left">
              <div className="font-display font-bold text-4xl text-primary mb-1">6 500+</div>
              <div className="text-text-light text-sm">домов уже утеплены</div>
            </div>
            <div className="hidden sm:block w-px h-12 shrink-0 bg-border" />
            <div className="text-center sm:text-left">
              <div className="text-text-muted text-sm">и облицованы нашей системой</div>
              <div className="text-text-light text-xs mt-1">по всей России и СНГ</div>
            </div>
          </div>
          <div className="shrink-0 flex justify-center sm:justify-end">
            <img
              src={`${base}logo.png`}
              alt="MARROB"
              className="h-10 sm:h-12 md:h-14 w-auto max-w-[200px] object-contain object-center"
              width={200}
              height={56}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-[980px] max-h-[min(90dvh,calc(100vh-1.5rem))] p-0 overflow-hidden bg-white flex flex-col"
        >
          <div className="grid lg:grid-cols-[1fr_320px] min-h-0 flex-1">
            {/* Main viewer */}
            <div className="relative bg-black shrink-0">
              <DialogClose
                type="button"
                aria-label="Закрыть"
                className="absolute z-20 flex size-10 items-center justify-center rounded-full bg-white text-text shadow-md ring-1 ring-black/10 transition-colors hover:bg-white/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))]"
              >
                <X className="size-5" strokeWidth={2.25} />
              </DialogClose>
              <div className="aspect-[4/3] lg:aspect-auto lg:h-[520px] relative">
                <img
                  src={activeImages[activeImageIndex]}
                  alt={activeProject?.title ?? 'Проект'}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

              {/* Prev */}
              <button
                type="button"
                aria-label="Предыдущее фото"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <span className="rotate-180">
                  <ChevronRightIcon size={22} />
                </span>
              </button>

              {/* Next */}
              <button
                type="button"
                aria-label="Следующее фото"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRightIcon size={22} />
              </button>

              {/* Counter */}
              <div className="absolute left-4 bottom-4 text-white/80 text-xs px-2 py-1 rounded-full bg-black/50">
                {activeImages.length ? `${activeImageIndex + 1} / ${activeImages.length}` : '—'}
              </div>
            </div>

            {/* Sidebar */}
            <div className="p-5 border-t lg:border-t-0 lg:border-l border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-text">{activeProject?.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-2 text-sm text-text-light">
                {activeProject?.location}
              </div>
              <div className="mt-3 text-xs text-text-muted">
                {activeProject?.texture}
              </div>

              {/* Thumbs */}
              <div className="mt-5 grid grid-cols-4 gap-2 max-h-[320px] overflow-auto pr-1">
                {activeImages.map((src, i) => (
                  <button
                    key={`${activeProject?.id}-${i}`}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className={[
                      'relative aspect-square rounded-lg overflow-hidden border transition-colors',
                      i === activeImageIndex ? 'border-primary' : 'border-border hover:border-primary/60',
                    ].join(' ')}
                    aria-label={`Открыть фото ${i + 1}`}
                  >
                    <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
