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
          {/* Back button - top right */}
          <div className="absolute top-6 right-6">
            <Button asChild variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Link to="/" aria-label="Back to Landing">
                ← Back to Landing
              </Link>
            </Button>
          </div>
          
          {/* Main content - centered */}
          <section className="flex flex-1 items-center justify-center px-4">
            <div className="text-center">
              <h1 
                className="text-5xl md:text-7xl font-black tracking-wide text-white mb-4 grove-text-glow select-none"
                style={{ 
                  fontFamily: "'Orbitron', monospace",
                  filter: 'drop-shadow(0 4px 20px hsl(var(--grove-text-shadow) / 0.8))'
                }}
              >
                Welcome to the Grove
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto leading-relaxed">
                Nature mode for the portfolio.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;