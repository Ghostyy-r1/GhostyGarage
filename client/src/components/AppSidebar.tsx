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
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Calendar, 
  FileText,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";

// Header Component (now inside the Sidebar context)
function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-gray-800 bg-background px-4 shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left section with hamburger menu */}
      <div className="flex items-center">
        <SidebarTrigger>
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
      </div>

      {/* Center section with logo and brand name */}
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          {/* Logo placeholder - you can replace with an actual logo */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <span className="text-md font-bold">G</span>
          </div>
          <span className="text-xl font-bold">
            <span className="text-primary">Ghosty's</span> Garage
          </span>
        </div>
      </div>

      {/* Right section with action buttons */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 bg-primary bg-opacity-10 hover:bg-primary hover:bg-opacity-20 text-primary"
        >
          <FaDiscord className="h-4 w-4" />
          <span className="hidden sm:inline">Join Discord</span>
        </Button>
        <Button 
          variant="outline" 
          className="border-white text-white hover:bg-white hover:bg-opacity-10"
        >
          Login / Signup
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
      <Link href={href}>
        <SidebarMenuButton data-active={isActive}>
          {icon}
          <span>{label}</span>
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

  const navItems = [
    { href: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { href: "/community", icon: <Users className="h-5 w-5" />, label: "Community" },
    { href: "/merch", icon: <ShoppingCart className="h-5 w-5" />, label: "Merchandise" },
    { href: "/events", icon: <Calendar className="h-5 w-5" />, label: "Events & Rides" },
    { href: "/blog", icon: <FileText className="h-5 w-5" />, label: "Blog" },
  ];

  return (
    <SidebarProvider>
      <Header />
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="pt-14">
            {/* Empty header to make space for the fixed header */}
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item, index) => (
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
          </SidebarContent>
        </Sidebar>
        
        <div className="flex flex-1 flex-col">
          <main className="relative flex-1 overflow-y-auto pt-14">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}