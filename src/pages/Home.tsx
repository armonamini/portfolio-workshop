import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const Home = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/home` : "/home";

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home • John's Portfolio",
    url: canonical,
    description: "Nature-inspired home page with serene landscape design.",
    isPartOf: {
      "@type": "WebSite",
      name: "John's Portfolio"
    }
  };

  return (
    <>
      <Helmet>
        <title>Home • John's Portfolio</title>
        <meta
          name="description"
          content="Nature-inspired home page with serene landscape design featuring rolling hills and forest elements."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Home • John's Portfolio" />
        <meta
          property="og:description"
          content="A peaceful nature-inspired home page with rolling hills and forest landscape."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-900 via-green-800 to-green-900">
        {/* Nature Background with CSS */}
        <div className="absolute inset-0 -z-10">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-emerald-900 to-green-800" />
          
          {/* Hills using CSS */}
          <svg
            className="absolute bottom-0 w-full h-96"
            viewBox="0 0 1200 400"
            fill="none"
            preserveAspectRatio="xMidYEnd slice"
          >
            {/* Back hills */}
            <path
              d="M0,200 C200,150 400,180 600,140 C800,100 1000,120 1200,90 L1200,400 L0,400 Z"
              fill="hsl(var(--grove-800))"
              opacity="0.7"
            />
            {/* Middle hills */}
            <path
              d="M0,280 C150,220 350,250 600,200 C850,150 1050,180 1200,160 L1200,400 L0,400 Z"
              fill="hsl(var(--grove-700))"
              opacity="0.8"
            />
            {/* Front hills */}
            <path
              d="M0,320 C200,280 400,300 600,260 C800,220 1000,240 1200,220 L1200,400 L0,400 Z"
              fill="hsl(var(--grove-600))"
            />
          </svg>

          {/* Trees silhouettes */}
          <div className="absolute bottom-20 left-10 w-4 h-32 bg-green-900 opacity-60 rounded-t-full" />
          <div className="absolute bottom-16 left-16 w-6 h-40 bg-green-800 opacity-50 rounded-t-full" />
          <div className="absolute bottom-24 right-20 w-5 h-36 bg-green-900 opacity-40 rounded-t-full" />
          <div className="absolute bottom-20 right-32 w-7 h-44 bg-green-800 opacity-60 rounded-t-full" />

          {/* Floating particles */}
          <div className="absolute top-20 left-1/4 w-1 h-1 bg-green-300 rounded-full opacity-60 animate-firefly" />
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-green-400 rounded-full opacity-50 animate-firefly" style={{ animationDelay: '1s' }} />
          <div className="absolute top-60 left-2/3 w-1 h-1 bg-green-300 rounded-full opacity-40 animate-firefly" style={{ animationDelay: '2s' }} />
          <div className="absolute top-80 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-70 animate-firefly" style={{ animationDelay: '3s' }} />

          {/* Subtle grain overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Subtle title at top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-light tracking-wider text-white/90 select-none" style={{ fontFamily: "'Inter', sans-serif" }}>
              Home
            </h1>
          </div>
          
          {/* Back button - top left corner */}
          <div className="absolute top-6 left-6">
            <Button asChild variant="ghost" size="sm" className="text-white/60 hover:text-white/90 hover:bg-white/5 backdrop-blur-sm">
              <a href="/" aria-label="Back to Landing">
                ←
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;