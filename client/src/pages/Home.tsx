import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from "@/components/HeroSection";
import { AboutGarageSectionTabs } from "@/components/AboutGarageSectionTabs";
import { ResourcesSection } from "@/components/ResourcesSection";
import { WrenchWisdom } from '@/components/WrenchWisdom'; // Added import
import { VideoSection } from '@/components/VideoSection'; // Added import
import { GhostyUpdates } from "@/components/GhostyUpdates";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventsCalendar } from "@/components/EventsCalendar";

// Lazy load components for better performance
const FeaturesSection = lazy(() => import("@/components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const TrustedBySection = lazy(() => import("@/components/TrustedBySection").then(m => ({ default: m.TrustedBySection })));
const CommunityHighlights = lazy(() => import("@/components/CommunityHighlights").then(m => ({ default: m.CommunityHighlights })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase").then(m => ({ default: m.ProductShowcase })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const DiscordWidget = lazy(() => import("@/components/DiscordWidget").then(m => ({ default: m.DiscordWidget })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));
const MembershipTiers = lazy(() => import("@/components/MembershipTiers").then(m => ({ default: m.MembershipTiers })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

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

        {/* Ghosty Updates Section */}
        <GhostyUpdates />

        {/* Video Section */}
        <VideoSection />

        {/* Wrench Wisdom Section */}
        <WrenchWisdom />

        {/* Resources Section */}
        <ResourcesSection />

        {/* About Section */}
      <section id="about" className="relative z-10 bg-background min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<LoadingFallback />}>
              <AboutGarageSectionTabs />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

        {/* Countdown Timer Section */}
        <CountdownTimer />

        {/* Events Calendar Section */}
        <EventsCalendar />

        {/* Other sections */}
        <Suspense fallback={<LoadingFallback />}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TrustedBySection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <CommunityHighlights />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <DiscordWidget />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ProductShowcase />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <MembershipTiers />
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