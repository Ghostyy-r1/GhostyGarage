import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import {
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <FaDiscord className="h-5 w-5" />
          <span className="ml-2">Join Discord</span>
        </Button>
        <Button variant="outline" size="sm">Sign In</Button>
      </div>
    </div>
  );
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <Sidebar defaultCollapsed={false}>
      <SidebarHeader>
        <Header />
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
        {children}
      </SidebarContent>
    </Sidebar>
  );
}