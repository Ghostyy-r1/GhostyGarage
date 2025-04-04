import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from "@/components/HeroSection";

// Lazy load components for better performance
const AboutGarageSectionTabs = lazy(() => import("@/components/AboutGarageSectionTabs").then(module => ({ default: module.AboutGarageSectionTabs })));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection").then(module => ({ default: module.FeaturesSection })));
const CommunityHighlights = lazy(() => import("@/components/CommunityHighlights").then(module => ({ default: module.CommunityHighlights })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(module => ({ default: module.TestimonialsSection })));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase").then(module => ({ default: module.ProductShowcase })));
const CTASection = lazy(() => import("@/components/CTASection").then(module => ({ default: module.CTASection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

// Loading component with animation
function LoadingFallback() {
  return (
    <div className="w-full h-[40vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="bg-purple-600/20 rounded-full p-4"
      >
        <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
      </motion.div>
      <motion.p 
        className="mt-4 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading amazing content...
      </motion.p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero section is not lazy loaded because it's above the fold */}
        <HeroSection />
        
        {/* About Section */}
      <section id="about" className="relative z-10 bg-background">
        <Suspense fallback={<LoadingFallback />}>
          <AboutGarageSectionTabs />
        </Suspense>
      </section>

        {/* Other sections */}
        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <CommunityHighlights />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ProductShowcase />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <CTASection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-40 bg-gray-900" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
