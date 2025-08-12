import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { HyperspaceOverlay, useWarpNavigation } from "@/features/warp";
import Index from "./pages/Index";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "@/theme/ocean.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const warpNav = useWarpNavigation();

  const handleWarpComplete = () => {
    // This will be called when the warp animation is complete
    console.log('Warp animation complete');
    warpNav.reset();
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Index warpNav={warpNav} />} />
        <Route path="/home" element={<Home />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <HyperspaceOverlay isActive={warpNav.isActive} onComplete={handleWarpComplete} />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
