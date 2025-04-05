
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Timer } from 'lucide-react';

export function GhostyUpdates() {
  const updates = [
    {
      title: "Spring Ride Schedule is Live",
      date: "March 2024"
    },
    {
      title: "Now Accepting Build Slots for May",
      date: "Limited Availability"
    }
  ];

  return (
    <section className="py-12 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {updates.map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Timer className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{update.title}</h3>
                    <p className="text-gray-400 mt-1">{update.date}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
