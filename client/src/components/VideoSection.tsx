import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VIDEO_URL = "https://www.youtube.com/embed/YOUR_VIDEO_ID"; // Replace with your video ID

export function VideoSection() {
  const videoRef = React.useRef<HTMLIFrameElement>(null);
  const [gradientColors, setGradientColors] = React.useState(['rgba(139, 92, 246, 0.5)', 'rgba(79, 70, 229, 0.5)']);
  const [isHovered, setIsHovered] = React.useState(false);

  // Function to generate random colors
  const generateRandomColors = () => {
    const colors = [
      [139, 92, 246], // Purple
      [79, 70, 229],  // Indigo
      [239, 68, 68],  // Red
      [34, 197, 94],  // Green
      [234, 179, 8],  // Yellow
      [14, 165, 233], // Blue
    ];
    
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];
    while (color1 === color2) {
      color2 = colors[Math.floor(Math.random() * colors.length)];
    }

    return [
      `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, ${isHovered ? 0.8 : 0.5})`,
      `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, ${isHovered ? 0.8 : 0.5})`
    ];
  };

  useEffect(() => {
    // Change colors periodically
    const interval = setInterval(() => {
      setGradientColors(generateRandomColors());
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-6 tracking-tight"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Ghosty's Garage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Watch our welcome message and see what we're all about
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '2px',
            background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            transition: 'all 0.5s ease',
            boxShadow: isHovered ? `0 0 30px ${gradientColors[0]}` : 'none',
          }}
        >
          <div className="relative w-full h-full bg-black rounded-xl overflow-hidden group">
            <div 
              className="absolute -inset-1 blur-xl group-hover:blur-2xl transition duration-1000 group-hover:opacity-75 opacity-50 animate-gradient-xy"
              style={{
                background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                filter: 'blur(20px)',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
            <iframe
              ref={videoRef}
              src={VIDEO_URL}
              title="Welcome to Ghosty's Garage"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-xl z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}