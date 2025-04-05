
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tool, Shield, Calendar, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';

const tips = [
  {
    type: 'Tech Tip',
    Icon: Tool,
    content: 'Always torque your bolts to spec - overtightening can be just as dangerous as undertightening.',
  },
  {
    type: 'Safety Reminder',
    Icon: Shield,
    content: 'Never work under a motorcycle supported only by its side stand. Always use a proper lift or stand.',
  },
  {
    type: 'Myth Busted',
    Icon: Calendar,
    content: 'Premium gas doesn\'t always mean better performance. Use the octane rating recommended for your bike.',
  }
];

export function WrenchWisdom() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 10000); // Change tip every 10 seconds

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = tips[currentTip].Icon;

  return (
    <section className="py-12 bg-gray-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">🔧 Wrench Wisdom</h2>
          <p className="text-gray-400 mt-2">Daily tips from the garage</p>
        </div>

        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <CurrentIcon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider mb-2">
                  {tips[currentTip].type}
                </h3>
                <p className="text-gray-200 text-lg">
                  {tips[currentTip].content}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-500/10">
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
