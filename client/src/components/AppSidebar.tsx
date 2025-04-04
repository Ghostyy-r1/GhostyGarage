
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
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
  Settings,
  LogOut,
  Search as SearchIcon,
  Globe,
  ChevronRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CartButton } from "@/components/CartButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
  { label: "German", value: "de" },
  { label: "Japanese", value: "ja" },
];

const currencies = [
  { label: "USD ($)", value: "usd" },
  { label: "EUR (€)", value: "eur" },
  { label: "GBP (£)", value: "gbp" },
  { label: "CAD ($)", value: "cad" },
  { label: "AUD ($)", value: "aud" },
];

function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-800 bg-background bg-gradient-to-r from-gray-900 to-black px-4 shadow-lg mt-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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

      <div className="hidden md:block">
        {/* Empty space for balance */}
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2 bg-purple-900/20 hover:bg-purple-900/30 text-purple-400 border border-purple-800/50 transition-all duration-300"
        >
          <FaDiscord className="h-4 w-4" />
          <span className="hidden sm:inline">Discord</span>
        </Button>
        <Button 
          size="sm"
          className="relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-900/20 group overflow-hidden animate-pulse"
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-30 animate-pulse transition-opacity duration-300"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-50 animate-pulse transition-all duration-500"></div>
          <div className="absolute -inset-px bg-gradient-to-r from-purple-500/50 to-indigo-500/50 rounded-lg animate-pulse" />
        </Button>
        <div className="flex-shrink-0">
          <CartButton className="border-2 border-purple-500/50 hover:border-purple-500/80 transition-colors duration-300 shadow-lg shadow-purple-500/20" />
        </div>
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
          className={`group/item relative transition-all duration-300 ${
            isActive 
              ? 'bg-purple-900/20 text-purple-400 font-medium' 
              : 'hover:bg-purple-900/10 hover:text-purple-400'
          }`}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-r-md transition-all duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0'
          } group-hover/item:opacity-60`} />

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

  const primaryNavItems = [
    { href: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { href: "/about", icon: <FileText className="h-5 w-5" />, label: "About" },
    { href: "/community", icon: <Users className="h-5 w-5" />, label: "Community" },
    { href: "/merch", icon: <ShoppingCart className="h-5 w-5" />, label: "Merchandise" },
    { href: "/events", icon: <Calendar className="h-5 w-5" />, label: "Events & Rides" },
    { href: "/blog", icon: <FileText className="h-5 w-5" />, label: "Blog" },
  ];

  return (
    <SidebarProvider>
      <Header />
      <div className="flex min-h-screen relative">
        <Sidebar>
          <SidebarHeader className="pt-16">
            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Avatar className="h-8 w-8 border-2 border-purple-500/30">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-xs">
                          GH
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-64 mt-2 bg-gray-900/95 backdrop-blur-sm border border-purple-500/20">
                    <DropdownMenuLabel>
                      <div className="flex items-center gap-3 p-2">
                        <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                            GH
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">Guest User</span>
                          <span className="text-xs text-purple-300/70">Join to sync your data</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-purple-500/20" />
                    
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-purple-400" />
                        <span>Language</span>
                        <span className="ml-auto text-xs text-purple-400">EN</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/20">
                        {languages.map((language) => (
                          <DropdownMenuItem key={language.value} className="flex items-center justify-between">
                            {language.label}
                            {language.value === "en" && (
                              <Check className="h-4 w-4 text-purple-400" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center">
                        <Globe className="mr-2 h-4 w-4 text-purple-400" />
                        <span>Currency</span>
                        <span className="ml-auto text-xs text-purple-400">CAD</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-gray-900/95 backdrop-blur-sm border border-purple-500/20">
                        {currencies.map((currency) => (
                          <DropdownMenuItem key={currency.value} className="flex items-center justify-between">
                            {currency.label}
                            {currency.value === "cad" && (
                              <Check className="h-4 w-4 text-purple-400" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    <DropdownMenuSeparator className="bg-purple-500/20" />
                    
                    <DropdownMenuItem className="flex items-center">
                      <Settings className="mr-2 h-4 w-4 text-purple-400" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="text-red-400 focus:text-red-400 focus:bg-red-950/50">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="h-8 w-px bg-purple-500/20" />
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <input 
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-gray-900/50 border-2 border-purple-500/30 rounded-lg pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  />
                </div>
                  
              </div>
            </div>
            <SidebarSeparator className="my-3 bg-purple-500/20" />
          </SidebarHeader>

          <SidebarContent className="px-2">
            <div className="flex flex-col">
              <div>
                <div className="mb-4 px-2">
                  <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-purple-400/90 bg-gradient-to-r from-purple-500/10 to-transparent py-2 rounded-lg">
                    Navigation
                  </h3>
                  <div className="h-px bg-gradient-to-r from-purple-500/20 to-transparent mt-2"></div>
                </div>

                <SidebarMenu className="space-y-1">
                  {primaryNavItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="overflow-hidden"
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
              </div>
            </div>
          </SidebarContent>
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
