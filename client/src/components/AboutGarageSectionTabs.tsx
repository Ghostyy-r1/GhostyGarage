
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Ghost, Heart, Star, Lightbulb, Target, Rocket } from 'lucide-react';

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
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 bg-gray-900/50 border border-purple-600/20 rounded-lg p-1 gap-1">
            {[
              { id: 'what', label: 'What We Are', icon: Heart },
              { id: 'values', label: 'Values', icon: Star },
              { id: 'beliefs', label: 'Beliefs', icon: Lightbulb },
              { id: 'history', label: 'History', icon: Ghost },
              { id: 'story', label: 'Our Story', icon: Target },
              { id: 'future', label: 'Future', icon: Rocket }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="group data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400 relative py-2 transition-all duration-300"
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
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Welcome to the Garage</h3>
                      <p className="text-gray-300">
                        Ghosty's Garage is more than just a platform - it's a thriving community where motorcycle 
                        enthusiasts come together to share their passion, knowledge, and experiences. We provide 
                        a space where riders can connect, learn, and grow together while celebrating the freedom 
                        of two wheels.
                      </p>
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
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Our Core Values</h3>
                      <div className="grid gap-4">
                        <div>
                          <h4 className="text-purple-400 font-semibold mb-2">Community First</h4>
                          <p className="text-gray-300">We believe in the power of community and supporting each other.</p>
                        </div>
                        <div>
                          <h4 className="text-purple-400 font-semibold mb-2">Safety Always</h4>
                          <p className="text-gray-300">Promoting safe riding practices and maintenance awareness.</p>
                        </div>
                        <div>
                          <h4 className="text-purple-400 font-semibold mb-2">Knowledge Sharing</h4>
                          <p className="text-gray-300">Encouraging the exchange of expertise and experiences.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="beliefs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">What We Believe In</h3>
                      <p className="text-gray-300 mb-4">
                        We believe that motorcycling is more than just transportation - it's a lifestyle that brings 
                        people together. Every rider has a unique story and perspective worth sharing.
                      </p>
                      <p className="text-gray-300">
                        We believe in fostering an inclusive environment where all riders, regardless of their 
                        experience level or bike preference, can find their place and grow.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="history">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Our Journey</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="w-24 text-purple-400 font-semibold">2024</div>
                          <p className="text-gray-300">Founded with a vision to unite riders worldwide</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-24 text-purple-400 font-semibold">Present</div>
                          <p className="text-gray-300">Growing community with thousands of active members</p>
                        </div>
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
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">The Story Behind Ghosty's Garage</h3>
                      <p className="text-gray-300 mb-4">
                        Born from a passion for motorcycles and a desire to create something unique, Ghosty's 
                        Garage started as a simple idea: create a space where riders could truly connect and share 
                        their experiences.
                      </p>
                      <p className="text-gray-300">
                        What began as a small community has grown into a vibrant ecosystem of riders, mechanics, 
                        and enthusiasts all sharing the same passion for two wheels.
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
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">Looking Ahead</h3>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Our vision for the future includes expanding our community features, introducing new 
                          tools for riders, and organizing more real-world events to bring the community together.
                        </p>
                        <div className="grid gap-4 mt-4">
                          <div>
                            <h4 className="text-purple-400 font-semibold mb-2">Upcoming Features</h4>
                            <ul className="list-disc list-inside text-gray-300">
                              <li>Advanced route planning tools</li>
                              <li>Integrated maintenance tracking</li>
                              <li>Community-driven event organization</li>
                              <li>Enhanced social features</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
