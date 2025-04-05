
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";

export function EventsCalendar() {
  const events = [
    {
      title: "Group Ride: Mountain Pass Run",
      date: "May 15, 2024",
      type: "Ride",
      description: "Join us for an exciting mountain pass adventure!"
    },
    {
      title: "Maintenance Workshop",
      date: "May 20, 2024",
      type: "Workshop",
      description: "Learn essential maintenance tips and tricks"
    }
  ];

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
          <p className="mt-4 text-gray-400">Join us for rides, workshops, and more</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-sm border border-purple-500/20">
              <Calendar
                mode="single"
                className="text-white"
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {events.map((event, index) => (
              <Card key={index} className="p-6 bg-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    <p className="text-purple-400 mt-1">{event.date}</p>
                    <p className="text-gray-400 mt-2">{event.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
