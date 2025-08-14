import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useWarpNavigation } from "@/features/warp/useWarpNavigation";

const Home = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/home` : "/home";
  const warpNav = useWarpNavigation();

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home • John's Portfolio",
    url: canonical,
    description: "Lush forest scene with swaying trees and natural beauty.",
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
          content="Lush forest scene with swaying trees and natural beauty."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Home • John's Portfolio" />
        <meta
          property="og:description"
          content="A beautiful lush forest scene with swaying trees and natural beauty."
        />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <main className="relative h-screen overflow-hidden">
        {/* Sky - only 1/3 of screen */}
        <div className="absolute inset-0 h-1/3" style={{ background: "linear-gradient(to bottom, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)" }}>
          {/* Fluffy clouds */}
          <div className="absolute top-8 left-20 w-16 h-8 rounded-full opacity-80" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-12 left-24 w-12 h-6 rounded-full opacity-60" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-6 right-32 w-20 h-10 rounded-full opacity-70" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-10 right-36 w-14 h-7 rounded-full opacity-50" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-16 left-1/2 w-18 h-9 rounded-full opacity-75" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
        </div>

        {/* Mountains/Hills in background */}
        <div className="absolute top-1/3 w-full h-2/3">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMin slice">
            {/* Far mountain range */}
            <path d="M0,200 Q300,100 600,150 Q900,200 1200,120 L1200,600 L0,600 Z" fill="#164460" opacity="0.6" />
            <path d="M0,250 Q200,150 400,180 Q600,220 800,160 Q1000,100 1200,140 L1200,600 L0,600 Z" fill="#0C5418" opacity="0.7" />
            
            {/* Middle hills with forest */}
            <path d="M0,300 Q150,220 300,240 Q450,260 600,200 Q750,140 900,180 Q1050,220 1200,160 L1200,600 L0,600 Z" fill="#036827" opacity="0.85" />
            
            {/* Foreground forest base */}
            <path d="M0,350 Q100,280 200,300 Q300,320 400,290 Q500,260 600,280 Q700,300 800,270 Q900,240 1000,260 Q1100,280 1200,250 L1200,600 L0,600 Z" fill="#81b14f" />
          </svg>
        </div>

        {/* Waterfall */}
        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: "calc(33.33% + 50px)", width: "8px", height: "250px" }}>
          <div className="w-full h-full relative overflow-hidden">
            {/* Main waterfall stream */}
            <div 
              className="absolute inset-0 opacity-90"
              style={{
                background: "linear-gradient(to bottom, rgba(173, 216, 230, 0.9) 0%, rgba(135, 206, 235, 0.8) 50%, rgba(30, 144, 255, 0.7) 100%)",
                animation: "waterfall-flow 1.5s linear infinite"
              }}
            />
            {/* Water spray effect */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{
                background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, transparent 30%)",
                animation: "water-mist 2s ease-in-out infinite alternate"
              }}
            />
          </div>
        </div>

        {/* River flowing through forest */}
        <div className="absolute bottom-0 w-full h-32">
          <svg className="w-full h-full" viewBox="0 0 1200 150" preserveAspectRatio="xMidYMax slice">
            {/* River path */}
            <path 
              d="M600,0 Q500,30 400,40 Q300,50 200,45 Q100,40 0,50 L0,80 Q100,70 200,75 Q300,80 400,70 Q500,60 600,30 Q700,60 800,70 Q900,80 1000,75 Q1100,70 1200,80 L1200,50 Q1100,40 1000,45 Q900,50 800,40 Q700,30 600,0 Z" 
              fill="#164460" 
              opacity="0.8"
            />
            <path 
              d="M600,5 Q500,35 400,45 Q300,55 200,50 Q100,45 0,55 L0,85 Q100,75 200,80 Q300,85 400,75 Q500,65 600,35 Q700,65 800,75 Q900,85 1000,80 Q1100,75 1200,85 L1200,55 Q1100,45 1000,50 Q900,55 800,45 Q700,35 600,5 Z" 
              fill="#4682B4" 
              opacity="0.6"
              style={{ animation: "river-flow 3s ease-in-out infinite" }}
            />
            {/* River reflections */}
            <ellipse cx="300" cy="60" rx="20" ry="5" fill="rgba(255, 255, 255, 0.3)" opacity="0.8" style={{ animation: "water-shimmer 2s ease-in-out infinite alternate" }} />
            <ellipse cx="700" cy="65" rx="15" ry="4" fill="rgba(255, 255, 255, 0.3)" opacity="0.6" style={{ animation: "water-shimmer 2.5s ease-in-out infinite alternate" }} />
            <ellipse cx="1000" cy="70" rx="18" ry="6" fill="rgba(255, 255, 255, 0.3)" opacity="0.7" style={{ animation: "water-shimmer 1.8s ease-in-out infinite alternate" }} />
          </svg>
        </div>

        {/* Dense forest with realistic trees */}
        <div className="absolute top-1/3 w-full h-2/3">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMin slice">
            {/* Background layer trees - small and distant */}
            {Array.from({ length: 40 }, (_, i) => {
              const x = (i * 30) + (Math.random() * 20);
              const y = 200 + (Math.random() * 50);
              const height = 40 + (Math.random() * 20);
              const width = height * 0.6;
              const animationClass = i % 3 === 0 ? "animate-sway-slow" : i % 3 === 1 ? "animate-sway-medium" : "";
              
              return (
                <g key={`bg-tree-${i}`} transform={`translate(${x},${y})`} opacity="0.6" className={animationClass}>
                  {/* Tree trunk */}
                  <rect x={-width * 0.05} y={height - 10} width={width * 0.1} height="15" fill="#57381D" />
                  {/* Tree canopy - layered for depth */}
                  <ellipse cx="0" cy={height - 25} rx={width * 0.4} ry={height * 0.3} fill="#0C5418" />
                  <ellipse cx="0" cy={height - 30} rx={width * 0.35} ry={height * 0.25} fill="#036827" />
                  <ellipse cx="0" cy={height - 35} rx={width * 0.3} ry={height * 0.2} fill="#81b14f" />
                </g>
              );
            })}

            {/* Middle layer trees - medium size */}
            {Array.from({ length: 25 }, (_, i) => {
              const x = (i * 48) + (Math.random() * 30);
              const y = 300 + (Math.random() * 80);
              const height = 60 + (Math.random() * 30);
              const width = height * 0.7;
              const animationClass = i % 2 === 0 ? "animate-sway-slow" : "animate-sway-medium";
              
              return (
                <g key={`mid-tree-${i}`} transform={`translate(${x},${y})`} opacity="0.8" className={animationClass}>
                  {/* Tree trunk */}
                  <rect x={-width * 0.06} y={height - 15} width={width * 0.12} height="20" fill="#57381D" />
                  {/* Tree canopy - multiple layers for realism */}
                  <ellipse cx="0" cy={height - 35} rx={width * 0.45} ry={height * 0.35} fill="#0C5418" />
                  <ellipse cx="0" cy={height - 40} rx={width * 0.4} ry={height * 0.3} fill="#036827" />
                  <ellipse cx="0" cy={height - 45} rx={width * 0.35} ry={height * 0.25} fill="#81b14f" />
                  <ellipse cx="0" cy={height - 50} rx={width * 0.25} ry={height * 0.18} fill="#036827" />
                </g>
              );
            })}

            {/* Foreground trees - large and detailed */}
            {Array.from({ length: 15 }, (_, i) => {
              const x = (i * 80) + (Math.random() * 40);
              const y = 400 + (Math.random() * 100);
              const height = 80 + (Math.random() * 40);
              const width = height * 0.8;
              const animationClass = i % 2 === 0 ? "animate-sway-slow" : "animate-sway-medium";
              
              return (
                <g key={`fg-tree-${i}`} transform={`translate(${x},${y})`} className={animationClass}>
                  {/* Tree trunk with texture */}
                  <rect x={-width * 0.08} y={height - 25} width={width * 0.16} height="30" fill="#57381D" />
                  <rect x={-width * 0.07} y={height - 20} width={width * 0.02} height="25" fill="#8B4513" opacity="0.8" />
                  <rect x={width * 0.05} y={height - 22} width={width * 0.02} height="27" fill="#8B4513" opacity="0.6" />
                  
                  {/* Complex tree canopy */}
                  <ellipse cx="0" cy={height - 45} rx={width * 0.5} ry={height * 0.4} fill="#0C5418" />
                  <ellipse cx={-width * 0.2} cy={height - 50} rx={width * 0.3} ry={height * 0.25} fill="#036827" />
                  <ellipse cx={width * 0.15} cy={height - 48} rx={width * 0.35} ry={height * 0.28} fill="#036827" />
                  <ellipse cx="0" cy={height - 55} rx={width * 0.4} ry={height * 0.3} fill="#81b14f" />
                  <ellipse cx={-width * 0.1} cy={height - 60} rx={width * 0.25} ry={height * 0.2} fill="#81b14f" />
                  <ellipse cx={width * 0.1} cy={height - 58} rx={width * 0.28} ry={height * 0.22} fill="#036827" />
                </g>
              );
            })}

            {/* Additional forest undergrowth */}
            {Array.from({ length: 60 }, (_, i) => {
              const x = Math.random() * 1200;
              const y = 450 + (Math.random() * 100);
              const size = 10 + (Math.random() * 15);
              
              return (
                <g key={`undergrowth-${i}`} transform={`translate(${x},${y})`} opacity="0.7">
                  <ellipse cx="0" cy="0" rx={size * 0.8} ry={size * 0.4} fill="#81b14f" />
                  <ellipse cx={size * 0.3} cy={-size * 0.2} rx={size * 0.5} ry={size * 0.3} fill="#036827" />
                  <ellipse cx={-size * 0.2} cy={-size * 0.1} rx={size * 0.6} ry={size * 0.35} fill="#0C5418" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating particles and atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Fireflies */}
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute top-3/5 right-1/3 w-1 h-1 bg-yellow-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '4s' }} />
          
          {/* Floating seeds/pollen */}
          <div className="absolute top-2/5 left-1/5 w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-35 animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-3/5 left-3/4 w-0.5 h-0.5 bg-white rounded-full opacity-30 animate-float" style={{ animationDelay: '5s' }} />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex h-screen flex-col">
          {/* Subtle title at top */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <h1 
              className="text-3xl font-light tracking-wider text-white/90 select-none" 
              style={{ 
                fontFamily: "'Inter', sans-serif",
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              Home
            </h1>
          </div>
          
          {/* Back button - top left corner */}
          <div className="absolute top-6 left-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/70 hover:text-white/90 hover:bg-white/10 backdrop-blur-sm border border-white/20"
              onClick={(e) => {
                e.preventDefault();
                warpNav.start('/');
              }}
            >
              ← Back
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;