import { Heart, Star, History, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedReveal } from '@/components/ui/animated-reveal';
import { Button } from '@/components/ui/button';

export function AboutGarageSectionTabs() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <AnimatedReveal variant="fade" direction="up">
            <span className="inline-block bg-purple-600/20 px-4 py-1.5 rounded-full text-sm font-medium text-purple-400 mb-4">
              ABOUT GHOSTY'S GARAGE
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Ultimate Motorcycle Community Hub
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're more than just a community - we're your trusted partner in the motorcycle journey
            </p>
          </AnimatedReveal>
        </div>

        <Tabs defaultValue="vision" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent">
            {[
              { value: 'vision', icon: Heart, label: 'Our Vision' },
              { value: 'values', icon: Star, label: 'Values' },
              { value: 'history', icon: History, label: 'History' },
              { value: 'innovation', icon: Lightbulb, label: 'Innovation' }
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="relative overflow-hidden bg-gray-800/50 border border-purple-500/20 hover:bg-purple-600/20 data-[state=active]:bg-purple-600/30"
              >
                <Icon className="w-5 h-5 mb-2" />
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            <TabsContent value="vision" className="space-y-4">
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-purple-500/20">
                <CardContent className="p-8">
                  <AnimatedReveal variant="fade" direction="up">
                    <h3 className="text-2xl font-bold text-white mb-4">Building Tomorrow's Riding Experience</h3>
                    <p className="text-gray-400">Our vision is to create the most comprehensive and supportive motorcycle community platform, where riders of all levels can connect, learn, and grow together.</p>
                  </AnimatedReveal>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add similar content for other tabs */}
          </div>
        </Tabs>

        <div className="text-center mt-12">
          <Button 
            variant="ghost" 
            className="text-purple-400 hover:text-purple-300 group"
          >
            Learn More About Us
            <motion.span 
              className="ml-2 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutGarageSectionTabs;
