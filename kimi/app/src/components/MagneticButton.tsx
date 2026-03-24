import { useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  onClick?: (e?: React.MouseEvent | React.FormEvent) => void;
  magneticStrength?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function MagneticButton({
  children,
  className,
  variant = 'default',
  size = 'default',
  onClick,
  magneticStrength = 0.3,
  disabled = false,
  type = 'button',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      type={type}
      className={cn(
        'magnetic-btn relative overflow-hidden transition-all duration-300',
        variant === 'default' && 'bg-[#C45C3E] hover:bg-[#B54D30] text-white shadow-primary',
        variant === 'outline' && 'border-2 border-[#C45C3E] text-[#C45C3E] hover:bg-[#C45C3E] hover:text-white',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
