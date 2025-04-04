import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  name: string;
  membership: string;
  testimonial: string;
  initial: string;
  image?: string;
  rating: number;
  bikeModel?: string;
  delay: number;
}

const Testimonial = ({ 
  name, 
  membership, 
  testimonial, 
  initial, 
  image, 
  rating, 
  bikeModel, 
  delay 
}: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay,
      type: "spring",
      stiffness: 100 
    }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="h-full"
  >
    <Card className="h-full bg-gradient-to-br from-gray-800/80 via-gray-900 to-black p-6 rounded-xl shadow-[0_10px_40px_-15px_rgba(138,43,226,0.3)] border border-purple-500/20 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(138,43,226,0.4)] hover:border-purple-500/30">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600/20 to-transparent rounded-bl-[100px] -z-0" />
      
      <CardContent className="p-0 relative z-10 h-full flex flex-col">
        <div className="absolute -top-3 -left-2 text-purple-500 opacity-20">
          <Quote size={40} />
        </div>
        
        <div className="flex items-center mb-5">
          <Avatar className="h-14 w-14 ring-2 ring-purple-600/50 ring-offset-2 ring-offset-gray-800">
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                {initial}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4">
            <h4 className="text-white font-medium text-lg">{name}</h4>
            <p className="text-purple-400 text-sm">{membership}</p>
            {bikeModel && (
              <p className="text-gray-400 text-xs mt-1">Rides: {bikeModel}</p>
            )}
          </div>
        </div>
        
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={cn(
                "mr-1",
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
              )} 
            />
          ))}
        </div>
        
        <p className="text-gray-300 italic flex-grow">{testimonial}</p>
        
        <div className="text-xs text-purple-400/60 mt-4 text-right">
          Verified Member
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const testimonialsPerPage = 3;
  
  // Expanded testimonials array with more reviews
  const testimonials = [
    {
      name: "Mike Reynolds",
      membership: "Member since 2022",
      testimonial: "Joining Ghosty's Garage changed my riding experience completely. I've met amazing people and learned so much about my bike. The community rides are always the highlight of my month!",
      initial: "M",
      rating: 5,
      bikeModel: "Honda CBR650R",
      delay: 0.1
    },
    {
      name: "Sarah Chen",
      membership: "Premium Member",
      testimonial: "As a new rider, I was nervous about joining a motorcycle group. Ghosty's Garage welcomed me with open arms and helped me build confidence on my bike. The maintenance workshops have saved me so much money!",
      initial: "S",
      rating: 5,
      bikeModel: "Kawasaki Ninja 400",
      delay: 0.2
    },
    {
      name: "James Wilson",
      membership: "Member since 2021",
      testimonial: "The route planning tools are exceptional! I've discovered roads I never knew existed, and the turn-by-turn navigation has never led me astray. The community suggestions for scenic stops are an added bonus.",
      initial: "J",
      rating: 5,
      bikeModel: "Triumph Street Triple",
      delay: 0.3
    },
    {
      name: "Elena Rodriguez",
      membership: "Premium Member",
      testimonial: "The gear reviews helped me choose the perfect jacket and helmet. Saved me from making expensive mistakes! The discount codes for members are fantastic too - already paid for my membership fee.",
      initial: "E",
      rating: 4,
      bikeModel: "Ducati Monster",
      delay: 0.1
    },
    {
      name: "David Parker",
      membership: "Member since 2023",
      testimonial: "I love the maintenance tracking system. It reminds me when service is due and provides detailed guides. My bike has never run better, and I'm learning to do more myself rather than paying a mechanic.",
      initial: "D",
      rating: 5,
      bikeModel: "BMW R1250GS",
      delay: 0.2
    },
    {
      name: "Olivia Thompson",
      membership: "Member since 2022",
      testimonial: "The community support is incredible. When I broke down 100 miles from home, I posted in the emergency chat and had three members offer help within minutes. That alone is worth the membership fee!",
      initial: "O",
      rating: 5,
      bikeModel: "Yamaha MT-07",
      delay: 0.3
    },
    {
      name: "Marcus Johnson",
      membership: "Premium Member",
      testimonial: "The photo sharing and ride documentation features are top-notch. I love being able to share my adventures with fellow enthusiasts who actually appreciate the technical details of the rides.",
      initial: "M",
      rating: 4,
      bikeModel: "Indian Scout",
      delay: 0.1
    },
    {
      name: "Sophia Kim",
      membership: "Member since 2023",
      testimonial: "Ghosty's Garage has a special place for women riders that's been invaluable to me. The women's riding events have introduced me to an amazing network of female riders I wouldn't have met otherwise.",
      initial: "S",
      rating: 5,
      bikeModel: "Harley-Davidson Sportster",
      delay: 0.2
    },
    {
      name: "Ryan Miller",
      membership: "Member since 2021",
      testimonial: "The track day organization is fantastic. As someone who was intimidated by track riding, the beginner-friendly approach helped me take my skills to the next level in a safe, controlled environment.",
      initial: "R",
      rating: 5,
      bikeModel: "Aprilia RS 660",
      delay: 0.3
    }
  ];

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const paginatedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );
  
  // Autoplay testimonials
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [autoplay, totalPages]);
  
  const handlePrevPage = () => {
    setAutoplay(false);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const handleNextPage = () => {
    setAutoplay(false);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#1E1E1E] to-[#151515]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1 bg-purple-900/30 rounded-full text-purple-400 text-sm font-medium">
            TESTIMONIALS
          </span>
          <h2 className="mt-6 text-4xl font-bold text-white">What Our Members Say</h2>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Real stories from real riders who have found their home in our community
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevPage}
              className="bg-gray-800/80 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-700"
            >
              <ChevronLeft />
            </motion.button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextPage}
              className="bg-gray-800/80 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-700"
            >
              <ChevronRight />
            </motion.button>
          </div>
          
          {/* Testimonials Grid */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {paginatedTestimonials.map((testimonial, index) => (
                  <Testimonial
                    key={currentPage * testimonialsPerPage + index}
                    name={testimonial.name}
                    membership={testimonial.membership}
                    testimonial={testimonial.testimonial}
                    initial={testimonial.initial}
                    rating={testimonial.rating}
                    bikeModel={testimonial.bikeModel}
                    delay={testimonial.delay}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentPage(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full ${
                  currentPage === index 
                    ? "bg-purple-600" 
                    : "bg-gray-600 hover:bg-purple-400"
                }`}
              />
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href="#"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            <span className="border-b border-purple-400 hover:border-purple-300">View all testimonials</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
