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
      className="relative overflow-hidden min-h-[95vh] flex items-center bg-gradient-to-b from-gray-900 via-[#0c0920] to-transparent px-4 sm:px-6 lg:px-8"
      style={{ position: 'relative' }}
    >
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            x: particle.x,
            y: particle.y,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          animate={{
            y: [particle.y, particle.y + 100, particle.y],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            duration: 3 + particle.speed * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
          className="absolute -top-[30%] -left-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-r from-purple-800/30 to-indigo-900/30 blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className="absolute -bottom-[40%] -right-[10%] w-[60%] h-[80%] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-800/30 blur-3xl"
        />
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
          <div className="space-y-8">
            <AnimatedReveal variant="fade" direction="up" delay={0.2}>
              <div className="inline-block bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md border border-purple-500/30 px-4 py-1.5 rounded-full">
                <span className="text-sm font-medium text-white">Welcome to Ghosty's Garage</span>
              </div>
            </AnimatedReveal>

            <AnimatedReveal variant="fade" direction="up" delay={0.3}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                <span className="text-white">The Ultimate</span>
                <br />
                <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 inline-block relative">
                  Motorcycle Community
                </div>
              </motion.h1>
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
                  <div className="absolute -inset-[3px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700 animate-glow"></div>
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-lg opacity-70 group-hover:opacity-100 transition-all duration-700"></div>
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
                    <ChevronRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 animate-bounce-x" />
                  </span>
                  <div className="absolute inset-0 border-2 border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:shadow-glow"></div>
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