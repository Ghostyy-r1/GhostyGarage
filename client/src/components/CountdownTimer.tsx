
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeUnit {
  value: number;
  label: string;
}

export function CountdownTimer() {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { value: 6, label: 'DAYS' },
    { value: 14, label: 'HOURS' },
    { value: 23, label: 'MINUTES' }
  ]);

  // Animated flip effect for numbers
  const FlipNumber = ({ number }: { number: number }) => (
    <div className="relative w-16 h-20 bg-black rounded-lg overflow-hidden border border-purple-500/20">
      <motion.div
        key={number}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white"
      >
        {String(number).padStart(2, '0')}
      </motion.div>
    </div>
  );

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Ghosty merch collection drop</h2>
        </div>
        
        <div className="flex justify-center gap-8">
          {timeUnits.map((unit, index) => (
            <div key={index} className="text-center">
              <FlipNumber number={unit.value} />
              <div className="mt-2 text-sm font-medium text-gray-400">{unit.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
