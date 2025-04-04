
import { Heart, Star, History, Lightbulb, Target, Settings, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedReveal } from '@/components/ui/animated-reveal';

export function AboutGarageSectionTabs() {
  const timelineEvents = [
    {
      year: '2020',
      title: 'Ghosty\'s Garage Founded',
      description: 'Started as a small community of passionate riders'
    },
    {
      year: '2021',
      title: 'Community Growth',
      description: 'Expanded to over 10,000 members worldwide'
    },
    {
      year: '2022',
      title: 'Digital Platform Launch',
      description: 'Introduced our comprehensive maintenance platform'
    },
    {
      year: '2023',
      title: 'Premium Services',
      description: 'Launched exclusive membership benefits'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Tabs defaultValue="vision" className="w-full">
        <TabsList className="h-auto p-4 bg-gray-900/50 backdrop-blur-md rounded-xl border border-purple-600/20 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { value: 'vision', icon: Heart, label: 'Our Vision' },
            { value: 'values', icon: Star, label: 'Values' },
            { value: 'history', icon: History, label: 'History' },
            { value: 'innovation', icon: Lightbulb, label: 'Innovation' },
            { value: 'goals', icon: Target, label: 'Goals' },
            { value: 'services', icon: Settings, label: 'Services' }
          ].map(({ value, icon: Icon, label }) => (
            <TabsTrigger 
              key={value} 
              value={value} 
              className="data-[state=active]:bg-purple-600/20 text-lg py-3 flex-col gap-2 h-auto"
            >
              <Icon className="w-5 h-5 mb-1" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Vision Tab */}
        <TabsContent value="vision">
          <AnimatedReveal variant="fade" direction="up">
            <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Heart className="w-12 h-12 text-purple-400" />
                    <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      We envision a world where every motorcycle enthusiast has access to premium maintenance resources, 
                      a supportive community, and the tools they need to keep their bikes in perfect condition.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: 'Community', value: '10K+' },
                      { title: 'Countries', value: '50+' },
                      { title: 'Resources', value: '1000+' },
                      { title: 'Success Rate', value: '99%' }
                    ].map((stat, index) => (
                      <AnimatedReveal 
                        key={stat.title} 
                        variant="fade" 
                        direction="up" 
                        delay={0.1 * index}
                      >
                        <div className="bg-purple-600/10 rounded-lg p-4 border border-purple-500/20">
                          <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                          <div className="text-gray-400">{stat.title}</div>
                        </div>
                      </AnimatedReveal>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedReveal>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <AnimatedReveal variant="fade" direction="up">
            <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-8">
                    <History className="w-12 h-12 text-purple-400" />
                    <h3 className="text-3xl font-bold text-white">Our Journey</h3>
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-purple-600/20" />
                    {timelineEvents.map((event, index) => (
                      <AnimatedReveal
                        key={event.year}
                        variant="fade"
                        direction="up"
                        delay={0.1 * index}
                        className="relative pl-12 pb-8 last:pb-0"
                      >
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-purple-600/20 border-2 border-purple-400 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-purple-400" />
                        </div>
                        <div className="bg-purple-600/10 rounded-lg p-6 border border-purple-500/20">
                          <div className="text-xl font-bold text-purple-400 mb-2">{event.year}</div>
                          <div className="text-white font-semibold mb-2">{event.title}</div>
                          <p className="text-gray-300">{event.description}</p>
                        </div>
                      </AnimatedReveal>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedReveal>
        </TabsContent>

        {/* Other tab contents with similar premium styling */}
        <TabsContent value="values">
          <AnimatedReveal variant="fade" direction="up">
            <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Star className="w-12 h-12 text-purple-400" />
                    <h3 className="text-3xl font-bold text-white">Core Values</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Our values shape everything we do, from how we interact with community members 
                      to how we approach motorcycle maintenance and education.
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {[
                      'Excellence in Service',
                      'Community First',
                      'Innovation',
                      'Safety Always'
                    ].map((value, index) => (
                      <AnimatedReveal 
                        key={value} 
                        variant="fade" 
                        direction="up" 
                        delay={0.1 * index}
                      >
                        <div className="bg-purple-600/10 rounded-lg p-4 border border-purple-500/20">
                          <div className="text-white font-semibold">{value}</div>
                        </div>
                      </AnimatedReveal>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedReveal>
        </TabsContent>

        {/* Add similar premium styling for other tabs */}
      </Tabs>
    </div>
  );
}

export default AboutGarageSectionTabs;
