import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import StarsOverlay from "@/components/ambient/StarsOverlay";
import Waves from "@/components/ambient/Waves";

const Portfolio = () => {
  const homeSectionRef = useRef<HTMLElement>(null);

  const canonical = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Armon",
    url: canonical,
    jobTitle: "Creative Developer",
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (homeSectionRef.current) {
      homeSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Armon's Portfolio — Futuristic Vintage</title>
        <meta
          name="description"
          content="Armon's Portfolio home with a futuristic vintage aesthetic and ambient shooting stars."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Armon's Portfolio — Futuristic Vintage" />
        <meta
          property="og:description"
          content="A minimal home with futuristic vintage vibes and slow shooting stars."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      {/* Original Landing Section */}
      <main id="home" className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt="Deep indigo background with subtle gradients"
            className="h-full w-full object-cover opacity-50"
            aria-hidden="true"
            loading="eager"
          />
          <div className="absolute inset-0" aria-hidden="true" style={{
            background: 'radial-gradient(60% 50% at 70% 20%, hsl(var(--primary) / 0.18), transparent 60%)'
          }} />
        </div>

        {/* Ambient waves */}
        <Waves />
        {/* Ambient stars (shooting stars/rockets) */}
        <StarsOverlay />

        {/* Background title */}
        <div className="pointer-events-none absolute top-10 inset-x-0 z-0 text-center">
          <h1 
            className="mx-auto text-6xl md:text-8xl font-black tracking-wider text-white select-none animate-title-drift" 
            style={{ 
              fontFamily: "'Orbitron', monospace",
              filter: 'drop-shadow(0 6px 30px hsl(var(--accent) / 0.7)) drop-shadow(0 4px 15px hsl(var(--primary) / 0.5))',
              textShadow: '0 0 40px hsl(var(--accent) / 0.8), 0 0 80px hsl(var(--accent) / 0.5), 0 0 120px hsl(var(--accent) / 0.3)',
              opacity: 0.06,
              mixBlendMode: 'normal'
            }}
          >
            Armon's Portfolio
          </h1>
        </div>

        {/* Centered content */}
        <section className="container mx-auto flex min-h-screen items-center justify-center px-4">
          <div className="relative w-full max-w-2xl text-center">
            <div className="mt-8 flex items-center justify-center">
              <Button 
                size="lg" 
                variant="hero"
                onClick={handleHomeClick}
                aria-label="Scroll to Home"
              >
                Home
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Home Section - Gradient fade from space color to blue with "Homepage" text */}
      <section 
        ref={homeSectionRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, hsl(230, 89%, 14%) 0%, hsl(230, 70%, 25%) 15%, hsl(240, 50%, 45%) 35%, hsl(245, 45%, 60%) 60%, #9297C4 100%)'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-8xl md:text-9xl font-bold text-white">
            Homepage
          </h2>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
