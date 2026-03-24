import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 'klinker',
    name: 'Клинкерный кирпич',
    description: 'Классический клинкер с характерной текстурой и насыщенными цветами',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    colors: [
      { name: 'Красный', color: '#8B3A3A' },
      { name: 'Коричневый', color: '#654321' },
      { name: 'Песочный', color: '#C2B280' },
      { name: 'Графит', color: '#36454F' },
    ],
  },
  {
    id: 'versal',
    name: 'Версальский кирпич',
    description: 'Элегантный стиль французского дворца с изысканными оттенками',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    colors: [
      { name: 'Кремовый', color: '#F5F5DC' },
      { name: 'Бежевый', color: '#D2B48C' },
      { name: 'Серый', color: '#808080' },
      { name: 'Антрацит', color: '#293133' },
    ],
  },
  {
    id: 'vizant',
    name: 'Византийский кирпич',
    description: 'Восточная роскошь и богатство деталей в каждой панели',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
    colors: [
      { name: 'Терракота', color: '#E2725B' },
      { name: 'Охра', color: '#CC7722' },
      { name: 'Песок', color: '#C2B280' },
      { name: 'Тёмный', color: '#3D3D3D' },
    ],
  },
  {
    id: 'skandi',
    name: 'Скандинавский кирпич',
    description: 'Северная простота и функциональность в минималистичном дизайне',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=400&fit=crop',
    colors: [
      { name: 'Белый', color: '#F5F5F5' },
      { name: 'Светло-серый', color: '#D3D3D3' },
      { name: 'Серый', color: '#A9A9A9' },
      { name: 'Тёмно-серый', color: '#696969' },
    ],
  },
  {
    id: 'turin',
    name: 'Туринский кирпич',
    description: 'Итальянская классика и изысканность для элитных проектов',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
    colors: [
      { name: 'Карамель', color: '#C68E17' },
      { name: 'Капучино', color: '#B8906A' },
      { name: 'Мокко', color: '#6F4E37' },
      { name: 'Эспрессо', color: '#3B2F2F' },
    ],
  },
  {
    id: 'shumer',
    name: 'Шумерский кирпич',
    description: 'Древние мотивы в современном исполнении для уникальных фасадов',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    colors: [
      { name: 'Песчаник', color: '#D4C4A8' },
      { name: 'Глина', color: '#B66A50' },
      { name: 'Сланец', color: '#708090' },
      { name: 'Базальт', color: '#2F2F2F' },
    ],
  },
];

export function CatalogSection() {
  const [activeCollection, setActiveCollection] = useState('klinker');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="catalog" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#C45C3E]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#2D8A5E]/10 text-[#2D8A5E] rounded-full text-sm font-medium mb-4">
              Каталог
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Коллекции термопанелей{' '}
              <span className="text-[#2D8A5E]">MARROB</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Более 100 вариантов фактур и оттенков под натуральный камень
            </p>
          </FadeUpText>
        </div>

        {/* Collections Tabs */}
        <div ref={contentRef}>
          <Tabs value={activeCollection} onValueChange={setActiveCollection} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-12">
              {collections.map((collection) => (
                <TabsTrigger
                  key={collection.id}
                  value={collection.id}
                  className="px-5 py-3 rounded-full border border-[#E8E4DF] bg-white text-[#5A5A5A] data-[state=active]:bg-[#C45C3E] data-[state=active]:text-white data-[state=active]:border-[#C45C3E] hover:border-[#C45C3E]/50 transition-all duration-300 shadow-soft text-sm font-medium"
                >
                  {collection.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {collections.map((collection) => (
              <TabsContent key={collection.id} value={collection.id} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Collection Image */}
                  <TiltCard tiltAmount={4}>
                    <div className="relative rounded-3xl overflow-hidden shadow-card group">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay with collection name */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 via-[#2A2A2A]/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="font-display text-2xl font-semibold text-white mb-2">
                          {collection.name}
                        </h3>
                        <p className="text-white/80 text-sm">{collection.description}</p>
                      </div>
                      
                      {/* Corner decoration */}
                      <div className="absolute top-4 right-4 w-12 h-12 border border-white/30 rounded-lg" />
                    </div>
                  </TiltCard>

                  {/* Collection Info */}
                  <div>
                    <h3 className="font-display text-3xl font-semibold text-[#2A2A2A] mb-4">
                      {collection.name}
                    </h3>
                    <p className="text-[#5A5A5A] text-lg mb-8 leading-relaxed">
                      {collection.description}
                    </p>

                    {/* Colors */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-[#7A7A7A] uppercase tracking-wider mb-4">
                        Доступные цвета
                      </h4>
                      <div className="grid grid-cols-4 gap-4">
                        {collection.colors.map((color, index) => (
                          <div
                            key={index}
                            className="group cursor-pointer"
                          >
                            <div
                              className="w-full aspect-square rounded-xl mb-2 border-2 border-[#E8E4DF] group-hover:border-[#C45C3E] group-hover:shadow-md transition-all duration-300"
                              style={{ backgroundColor: color.color }}
                            />
                            <p className="text-xs text-[#5A5A5A] group-hover:text-[#C45C3E] transition-colors text-center">
                              {color.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="bg-[#C45C3E] text-white hover:bg-[#B54D30] font-semibold btn-hover shadow-primary group"
                    >
                      Подробнее о коллекции
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
