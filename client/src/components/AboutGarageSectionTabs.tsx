
import { Heart, Star, History, Lightbulb, Target, Settings, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export function AboutGarageSectionTabs() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Tabs defaultValue="vision" className="w-full">
        <TabsList className="h-auto p-4 bg-gray-900/50 backdrop-blur-md rounded-xl border border-purple-600/20 mb-6">
          <TabsTrigger value="vision" className="data-[state=active]:bg-purple-600/20 text-lg py-3">
            <Heart className="w-5 h-5 mr-2" />
            Our Vision
          </TabsTrigger>
          <TabsTrigger value="values" className="data-[state=active]:bg-purple-600/20 text-lg py-3">
            <Star className="w-5 h-5 mr-2" />
            Values
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-purple-600/20 text-lg py-3">
            <History className="w-5 h-5 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="innovation" className="data-[state=active]:bg-purple-600/20 text-lg py-3">
            <Lightbulb className="w-5 h-5 mr-2" />
            Innovation
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-purple-600/20 text-lg py-3">
            <Target className="w-5 h-5 mr-2" />
            Goals
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-purple-600/20 text-lg py-3">
            <Settings className="w-5 h-5 mr-2" />
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vision">
          <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Our Vision</h4>
                    <p className="text-gray-300">We envision a world where every motorcycle enthusiast has access to premium maintenance resources, a supportive community, and the tools they need to keep their bikes in perfect condition.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values">
          <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Core Values</h4>
                    <p className="text-gray-300">Our values shape everything we do, from how we interact with community members to how we approach motorcycle maintenance and education.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <History className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Our Journey</h4>
                    <p className="text-gray-300">Starting as a small group of passionate riders, we've grown into a global community dedicated to sharing knowledge and experience about motorcycle maintenance and riding.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="innovation">
          <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Innovation Focus</h4>
                    <p className="text-gray-300">We're constantly exploring new technologies and methodologies to make motorcycle maintenance more accessible and efficient for everyone.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Our Goals</h4>
                    <p className="text-gray-300">We aim to build the most comprehensive and user-friendly motorcycle maintenance platform while fostering a supportive global community of riders.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Wrench className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Our Services</h4>
                    <p className="text-gray-300">From basic maintenance guides to advanced repair tutorials, we provide comprehensive resources to keep your motorcycle running at its best.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AboutGarageSectionTabs;
