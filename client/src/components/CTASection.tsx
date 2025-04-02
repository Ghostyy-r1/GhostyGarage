import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-primary bg-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Join Our Community?
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Connect with fellow riders, join exciting events, and be part of something special. Ghosty's Garage welcomes riders of all experience levels.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            size="lg"
          >
            Join the Community
          </Button>
          <Button 
            variant="outline"
            className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300"
            size="lg"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
