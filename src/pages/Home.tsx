import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

const Home = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/home` : "/home";

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home • John's Portfolio",
    url: canonical,
    description: "Nature-inspired home page with serene outdoor environment featuring hills, trees, and peaceful settings.",
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
          content="Nature-inspired home page featuring a realistic outdoor environment with hills, trees, ponds, and peaceful natural elements."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Home • John's Portfolio" />
        <meta
          property="og:description"
          content="A realistic nature scene with hills, trees, ponds and outdoor elements showcasing love for green natural environments."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <main className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom, #164460 0%, #036827 40%, #81b14f 100%)' }}>
        {/* Nature Scene Background */}
        <div className="absolute inset-0 -z-10">
          
          {/* Rolling Hills with Natural Colors */}
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 800"
            fill="none"
            preserveAspectRatio="xMidYEnd slice"
          >
            {/* Distant hills */}
            <path
              d="M0,400 C200,350 400,380 600,340 C800,300 1000,320 1200,290 L1200,800 L0,800 Z"
              fill="#0C5418"
              opacity="0.6"
            />
            {/* Middle hills */}
            <path
              d="M0,500 C150,440 350,470 600,420 C850,370 1050,400 1200,380 L1200,800 L0,800 Z"
              fill="#036827"
              opacity="0.8"
            />
            {/* Foreground hills */}
            <path
              d="M0,600 C200,560 400,580 600,540 C800,500 1000,520 1200,500 L1200,800 L0,800 Z"
              fill="#81b14f"
            />
          </svg>

          {/* Pond/Lake */}
          <ellipse
            cx="300"
            cy="650"
            rx="80"
            ry="25"
            fill="#164460"
            className="absolute opacity-80"
          />
          <ellipse
            cx="300"
            cy="648"
            rx="70"
            ry="20"
            fill="#036827"
            className="absolute opacity-40"
          />

          {/* Trees - Various sizes and positions */}
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800">
            {/* Large pine trees */}
            <g transform="translate(150,580)">
              <polygon points="0,0 -15,40 15,40" fill="#0C5418" />
              <polygon points="0,25 -12,55 12,55" fill="#0C5418" />
              <rect x="-2" y="55" width="4" height="15" fill="#57381D" />
            </g>
            
            <g transform="translate(450,600)">
              <polygon points="0,0 -20,50 20,50" fill="#036827" />
              <polygon points="0,30 -15,65 15,65" fill="#036827" />
              <rect x="-3" y="65" width="6" height="20" fill="#57381D" />
            </g>

            <g transform="translate(750,590)">
              <polygon points="0,0 -18,45 18,45" fill="#0C5418" />
              <polygon points="0,25 -14,60 14,60" fill="#0C5418" />
              <rect x="-2" y="60" width="4" height="18" fill="#57381D" />
            </g>

            {/* Medium trees */}
            <g transform="translate(250,620)">
              <polygon points="0,0 -12,35 12,35" fill="#036827" />
              <polygon points="0,20 -10,45 10,45" fill="#036827" />
              <rect x="-2" y="45" width="4" height="12" fill="#57381D" />
            </g>

            <g transform="translate(650,610)">
              <polygon points="0,0 -14,40 14,40" fill="#0C5418" />
              <polygon points="0,25 -11,50 11,50" fill="#0C5418" />
              <rect x="-2" y="50" width="4" height="15" fill="#57381D" />
            </g>

            {/* Small background trees */}
            <g transform="translate(100,630)">
              <polygon points="0,0 -8,25 8,25" fill="#036827" opacity="0.7" />
              <rect x="-1" y="25" width="2" height="8" fill="#57381D" />
            </g>

            <g transform="translate(550,635)">
              <polygon points="0,0 -9,28 9,28" fill="#0C5418" opacity="0.6" />
              <rect x="-1" y="28" width="2" height="10" fill="#57381D" />
            </g>

            <g transform="translate(850,625)">
              <polygon points="0,0 -10,30 10,30" fill="#036827" opacity="0.8" />
              <rect x="-1" y="30" width="2" height="9" fill="#57381D" />
            </g>
          </svg>

          {/* Park Bench */}
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800">
            <g transform="translate(900,650)">
              {/* Bench seat */}
              <rect x="0" y="0" width="60" height="6" fill="#57381D" />
              {/* Bench back */}
              <rect x="0" y="-15" width="60" height="4" fill="#57381D" />
              {/* Bench legs */}
              <rect x="5" y="6" width="3" height="15" fill="#57381D" />
              <rect x="52" y="6" width="3" height="15" fill="#57381D" />
              {/* Support bars */}
              <rect x="5" y="-11" width="3" height="17" fill="#57381D" />
              <rect x="52" y="-11" width="3" height="17" fill="#57381D" />
            </g>
          </svg>

          {/* Chess Table */}
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800">
            <g transform="translate(500,660)">
              {/* Table top */}
              <rect x="0" y="0" width="40" height="40" fill="#57381D" />
              {/* Chess board pattern */}
              <rect x="2" y="2" width="4" height="4" fill="#164460" />
              <rect x="10" y="2" width="4" height="4" fill="#164460" />
              <rect x="18" y="2" width="4" height="4" fill="#164460" />
              <rect x="26" y="2" width="4" height="4" fill="#164460" />
              <rect x="34" y="2" width="4" height="4" fill="#164460" />
              
              <rect x="6" y="6" width="4" height="4" fill="#164460" />
              <rect x="14" y="6" width="4" height="4" fill="#164460" />
              <rect x="22" y="6" width="4" height="4" fill="#164460" />
              <rect x="30" y="6" width="4" height="4" fill="#164460" />
              
              {/* Table legs */}
              <rect x="5" y="40" width="3" height="20" fill="#57381D" />
              <rect x="32" y="40" width="3" height="20" fill="#57381D" />
            </g>
          </svg>

          {/* Bushes and small plants */}
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800">
            {/* Bushes */}
            <ellipse cx="80" cy="680" rx="25" ry="15" fill="#81b14f" opacity="0.9" />
            <ellipse cx="200" cy="690" rx="20" ry="12" fill="#036827" opacity="0.8" />
            <ellipse cx="380" cy="675" rx="30" ry="18" fill="#81b14f" opacity="0.9" />
            <ellipse cx="700" cy="685" rx="22" ry="14" fill="#0C5418" opacity="0.7" />
            <ellipse cx="950" cy="680" rx="28" ry="16" fill="#81b14f" opacity="0.8" />
            
            {/* Small flowers/plants */}
            <circle cx="120" cy="685" r="2" fill="#81b14f" />
            <circle cx="125" cy="682" r="1.5" fill="#81b14f" />
            <circle cx="320" cy="690" r="2" fill="#81b14f" />
            <circle cx="600" cy="688" r="1.5" fill="#81b14f" />
            <circle cx="800" cy="692" r="2" fill="#81b14f" />
          </svg>

          {/* Gentle floating elements (seeds, fireflies) */}
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-60 animate-firefly" />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-200 rounded-full opacity-50 animate-firefly" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-yellow-300 rounded-full opacity-40 animate-firefly" style={{ animationDelay: '4s' }} />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-70 animate-firefly" style={{ animationDelay: '6s' }} />
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