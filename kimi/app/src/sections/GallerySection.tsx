import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Maximize2, X } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    title: 'Коттедж в Красногорске',
    area: '280 м²',
    location: 'Московская область',
    texture: 'Клинкерный кирпич, Красный',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    title: 'Загородный дом',
    area: '195 м²',
    location: 'Новая Рига',
    texture: 'Версальский кирпич, Кремовый',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    title: 'Современная вилла',
    area: '350 м²',
    location: 'Рублёвка',
    texture: 'Скандинавский кирпич, Серый',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    title: 'Таунхаус',
    area: '165 м²',
    location: 'Одинцово',
    texture: 'Туринский кирпич, Капучино',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
    title: 'Частный дом',
    area: '220 м²',
    location: 'Истра',
    texture: 'Византийский кирпич, Терракота',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    title: 'Коттеджный посёлок',
    area: '180 м²',
    location: 'Дмитровское шоссе',
    texture: 'Шумерский кирпич, Песчаник',
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.gallery-card');
      if (cards) {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: {
              each: 0.1,
              from: 'start',
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 lg:py-32 bg-[#FAF9F7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#2D8A5E]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#C45C3E]/10 text-[#C45C3E] rounded-full text-sm font-medium mb-4">
              Портфолио
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Дома с фасадами из термопанелей{' '}
              <span className="text-[#C45C3E]">MARROB</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Реальные объекты, реализованные с использованием нашей фасадной системы
            </p>
          </FadeUpText>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <TiltCard key={item.id} className="gallery-card" tiltAmount={4}>
              <div 
                className="group bg-white rounded-2xl overflow-hidden shadow-soft border border-[#E8E4DF] cursor-pointer hover:shadow-card transition-all duration-300"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 via-[#2A2A2A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* View button */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <Maximize2 className="w-5 h-5 text-[#C45C3E]" />
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-display text-xl font-semibold mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 border-t border-[#E8E4DF]">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[#E8E4DF] text-[#5A5A5A] bg-[#FAF9F7] font-medium">
                      {item.area}
                    </Badge>
                    <span className="text-sm text-[#7A7A7A] truncate max-w-[150px]">
                      {item.texture}
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <FadeUpText delay={0.3}>
            <div className="inline-flex items-center gap-4 px-8 py-5 bg-white rounded-2xl shadow-card border border-[#E8E4DF]">
              <span className="text-5xl font-bold text-[#C45C3E] font-display">6 500+</span>
              <div className="text-left">
                <span className="text-[#5A5A5A] block">домов уже утеплены</span>
                <span className="text-[#7A7A7A] text-sm">и облицованы нашей системой</span>
              </div>
            </div>
          </FadeUpText>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl bg-white border-[#E8E4DF] p-0 overflow-hidden">
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#2A2A2A] to-transparent">
                <h3 className="text-xl font-bold text-white font-display mb-2">{selectedImage.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedImage.location}
                  </span>
                  <span>{selectedImage.area}</span>
                  <span>{selectedImage.texture}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#2A2A2A] hover:bg-[#C45C3E] hover:text-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
