
import { motion } from 'framer-motion';

const ghostImages = [
  "/ghost1.png",
  "/ghost2.png", 
  "/ghost3.png"
];

export function GhostSvg({ size = 40, className = '', ghostIndex = 0 }) {
  return (
    <motion.div className={`relative ${className}`}>
      <img 
        src={ghostImages[ghostIndex % 3]}
        width={size}
        height={size}
        alt="Ghost"
        className="will-change-transform"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.4))'
        }}
      />
      
      {/* Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-300/50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.3, 0.7, 0.3],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
}
