
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Custom Motors",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Custom+Motors",
  },
  {
    name: "Speed Shop",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Speed+Shop",
  },
  {
    name: "Moto Parts Pro",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Moto+Parts+Pro",
  },
  {
    name: "Gear Hub",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Gear+Hub",
  },
  {
    name: "Elite Racing",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Elite+Racing",
  },
];

export function TrustedBySection() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-400 font-medium mb-4"
          >
            TRUSTED BY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Partners Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Trust Us</span>
          </motion.h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {partners.map((partner, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <div className="p-4 bg-black/50 backdrop-blur-sm rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30" />
            <CarouselNext className="-right-12 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
