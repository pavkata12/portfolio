import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MatrixLoader from "@/components/MatrixLoader";
import PillChoice from "@/components/PillChoice";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showPillChoice, setShowPillChoice] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const onPillChoose = useCallback(() => {
    setShowPillChoice(false);
    setShowLoader(true);
  }, []);
  const onLoaderComplete = useCallback(() => setShowLoader(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ThemeProvider>
            {showPillChoice ? (
              <PillChoice onChoose={onPillChoose} />
            ) : (
              <>
                <AudioProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AudioProvider>
                {showLoader && (
                  <MatrixLoader onComplete={onLoaderComplete} />
                )}
              </>
            )}
          </ThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
