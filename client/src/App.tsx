import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { AppSidebar } from "@/components/AppSidebar";
import { GhostyChatButton } from "@/components/GhostyChatButton";
import { Navbar } from "@/components/Navbar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // For demonstration, we're showing the modern navbar
  // In a real app, you could toggle between navbar styles
  const useSidebar = false;

  return (
    <QueryClientProvider client={queryClient}>
      {useSidebar ? (
        <AppSidebar>
          <Router />
        </AppSidebar>
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
