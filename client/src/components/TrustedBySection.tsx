
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay";

const partners = [
  {
    name: "Cardo Systems",
    logo: "https://cardosystems.com/cdn/shop/files/cardo-favicon_96x96.png?v=1706179855"
  },
  {
    name: "AGV Helmets",
    logo: "https://www.agv.com/on/demandware.static/Sites-agv-us-Site/-/default/dw8026381d/images/logo.svg"
  },
  {
    name: "Dainese",
    logo: "https://www.dainese.com/on/demandware.static/Sites-dainese-us-Site/-/default/dw51796611/images/logo.svg"
  },
  {
    name: "RevZilla",
    logo: "https://www.revzilla.com/images/sites/revzilla/support/header/logo-c416dd1a00f74c1039a20b951088ad92.svg?vsn=d"
  },
  {
    name: "Cycle Gear",
    logo: "https://www.cyclegear.com/favicon.ico"
  }
];

export function TrustedBySection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: true })
  ]);

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
            We work with the most trusted brands in the motorcycle industry
          </motion.p>
        </div>

        <div className="relative px-12">
          <Carousel
            ref={emblaRef}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            className="w-full max-w-6xl mx-auto relative"
          >
            <CarouselContent>
              {partners.map((partner, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 h-32 flex items-center justify-center"
                  >
                    <img 
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain transition-all duration-300"
                      style={{ 
                        maxHeight: "60px",
                        filter: "grayscale(100%) brightness(150%) contrast(80%)",
                        WebkitFilter: "grayscale(100%) brightness(150%) contrast(80%)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.filter = "none";
                        e.currentTarget.style.WebkitFilter = "none";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.filter = "grayscale(100%) brightness(150%) contrast(80%)";
                        e.currentTarget.style.WebkitFilter = "grayscale(100%) brightness(150%) contrast(80%)";
                      }}
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-6 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30" />
            <CarouselNext className="absolute -right-6 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
