import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'scale';
type AnimationVariant = 'fade' | 'slide' | 'bounce' | 'zoom' | 'flip';

interface AnimatedRevealProps {
  children: ReactNode;
  direction?: AnimationDirection; 
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function AnimatedReveal({
  children,
  direction = 'up',
  variant = 'fade',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className,
  once = true,
}: AnimatedRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  // Define variants for different animation types
  const upVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const downVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const leftVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const rightVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const scaleVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const zoomVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const flipVariants = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Select the appropriate variant based on direction and type
  const getVariant = () => {
    if (variant === 'zoom') return zoomVariants;
    if (variant === 'flip') return flipVariants;
    if (variant === 'fade' && direction !== 'up' && direction !== 'down' && 
        direction !== 'left' && direction !== 'right' && direction !== 'scale') {
      return fadeVariants;
    }

    // For directional variants
    switch (direction) {
      case 'up': return upVariants;
      case 'down': return downVariants;
      case 'left': return leftVariants;
      case 'right': return rightVariants;
      case 'scale': return scaleVariants;
      default: return upVariants;
    }
  };

  // Get transition properties based on variant
  const getTransition = () => {
    const baseTransition = {
      duration,
      delay,
      ease: 'easeOut',
    };

    if (variant === 'bounce') {
      return {
        ...baseTransition,
        type: 'spring',
        bounce: 0.5,
      };
    }

    return baseTransition;
  };

  const selectedVariant = getVariant();

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={getTransition()}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}