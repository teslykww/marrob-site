import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Thermometer, 
  Palette, 
  Zap, 
  Droplets, 
  Puzzle, 
  Snowflake, 
  Clock, 
  Home, 
  Wrench, 
  Factory 
} from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Thermometer,
    title: 'Снижение теплопотерь',
    value: 'до 60%',
    description: 'Экономия на отоплении',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=200&fit=crop',
    gradient: 'from-[#C45C3E] to-[#E07A5F]',
  },
  {
    icon: Palette,
    title: 'Фактур и оттенков',
    value: '100+',
    description: 'Широкий выбор дизайна',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=300&h=200&fit=crop',
    gradient: 'from-[#8B5A9F] to-[#B57ACF]',
  },
  {
    icon: Zap,
    title: 'Монтаж',
    value: '1 этап',
    description: 'Без дополнительных работ',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop',
    gradient: 'from-[#2D8A5E] to-[#4CAF7C]',
  },
  {
    icon: Droplets,
    title: 'Технология',
    value: 'Сухая',
    description: 'Без мокрых процессов',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=200&fit=crop',
    gradient: 'from-[#5A7A9A] to-[#7A9ABA]',
  },
  {
    icon: Puzzle,
    title: 'Стыковка',
    value: 'Замковая',
    description: 'Без щелей и мостиков',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop',
    gradient: 'from-[#C45C3E] to-[#E07A5F]',
  },
  {
    icon: Snowflake,
    title: 'Морозостойкость',
    value: '200+',
    description: 'Циклов freeze-thaw',
    image: 'https://images.unsplash.com/photo-1483664852095-d6cc6870705d?w=300&h=200&fit=crop',
    gradient: 'from-[#5A9AAA] to-[#7ABACA]',
  },
  {
    icon: Clock,
    title: 'Срок службы',
    value: '40+ лет',
    description: 'Гарантированная долговечность',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=200&fit=crop',
    gradient: 'from-[#8B7A5A] to-[#AB9A7A]',
  },
  {
    icon: Home,
    title: 'Применение',
    value: 'Универсально',
    description: 'Новое строительство и реконструкция',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop',
    gradient: 'from-[#2D8A5E] to-[#4CAF7C]',
  },
  {
    icon: Wrench,
    title: 'Монтаж',
    value: 'Под ключ',
    description: 'Профессиональная установка',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
    gradient: 'from-[#C45C3E] to-[#E07A5F]',
  },
  {
    icon: Factory,
    title: 'Поставка',
    value: 'Напрямую',
    description: 'От производителя',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=300&h=200&fit=crop',
    gradient: 'from-[#6A6A6A] to-[#8A8A8A]',
  },
];

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
              each: 0.08,
              from: 'random',
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#FAF9F7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#E8E4DF_1px,transparent_0)] bg-[length:50px_50px] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#C45C3E]/10 text-[#C45C3E] rounded-full text-sm font-medium mb-4">
              Преимущества
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Что вы получаете при выборе{' '}
              <span className="text-[#C45C3E]">термопанелей</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Ключевые преимущества фасадной системы MARROB
            </p>
          </FadeUpText>
        </div>

        {/* Benefits Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {benefits.map((benefit, index) => (
            <TiltCard key={index} className="benefit-card" tiltAmount={5}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-soft border border-[#E8E4DF] group hover:shadow-card transition-all duration-300 h-full">
                {/* Image with gradient overlay */}
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${benefit.gradient} opacity-60`} />
                  <div className="absolute bottom-2 left-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <benefit.icon className="w-4 h-4 text-[#C45C3E]" />
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <div className={`text-xl font-bold bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent mb-1 font-display`}>
                    {benefit.value}
                  </div>
                  <h3 className="text-sm font-medium text-[#2A2A2A] mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#7A7A7A]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
