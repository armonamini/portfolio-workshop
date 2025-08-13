import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FallbackNature from "@/features/nature/FallbackNature";

// Lazy load the 3D scene
const GreenWorld = React.lazy(() => import("@/features/nature/GreenWorld"));

const Home = () => {
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Feature detection
    const canvas = document.createElement('canvas');
    const webglSupported = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    setSupportsWebGL(webglSupported);
    
    // Reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/home` : "/home";
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home • John's Portfolio",
    url: canonical,
    description: "Nature mode home page with peaceful grove environment.",
    isPartOf: {
      "@type": "WebSite",
      name: "John's Portfolio"
    }
  };
  
  const shouldUseFallback = !supportsWebGL || prefersReducedMotion;
  
  return (
    <>
      <Helmet>
        <title>Home • John's Portfolio</title>
        <meta
          name="description"
          content="Nature mode home page with peaceful grove environment and ambient fireflies."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Home • John's Portfolio" />
        <meta
          property="og:description"
          content="A peaceful grove environment with rolling hills, gentle lighting, and floating fireflies."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>
      
      <main className="relative min-h-screen overflow-hidden">
        {/* Background - either 3D or fallback */}
        <div className="absolute inset-0 -z-10">
          {shouldUseFallback ? (
            <FallbackNature />
          ) : (
            <Suspense fallback={<FallbackNature />}>
              <GreenWorld />
            </Suspense>
          )}
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Subtle title at top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-light tracking-wider text-white/90 select-none">
              Home
            </h1>
          </div>
          
          {/* Back button - top left corner */}
          <div className="absolute top-6 left-6">
            <Button asChild variant="ghost" size="sm" className="text-white/60 hover:text-white/90 hover:bg-white/5 backdrop-blur-sm">
              <Link to="/" aria-label="Back to Landing">
                ←
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;