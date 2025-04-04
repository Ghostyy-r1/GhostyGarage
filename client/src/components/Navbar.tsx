
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Users, Calendar, ShoppingBag, Info, ChevronRight } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CartButton } from "./CartButton";
import { AnnouncementBanner } from "./AnnouncementBanner";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Track scrolling for navbar background changes
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Menu links data
  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { path: "/community", label: "Community", icon: <Users className="w-4 h-4" /> },
    { path: "/events", label: "Events", icon: <Calendar className="w-4 h-4" /> },
    { path: "/merch", label: "Merch", icon: <ShoppingBag className="w-4 h-4" /> },
    { path: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div>
      <AnnouncementBanner />
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-white font-bold text-xl cursor-pointer">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                      Ghosty's Garage
                    </span>
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => (
                <div key={link.path} className="relative">
                  <Link href={link.path}>
                    <div 
                      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center cursor-pointer relative group transition-all duration-200 ${
                        location === link.path 
                          ? "text-white" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center space-x-1.5">
                        {link.icon}
                        <span>{link.label}</span>
                      </span>
                      
                      {/* Active indicator */}
                      {location === link.path && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
                          layoutId="navbar-indicator"
                        />
                      )}
                      
                      {/* Hover indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/80 to-indigo-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </div>
                  </Link>
                </div>
              ))}
              
              <div className="flex items-center space-x-2 ml-4">
                <ThemeSwitcher />
                <CartButton />
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  Sign In
                </Button>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-200 hover:text-white hover:bg-transparent focus:outline-none p-1"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link, index) => (
                  <div key={link.path}>
                    <Link href={link.path}>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between px-3 py-3 rounded-md text-base font-medium cursor-pointer ${
                          location === link.path
                            ? "bg-purple-900/30 text-white border-l-4 border-purple-500"
                            : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center space-x-3">
                          <span className="text-purple-400">{link.icon}</span>
                          <span>{link.label}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </motion.div>
                    </Link>
                  </div>
                ))}
                
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-2 mt-3 border-t border-gray-700"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
