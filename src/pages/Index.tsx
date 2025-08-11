import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import StarsOverlay from "@/components/ambient/StarsOverlay";

const Index = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

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
        <title>John's Portfolio — Futuristic Vintage</title>
        <meta
          name="description"
          content="John's Portfolio home with a futuristic vintage aesthetic and ambient shooting stars."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="John's Portfolio — Futuristic Vintage" />
        <meta
          property="og:description"
          content="A minimal home with futuristic vintage vibes and slow shooting stars."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

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

        {/* Ambient stars */}
        <StarsOverlay />

        {/* Centered content */}
        <section className="container mx-auto flex min-h-screen items-center justify-center px-4">
          <div className="relative w-full max-w-2xl text-center">
            {/* Subtle scanline / vintage tint */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[calc(var(--radius)*1.5)] border border-border/50 bg-card/40 backdrop-blur-md shadow-[var(--shadow-glow)]" />
            <div className="pointer-events-none absolute -inset-6 -z-20 rounded-[calc(var(--radius)*1.5)]" style={{
              background: 'repeating-linear-gradient(180deg, hsl(var(--foreground) / 0.02) 0px, hsl(var(--foreground) / 0.02) 1px, transparent 1px, transparent 3px)'
            }} />

            <h1 className="animate-fade-in text-4xl font-bold tracking-tight md:text-6xl">
              John's Portfolio
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-foreground/80 md:text-lg">
              A minimal home with a futuristic vintage feel — subtle glow, soft grain, and slow shooting stars.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <Button asChild size="lg" variant="hero">
                <a href="/" aria-label="Go to Home">Home</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
