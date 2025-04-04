import { ChevronRight, Bike, Users, Calendar, MapPin, Wrench, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  // Particles state
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    color: string;
  }>>([]);

  // Generate particles on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.8,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 100 + 150)}, ${Math.random() * 0.3 + 0.1})`
      }));
      setParticles(newParticles);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden min-h-[95vh] flex items-center bg-gradient-to-b from-purple-900/40 via-[#0c0920] to-black px-4 sm:px-6 lg:px-8"
      style={{ position: 'relative' }}
    >
      {/* Animated blob particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute blur-2xl rounded-full pointer-events-none"
          style={{
            width: particle.size * 3,
            height: particle.size * 3,
            background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
              rgba(168, 85, 247, ${0.2 + (Math.random() * 0.2)}) 0%,
              rgba(147, 51, 234, ${0.15 + (Math.random() * 0.15)}) 50%,
              rgba(88, 28, 135, ${0.1 + (Math.random() * 0.1)}) 100%)`,
            x: particle.x,
            y: particle.y,
            mixBlendMode: 'plus-lighter',
            filter: 'brightness(1.2) contrast(1.2)',
          }}
          animate={{
            y: [particle.y, particle.y - 200, particle.y],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + particle.speed * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Background gradient elements with animated blobs */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <svg width="0" height="0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>
        <div className="absolute inset-0" style={{ filter: 'url(#goo)' }}>
          {Array.from({ length: 17 }).map((_, i) => {
            const initialSize = i > 11 ? 120 + (Math.random() * 60) : 80 + (Math.random() * 40);
            const randomStartX = Math.random() * 100;
            const randomStartY = i > 11 ? Math.random() * 80 + 10 : 120; // Distribute new blobs across the height
            const cycleDelay = i * (20 / 17);
            const cycleDuration = i > 11 ? 25 + (Math.random() * 15) : 20 + (Math.random() * 10);
            const customPath = i > 11 ? [
              [randomStartX, randomStartY],
              [(randomStartX + 40) % 100, randomStartY - 30],
              [(randomStartX + 80) % 100, randomStartY + 30],
              [(randomStartX + 120) % 100, randomStartY - 20],
              [randomStartX, randomStartY]
            ] : [
              [randomStartX, 120],
              [(randomStartX + 30) % 100, 70],
              [(randomStartX + 60) % 100, 20],
              [(randomStartX + 90) % 100, 70],
              [randomStartX, 120]
            ];
            
            return (
              <motion.div
                key={`blob-${i}`}
                initial={{
                  x: `${randomStartX}%`,
                  y: '120%',
                  scale: 0.3,
                  opacity: 0.1
                }}
                animate={{
                  scale: [0.3, 1.4, 1.8, 1.2, 0.3],
                  opacity: [0.2, 0.5, 0.6, 0.4, 0.2],
                  x: customPath.map(([x]) => `${x}%`),
                  y: customPath.map(([, y]) => `${y}%`)
                }}
                transition={{
                  duration: cycleDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: cycleDelay,
                  times: [0, 0.25, 0.5, 0.75, 1]
                }}
                className="absolute pointer-events-none origin-center"
                style={{
                  width: initialSize,
                  height: initialSize,
                  background: `radial-gradient(circle at 50% 50%, 
                    rgba(147, 51, 234, ${0.3 + (Math.random() * 0.2)}) 0%,
                    rgba(88, 28, 135, ${0.2 + (Math.random() * 0.1)}) 100%)`,
                  borderRadius: '50%',
                  mixBlendMode: 'plus-lighter',
                  filter: 'brightness(1.2) contrast(1.2)',
                  zIndex: i,
                  backdropFilter: 'blur(12px)'
                }}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
        {Array.from({ length: 15 }).map((_, i) => {
          const borderRadius = Array.from({ length: 4 }, () => Math.floor(Math.random() * 70 + 30)).join('% ') + '%';
          return (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0.5
              }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
                y: ["-10%", "110%"],
                x: ["-10%", "110%"]
              }}
              transition={{
                duration: Math.random() * 15 + 25,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              className="absolute blur-3xl pointer-events-none"
              style={{
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(168, 85, 247, 0.2) 0%, rgba(88, 28, 135, 0.1) 100%)`,
                borderRadius,
                mixBlendMode: 'plus-lighter',
              }}
            />
          );
        })}
      </div>

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

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative space-y-8">
            {/* Animated lava lamp blobs */}
            {Array.from({ length: 6 }).map((_, i) => {
              const size = 300 + Math.random() * 200;
              const duration = 15 + Math.random() * 10;
              const delay = i * 2;
              
              return (
                <motion.div
                  key={`hero-blob-${i}`}
                  className="absolute blur-3xl rounded-full pointer-events-none"
                  style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, ${0.15 + (Math.random() * 0.1)}) 0%, rgba(79, 70, 229, ${0.1 + (Math.random() * 0.05)}) 100%)`,
                    filter: 'brightness(1.2) contrast(1.2)',
                    mixBlendMode: 'plus-lighter',
                  }}
                  initial={{ 
                    x: `${Math.random() * 100}%`,
                    y: '120%',
                    scale: 0.8,
                    opacity: 0.1
                  }}
                  animate={{
                    x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    y: ['120%', '0%', '120%'],
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                    times: [0, 0.5, 1]
                  }}
                />
              );
            })}
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

      {/* Scroll indicator - now a clickable button */}
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
          // Get the next section (features or whatever comes after hero)
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