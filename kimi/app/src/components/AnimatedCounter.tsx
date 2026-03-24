import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  label?: string;
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  label,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            setCount(Math.floor(obj.value));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className={`counter-number ${className}`}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      {label && (
        <p className="text-[#5A5A5A] text-sm mt-2">{label}</p>
      )}
    </div>
  );
}

// Floating stat card
export function FloatingStat({
  value,
  suffix,
  label,
  icon: Icon,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 50, scale: 0.9 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: delay,
          ease: 'back.out(1.7)',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 shadow-card border border-[#E8E4DF]"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C45C3E]/10 to-[#2D8A5E]/10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-[#C45C3E]" />
        </div>
        <div>
          <AnimatedCounter
            end={value}
            suffix={suffix}
            className="text-3xl font-bold text-[#2A2A2A]"
          />
          <p className="text-sm text-[#7A7A7A]">{label}</p>
        </div>
      </div>
    </div>
  );
}
