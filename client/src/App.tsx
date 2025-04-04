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
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import FAQ from "@/components/FAQ"; // Added FAQ component import


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppSidebar>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </AppSidebar>
        <GhostyChatButton />
        <Toaster />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;

function App() {
  // Using the sidebar navigation as requested
  const useSidebar = true;

  return (
    <QueryClientProvider client={queryClient}>
      {useSidebar ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50">
            <ErrorBoundary>
              <AnnouncementBanner />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <AppSidebar>
              <Router />
            </AppSidebar>
          </ErrorBoundary>
        </>
      ) : (
        <>
          <div className="fixed top-0 left-0 right-0 z-50">
            <ErrorBoundary>
              <AnnouncementBanner />
            </ErrorBoundary>
          </div>
          <div className="relative">
            <Navbar />
          </div>
          <div className="pt-32">
            <Router />
          </div>
        </>
      )}
      <GhostyChatButton />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;