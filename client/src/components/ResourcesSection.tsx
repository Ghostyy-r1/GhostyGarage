
import { motion } from 'framer-motion';
import { Video, BookOpen, FileText, Code, PlayCircle, BookOpenCheck, Database, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceCardProps {
  icon: any;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const ResourceCard = ({ icon: Icon, title, description, link, tags }: ResourceCardProps) => (
  <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
    <CardContent className="p-6 space-y-4">
      <div className="bg-purple-600/20 rounded-lg p-3 w-fit">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag: string) => (
          <Badge key={tag} variant="outline" className="bg-purple-600/10 text-purple-400 border-purple-500/20">
            {tag}
          </Badge>
        ))}
      </div>
      <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
        {link} <span className="ml-2">→</span>
      </Button>
    </CardContent>
  </Card>
);

export function ResourcesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-purple-900/30 px-4 py-1 text-sm text-purple-400 font-medium mb-4"
          >
            RESOURCES & LEARNING
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Expand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Knowledge</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Access our comprehensive collection of learning materials and resources
          </motion.p>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent mb-8">
            <TabsTrigger
              value="videos"
              className="bg-gray-800/50 border border-purple-500/20 hover:bg-purple-600/20 data-[state=active]:bg-purple-600/30"
            >
              <Video className="w-5 h-5 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="tutorials"
              className="bg-gray-800/50 border border-purple-500/20 hover:bg-purple-600/20 data-[state=active]:bg-purple-600/30"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="bg-gray-800/50 border border-purple-500/20 hover:bg-purple-600/20 data-[state=active]:bg-purple-600/30"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Documentation
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="bg-gray-800/50 border border-purple-500/20 hover:bg-purple-600/20 data-[state=active]:bg-purple-600/30"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Video,
                  title: "Basic Maintenance Series",
                  description: "Step-by-step video guides for basic motorcycle maintenance tasks.",
                  link: "Watch Series",
                  tags: ["Beginner", "Maintenance", "Video Series"]
                },
                {
                  icon: Video,
                  title: "Advanced Repairs",
                  description: "Detailed video tutorials for complex motorcycle repairs and modifications.",
                  link: "Watch Now",
                  tags: ["Advanced", "Repairs", "Professional"]
                },
                {
                  icon: Video,
                  title: "Safety Tips & Tricks",
                  description: "Essential safety practices and riding techniques explained visually.",
                  link: "Learn More",
                  tags: ["Safety", "Tips", "Riding Skills"]
                }
              ].map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpenCheck,
                  title: "Beginner's Guide",
                  description: "Complete guide to motorcycle basics and essential maintenance.",
                  link: "Start Learning",
                  tags: ["Beginner", "Guide", "Fundamentals"]
                },
                {
                  icon: Code,
                  title: "Interactive Tutorials",
                  description: "Learn through hands-on, step-by-step interactive tutorials.",
                  link: "Try Now",
                  tags: ["Interactive", "Practice", "Skills"]
                },
                {
                  icon: FileText,
                  title: "Maintenance Checklists",
                  description: "Comprehensive maintenance checklists and schedules.",
                  link: "View Checklists",
                  tags: ["Maintenance", "Organization", "Planning"]
                }
              ].map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="docs">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Technical Documentation",
                  description: "Detailed technical specifications and repair manuals.",
                  link: "Read Docs",
                  tags: ["Technical", "Reference", "Manuals"]
                },
                {
                  icon: Database,
                  title: "Parts Database",
                  description: "Comprehensive database of motorcycle parts and compatibilities.",
                  link: "Search Database",
                  tags: ["Parts", "Database", "Reference"]
                },
                {
                  icon: FileText,
                  title: "Troubleshooting Guides",
                  description: "Step-by-step guides for diagnosing common issues.",
                  link: "View Guides",
                  tags: ["Troubleshooting", "Diagnosis", "Repairs"]
                }
              ].map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Wrench,
                  title: "Maintenance Calculator",
                  description: "Calculate maintenance schedules and track service intervals.",
                  link: "Use Calculator",
                  tags: ["Calculator", "Planning", "Maintenance"]
                },
                {
                  icon: Wrench,
                  title: "Part Finder",
                  description: "Interactive tool to find compatible parts for your motorcycle.",
                  link: "Find Parts",
                  tags: ["Parts", "Compatibility", "Search"]
                },
                {
                  icon: Wrench,
                  title: "Diagnostic Tools",
                  description: "Digital tools for motorcycle diagnostics and troubleshooting.",
                  link: "Start Diagnosis",
                  tags: ["Diagnostics", "Tools", "Troubleshooting"]
                }
              ].map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
