import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Component
export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
}

export function AnimatedText({
  children,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.03,
  type = 'chars',
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = type === 'chars' 
      ? container.querySelectorAll('.char')
      : type === 'words'
      ? container.querySelectorAll('.word')
      : [container];

    gsap.set(elements, { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: stagger,
          delay: delay,
          ease: 'back.out(1.7)',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay, stagger, type]);

  const splitText = () => {
    if (type === 'chars') {
      return children.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block"
          style={{ 
            transformStyle: 'preserve-3d',
            display: char === ' ' ? 'inline' : 'inline-block',
            width: char === ' ' ? '0.3em' : 'auto',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
    if (type === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="word inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }
    return children;
  };

  return (
    <Component
      ref={containerRef as any}
      className={`${className}`}
      style={{ perspective: '1000px' }}
    >
      {splitText()}
    </Component>
  );
}

// Simple fade up text
export function FadeUpText({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Stagger container for children
export function StaggerContainer({
  children,
  className = '',
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;
    gsap.set(children, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: stagger,
          delay: delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
