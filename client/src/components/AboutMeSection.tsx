
import { motion } from 'framer-motion';
import { Ghost, Heart, Star, History, Lightbulb, Target, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AboutMeSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-6">
            <Ghost className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Meet Ghosty</h2>
          <p className="text-xl text-gray-400">The Creator Behind Ghosty's Garage</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-6">
                    <AvatarImage src="/ghosty-avatar.png" />
                    <AvatarFallback className="bg-purple-600/20">GG</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold text-white mb-2">Ghosty</h3>
                  <p className="text-purple-400 mb-4">Automotive Service Technician</p>
                  <div className="grid grid-cols-2 gap-4 w-full text-center">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-gray-400">Location</p>
                      <p className="text-white font-semibold">Toronto, CA</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-gray-400">Ride</p>
                      <p className="text-white font-semibold">YZF-R1M</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="md:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full bg-gray-900/50 border border-purple-600/20">
                <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                <TabsTrigger value="vision" className="flex-1">Vision</TabsTrigger>
                <TabsTrigger value="values" className="flex-1">Values</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-4">
                <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Heart className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">About Me</h4>
                        <p className="text-gray-300">I'm an Automotive Service Technician with a deep passion for motorcycles. Living with ADHD has given me a unique perspective on life and mechanics. I've always felt a bit different, which is partly why I chose the name 'Ghosty' - it represents both my love for the paranormal and my journey of embracing what makes me unique.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vision" className="mt-4">
                <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Lightbulb className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Our Vision</h4>
                        <p className="text-gray-300">To create a vibrant community where motorcycle enthusiasts can connect, share their passion, and support each other in their two-wheeled adventures. We believe that riding isn't just about the destination—it's about the journey and the connections we make along the way.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="values" className="mt-4">
                <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Star className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Core Values</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li>• Community First: Building meaningful connections between riders</li>
                          <li>• Knowledge Sharing: Empowering riders through education</li>
                          <li>• Inclusivity: Welcoming riders of all backgrounds and skill levels</li>
                          <li>• Safety: Promoting responsible riding practices</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <History className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Our Journey</h4>
                        <p className="text-gray-300">Starting as a personal blog about motorcycle maintenance, Ghosty's Garage has grown into a thriving community. What began as sharing repair tips has evolved into a comprehensive platform for riders to connect, learn, and grow together. Our community continues to expand, driven by our shared passion for motorcycles and the open road.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
