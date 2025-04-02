import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { AppSidebar } from "@/components/AppSidebar";
import { GhostyChatButton } from "@/components/GhostyChatButton";
import { Navbar } from "@/components/Navbar";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
          <AppSidebar>
            <Router />
          </AppSidebar>
          <div className="fixed top-0 left-0 right-0">
            <AnnouncementBanner />
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
