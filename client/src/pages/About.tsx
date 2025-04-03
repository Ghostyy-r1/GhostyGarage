
import { motion } from 'framer-motion';
import { GhostIcon, Heart, Wrench, Users, Coffee } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-6">
            <GhostIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">About Ghosty's Garage</h1>
          <p className="text-xl text-gray-400">A sanctuary for motorcycle enthusiasts and adventurers</p>
        </motion.div>

        <div className="grid gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-600/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300">
              To create a vibrant community where motorcycle enthusiasts can connect, share their passion, 
              and support each other in their two-wheeled adventures. We believe that riding isn't just 
              about the destination—it's about the journey and the connections we make along the way.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-600/20"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Why "Ghosty"?</h2>
            <p className="text-gray-300">
              The name "Ghosty" embodies the spirit of freedom and mystery that comes with motorcycle riding. 
              Like a ghost, we riders appear and disappear on the open road, leaving nothing but memories and 
              stories in our wake. It's about embracing the unknown and finding joy in the journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-purple-400" />,
                title: "Values",
                content: "Community, Safety, Knowledge-sharing, and Respect for all riders"
              },
              {
                icon: <Users className="w-8 h-8 text-purple-400" />,
                title: "Community",
                content: "A welcoming space for riders of all experience levels"
              },
              {
                icon: <Wrench className="w-8 h-8 text-purple-400" />,
                title: "Expertise",
                content: "Sharing mechanical knowledge and riding techniques"
              },
              {
                icon: <Coffee className="w-8 h-8 text-purple-400" />,
                title: "Connection",
                content: "Building lasting friendships through shared experiences"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-purple-600/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-300">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
