import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { MOTION } from '@/lib/motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds (stagger helper) */
  delay?: number;
};

const viewport = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -10% 0px',
} as const;

const transition = {
  duration: MOTION.durationMd,
  ease: MOTION.ease,
};

/**
 * Scroll-triggered fade + slight lift. Renders a plain div when reduced motion is preferred.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: MOTION.liftY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...transition, delay }}
    >
      {children}
    </motion.div>
  );
}
