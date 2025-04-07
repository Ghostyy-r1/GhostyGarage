
import { motion } from 'framer-motion';

export const GhostSvg = ({ className, delay = 0, size = 100, ghostIndex = 0 }: { 
  className?: string; 
  delay?: number;
  size?: number;
  ghostIndex?: number;
}) => {
  const ghostImages = [
    '/assets/ghostyy1.png',
    '/assets/ghostyy2.png',
    '/assets/ghostyy3.png',
    '/assets/particles.png'
  ];

  const imageToUse = ghostIndex >= 0 && ghostIndex < ghostImages.length 
    ? ghostImages[ghostIndex] 
    : ghostImages[Math.floor(Math.random() * ghostImages.length)];

  return (
    <motion.img
      src={imageToUse}
      className={className}
      style={{ 
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.6))',
        objectFit: 'contain'
      }}
      initial={{ opacity: 0.3, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
