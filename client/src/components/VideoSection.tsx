import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VIDEO_URL = "https://www.youtube.com/embed/YOUR_VIDEO_ID"; // Replace with your video ID

export function VideoSection() {
  const videoRef = React.useRef<HTMLIFrameElement>(null);
  const [gradientColors, setGradientColors] = React.useState(['rgba(139, 92, 246, 0.5)', 'rgba(79, 70, 229, 0.5)']);
  const [isHovered, setIsHovered] = React.useState(false);

  // Function to generate random colors
  const generateRandomColors = () => {
    const purpleGradient = [
      [139, 92, 246], // Purple light
      [91, 33, 182]   // Purple dark
    ];

    return [
      `rgba(${purpleGradient[0][0]}, ${purpleGradient[0][1]}, ${purpleGradient[0][2]}, ${isHovered ? 0.8 : 0.5})`,
      `rgba(${purpleGradient[1][0]}, ${purpleGradient[1][1]}, ${purpleGradient[1][2]}, ${isHovered ? 0.8 : 0.5})`
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
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="section-grid absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] backdrop-blur-lg" /> {/* Added backdrop-blur */}
      <div className="gradient-blur absolute inset-0 bg-gradient-radial from-purple-600/10 via-purple-900/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Added z-10 for better layering */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-white mb-6 tracking-tight"
          > {/* Increased font size */}
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Ghosty's Garage</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-12"
          > {/* Increased font size and lighter gray */}
            Watch our welcome message and see what we're all about
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            padding: '2px',
            background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
            transition: 'all 0.5s ease',
            boxShadow: isHovered ? `0 0 30px ${gradientColors[0]}` : 'none',
          }}
        >
          <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden group">
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
              className="absolute inset-0 w-full h-full rounded-3xl z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}