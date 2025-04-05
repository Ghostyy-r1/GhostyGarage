
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as Vibrant from 'node-vibrant';

export function VideoSection() {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gradientColors, setGradientColors] = useState(['rgba(139, 92, 246, 0.5)', 'rgba(79, 70, 229, 0.5)']);

  const extractColorsFromVideo = async (videoElement: HTMLVideoElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0);

    try {
      const palette = await Vibrant.from(canvas.toDataURL()).getPalette();
      const colors = [
        palette.Vibrant?.getRgb(),
        palette.LightVibrant?.getRgb(),
        palette.DarkVibrant?.getRgb(),
      ].filter(Boolean) as number[][];

      setGradientColors(colors.map(rgb => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`));
    } catch (error) {
      console.error('Error extracting colors:', error);
    }
  };

  useEffect(() => {
    const videoElement = document.createElement('video');
    videoElement.crossOrigin = 'anonymous';
    videoElement.src = 'YOUR_VIDEO_URL'; // Replace with your video URL

    videoElement.addEventListener('loadeddata', () => {
      const interval = setInterval(() => {
        extractColorsFromVideo(videoElement);
      }, 1000);

      return () => clearInterval(interval);
    });

    return () => {
      videoElement.remove();
    };
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      <canvas ref={canvasRef} className="hidden" />
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
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl group-hover:blur-2xl transition duration-1000 group-hover:opacity-75 opacity-50 animate-gradient-xy"
              style={{
                background: `linear-gradient(45deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                filter: 'blur(20px)',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
            <iframe
              ref={videoRef}
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
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
