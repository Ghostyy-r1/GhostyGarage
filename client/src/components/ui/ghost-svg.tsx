import { motion } from 'framer-motion';

export const GhostSvg = ({ className, delay = 0 }: { className?: string; delay?: number }) => {
  const ghostImages = [
    '/assets/ghostyy1.png',
    '/assets/ghostyy2.png',
    '/assets/ghostyy3.png',
  ];
    `<path d="M50 20c0-11-9-20-20-20S10 9 10 20v25c0 2.8-2.2 5-5 5s-5-2.2-5-5V30c0-1.1 0.9-2 2-2s2 0.9 2 2v15c0 0.6 0.4 1 1 1s1-0.4 1-1V20C6 7.3 16.3-3 29-3s23 10.3 23 23v25c0 0.6 0.4 1 1 1s1-0.4 1-1V30c0-1.1 0.9-2 2-2s2 0.9 2 2v15c0 2.8-2.2 5-5 5s-5-2.2-5-5V20z M20 15c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z M35 15c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z"></path>`,
    `<path d="M25,5 C15,5 7,13 7,23 L7,45 C7,48 4,50 1,50 C-2,50 -2,47 0,45 L8,37 C10,35 8,33 6,35 L-2,43 C-4,45 -4,49 -2,51 C0,53 3,53 5,51 L13,43 C15,41 17,43 15,45 L7,53 C3,57 -3,57 -7,53 C-11,49 -11,43 -7,39 L1,31 C5,27 11,27 15,31 C19,35 19,41 15,45 L14,46 C12,48 12,50 14,52 C16,54 18,54 20,52 L21,51 C27,45 27,36 21,30 C15,24 6,24 0,30 L-8,38"></path>`,
    `<path d="M30,10 C20,10 12,18 12,28 L12,50 C12,53 9,55 6,55 C3,55 3,52 5,50 L13,42 C15,40 13,38 11,40 L3,48 C1,50 1,54 3,56 C5,58 8,58 10,56 L18,48 C20,46 22,48 20,50 L12,58 C8,62 2,62 -2,58 C-6,54 -6,48 -2,44 L6,36 C10,32 16,32 20,36 C24,40 24,46 20,50 L19,51 C17,53 17,55 19,57 C21,59 23,59 25,57 L26,56 C32,50 32,41 26,35 C20,29 11,29 5,35 L-3,43"></path>`
  ];

  const randomVariant = variants[Math.floor(Math.random() * variants.length)];

  const randomImage = ghostImages[Math.floor(Math.random() * ghostImages.length)];
  
  return (
    <motion.img
      src={randomImage}
      className={className}
      initial={{ y: 0, opacity: 0.3, scale: 0.8 }}
      animate={{ 
        y: [-10, 10, -10],
        opacity: [0.3, 0.7, 0.3],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ 
        filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.6))',
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  );
};