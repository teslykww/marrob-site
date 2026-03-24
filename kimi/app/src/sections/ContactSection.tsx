import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  User, 
  Phone, 
  MapPin, 
  Home, 
  CheckCircle2,
  Loader2,
  MessageSquare,
  Clock,
  Send
} from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';
import { TiltCard } from '@/components/TiltCard';
import { FadeUpText } from '@/components/AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const [formType, setFormType] = useState('facade');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    area: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 lg:py-32 bg-[#FAF9F7]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard tiltAmount={3}>
            <Card className="bg-white border-[#E8E4DF] shadow-card">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center mx-auto mb-6 shadow-accent">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2A2A2A] mb-4">
                  Заявка успешно отправлена!
                </h3>
                <p className="text-[#5A5A5A] mb-6">
                  Мы свяжемся с вами в ближайшее время для уточнения параметров и подбора оптимального решения.
                </p>
                <MagneticButton
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', city: '', area: '' });
                  }}
                  variant="outline"
                  className="border-[#E8E4DF] text-[#5A5A5A] hover:text-[#C45C3E] hover:border-[#C45C3E]"
                >
                  Отправить ещё одну заявку
                </MagneticButton>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#2D8A5E]/5 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <div>
            <FadeUpText>
              <Badge 
                variant="outline" 
                className="bg-[#C45C3E]/10 border-[#C45C3E]/30 text-[#C45C3E] px-4 py-2 text-sm font-medium mb-6"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Бесплатный расчёт
              </Badge>
            </FadeUpText>
            
            <FadeUpText delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2A2A2A] mb-6 leading-tight">
                Получите индивидуальный{' '}
                <span className="text-[#C45C3E]">расчёт фасадной системы</span>
              </h2>
            </FadeUpText>
            
            <FadeUpText delay={0.2}>
              <p className="text-lg text-[#5A5A5A] mb-8">
                Бесплатно подготовим расчёт объёма панелей и ориентировочную стоимость. 
                Консультация специалиста без обязательств.
              </p>
            </FadeUpText>

            <FadeUpText delay={0.3}>
              <div className="space-y-4 mb-8">
                {[
                  'Расчёт за 24 часа',
                  'Подбор оптимальной коллекции',
                  'Без навязчивых продаж',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#4A4A4A]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D8A5E]/20 to-[#2D8A5E]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#2D8A5E]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeUpText>

            {/* Contact Cards */}
            <FadeUpText delay={0.4}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-[#FAF9F7] rounded-xl border border-[#E8E4DF] hover:shadow-soft transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2D8A5E] to-[#4CAF7C] flex items-center justify-center mb-3 shadow-accent">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-[#7A7A7A] mb-1">WhatsApp / Telegram</p>
                  <p className="text-[#2A2A2A] font-medium">+7 (916) 666-23-35</p>
                </div>
                <div className="p-5 bg-[#FAF9F7] rounded-xl border border-[#E8E4DF] hover:shadow-soft transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C45C3E] to-[#E07A5F] flex items-center justify-center mb-3 shadow-primary">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xs text-[#7A7A7A] mb-1">Режим работы</p>
                  <p className="text-[#2A2A2A] font-medium">Пн-Пт: 9:00-18:00</p>
                </div>
              </div>
            </FadeUpText>
          </div>

          {/* Right: Form */}
          <div ref={formRef}>
            <TiltCard tiltAmount={2}>
              <Card className="bg-white border-[#E8E4DF] shadow-card">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Type Selection */}
                    <div>
                      <Label className="text-[#5A5A5A] mb-3 block font-medium">Что вас интересует?</Label>
                      <RadioGroup
                        value={formType}
                        onValueChange={setFormType}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="facade"
                            id="facade"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="facade"
                            className="flex flex-col items-center justify-center rounded-xl border-2 border-[#E8E4DF] bg-[#FAF9F7] p-4 hover:border-[#C45C3E]/50 peer-data-[state=checked]:border-[#C45C3E] peer-data-[state=checked]:bg-[#C45C3E]/5 cursor-pointer transition-all"
                          >
                            <Home className="w-6 h-6 mb-2 text-[#7A7A7A] peer-data-[state=checked]:text-[#C45C3E]" />
                            <span className="text-sm text-[#4A4A4A] font-medium">Фасад под ключ</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="panels"
                            id="panels"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="panels"
                            className="flex flex-col items-center justify-center rounded-xl border-2 border-[#E8E4DF] bg-[#FAF9F7] p-4 hover:border-[#C45C3E]/50 peer-data-[state=checked]:border-[#C45C3E] peer-data-[state=checked]:bg-[#C45C3E]/5 cursor-pointer transition-all"
                          >
                            <Calculator className="w-6 h-6 mb-2 text-[#7A7A7A] peer-data-[state=checked]:text-[#C45C3E]" />
                            <span className="text-sm text-[#4A4A4A] font-medium">Покупка панелей</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Form Fields */}
                    {[
                      { id: 'name', label: 'Имя', icon: User, placeholder: 'Ваше имя', type: 'text', required: false },
                      { id: 'phone', label: 'Телефон', icon: Phone, placeholder: '+7 (___) ___-__-__', type: 'tel', required: true },
                      { id: 'city', label: 'Город / регион', icon: MapPin, placeholder: 'Москва', type: 'text', required: false },
                      { id: 'area', label: 'Площадь фасада (м²)', icon: Home, placeholder: 'Например, 150', type: 'number', required: false },
                    ].map((field) => (
                      <div key={field.id}>
                        <Label htmlFor={field.id} className="text-[#5A5A5A] mb-2 block">
                          {field.label} {field.required && <span className="text-[#C45C3E]">*</span>}
                        </Label>
                        <div className="relative">
                          <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A7A7A]" />
                          <Input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={formData[field.id as keyof typeof formData]}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="pl-12 bg-[#FAF9F7] border-[#E8E4DF] text-[#2A2A2A] placeholder:text-[#9A9A9A] focus:border-[#C45C3E] h-12"
                          />
                        </div>
                      </div>
                    ))}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#C45C3E] to-[#E07A5F] text-white hover:shadow-primary text-lg py-6 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 hover:scale-[1.02] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          Получить расчёт
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-[#7A7A7A] text-center">
                      Мы свяжемся с вами для уточнения параметров. Без навязчивых продаж.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
