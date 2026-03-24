import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from '@/components/ui/table';
import { 
  Ruler, 
  Weight, 
  Thermometer, 
  Droplets, 
  Flame, 
  Snowflake,
  CheckCircle2
} from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const specifications = [
  { label: 'Толщина панели', value: 'от 62 до 112 мм' },
  { label: 'Толщина утеплителя', value: 'от 50 до 100 мм' },
  { label: 'Плотность утеплителя', value: 'от 15 до 25 кг/м³' },
  { label: 'Размер панели', value: '600 × 990 мм' },
  { label: 'Вес панели', value: 'от 14 до 16 кг' },
  { label: 'Теплопроводность', value: '0,037 Вт/м·К' },
  { label: 'Водопоглощение', value: 'не более 2% по объёму' },
];

const operationalProps = [
  { label: 'Срок службы', value: '30–40 лет', icon: CheckCircle2, color: '#2D8A5E' },
  { label: 'Устойчивость к УФ', value: 'Да', icon: CheckCircle2, color: '#2D8A5E' },
  { label: 'Стойкость к влаге', value: 'Да', icon: Droplets, color: '#5A7A9A' },
  { label: 'Класс горючести', value: 'Г2', icon: Flame, color: '#C45C3E' },
  { label: 'Морозостойкость', value: '150–200 циклов', icon: Snowflake, color: '#5A9AAA' },
  { label: 'Температурный диапазон', value: 'от -50°C до +70°C', icon: Thermometer, color: '#8B5A3C' },
];

const constructionFeatures = [
  { label: 'Тип декоративного слоя', value: 'Декоративный камень' },
  { label: 'Тип утеплителя', value: 'Пенополистирол (EPS)' },
  { label: 'Способ крепления', value: 'Механическое крепление' },
];

export function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(rightColRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="specs" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#C45C3E]/5 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUpText>
            <span className="inline-block px-4 py-2 bg-[#2D8A5E]/10 text-[#2D8A5E] rounded-full text-sm font-medium mb-4">
              Технические характеристики
            </span>
          </FadeUpText>
          
          <FadeUpText delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
              Параметры и надёжность{' '}
              <span className="text-[#2D8A5E]">фасадной системы</span>
            </h2>
          </FadeUpText>
          
          <FadeUpText delay={0.2}>
            <p className="text-lg text-[#5A5A5A]">
              Полная прозрачность характеристик — мы ничего не скрываем
            </p>
          </FadeUpText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div ref={leftColRef} className="space-y-8">
            {/* Production Image */}
            <TiltCard tiltAmount={3}>
              <div className="relative rounded-2xl overflow-hidden shadow-card group">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop"
                  alt="Термопанели в производстве"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white font-display text-lg font-semibold">Производство термопанелей MARROB</p>
                  <p className="text-white/70 text-sm">Контроль качества на всех этапах</p>
                </div>
              </div>
            </TiltCard>

            {/* Main Specifications */}
            <Card className="bg-white border-[#E8E4DF] shadow-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-6 border-b border-[#E8E4DF] bg-gradient-to-r from-[#C45C3E]/5 to-transparent">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C45C3E] to-[#E07A5F] flex items-center justify-center shadow-primary">
                    <Ruler className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#2A2A2A]">Основные параметры</h3>
                </div>
                
                <Table>
                  <TableBody>
                    {specifications.map((spec, index) => (
                      <TableRow key={index} className="border-[#E8E4DF] hover:bg-[#FAF9F7]/50 transition-colors">
                        <TableCell className="text-[#5A5A5A] py-4">{spec.label}</TableCell>
                        <TableCell className="text-[#2A2A2A] font-medium text-right py-4">{spec.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="space-y-6">
            {/* Mounting Image */}
            <TiltCard tiltAmount={3}>
              <div className="relative rounded-2xl overflow-hidden shadow-card group">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=300&fit=crop"
                  alt="Монтаж термопанелей"
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white font-display text-lg font-semibold">Профессиональный монтаж</p>
                  <p className="text-white/70 text-sm">Без мокрых процессов</p>
                </div>
              </div>
            </TiltCard>

            {/* Operational Properties */}
            <Card className="bg-white border-[#E8E4DF] shadow-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-6 border-b border-[#E8E4DF] bg-gradient-to-r from-[#2D8A5E]/5 to-transparent">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center shadow-accent">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#2A2A2A]">Эксплуатационные свойства</h3>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {operationalProps.map((prop, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF9F7] border border-[#E8E4DF] hover:shadow-soft transition-shadow"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${prop.color}15` }}
                      >
                        <prop.icon className="w-5 h-5" style={{ color: prop.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-[#7A7A7A] mb-1">{prop.label}</p>
                        <p className="text-[#2A2A2A] font-medium">{prop.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Construction Features */}
            <Card className="bg-white border-[#E8E4DF] shadow-card overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-6 border-b border-[#E8E4DF] bg-gradient-to-r from-[#8B5A3C]/5 to-transparent">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5A3C] to-[#AB7A5C] flex items-center justify-center">
                    <Weight className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#2A2A2A]">Особенности конструкции</h3>
                </div>

                <div className="p-6 space-y-3">
                  {constructionFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#FAF9F7]"
                    >
                      <span className="text-[#5A5A5A]">{feature.label}</span>
                      <Badge variant="outline" className="border-[#2D8A5E]/30 text-[#2D8A5E] bg-[#2D8A5E]/5 font-medium">
                        {feature.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <FadeUpText delay={0.3}>
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#FAF9F7] rounded-2xl border border-[#E8E4DF]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center shadow-accent">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <p className="text-[#5A5A5A]">
                Система рассчитана на многолетнюю эксплуатацию в климатических условиях России
              </p>
            </div>
          </FadeUpText>
        </div>
      </div>
    </section>
  );
}
