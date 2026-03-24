import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Layers, Shield, Puzzle, Anchor } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    icon: Layers,
    title: 'Плотный утеплитель',
    description: 'ППС высокой плотности (15-25 кг/м³) обеспечивает отличную теплоизоляцию',
    detail: 'Толщина: 50-100 мм',
    color: '#2D8A5E',
  },
  {
    icon: Shield,
    title: 'Декоративная облицовка',
    description: 'Фактура под натуральный камень с защитным покрытием от УФ-излучения',
    detail: 'Более 100 вариантов',
    color: '#C45C3E',
  },
  {
    icon: Puzzle,
    title: 'Замковая геометрия',
    description: 'Плотная стыковка панелей без щелей и мостиков холода',
    detail: 'Точность: ±0.5 мм',
    color: '#5A7A9A',
  },
  {
    icon: Anchor,
    title: 'Механическое крепление',
    description: 'Надёжная фиксация к основанию с распределением нагрузки',
    detail: 'Скрытый монтаж',
    color: '#8B5A3C',
  },
];

export function SolutionSection() {
  const [activeTab, setActiveTab] = useState('structure');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#2D8A5E]/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#2D8A5E]/10 text-[#2D8A5E] rounded-full text-sm font-medium mb-4">
              Решение
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Термопанель — <span className="text-[#2D8A5E]">утепление и фасад</span> в одной системе
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Готовая фасадная система 2 в 1: современное решение для утепления и отделки дома
            </p>
          </FadeUpText>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image/Diagram */}
          <div ref={contentRef}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#F5F0EB] border border-[#E8E4DF] mb-6 p-1.5 rounded-xl">
                <TabsTrigger 
                  value="structure" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#C45C3E] data-[state=active]:shadow-sm transition-all duration-300"
                >
                  Структура панели
                </TabsTrigger>
                <TabsTrigger 
                  value="mounting"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#C45C3E] data-[state=active]:shadow-sm transition-all duration-300"
                >
                  Схема монтажа
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="structure" className="mt-0">
                <TiltCard tiltAmount={5}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card border border-[#E8E4DF] bg-[#F5F0EB]">
                    <img
                      src="/images/panel-layers.jpg"
                      alt="Структура термопанели"
                      className="w-full h-auto"
                    />
                    {/* Layer indicators */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-2">
                      {layers.map((layer, i) => (
                        <div 
                          key={i}
                          className="w-3 h-12 rounded-full"
                          style={{ backgroundColor: layer.color }}
                        />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </TabsContent>
              
              <TabsContent value="mounting" className="mt-0">
                <TiltCard tiltAmount={5}>
                  <div className="relative rounded-2xl overflow-hidden shadow-card border border-[#E8E4DF] bg-gradient-to-br from-[#F5F0EB] to-white p-8">
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center mx-auto mb-6 shadow-accent">
                          <Anchor className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-[#2A2A2A] font-medium text-lg">Механическое крепление к стене</p>
                        <p className="text-sm text-[#7A7A7A] mt-2">Без мокрых процессов и клея</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </TabsContent>
            </Tabs>
            
            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#2D8A5E]/20 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Right: Layers Description */}
          <div className="space-y-4">
            {layers.map((layer, index) => (
              <TiltCard key={index} tiltAmount={3}>
                <div className="bg-white rounded-xl p-5 shadow-soft border border-[#E8E4DF] group hover:shadow-card transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${layer.color}15` }}
                    >
                      <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display text-lg font-semibold text-[#2A2A2A]">
                          {layer.title}
                        </h3>
                        <span 
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${layer.color}15`,
                            color: layer.color 
                          }}
                        >
                          {layer.detail}
                        </span>
                      </div>
                      <p className="text-[#5A5A5A] text-sm leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}

            {/* Summary */}
            <FadeUpText delay={0.3}>
              <div className="mt-8 p-6 bg-gradient-to-r from-[#2D8A5E]/10 via-[#2D8A5E]/5 to-transparent rounded-xl border border-[#2D8A5E]/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center flex-shrink-0 shadow-accent">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#2A2A2A] font-medium mb-1 font-display">
                      Монтаж в один этап
                    </p>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">
                      Термопанель объединяет утеплитель и декоративную облицовку в единой конструкции. 
                      Монтаж выполняется без мокрых процессов и дополнительной отделки.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUpText>
          </div>
        </div>
      </div>
    </section>
  );
}
