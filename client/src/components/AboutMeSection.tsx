import { motion } from 'framer-motion';
import { Ghost, Heart, Star, History, Lightbulb, Target, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThreeDCard } from '@/components/ui/3d-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AboutMeSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-6">
            <Ghost className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Meet Ghosty</h2>
          <p className="text-xl text-gray-400">The Creator Behind Ghosty's Garage</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ThreeDCard
              className="overflow-hidden"
              glareEnabled={true}
              rotationIntensity={10}
              glareColor="rgba(168, 85, 247, 0.4)"
              borderRadius={24}
            >
              <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20 overflow-hidden h-full">
                <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600 relative">
                  <div className="absolute -bottom-16 left-6">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="relative">
                            <Avatar className="w-24 h-24 border-[6px] border-gray-900">
                              <AvatarImage src="/ghosty-avatar.png" />
                              <AvatarFallback className="bg-purple-600/20">GG</AvatarFallback>
                            </Avatar>
                            {/* Discord-like status indicator */}
                            <div className="absolute bottom-0 right-0 w-7 h-7 bg-gray-900 rounded-full p-1">
                              <div className="w-full h-full bg-green-500 rounded-full" />
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Online</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <CardContent className="pt-16 p-6">
                  <div className="space-y-4">
                    <div className="pt-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Ghosty</h3>
                        <span className="text-sm text-gray-400">@ghosty</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full">he/him</span>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="text-sm font-medium text-purple-400 mb-2">About Me</h4>
                      <p className="text-sm text-gray-300">Automotive Service Technician with a passion for motorcycles and ADHD-powered creativity. Living life one ride at a time. 🏍️</p>
                    </div>

                    <div className="space-y-3 mt-4">
                      <div className="bg-gray-800/30 rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"/>
                          </svg>
                          <span className="text-sm text-gray-300">Listening to Spotify</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z"/>
                          </svg>
                          <span className="text-sm text-gray-300">Coding in VS Code</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      {[
                        { icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
                        { icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                        { icon: "M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" },
                        { icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href="#"
                          className="bg-gray-800/50 hover:bg-purple-600/30 transition-colors duration-300 rounded-full p-2.5"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-4 h-4 text-gray-400 hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d={social.icon} />
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ThreeDCard>
          </motion.div>

          <div className="md:col-span-8">
            <Card className="h-full bg-gray-900/50 backdrop-blur-md border-purple-600/20">
              <Tabs defaultValue="about" className="w-full h-full">
                <TabsList className="w-full bg-gray-900/50 border border-purple-600/20">
                  <TabsTrigger value="about" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">About</TabsTrigger>
                  <TabsTrigger value="vision" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">Vision</TabsTrigger>
                  <TabsTrigger value="values" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">Values</TabsTrigger>
                  <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">History</TabsTrigger>
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
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                              Community First: Building meaningful connections between riders
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                              Knowledge Sharing: Empowering riders through education
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                              Inclusivity: Welcoming riders of all backgrounds and skill levels
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                              Safety: Promoting responsible riding practices
                            </li>
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
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}