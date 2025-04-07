import { ChevronRight, Bike, Users, Calendar, MapPin, Wrench, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GhostSvg } from '@/components/ui/ghost-svg';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useRef, useEffect } from 'react';
import { ThreeDCard } from '@/components/ui/3d-card';
import { AnimatedReveal } from '@/components/ui/animated-reveal';

export function HeroSection() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const ghosts = [
    // Top row
    {
      id: 'ghost1-top-left',
      size: 90,
      initialPosition: { x: '8%', y: '12%' },
      ghostIndex: 0,
      delay: 0.2,
      duration: 4.0,
      opacity: 0.85,
      zIndex: 10,
    },
    {
      id: 'ghost2-top-center',
      size: 85,
      initialPosition: { x: '40%', y: '8%' },
      ghostIndex: 1,
      delay: 0.5,
      duration: 3.8,
      opacity: 0.8,
      zIndex: 9,
    },
    {
      id: 'ghost3-top-right',
      size: 95,
      initialPosition: { x: '75%', y: '15%' },
      ghostIndex: 2,
      delay: 0.7,
      duration: 4.2,
      opacity: 0.9,
      zIndex: 8,
    },
    // Middle row
    {
      id: 'ghost4-mid-left',
      size: 100,
      initialPosition: { x: '12%', y: '42%' },
      ghostIndex: 0,
      delay: 1.0,
      duration: 4.5,
      opacity: 0.85,
      zIndex: 12,
    },
    {
      id: 'ghost5-mid-right',
      size: 110,
      initialPosition: { x: '88%', y: '48%' },
      ghostIndex: 1,
      delay: 0.3,
      duration: 4.3,
      opacity: 0.9,
      zIndex: 11,
    },
    // Bottom row
    {
      id: 'ghost6-bottom-left',
      size: 95,
      initialPosition: { x: '12%', y: '75%' },
      ghostIndex: 2,
      delay: 0.8,
      duration: 3.9,
      opacity: 0.8,
      zIndex: 7,
    },
    {
      id: 'ghost7-bottom-center',
      size: 85,
      initialPosition: { x: '45%', y: '80%' },
      ghostIndex: 0,
      delay: 0.4,
      duration: 4.1,
      opacity: 0.75,
      zIndex: 6,
    },
    {
      id: 'ghost8-bottom-right',
      size: 90,
      initialPosition: { x: '88%', y: '78%' },
      ghostIndex: 1,
      delay: 0.6,
      duration: 4.0,
      opacity: 0.85,
      zIndex: 7,
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden min-h-[95vh] flex items-center bg-gradient-to-b from-purple-900/20 via-black to-black px-4 sm:px-6 lg:px-8 z-0"
    >
      {/* Ghost background container with padding to prevent cutoff */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 p-16">
        {ghosts.map((ghost) => (
          <motion.div
            key={ghost.id}
            className="absolute"
            style={{
              left: ghost.initialPosition.x,
              top: ghost.initialPosition.y,
              zIndex: ghost.zIndex || 1,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [ghost.opacity * 0.8, ghost.opacity, ghost.opacity * 0.8],
              y: [0, -15 - Math.random() * 10, 0],
              x: [0, Math.random() * 10 - 5, 0],
              scale: [1, 1 + Math.random() * 0.15, 1],
              rotate: [0, Math.random() * 6 - 3, 0],
            }}
            transition={{
              duration: ghost.duration,
              ease: "easeInOut",
              delay: ghost.delay,
              repeat: Infinity,
              y: {
                duration: ghost.duration * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <GhostSvg
              size={ghost.size}
              ghostIndex={ghost.ghostIndex}
              className="drop-shadow-[0_0_30px_rgba(168,85,247,0.95)] brightness-110 hover:brightness-125 transition-all duration-500 backdrop-blur-sm will-change-transform"
            />
          </motion.div>
        ))}
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/50 pointer-events-none z-[1]" />

      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black pointer-events-none" />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(150, 120, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(150, 120, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Additional animated blobs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-1/4 w-[300px] h-[300px] blur-3xl rounded-full bg-purple-600/20 pointer-events-none"
        style={{ mixBlendMode: 'plus-lighter' }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-40 left-1/4 w-[400px] h-[400px] blur-3xl rounded-full bg-indigo-600/20 pointer-events-none"
        style={{ mixBlendMode: 'plus-lighter' }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.9, 1.3, 0.9],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/3 right-20 w-[350px] h-[350px] blur-3xl rounded-full bg-purple-500/20 pointer-events-none"
        style={{ mixBlendMode: 'plus-lighter' }}
      />

      {/* Background ghost layer that appears above grid but below content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
        {[
          { x: '82%', y: '28%', size: 180, ghostIndex: 0, delay: 0.8, duration: 4 },
          { x: '18%', y: '68%', size: 160, ghostIndex: 1, delay: 1.2, duration: 3.5 },
          { x: '92%', y: '72%', size: 140, ghostIndex: 2, delay: 0.5, duration: 4.2 },
          { x: '28%', y: '32%', size: 130, ghostIndex: 0, delay: 1.5, duration: 3.8 },
          { x: '60%', y: '52%', size: 150, ghostIndex: 1, delay: 0.3, duration: 4.5 }
        ].map((ghost, index) => (
          <motion.div
            key={`bg-ghost-${index}`}
            className="absolute"
            style={{
              left: ghost.x,
              top: ghost.y,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: ghost.duration,
              ease: "easeInOut",
              delay: ghost.delay,
              repeat: Infinity,
            }}
          >
            <GhostSvg
              size={ghost.size}
              ghostIndex={ghost.ghostIndex}
              className="opacity-40 hover:opacity-60 transition-opacity duration-300"
            />
          </motion.div>
        ))}
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto relative z-20 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative space-y-8">
            {/* Background blobs scattered around */}
            <div className="absolute -left-20 top-10 w-[300px] h-[300px] blur-3xl rounded-full bg-purple-600/20 animate-blob" />
            <div className="absolute left-40 -top-20 w-[400px] h-[400px] blur-3xl rounded-full bg-indigo-600/15 animate-blob animation-delay-2000" />
            <div className="absolute right-20 top-0 w-[350px] h-[350px] blur-3xl rounded-full bg-purple-500/20 animate-blob animation-delay-4000" />
            <div className="absolute -right-40 bottom-0 w-[450px] h-[450px] blur-3xl rounded-full bg-indigo-500/15 animate-blob animation-delay-3000" />
            <div className="absolute left-0 bottom-20 w-[250px] h-[250px] blur-3xl rounded-full bg-purple-700/20 animate-blob animation-delay-5000" />
            <div className="absolute right-40 bottom-40 w-[320px] h-[320px] blur-3xl rounded-full bg-indigo-700/15 animate-blob animation-delay-1000" />
            <AnimatedReveal variant="fade" direction="up" delay={0.2}>
              <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 rounded-full">
                <span className="text-sm font-medium text-white">Welcome to Ghosty's Garage</span>
              </div>
            </AnimatedReveal>

            <AnimatedReveal variant="fade" direction="up" delay={0.3}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-white">The Ultimate</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 inline-block">
                  Motorcycle Community
                </span>
              </h1>
            </AnimatedReveal>

            <AnimatedReveal variant="fade" direction="up" delay={0.4}>
              <p className="text-xl text-gray-300 max-w-lg">
                Connect with fellow riders, discover new routes, show off your bike, and find the best gear. All in one place!
              </p>
            </AnimatedReveal>

            <AnimatedReveal variant="fade" direction="up" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="relative group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 h-12 text-base font-medium overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Join Community
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all duration-700" />
                  </span>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-700"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-purple-700 text-white hover:bg-purple-900/30 h-12 text-base font-medium relative overflow-hidden"
                  onClick={() => {
                    const productsSection = document.getElementById('products');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center w-full">
                    Explore Products
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-all duration-700" />
                  </span>
                  <div className="absolute inset-0 ring-2 ring-purple-500/50 rounded-lg animate-pulse-border"></div>
                  <style jsx>{`
                    @keyframes pulse-border {
                      0%, 100% { opacity: 0.3; }
                      50% { opacity: 0.8; }
                    }
                    .animate-pulse-border {
                      animation: pulse-border 2s ease-in-out infinite;
                    }
                  `}</style>
                </Button>
              </div>
            </AnimatedReveal>
          </div>

          <AnimatedReveal variant="fade" direction="up" delay={0.6} className="relative md:ml-auto">
            <ThreeDCard 
              glareEnabled={true} 
              rotationIntensity={15}
              glareColor="rgba(168, 85, 247, 0.5)"
              className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <FeatureCard 
                  icon={<Bike className="h-10 w-10 text-purple-400" />}
                  title="Motorcycle Showcase"
                  description="Show off your ride and discover others"
                  delay={0.7}
                />
                <FeatureCard 
                  icon={<MapPin className="h-10 w-10 text-purple-400" />}
                  title="Route Planner"
                  description="Find and share the best riding roads"
                  delay={0.8}
                />
                <FeatureCard 
                  icon={<Calendar className="h-10 w-10 text-purple-400" />}
                  title="Events Calendar"
                  description="Never miss a ride or meetup"
                  delay={0.9}
                />
                <FeatureCard 
                  icon={<Wrench className="h-10 w-10 text-purple-400" />}
                  title="Maintenance Tracker"
                  description="Keep your bike in top condition"
                  delay={1.0}
                />
              </div>
            </ThreeDCard>

            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -top-6 -left-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full py-3 px-6 shadow-lg transform"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-white" />
                <span className="font-bold text-white">Join 10,000+ riders</span>
              </div>
            </motion.div>
          </AnimatedReveal>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.8, 0.5, 0.8] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-gray-400 text-sm mb-2 group-hover:text-purple-400 transition-colors">Scroll to explore</span>
        <motion.div 
          className="bg-gray-800/50 rounded-full p-2 border border-gray-700 group-hover:border-purple-500 transition-all"
          whileHover={{ 
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
          }}
        >
          <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
        </motion.div>
      </motion.button>

      {/* Layered bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
        transition: { duration: 0.2 }
      }}
      className="bg-gray-900/60 backdrop-blur-md rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}