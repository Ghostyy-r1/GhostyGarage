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

function App() {
  // Using the sidebar navigation as requested
  const useSidebar = true;

  return (
    <QueryClientProvider client={queryClient}>
      {useSidebar ? (
        <>
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
        </>
      ) : (
        <>
          <Navbar />
          <div className="pt-16"> {/* Add padding for fixed navbar */}
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