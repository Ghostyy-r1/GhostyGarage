import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialProps {
  name: string;
  membership: string;
  testimonial: string;
  initial: string;
  delay: number;
}

const Testimonial = ({ name, membership, testimonial, initial, delay }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card className="bg-[#2D2D2D] p-6 rounded-xl shadow-lg border border-gray-800">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 bg-primary text-white">
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h4 className="text-white font-medium">{name}</h4>
            <p className="text-gray-400 text-sm">{membership}</p>
          </div>
        </div>
        <p className="text-gray-300">{testimonial}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mike Reynolds",
      membership: "Member since 2022",
      testimonial: "\"Joining Ghosty's Garage changed my riding experience completely. I've met amazing people and learned so much about my bike. The community rides are always the highlight of my month!\"",
      initial: "M",
      delay: 0.1
    },
    {
      name: "Sarah Chen",
      membership: "Member since 2023",
      testimonial: "\"As a new rider, I was nervous about joining a motorcycle group. Ghosty's Garage welcomed me with open arms and helped me build confidence on my bike. The maintenance workshops have saved me so much money!\"",
      initial: "S",
      delay: 0.2
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
          <h2 className="text-3xl font-bold text-white">What Our Members Say</h2>
          <p className="mt-4 text-xl text-gray-400">Stories from our growing community</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              membership={testimonial.membership}
              testimonial={testimonial.testimonial}
              initial={testimonial.initial}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
