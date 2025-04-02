import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Announcement {
  id: number;
  message: string;
  link?: string;
  linkText?: string;
  color: 'purple' | 'blue' | 'red' | 'green';
}

const announcements: Announcement[] = [
  {
    id: 1,
    message: '🔥 New merch drop! Limited edition R1M shirts available now.',
    link: '/merch',
    linkText: 'Shop Now',
    color: 'purple'
  },
  {
    id: 2,
    message: '🏍️ Join our Summer Ride Series starting next weekend!',
    link: '/events',
    linkText: 'View Events',
    color: 'blue'
  },
  {
    id: 3,
    message: '🛠️ Maintenance workshop this Thursday - spots still available!',
    link: '/events',
    linkText: 'RSVP',
    color: 'green'
  }
];

const colorVariants = {
  purple: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
  blue: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
  red: 'bg-gradient-to-r from-red-600 to-orange-600 text-white',
  green: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
};

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  
  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (!visible || announcements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [visible]);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };
  
  if (isDismissed || announcements.length === 0) return null;
  
  const announcement = announcements[currentIndex];
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className={`w-full ${colorVariants[announcement.color]} relative overflow-hidden`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto py-2 px-4 relative">
            <div className="flex items-center justify-center">
              {announcements.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute left-2 h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              
              <motion.div 
                key={announcement.id}
                className="text-center flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-sm"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span>{announcement.message}</span>
                {announcement.link && (
                  <a 
                    href={announcement.link} 
                    className="font-medium underline hover:text-white/90 transition-colors"
                  >
                    {announcement.linkText || 'Learn More'}
                  </a>
                )}
              </motion.div>
              
              {announcements.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-8 h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Indicator dots for multiple announcements */}
          {announcements.length > 1 && (
            <div className="flex justify-center gap-1 pb-1">
              {announcements.map((_, i) => (
                <span 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}