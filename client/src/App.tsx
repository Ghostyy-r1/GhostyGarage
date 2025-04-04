
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import { AppSidebar } from "@/components/AppSidebar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GhostyChatButton } from "@/components/GhostyChatButton";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Navbar } from "@/components/Navbar";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <div className="relative min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50">
            <AnnouncementBanner />
            <Navbar />
          </div>
          <AppSidebar>
            <div className="pt-32">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </AppSidebar>
        </div>
        <GhostyChatButton />
        <Toaster />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
