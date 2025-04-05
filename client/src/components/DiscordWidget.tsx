import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaDiscord, FaUsers, FaComments, FaHashtag } from "react-icons/fa";

interface DiscordServerInfo {
  name: string;
  icon: string | null;
  banner: string | null;
  description: string;
  memberCount: number;
  presenceCount: number;
  channels: Array<{
    id: string;
    name: string;
  }>;
  inviteUrl: string;
}

export function DiscordWidget() {
  const [serverInfo, setServerInfo] = useState<DiscordServerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/discord/server-info')
      .then(res => res.json())
      .then(data => {
        setServerInfo(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch Discord server info:', err);
        setIsLoading(false);
      });
  }, []);

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
          {!isLoading && serverInfo && (
            <div className="w-full max-w-md bg-black/40 backdrop-blur-sm rounded-xl border border-purple-500/20 overflow-hidden">
              {serverInfo.banner && (
                <div className="h-32 w-full relative overflow-hidden">
                  <img 
                    src={serverInfo.banner} 
                    alt="Server Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  {serverInfo.icon && (
                    <img 
                      src={serverInfo.icon} 
                      alt="Server Icon"
                      className="w-16 h-16 rounded-full border-2 border-purple-500/30"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">{serverInfo.name}</h3>
                    <p className="text-purple-400">{serverInfo.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-900/20 rounded-lg p-4">
                    <FaUsers className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{serverInfo.memberCount}</div>
                    <div className="text-sm text-purple-400">Members</div>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4">
                    <FaUsers className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{serverInfo.presenceCount}</div>
                    <div className="text-sm text-purple-400">Online</div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-purple-400 uppercase">Channels</h4>
                  {serverInfo.channels.map(channel => (
                    <div key={channel.id} className="flex items-center gap-2 text-gray-300">
                      <FaHashtag className="w-4 h-4 text-purple-400" />
                      {channel.name}
                    </div>
                  ))}
                </div>

                <a 
                  href={serverInfo.inviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
                >
                  Join Server
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}