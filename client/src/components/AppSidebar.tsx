import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Calendar, 
  FileText,
  Menu,
  Bike,
  MapPin,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartButton } from "@/components/CartButton";



interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}

const SidebarNavItem = ({ href, icon, label, currentPath }: SidebarNavItemProps) => {
  const isActive = currentPath === href;

  return (
    <SidebarMenuItem>
      <Link href={href} className="w-full">
        <SidebarMenuButton 
          data-active={isActive}
          className={`group/item relative transition-all duration-300 ${
            isActive 
              ? 'bg-purple-900/20 text-purple-400 font-medium' 
              : 'hover:bg-purple-900/10 hover:text-purple-400'
          }`}
        >
          {/* Active indicator bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-md transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0'
          } group-hover/item:opacity-60`} />

          {/* Icon container */}
          <div className="mr-3">
            <div 
              className={`transition-all duration-300 ${
                isActive 
                  ? 'text-purple-400 scale-110' 
                  : 'text-gray-400 group-hover/item:text-purple-400 group-hover/item:scale-110'
              }`}
            >
              {icon}
            </div>
          </div>

          {/* Label container */}
          <div className="overflow-visible whitespace-nowrap">
            <span 
              className={`inline-block transition-all duration-300 ${
                isActive 
                  ? 'text-purple-300 translate-x-1' 
                  : 'text-gray-300 group-hover/item:text-purple-300 group-hover/item:translate-x-1'
              }`}
            >
              {label}
            </span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};

interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const [location] = useLocation();

  // Primary navigation items
  const primaryNavItems = [
    { href: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { href: "/about", icon: <FileText className="h-5 w-5" />, label: "About" },
    { href: "/community", icon: <Users className="h-5 w-5" />, label: "Community" },
    { href: "/merch", icon: <ShoppingCart className="h-5 w-5" />, label: "Merchandise" },
    { href: "/events", icon: <Calendar className="h-5 w-5" />, label: "Events & Rides" },
    { href: "/blog", icon: <FileText className="h-5 w-5" />, label: "Blog" },
  ];

  // Secondary navigation items
  const secondaryNavItems = [
    { href: "/bikes", icon: <Bike className="h-5 w-5" />, label: "My Motorcycles" },
    { href: "/routes", icon: <MapPin className="h-5 w-5" />, label: "My Routes" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen relative">
        <Sidebar>
          <SidebarHeader className="pt-16">
            {/* User profile section */}
            <div className="px-2 py-4">
              <div className="flex items-center gap-3 px-2">
                <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
                    GH
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Guest User</span>
                  <span className="text-xs text-gray-400">Join to sync your data</span>
                </div>
              </div>
            </div>
            {/* Search bar moved to sidebar header */}
            <div className="flex-1 max-w-xl mx-4 mb-4"> {/*Added margin bottom*/}
              <div className="relative">
                <input 
                  type="search"
                  placeholder="Search for products, guides, or resources..."
                  className="w-full bg-gray-900/50 border border-purple-500 rounded-lg px-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                />
                {/* Search component removed until implemented */}
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            {/* Main navigation */}
            <div className="mb-2 px-2">
              <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Navigation
              </h3>
            </div>

            <SidebarMenu>
              {primaryNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SidebarNavItem
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    currentPath={location}
                  />
                </motion.div>
              ))}
            </SidebarMenu>

            <SidebarSeparator className="my-3" />

            {/* Personal section */}
            <div className="mb-2 px-2">
              <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Personal
              </h3>
            </div>

            <SidebarMenu>
              {secondaryNavItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index + primaryNavItems.length) * 0.05 }}
                >
                  <SidebarNavItem
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    currentPath={location}
                  />
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="mt-auto">
            <SidebarSeparator className="mb-2" />
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/settings" className="w-full">
                  <SidebarMenuButton className="group hover:bg-purple-900/10 hover:text-purple-400">
                    <div className="mr-3 text-gray-400 group-hover:text-purple-400">
                      <Settings className="h-5 w-5" />
                    </div>
                    <span className="text-gray-300 group-hover:text-purple-300">
                      Settings
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="group text-gray-300 hover:bg-red-900/10 hover:text-red-400">
                  <div className="mr-3 text-gray-400 group-hover:text-red-400">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="group-hover:text-red-300">
                    Logout
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <main className="relative flex-1 overflow-y-auto pt-16">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}