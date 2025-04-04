import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About"; // Added About page import
import { AppSidebar } from "@/components/AppSidebar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GhostyChatButton } from "@/components/GhostyChatButton";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import FAQ from "@/components/FAQ"; // Added FAQ component import


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} /> {/* Added About page route */}
      <Route component={NotFound} />
    </Switch>
  );
}

import { ErrorBoundary } from './components/ErrorBoundary';
import { AppSidebar } from './components/AppSidebar';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { GhostyChatButton } from './components/GhostyChatButton';
import { Toaster } from './components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Router from './Router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppSidebar>
          <Router />
        </AppSidebar>
      </ErrorBoundary>
      <div className="fixed top-0 left-0 right-0">
        <ErrorBoundary>
          <AnnouncementBanner />
        </ErrorBoundary>
      </div>
      <GhostyChatButton />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;