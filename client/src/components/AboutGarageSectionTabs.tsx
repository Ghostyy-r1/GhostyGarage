import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Ghost, Heart, Star, Lightbulb, Target, Rocket, History, Zap, Users, Globe, Shield, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThreeDCard } from '@/components/ui/3d-card';

export function AboutGarageSectionTabs() {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-black to-gray-900 relative">
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
          <h2 className="text-4xl font-bold text-white mb-4">About Ghosty's Garage</h2>
          <p className="text-xl text-gray-400">A community built by riders, for riders</p>
        </motion.div>

        <Tabs defaultValue="what" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 bg-gray-900/50 border border-purple-600/20 rounded-lg p-1 gap-1 mb-8">
            {[
              { id: 'what', label: 'What We Are', icon: Heart },
              { id: 'values', label: 'Values', icon: Star },
              { id: 'beliefs', label: 'Beliefs', icon: Lightbulb },
              { id: 'history', label: 'History', icon: History },
              { id: 'story', label: 'Our Story', icon: Target },
              { id: 'future', label: 'Future', icon: Rocket }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="group data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-400 relative py-2 transition-all duration-300 hover:bg-purple-600/20"
              >
                <div className="flex flex-col items-center gap-1">
                  <tab.icon className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm hidden md:block">{tab.label}</span>
                </div>
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-purple-500"
                  initial={false}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <TabsContent value="what">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-600/20 hover:bg-gray-900/60 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Welcome to the Garage</h3>
                      <p className="text-gray-300 mb-6">
                        Ghosty's Garage is more than just a platform - it's a thriving community where motorcycle 
                        enthusiasts come together to share their passion, knowledge, and experiences. We provide 
                        a space where riders can connect, learn, and grow together while celebrating the freedom 
                        of two wheels.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                          <Users className="w-8 h-8 text-purple-400 mb-3" />
                          <h4 className="text-lg font-semibold text-white mb-2">Community Hub</h4>
                          <p className="text-gray-300">Connect with fellow riders, share stories, and build lasting friendships</p>
                        </div>
                        <div className="p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                          <Globe className="w-8 h-8 text-purple-400 mb-3" />
                          <h4 className="text-lg font-semibold text-white mb-2">Global Network</h4>
                          <p className="text-gray-300">Join riders from around the world in our growing community</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="values">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Shield,
                        title: "Safety First",
                        description: "Promoting safe riding practices and education within our community"
                      },
                      {
                        icon: Users,
                        title: "Community Support",
                        description: "Building a supportive network of riders helping riders"
                      },
                      {
                        icon: Zap,
                        title: "Innovation",
                        description: "Embracing new technologies and riding techniques"
                      }
                    ].map((value, index) => (
                      <ThreeDCard
                        key={index}
                        className="bg-gray-900/50 backdrop-blur-lg border-purple-600/20 p-6 hover:bg-gray-900/60 hover:border-purple-500/30 transition-all duration-500 shadow-xl hover:shadow-purple-500/20 group"
                        glareEnabled={true}
                        rotationIntensity={20}
                        glareColor="rgba(168, 85, 247, 0.5)"
                      >
                        <div className="flex flex-col items-center text-center">
                          <value.icon className="w-10 h-10 text-purple-400 mb-4" />
                          <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                          <p className="text-gray-300">{value.description}</p>
                        </div>
                      </ThreeDCard>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="beliefs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Freedom of the Road",
                        description: "We believe in the transformative power of motorcycle riding"
                      },
                      {
                        title: "Knowledge Sharing",
                        description: "Every rider has valuable experiences worth sharing"
                      },
                      {
                        title: "Inclusive Community",
                        description: "All riders are welcome, regardless of experience or bike"
                      },
                      {
                        title: "Continuous Growth",
                        description: "There's always more to learn and explore in riding"
                      }
                    ].map((belief, index) => (
                      <ThreeDCard
                        key={index}
                        className="bg-gray-900/50 backdrop-blur-lg border-purple-600/20 p-6 hover:bg-gray-900/60 hover:border-purple-500/30 transition-all duration-500 shadow-xl hover:shadow-purple-500/20 group"
                        glareEnabled={true}
                        rotationIntensity={20}
                        glareColor="rgba(168, 85, 247, 0.5)"
                      >
                        <h4 className="text-xl font-bold text-white mb-2">{belief.title}</h4>
                        <p className="text-gray-300">{belief.description}</p>
                      </ThreeDCard>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="history">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-600/20 hover:bg-gray-900/60 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="space-y-8">
                        {[
                          {
                            year: "2024",
                            title: "The Beginning",
                            description: "Ghosty's Garage was founded with a vision to create a unique motorcycle community"
                          },
                          {
                            year: "2024 Q1",
                            title: "Community Launch",
                            description: "Successfully launched our platform and welcomed our first members"
                          },
                          {
                            year: "2024 Q2",
                            title: "Feature Expansion",
                            description: "Added route sharing and maintenance tracking features"
                          },
                          {
                            year: "Present",
                            title: "Growing Community",
                            description: "Continuing to expand and enhance the Ghosty's Garage experience"
                          }
                        ].map((event, index) => (
                          <div key={index} className="relative pl-8 border-l-2 border-purple-600/30">
                            <div className="absolute w-4 h-4 bg-purple-600 rounded-full -left-[9px] top-0 shadow-lg shadow-purple-500/50">
                              <div className="absolute w-8 h-8 bg-purple-600/20 rounded-full -left-2 -top-2 animate-pulse" />
                              <div className="absolute w-12 h-12 bg-purple-600/10 rounded-full -left-4 -top-4 animate-ping" />
                            </div>
                            <div className="mb-1">
                              <span className="text-purple-400 font-semibold">{event.year}</span>
                              <h5 className="text-white text-lg font-medium mt-1">{event.title}</h5>
                              <p className="text-gray-300 mt-2">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="story">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-600/20 hover:bg-gray-900/60 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">The Story Behind Ghosty's Garage</h3>
                      <p className="text-gray-300 mb-6">
                        Born from a passion for motorcycles and a desire to create something unique, Ghosty's 
                        Garage started as a simple idea: create a space where riders could truly connect and share 
                        their experiences.
                      </p>
                      <p className="text-gray-300">
                        What began as a small community has grown into a vibrant ecosystem of riders, mechanics, 
                        and enthusiasts all sharing the same passion for two wheels. Our story is still being written, 
                        with each member adding their own chapter to our growing legacy.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="future">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Globe,
                        title: "Global Expansion",
                        description: "Reaching riders across continents"
                      },
                      {
                        icon: Gift,
                        title: "New Features",
                        description: "Innovative tools for the community"
                      },
                      {
                        icon: Users,
                        title: "Community Events",
                        description: "More real-world meetups and rides"
                      }
                    ].map((future, index) => (
                      <ThreeDCard
                        key={index}
                        className="bg-gray-900/50 backdrop-blur-lg border-purple-600/20 p-6 hover:bg-gray-900/60 hover:border-purple-500/30 transition-all duration-500 shadow-xl hover:shadow-purple-500/20 group"
                        glareEnabled={true}
                        rotationIntensity={20}
                        glareColor="rgba(168, 85, 247, 0.5)"
                      >
                        <div className="flex flex-col items-center text-center">
                          <future.icon className="w-12 h-12 text-purple-400 mb-4" />
                          <h4 className="text-xl font-bold text-white mb-2">{future.title}</h4>
                          <p className="text-gray-300">{future.description}</p>
                        </div>
                      </ThreeDCard>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-purple-600/80 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </section>
  );
}