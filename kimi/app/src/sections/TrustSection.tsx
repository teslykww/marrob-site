import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Factory, 
  Shield, 
  Award, 
  FileCheck, 
  Flame, 
  Leaf, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';
import { AnimatedCounter } from '@/components/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3000, suffix: ' м²', label: 'Производственные мощности в месяц' },
  { value: 6500, suffix: '+', label: 'Реализованных объектов' },
  { value: 11, suffix: ' лет', label: 'На рынке с 2016 года' },
];

const guarantees = [
  {
    icon: Shield,
    title: '30 лет',
    subtitle: 'Гарантия на панели',
    description: 'Полная гарантия на структурную целостность и теплоизоляционные свойства',
    mockup: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    gradient: 'from-[#2D8A5E] to-[#4CAF7C]',
  },
  {
    icon: Award,
    title: '12 месяцев',
    subtitle: 'Гарантия на монтаж',
    description: 'Гарантия на работы по установке фасадной системы',
    mockup: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    gradient: 'from-[#C45C3E] to-[#E07A5F]',
  },
];

const certificates = [
  { 
    id: 1,
    icon: FileCheck, 
    name: 'Сертификат соответствия',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=400&fit=crop',
  },
  { 
    id: 2,
    icon: FileCheck, 
    name: 'Протокол испытаний',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop',
  },
  { 
    id: 3,
    icon: Flame, 
    name: 'Пожарная безопасность',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=400&fit=crop',
  },
  { 
    id: 4,
    icon: Leaf, 
    name: 'Экологическая безопасность',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
  },
  { 
    id: 5,
    icon: FileText, 
    name: 'Технический паспорт',
    image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=300&h=400&fit=crop',
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      const statElements = sectionRef.current?.querySelectorAll('.stat-item');
      if (statElements) {
        gsap.fromTo(statElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statElements[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#C45C3E]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#C45C3E]/10 text-[#C45C3E] rounded-full text-sm font-medium mb-4">
              Надёжность
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Гарантия качества и{' '}
              <span className="text-[#C45C3E]">контроль производства</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              MARROB — производитель фасадных термопанелей с полным циклом контроля качества
            </p>
          </FadeUpText>
        </div>

        {/* Production Info */}
        <Card className="bg-white border-[#E8E4DF] shadow-card mb-12 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C45C3E] to-[#E07A5F] flex items-center justify-center shadow-primary">
                    <Factory className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[#2A2A2A] mb-2">Собственное производство</h3>
                    <p className="text-[#5A5A5A] leading-relaxed">
                      Компания MARROB является производителем фасадных термопанелей с облицовкой под натуральный камень. 
                      Контроль качества осуществляется на всех этапах — от подготовки утеплителя до финальной сборки панели.
                    </p>
                  </div>
                </div>
              </div>

              {/* Production Image */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&h=350&fit=crop"
                  alt="Производство термопанелей"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 lg:p-12 border-t border-[#E8E4DF]">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl lg:text-5xl font-bold text-[#C45C3E] font-display"
                  />
                  <p className="text-[#5A5A5A] text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guarantees with Mockups */}
        <div className="mb-16">
          <FadeUpText>
            <h3 className="font-display text-xl font-semibold text-[#2A2A2A] mb-6 text-center">Гарантии</h3>
          </FadeUpText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <TiltCard key={index} tiltAmount={4}>
                <Card className="bg-white border-[#E8E4DF] overflow-hidden shadow-card">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {/* Mockup Image */}
                      <div className="relative h-48 sm:h-full">
                        <img
                          src={guarantee.mockup}
                          alt={guarantee.subtitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${guarantee.gradient} flex items-center justify-center shadow-lg`}>
                          <guarantee.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col justify-center">
                        <div className={`text-4xl font-bold bg-gradient-to-r ${guarantee.gradient} bg-clip-text text-transparent mb-1 font-display`}>
                          {guarantee.title}
                        </div>
                        <p className="text-[#2A2A2A] font-medium mb-3">{guarantee.subtitle}</p>
                        <p className="text-sm text-[#7A7A7A]">{guarantee.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Certificates Carousel */}
        <div>
          <FadeUpText>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-[#2A2A2A]">Сертификаты</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="w-10 h-10 rounded-full border-[#E8E4DF] disabled:opacity-30 hover:border-[#C45C3E] hover:text-[#C45C3E]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="w-10 h-10 rounded-full border-[#E8E4DF] disabled:opacity-30 hover:border-[#C45C3E] hover:text-[#C45C3E]"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </FadeUpText>

          <div 
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto pb-4 certificate-carousel scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {certificates.map((cert) => (
              <TiltCard key={cert.id} className="flex-shrink-0" tiltAmount={5}>
                <div className="w-64 group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden shadow-soft border border-[#E8E4DF] bg-white card-shine">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E8E4DF]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#C45C3E]/10 flex items-center justify-center">
                          <cert.icon className="w-4 h-4 text-[#C45C3E]" />
                        </div>
                        <span className="text-sm font-medium text-[#2A2A2A]">{cert.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button
              variant="outline"
              className="border-[#E8E4DF] text-[#5A5A5A] hover:text-[#C45C3E] hover:border-[#C45C3E]"
            >
              Посмотреть все сертификаты
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
