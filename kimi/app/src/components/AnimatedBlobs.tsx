import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BlobConfig {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}

const defaultBlobs: BlobConfig[] = [
  { color: 'from-[#C45C3E] to-[#E07A5F]', size: 400, x: '10%', y: '20%', delay: 0 },
  { color: 'from-[#2D8A5E] to-[#4CAF7C]', size: 350, x: '70%', y: '60%', delay: -2 },
  { color: 'from-[#F2CC8F] to-[#E07A5F]', size: 300, x: '80%', y: '10%', delay: -4 },
];

export function AnimatedBlobs({ 
  blobs = defaultBlobs,
  className = '',
}: { 
  blobs?: BlobConfig[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blobElements = container.querySelectorAll('.blob');
    
    blobElements.forEach((blob, index) => {
      const config = blobs[index];
      
      gsap.to(blob, {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        scale: 'random(0.9, 1.1)',
        duration: 'random(8, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: config.delay,
      });
    });
  }, [blobs]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`blob absolute rounded-full bg-gradient-to-br ${blob.color}`}
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            filter: 'blur(80px)',
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

// Simpler floating orbs for sections
export function FloatingOrbs({ count = 5 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full float-element"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 
              ? 'linear-gradient(135deg, rgba(196, 92, 62, 0.1), rgba(196, 92, 62, 0.05))'
              : 'linear-gradient(135deg, rgba(45, 138, 94, 0.1), rgba(45, 138, 94, 0.05))',
            filter: 'blur(40px)',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`,
          }}
        />
      ))}
    </div>
  );
}
