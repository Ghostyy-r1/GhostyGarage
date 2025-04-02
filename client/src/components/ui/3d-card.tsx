import { useState, useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  rotationIntensity?: number;
  borderRadius?: number;
  glareColor?: string;
}

export function ThreeDCard({
  children,
  className,
  glareEnabled = true,
  rotationIntensity = 20,
  borderRadius = 20,
  glareColor = 'rgba(255, 255, 255, 0.4)',
}: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalize from -1 to 1
    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;
    
    // Set rotation (invert Y axis for natural movement)
    setRotateX(-normalizedY * rotationIntensity);
    setRotateY(normalizedX * rotationIntensity);
    
    // Update glare position
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        transformStyle: 'preserve-3d',
        borderRadius: `${borderRadius}px`,
      }}
      animate={{
        rotateX,
        rotateY,
        transition: { type: 'spring', stiffness: 300, damping: 30 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {glareEnabled && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 50%)`,
            borderRadius: `${borderRadius}px`,
          }}
        />
      )}
    </motion.div>
  );
}