
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Shield, CalendarDays, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';

const tips = [
  {
    type: 'Tech Tip',
    Icon: Wrench,
    content: 'Always torque your bolts to spec - overtightening can be just as dangerous as undertightening.',
  },
  {
    type: 'Safety Reminder',
    Icon: Shield,
    content: 'Never work under a motorcycle supported only by its side stand. Always use a proper lift or stand.',
  },
  {
    type: 'Myth Busted',
    Icon: CalendarDays,
    content: 'Premium gas doesn\'t always mean better performance. Use the octane rating recommended for your bike.',
  }
];

export function WrenchWisdom() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = tips[currentTip].Icon;

  return (
    <section className="py-16 bg-black/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4"
          >
            DAILY WISDOM
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">🔧 Wrench Wisdom</h2>
          <p className="text-gray-400 mt-2">Expert tips from the garage</p>
        </div>

        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 p-8 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-purple-500/10 rounded-xl">
                <CurrentIcon className="w-8 h-8 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-3">
                  {tips[currentTip].type}
                </h3>
                <p className="text-gray-200 text-xl leading-relaxed">
                  {tips[currentTip].content}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-purple-500/10">
              <a 
                href="#discord"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Join our Discord for more tips
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
