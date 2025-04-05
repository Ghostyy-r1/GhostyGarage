import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Vibrant from 'node-vibrant';

const VIDEO_URL = "https://www.youtube.com/embed/YOUR_VIDEO_ID"; // Replace with your video ID

export function VideoSection() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradientColors, setGradientColors] = useState<string[]>(['rgba(139, 92, 246, 0.5)', 'rgba(79, 70, 229, 0.5)']);

  const extractColorsFromImage = async (imageUrl: string) => {
    try {
      const palette = await Vibrant.from(imageUrl).getPalette();
      const colors = [
        palette.Vibrant?.getRgb(),
        palette.LightVibrant?.getRgb(),
        palette.DarkVibrant?.getRgb(),
      ].filter(Boolean) as number[][];

      if (colors.length > 0) {
        setGradientColors(colors.map(rgb => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`));
      }
    } catch (error) {
      console.error('Error extracting colors:', error);
    }
  };

  useEffect(() => {
    // Extract colors from video thumbnail
    try {
      const urlParams = new URLSearchParams(new URL(VIDEO_URL).search);
      const videoId = urlParams.get('v') || VIDEO_URL.split('/').pop();
      if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        extractColorsFromImage(thumbnailUrl).catch(console.error);
      }
    } catch (error) {
      console.error('Error parsing video URL:', error);
      setGradientColors(['rgba(139, 92, 246, 0.5)', 'rgba(79, 70, 229, 0.5)']);
    }
  }, []);

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
          style={{
            padding: '1px',
            background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
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