import React from "react";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa";
import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-background">
      <div className="flex items-center gap-4">
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
    </nav>
  );
}