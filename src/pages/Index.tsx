import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import StarsOverlay from "@/components/ambient/StarsOverlay";
import Waves from "@/components/ambient/Waves";

const Index = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

  const [zoomedOut, setZoomedOut] = useState(false);
  const [anim, setAnim] = useState("");
  const pageTitle = zoomedOut ? "Home Page — Futuristic Vintage" : "John's Portfolio — Futuristic Vintage";
  const pageHeading = zoomedOut ? "Home Page" : "John's Portfolio";
  const pageDescription = zoomedOut
    ? "Home Page scene with a futuristic vintage aesthetic and ambient shooting stars."
    : "John's Portfolio home with a futuristic vintage aesthetic and ambient shooting stars.";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John",
    url: canonical,
    jobTitle: "Creative Developer",
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <main id="home" className="relative min-h-screen overflow-hidden">
        {/* Extended backdrop revealed on zoom-out */}
        <div className={`absolute inset-0 -z-20 pointer-events-none transition-opacity duration-700 ${zoomedOut ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <img
            src={heroBg}
            alt="Extended indigo sky with distant purple hills"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] object-cover opacity-50"
            loading="eager"
          />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(60% 50% at 70% 20%, hsl(var(--primary) / 0.18), transparent 60%)'
          }} />
          <div className="absolute inset-0 opacity-60">
            <Waves />
          </div>
        </div>

        <div className={`scene-root ${anim}`}>
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
        {/* Ambient stars */}
        <StarsOverlay />

        {/* Background title */}
        <div className="pointer-events-none absolute top-10 inset-x-0 z-0 text-center">
          <h1 className="mx-auto text-6xl md:text-8xl font-extrabold tracking-tight text-[hsl(var(--title))] opacity-75 mix-blend-overlay select-none animate-title-drift" style={{ filter: 'drop-shadow(0 2px 8px hsl(var(--title-glow) / 0.25))' }}>
            {pageHeading}
          </h1>
        </div>

        {/* Centered content */}
        <section className="container mx-auto flex min-h-screen items-center justify-center px-4">
          <div className="relative w-full max-w-2xl text-center">
            {/* Subtle scanline / vintage tint */}

            {/* Title moved to background; subtitle removed */}

            {!zoomedOut && (
              <div className="mt-8 flex items-center justify-center">
                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => {
                    setAnim('animate-scene-zoom-out');
                    setZoomedOut(true);
                  }}
                  aria-label="Go to Home"
                >
                  Home
                </Button>
              </div>
            )}
          </div>
        </section>
        {zoomedOut && (
          <div className="fixed bottom-4 left-4 z-10">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setAnim('animate-scene-zoom-in');
                setZoomedOut(false);
              }}
              aria-label="Back to landing"
            >
              Back
            </Button>
          </div>
        )}
        </div>
      </main>
    </>
  );
};

export default Index;
