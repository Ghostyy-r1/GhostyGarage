
import { motion } from 'framer-motion';
import { Ghost, Heart, Star, History, Lightbulb, Target, Settings, Mail, MapPin, Calendar, Tool, Coffee, Music, Code, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThreeDCard } from '@/components/ui/3d-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
            <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20 overflow-hidden h-full">
              <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600 relative">
                <div className="absolute -bottom-16 left-6">
                  <Avatar className="w-24 h-24 border-[6px] border-gray-900">
                    <AvatarImage src="/ghosty-avatar.png" />
                    <AvatarFallback className="bg-purple-600/20">GG</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <CardContent className="pt-28 px-6 pb-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-white">Ghosty</h3>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                          Founder
                        </Badge>
                      </div>
                      <p className="text-gray-400 mt-1">@ghosty</p>
                      <p className="text-sm text-gray-500 mt-1">Professional Motorcycle Enthusiast</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-800/50">he/him</Badge>
                    <Badge variant="outline" className="bg-gray-800/50">Mechanic</Badge>
                    <Badge variant="outline" className="bg-gray-800/50">Developer</Badge>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Online</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-purple-400 mb-2">About Me</h4>
                      <p className="text-sm text-gray-300">Automotive Service Technician with a passion for motorcycles and ADHD-powered creativity. Living life one ride at a time. 🏍️</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Canada</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Joined January 2024</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Tool className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">10+ years experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 space-y-3">
                    <h4 className="text-sm font-medium text-purple-400">Current Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">Listening to Lo-fi Beats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">Working on Ghosty's Garage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-300">Fueled by Coffee</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div className="flex justify-between">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white">500+</p>
                      <p className="text-sm text-gray-400">Repairs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white">50+</p>
                      <p className="text-sm text-gray-400">Guides</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white">1k+</p>
                      <p className="text-sm text-gray-400">Community</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 space-y-3">
                      <h4 className="text-sm font-medium text-purple-400">Interests & Hobbies</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Motorcycles 🏍️",
                          "Gaming 🎮",
                          "Photography 📸",
                          "Music 🎵",
                          "Tech 💻",
                          "Coffee ☕",
                          "Paranormal 👻"
                        ].map((interest) => (
                          <Badge
                            key={interest}
                            variant="outline"
                            className="bg-purple-600/10 text-purple-400 border-purple-500/20"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4 space-y-3">
                      <h4 className="text-sm font-medium text-purple-400">Progress & Achievements</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Repairs Completed</span>
                            <span className="text-purple-400">92%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Customer Satisfaction</span>
                            <span className="text-purple-400">95%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">Guide Completion</span>
                            <span className="text-purple-400">88%</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                    {[
                      { icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z", href: "https://youtube.com/@ghostysgarage" },
                      { icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", href: "https://twitter.com/ghostysgarage" },
                      { icon: "M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z", href: "https://github.com/ghostysgarage" },
                      { icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z", href: "https://discord.gg/ghostysgarage" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
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
          </motion.div>

          <div className="md:col-span-8">
            <Card className="h-full bg-gray-900/50 backdrop-blur-md border-purple-600/20">
              <Tabs defaultValue="about" className="w-full h-full">
                <TabsList className="w-full bg-gray-900/50 border border-purple-600/20">
                  <TabsTrigger value="about" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">About</TabsTrigger>
                  <TabsTrigger value="vision" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">Vision</TabsTrigger>
                  <TabsTrigger value="values" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">Values</TabsTrigger>
                  <TabsTrigger value="experience" className="flex-1 data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">Experience</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-4">
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Heart className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xl font-semibold text-white mb-2">About Me</h4>
                            <p className="text-gray-300">I'm an Automotive Service Technician with over a decade of hands-on experience and a deep passion for motorcycles. Living with ADHD has given me a unique perspective on life and mechanics, allowing me to think outside the box and find creative solutions. The name 'Ghosty' represents both my love for the paranormal and my journey of embracing what makes me unique in this field.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-gray-800/30 rounded-lg p-4">
                            <h5 className="font-medium text-purple-400 mb-3">Expertise</h5>
                            <div className="space-y-2">
                              <Badge className="mr-2 mb-2">Motorcycle Mechanics</Badge>
                              <Badge className="mr-2 mb-2">Custom Builds</Badge>
                              <Badge className="mr-2 mb-2">Performance Tuning</Badge>
                              <Badge className="mr-2 mb-2">Electrical Systems</Badge>
                              <Badge className="mr-2 mb-2">Diagnostics</Badge>
                            </div>
                          </div>

                          <div className="bg-gray-800/30 rounded-lg p-4">
                            <h5 className="font-medium text-purple-400 mb-3">Certifications</h5>
                            <div className="space-y-2">
                              <Badge className="mr-2 mb-2">ASE Master Technician</Badge>
                              <Badge className="mr-2 mb-2">Motorcycle Tech Specialist</Badge>
                              <Badge className="mr-2 mb-2">EV Systems Certified</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="vision" className="mt-4">
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <Lightbulb className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xl font-semibold text-white mb-2">Our Vision</h4>
                            <p className="text-gray-300">To create a vibrant, inclusive community where motorcycle enthusiasts of all levels can connect, learn, and grow together. We believe in breaking down barriers in the motorcycle world and making technical knowledge accessible to everyone.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div className="bg-gray-800/30 rounded-lg p-4">
                            <h5 className="font-medium text-purple-400 mb-3">Short-term Goals</h5>
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span>Launch online repair guides</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span>Build active discord community</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span>Create video tutorials</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-gray-800/30 rounded-lg p-4">
                            <h5 className="font-medium text-purple-400 mb-3">Long-term Vision</h5>
                            <ul className="space-y-2 text-gray-300">
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span>Global rider community</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span>Motorcycle education platform</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-400" />
                                <span>Custom build workshops</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="values" className="mt-4">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="bg-gray-800/30 p-4 rounded-lg">
                              <h5 className="text-white font-medium mb-2">Community First</h5>
                              <p className="text-gray-300 text-sm">Building meaningful connections between riders and fostering a supportive environment.</p>
                            </div>
                            <div className="bg-gray-800/30 p-4 rounded-lg">
                              <h5 className="text-white font-medium mb-2">Knowledge Sharing</h5>
                              <p className="text-gray-300 text-sm">Making technical expertise accessible and encouraging continuous learning.</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-gray-800/30 p-4 rounded-lg">
                              <h5 className="text-white font-medium mb-2">Inclusivity</h5>
                              <p className="text-gray-300 text-sm">Welcoming riders of all backgrounds, skill levels, and riding styles.</p>
                            </div>
                            <div className="bg-gray-800/30 p-4 rounded-lg">
                              <h5 className="text-white font-medium mb-2">Innovation</h5>
                              <p className="text-gray-300 text-sm">Embracing new technologies and methods while respecting traditional craftsmanship.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="mt-4">
                  <Card className="bg-gray-900/50 backdrop-blur-md border-purple-600/20">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <BookOpen className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-xl font-semibold text-white mb-2">Professional Journey</h4>
                            <p className="text-gray-300">A decade of hands-on experience in motorcycle mechanics, custom builds, and community education.</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="relative pl-6 border-l border-purple-600/30">
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[6.5px] top-1"></div>
                            <div className="mb-1">
                              <span className="text-purple-400">2024 - Present</span>
                              <h5 className="text-white font-medium">Founder & Lead Developer - Ghosty's Garage</h5>
                            </div>
                            <p className="text-gray-300 text-sm">Building a next-gen platform for motorcycle enthusiasts, combining technical expertise with community building.</p>
                          </div>

                          <div className="relative pl-6 border-l border-purple-600/30">
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[6.5px] top-1"></div>
                            <div className="mb-1">
                              <span className="text-purple-400">2019 - 2024</span>
                              <h5 className="text-white font-medium">Master Technician - Performance Motorsports</h5>
                            </div>
                            <p className="text-gray-300 text-sm">Led performance tuning division, specializing in high-end motorcycle modifications and custom builds. Managed a team of 5 technicians.</p>
                          </div>

                          <div className="relative pl-6 border-l border-purple-600/30">
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[6.5px] top-1"></div>
                            <div className="mb-1">
                              <span className="text-purple-400">2014 - 2019</span>
                              <h5 className="text-white font-medium">Motorcycle Technician - Dealership</h5>
                            </div>
                            <p className="text-gray-300 text-sm">Gained comprehensive experience with various motorcycle brands and models.</p>
                          </div>
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
