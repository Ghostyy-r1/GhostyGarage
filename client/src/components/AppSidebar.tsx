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
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartButton } from "@/components/CartButton";

// Header Component (now inside the Sidebar context)
function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-800 bg-background bg-gradient-to-r from-gray-900 to-black px-4 shadow-lg mt-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left section with hamburger menu */}
      <div className="flex items-center">
        <SidebarTrigger>
          <Menu className="h-5 w-5 text-gray-300 hover:text-white" />
        </SidebarTrigger>
        <div className="mx-3 h-5 w-px bg-gray-700"></div>
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md">
              <span className="text-md font-bold">G</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Ghosty's</span>
              <span className="text-white"> Garage</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Center section - empty for balance */}
      <div className="hidden md:block">
        {/* Empty space for balance */}
      </div>

      {/* Right section with action buttons */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2 bg-purple-900/20 hover:bg-purple-900/30 text-purple-400 border border-purple-800/50 transition-all duration-300"
        >
          <FaDiscord className="h-4 w-4" />
          <span className="hidden sm:inline">Discord</span>
        </Button>
        <div className="flex-shrink-0">
          <CartButton />
        </div>
        <Button 
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20"
        >
          Sign In
        </Button>
      </div>
    </motion.header>
  );
}

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
          className={`group relative transition-all duration-300 ${
            isActive 
              ? 'bg-purple-900/20 text-purple-400 font-medium' 
              : 'hover:bg-purple-900/10'
          }`}
        >
          {/* Active indicator bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-md transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
          }`} />
          
          {/* Icon container - isolate hover effect */}
          <div className="mr-3">
            <div 
              className={`transition-all duration-300 transform ${
                isActive 
                  ? 'text-purple-400 scale-110' 
                  : 'text-gray-400 group-hover:text-purple-400 group-hover:scale-110'
              }`}
            >
              {icon}
            </div>
          </div>
          
          {/* Label container - isolate hover effect */}
          <div className="overflow-hidden">
            <span 
              className={`inline-block transition-transform duration-300 ${
                isActive 
                  ? 'text-purple-300 translate-x-1' 
                  : 'text-gray-300 group-hover:text-purple-300 group-hover:translate-x-1'
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
      <Header />
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