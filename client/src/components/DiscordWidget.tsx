
import { motion } from "framer-motion";
import { FaDiscord, FaUsers, FaComments } from "react-icons/fa";

export function DiscordWidget() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
      <div className="absolute h-full w-full">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FaDiscord className="w-8 h-8 text-purple-400" />
            <span className="text-sm font-medium text-purple-400 tracking-wider uppercase">Join Our Community</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Connect with Fellow Riders
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join our vibrant Discord community where motorcycle enthusiasts share experiences, tips, and build lasting connections.
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 max-w-sm">
            <div className="space-y-6">
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <FaUsers className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Active Community</h3>
                <p className="text-gray-400">Connect with riders who share your passion and expertise.</p>
              </div>
              
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <FaComments className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Support</h3>
                <p className="text-gray-400">Get instant help and advice from experienced riders.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-50 animate-pulse transition-all duration-500" />
            <iframe 
              src="https://discord.com/widget?id=1295517643243130920&theme=dark" 
              width="350" 
              height="500" 
              allowTransparency={true} 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="relative rounded-xl shadow-2xl shadow-purple-500/20 border border-purple-500/20 bg-black/50 backdrop-blur-sm transform hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          <div className="flex-1 max-w-sm">
            <div className="space-y-6">
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <FaDiscord className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Exclusive Content</h3>
                <p className="text-gray-400">Access member-only resources and special events.</p>
              </div>
              
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <FaUsers className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Growing Network</h3>
                <p className="text-gray-400">Be part of an expanding community of motorcycle enthusiasts.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
