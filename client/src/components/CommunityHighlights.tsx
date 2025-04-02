import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HighlightCardProps {
  category: string;
  title: string;
  description: string;
  delay: number;
}

const HighlightCard = ({ category, title, description, delay }: HighlightCardProps) => (
  <motion.div 
    className="overflow-hidden rounded-xl shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="p-4 bg-[#2D2D2D]">
      <span className="inline-block bg-primary bg-opacity-20 rounded-full px-3 py-1 text-sm font-semibold text-primary mb-2">
        {category}
      </span>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-gray-400 text-sm mt-1">{description}</p>
    </div>
  </motion.div>
);

export function CommunityHighlights() {
  const highlights = [
    {
      category: "Event",
      title: "Monthly Mountain Ride",
      description: "Our monthly mountain road adventure with over 50 riders from across the state.",
      delay: 0.1
    },
    {
      category: "Workshop",
      title: "Tech Talk: Motorcycle Maintenance",
      description: "Learning essential maintenance skills from our experienced mechanics.",
      delay: 0.2
    },
    {
      category: "Charity",
      title: "Annual Charity Ride",
      description: "Our biggest event of the year raised over $10,000 for local children's hospital.",
      delay: 0.3
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white">Community Highlights</h2>
          <p className="mt-4 text-xl text-gray-400">Showcasing our amazing members and events</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              category={highlight.category}
              title={highlight.title}
              description={highlight.description}
              delay={highlight.delay}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="bg-transparent hover:bg-primary text-primary hover:text-white font-semibold py-2 px-6 border border-primary hover:border-transparent rounded-lg transition duration-300"
          >
            View All Highlights
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
