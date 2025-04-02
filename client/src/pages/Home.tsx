import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CommunityHighlights } from "@/components/CommunityHighlights";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <FeaturesSection />
        <CommunityHighlights />
        <TestimonialsSection />
        <ProductShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
