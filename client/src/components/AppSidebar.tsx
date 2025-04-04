
import React from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Store,
  Wrench,
  Users,
  FileText,
  MapPin,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Store", href: "/store", icon: Store },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Community", href: "/community", icon: Users },
  { name: "Guides", href: "/guides", icon: FileText },
  { name: "Local Events", href: "/events", icon: MapPin },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Sign Out", href: "/logout", icon: LogOut },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar defaultCollapsed={false}>
          <SidebarHeader>
            <div className="flex-1 max-w-xl mx-4 mb-4">
              <div className="relative">
                <input 
                  type="search"
                  placeholder="Search for products, guides, or resources..."
                  className="w-full bg-gray-900/50 border border-purple-500 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <div className="flex flex-col flex-1 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                        location === item.href
                          ? "bg-purple-500/20 text-purple-400"
                          : "hover:bg-gray-800/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                );
              })}

              <div className="mt-auto mb-4">
                {bottomNavigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800/50"
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <main className="relative flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
