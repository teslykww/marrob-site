import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Wrench, 
  Check, 
  ArrowRight, 
  Users, 
  Building2, 
  MapPin,
  Truck
} from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const purchaseOptions = [
  {
    id: 'panels',
    icon: Package,
    title: 'Покупка панелей',
    subtitle: 'напрямую от производителя',
    description: 'Подберём коллекцию, рассчитаем необходимый объём и подготовим панели к отгрузке.',
    features: [
      { icon: Users, text: 'Самостоятельный монтаж' },
      { icon: Building2, text: 'Работа со своей бригадой' },
      { icon: Building2, text: 'Строительные компании' },
    ],
    note: 'Поставка возможна в любой регион РФ и СНГ',
    noteIcon: Truck,
    cta: 'Рассчитать количество панелей',
    variant: 'outline' as const,
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&h=300&fit=crop',
  },
  {
    id: 'turnkey',
    icon: Wrench,
    title: 'Фасад под ключ',
    subtitle: 'с монтажом от производителя',
    description: 'Производство панелей и профессиональный монтаж одной командой.',
    features: [
      { icon: Users, text: 'Частные дома' },
      { icon: Building2, text: 'Реконструкция фасада' },
      { icon: Check, text: 'Полный контроль результата' },
    ],
    note: 'Монтаж выполняется в Москве и Московской области',
    noteIcon: MapPin,
    cta: 'Рассчитать фасад под ключ',
    variant: 'primary' as const,
    highlighted: true,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=300&fit=crop',
  },
];

export function PurchaseOptions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.option-card');
      if (cards) {
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 60,
            rotateX: -10,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#FAF9F7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#E8E4DF_1px,transparent_0)] bg-[length:50px_50px] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#2D8A5E]/10 text-[#2D8A5E] rounded-full text-sm font-medium mb-4">
              Варианты покупки
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Как вы можете приобрести{' '}
              <span className="text-[#2D8A5E]">термопанели MARROB</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Два понятных пути — выбирайте тот, который подходит именно вам
            </p>
          </FadeUpText>
        </div>

        {/* Options Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {purchaseOptions.map((option) => (
            <TiltCard key={option.id} className="option-card" tiltAmount={4}>
              <Card
                className={`relative overflow-hidden h-full ${
                  option.highlighted
                    ? 'bg-gradient-to-br from-white to-[#FAF9F7] border-[#C45C3E]/30'
                    : 'bg-white border-[#E8E4DF]'
                }`}
              >
                {option.highlighted && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-gradient-to-r from-[#C45C3E] to-[#E07A5F] text-white rounded-none rounded-bl-lg px-4 py-1.5 font-medium">
                      Рекомендуем
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/80 via-[#2A2A2A]/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                        option.highlighted 
                          ? 'bg-gradient-to-br from-[#C45C3E] to-[#E07A5F]' 
                          : 'bg-white/90 backdrop-blur-sm'
                      }`}>
                        <option.icon className={`w-7 h-7 ${
                          option.highlighted ? 'text-white' : 'text-[#C45C3E]'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-white">{option.title}</h3>
                        <p className="text-white/80 text-sm">{option.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Description */}
                    <p className="text-[#5A5A5A] mb-6 leading-relaxed">
                      {option.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <p className="text-xs text-[#7A7A7A] uppercase tracking-wider mb-3 font-medium">
                        Подходит для:
                      </p>
                      {option.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-[#4A4A4A]"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#2D8A5E]/10 flex items-center justify-center">
                            <feature.icon className="w-4 h-4 text-[#2D8A5E]" />
                          </div>
                          <span className="text-sm">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Note */}
                    <div className="flex items-center gap-3 text-sm text-[#7A7A7A] mb-8 p-4 rounded-xl bg-[#FAF9F7] border border-[#E8E4DF]">
                      <option.noteIcon className="w-5 h-5 text-[#C45C3E]" />
                      <span>{option.note}</span>
                    </div>

                    {/* CTA */}
                    <MagneticButton
                      onClick={scrollToContact}
                      className={`w-full py-6 text-lg font-semibold ${
                        option.highlighted
                          ? 'bg-gradient-to-r from-[#C45C3E] to-[#E07A5F] text-white hover:shadow-primary'
                          : 'border-2 border-[#E8E4DF] text-[#5A5A5A] hover:border-[#C45C3E] hover:text-[#C45C3E]'
                      }`}
                      magneticStrength={0.15}
                    >
                      {option.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </MagneticButton>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <FadeUpText delay={0.3}>
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-[#E8E4DF] shadow-soft">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center shadow-accent">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#5A5A5A]">
                Независимо от выбранного формата, вы получаете продукцию{' '}
                <span className="text-[#C45C3E] font-medium">собственного производства</span>{' '}
                и консультацию специалиста
              </p>
            </div>
          </FadeUpText>
        </div>
      </div>
    </section>
  );
}
