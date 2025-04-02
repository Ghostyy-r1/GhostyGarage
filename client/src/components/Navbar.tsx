import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-[#1E1E1E] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">Ghosty's Garage</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <a className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                Home
              </a>
            </Link>
            <Link href="/community">
              <a className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                Community
              </a>
            </Link>
            <Link href="/events">
              <a className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                Events
              </a>
            </Link>
            <Link href="/merch">
              <a className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                Merch
              </a>
            </Link>
            <Link href="/about">
              <a className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                About
              </a>
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary hover:text-white">
                Home
              </a>
            </Link>
            <Link href="/community">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary hover:text-white">
                Community
              </a>
            </Link>
            <Link href="/events">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary hover:text-white">
                Events
              </a>
            </Link>
            <Link href="/merch">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary hover:text-white">
                Merch
              </a>
            </Link>
            <Link href="/about">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-primary hover:text-white">
                About
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
