import React, { useState, useRef, useCallback } from 'react';

const base = import.meta.env.BASE_URL;

const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="section-premium bg-sand-light">
      <div className="container-premium">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-premium mb-4">Результат</span>
          <h2 className="type-section-title mb-4">
            До и После монтажа
          </h2>
          <p className="type-section-lead mb-4">
            Посмотрите, как преображается фасад всего за 14 дней
          </p>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-premium-lg cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {/* Aspect ratio container */}
          <div className="aspect-[16/9] relative">
            {/* After Image (Full) */}
            <img
              src={`${base}before-after/after.png`}
              alt="После монтажа термопанелей"
              width={1024}
              height={576}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <span className="absolute top-4 right-4 bg-black/60 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
              После
            </span>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={`${base}before-after/before.png`}
                alt="До монтажа"
                width={1024}
                height={576}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${100 / (sliderPosition / 100)}%` }}
                draggable={false}
              />
              <span className="absolute top-4 left-4 bg-black/60 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
                До
              </span>
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-premium-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M9 18l6-6-6-6" />
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="bg-white rounded-xl px-6 py-4 shadow-premium text-center">
            <div className="font-display font-bold text-2xl text-primary">14 дней</div>
            <div className="text-text-light text-sm">средний срок монтажа</div>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-premium text-center">
            <div className="font-display font-bold text-2xl text-primary">150 м²</div>
            <div className="text-text-light text-sm">типичная площадь объекта</div>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-premium text-center">
            <div className="font-display font-bold text-2xl text-primary">2 человека</div>
            <div className="text-text-light text-sm">состав бригады</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
