import { motion } from "framer-motion";
import { FaDiscord, FaShoppingCart, FaMotorcycle } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  href: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, linkText, href, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card className="bg-[#2D2D2D] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800 h-full">
      <CardContent className="p-0">
        <div className="text-primary text-4xl mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
        <div className="mt-6">
          <a href={href} className="inline-flex items-center text-primary hover:text-primary/90">
            {linkText}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function FeaturesSection() {
  const features = [
    {
      icon: <FaDiscord />,
      title: "Join Our Discord",
      description: "Connect with riders worldwide. Share tips, stories, and build lasting friendships with motorcycle enthusiasts.",
      linkText: "Join Discord",
      href: "#",
      delay: 0.1
    },
    {
      icon: <FaShoppingCart />,
      title: "Merchandise",
      description: "Shop exclusive Ghosty's Garage gear. From t-shirts and hoodies to riding accessories that show your community pride.",
      linkText: "Shop Now",
      href: "#",
      delay: 0.2
    },
    {
      icon: <FaMotorcycle />,
      title: "Events & Rides",
      description: "Join our upcoming meetups. From local rides to major events, find opportunities to ride together with the community.",
      linkText: "View Calendar",
      href: "#",
      delay: 0.3
    }
  ];

  return (
    <section className="py-16 bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white">What We Offer</h2>
          <p className="mt-4 text-xl text-gray-400">Everything you need to connect with fellow riders</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkText={feature.linkText}
              href={feature.href}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
