
import React from "react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Link } from "wouter";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="animate-pulse hover:animate-none">
            <FaDiscord className="h-5 w-5" />
            <span className="ml-2">Join Discord</span>
          </Button>
          <Button variant="outline" size="sm" className="border-purple-500/50 hover:border-purple-500">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
