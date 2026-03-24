import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, CloudRain, Thermometer, Clock, ArrowDown } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Users,
    title: 'Два подрядчика',
    description: 'Отдельное утепление и отдельная облицовка — два подрядчика, разные сроки и координация работ',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    color: '#C45C3E',
  },
  {
    icon: CloudRain,
    title: 'Мокрые процессы',
    description: 'Зависимость от погоды и сезонности — работы невозможны при дожде и минусовой температуре',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400&h=300&fit=crop',
    color: '#5A7A9A',
  },
  {
    icon: Thermometer,
    title: 'Мостики холода',
    description: 'Ошибки стыковки слоёв приводят к мостикам холода, трещинам и потере тепла',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    color: '#8B5A3C',
  },
  {
    icon: Clock,
    title: 'Длительный монтаж',
    description: 'Растянутые сроки строительства — классическая схема занимает в 2-3 раза больше времени',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
    color: '#6A6A6A',
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.problem-card');
      if (cards) {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 60,
            rotateY: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-[#FAF9F7] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C45C3E]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#2D8A5E]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#C45C3E]/10 text-[#C45C3E] rounded-full text-sm font-medium mb-4">
              Проблема
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Почему классическое утепление фасада — это{' '}
              <span className="text-[#C45C3E]">несколько этапов и лишние риски?</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Традиционные схемы утепления сложны и создают множество проблем на каждом этапе
            </p>
          </FadeUpText>
        </div>

        {/* Problems Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <TiltCard key={index} className="problem-card" tiltAmount={8}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-[#E8E4DF] group h-full">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={problem.image}
                    alt={problem.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/70 via-[#2A2A2A]/20 to-transparent" />
                  
                  {/* Icon badge */}
                  <div 
                    className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: problem.color }}
                  >
                    <problem.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-[#2A2A2A] mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Transition to Solution */}
        <div className="text-center">
          <FadeUpText>
            <div className="inline-flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D8A5E]/20 to-[#2D8A5E]/10 flex items-center justify-center mb-4 animate-bounce">
                <ArrowDown className="w-6 h-6 text-[#2D8A5E]" />
              </div>
              <p className="text-lg text-[#5A5A5A] max-w-2xl">
                <span className="text-[#2D8A5E] font-semibold">Современные фасадные системы</span> объединяют 
                утепление и отделку в одном продукте
              </p>
            </div>
          </FadeUpText>
        </div>
      </div>
    </section>
  );
}
