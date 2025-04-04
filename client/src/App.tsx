
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
import { SidebarProvider } from "@/components/ui/sidebar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <SidebarProvider>
          <AppSidebar>
            <Router />
          </AppSidebar>
        </SidebarProvider>
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
