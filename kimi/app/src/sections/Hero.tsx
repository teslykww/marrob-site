import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Calculator, Package, Factory, Shield, Check } from 'lucide-react';
import { MagneticButton } from '@/components/MagneticButton';
import { AnimatedBlobs } from '@/components/AnimatedBlobs';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - split into words
      const titleWords = titleRef.current?.querySelectorAll('.word');
      if (titleWords) {
        gsap.fromTo(titleWords,
          { 
            opacity: 0, 
            y: 80,
            rotateX: -80,
          },
          { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            delay: 0.3,
          }
        );
      }

      // Subtitle fade up
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );

      // CTA buttons
      gsap.fromTo(ctaRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 1, ease: 'power3.out' }
      );

      // Image reveal with mask
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.1, clipPath: 'inset(100% 0 0 0)' },
        { 
          opacity: 1, 
          scale: 1, 
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2, 
          delay: 0.5, 
          ease: 'power3.inOut' 
        }
      );

      // Stats card
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 1.2, ease: 'back.out(1.7)' }
      );

      // Floating animation for stats
      gsap.to(statsRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const titleText = 'Фасадные термопанели';
  const accentText = 'с облицовкой под натуральный камень';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F7]"
    >
      {/* Animated Background Blobs */}
      <AnimatedBlobs />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#E8E4DF_1px,transparent_0)] bg-[length:40px_40px] opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="max-w-xl">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft border border-[#E8E4DF]">
                <Factory className="w-4 h-4 text-[#2D8A5E]" />
                <span className="text-sm font-medium text-[#4A4A4A]">Собственное производство</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft border border-[#E8E4DF]">
                <Shield className="w-4 h-4 text-[#C45C3E]" />
                <span className="text-sm font-medium text-[#4A4A4A]">30 лет гарантии</span>
              </div>
            </div>

            {/* Main Heading with animated words */}
            <h1 
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2A2A2A] leading-[1.15] mb-6"
              style={{ perspective: '1000px' }}
            >
              <span className="block mb-2">
                {titleText.split(' ').map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
                ))}
              </span>
              <span className="block text-[#C45C3E]">
                {accentText.split(' ').map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
                ))}
              </span>
            </h1>

            {/* Subheading */}
            <p 
              ref={subtitleRef}
              className="text-xl text-[#5A5A5A] mb-6 leading-relaxed"
            >
              Экономия до <span className="text-[#2D8A5E] font-semibold">50-60%</span> на теплопотерях. 
              Напрямую от производителя.
            </p>

            {/* Key Benefits */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                'Утепление и отделка в одной системе',
                'Более 100 фактур и оттенков',
                'Замковая геометрия без мостиков холода',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-[#4A4A4A]">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2D8A5E]/20 to-[#2D8A5E]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#2D8A5E]" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                size="lg"
                onClick={scrollToContact}
                className="text-lg px-8 py-6"
                magneticStrength={0.2}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Рассчитать фасад
                <ArrowRight className="w-5 h-5 ml-2" />
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="text-lg px-8 py-6"
                magneticStrength={0.2}
              >
                <Package className="w-5 h-5 mr-2" />
                Купить панели
              </MagneticButton>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div 
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/hero-house.jpg"
                alt="Дом с фасадными термопанелями"
                className="w-full h-auto object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/30 via-transparent to-transparent" />
              
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/40 rounded-tl-lg" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-white/40 rounded-br-lg" />
            </div>
            
            {/* Floating Stats Card */}
            <div 
              ref={statsRef}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-card border border-[#E8E4DF]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C45C3E] to-[#E07A5F] flex items-center justify-center shadow-primary">
                  <Factory className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#2A2A2A] font-display">6 500+</p>
                  <p className="text-sm text-[#7A7A7A]">Реализованных объектов</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#2D8A5E]/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute -bottom-4 right-12 w-24 h-24 bg-gradient-to-br from-[#C45C3E]/20 to-transparent rounded-full blur-xl" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="text-xs text-[#7A7A7A] uppercase tracking-widest">Scroll</span>
        <div className="scroll-indicator" />
      </div>
    </section>
  );
}
