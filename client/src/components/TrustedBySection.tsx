
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Cardo Systems",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Cardo+Systems",
  },
  {
    name: "MotoLoot",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=MotoLoot",
  },
  {
    name: "AGV Helmets",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=AGV",
  },
  {
    name: "Discord",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Discord",
  },
  {
    name: "Instagram",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Instagram",
  },
  {
    name: "BlueSky",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=BlueSky",
  },
  {
    name: "RevZilla",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=RevZilla",
  },
  {
    name: "Cycle Gear",
    logo: "https://placehold.co/200x100/1a1a1a/808080/png?text=Cycle+Gear",
  }
];

export function TrustedBySection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4"
          >
            TRUSTED BY THE BEST
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Partnered With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We work with the most trusted brands in the motorcycle industry to bring you the best experience
          </motion.p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-6 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30" />
            <CarouselNext className="-right-6 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
