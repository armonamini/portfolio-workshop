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
        {/* Sky - only 1/3 of screen with consistent dark blue */}
        <div className="absolute inset-0 h-1/3 bg-slate-900">
          {/* Fluffy clouds */}
          <div className="absolute top-8 left-20 w-16 h-8 rounded-full opacity-60" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-12 left-24 w-12 h-6 rounded-full opacity-40" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-6 right-32 w-20 h-10 rounded-full opacity-50" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-10 right-36 w-14 h-7 rounded-full opacity-30" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
          <div className="absolute top-16 left-1/2 w-18 h-9 rounded-full opacity-45" style={{ background: "radial-gradient(ellipse, white 30%, transparent 70%)" }} />
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

        {/* S-shaped river flowing through forest */}
        <div className="absolute bottom-0 w-full h-40">
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice">
            {/* S-shaped river path */}
            <path 
              d="M0,60 Q200,40 400,80 Q600,120 800,80 Q1000,40 1200,60 L1200,90 Q1000,70 800,110 Q600,150 400,110 Q200,70 0,90 Z" 
              fill="#164460" 
              opacity="0.8"
            />
            <path 
              d="M0,65 Q200,45 400,85 Q600,125 800,85 Q1000,45 1200,65 L1200,95 Q1000,75 800,115 Q600,155 400,115 Q200,75 0,95 Z" 
              fill="#4682B4" 
              opacity="0.6"
              style={{ animation: "river-flow 3s ease-in-out infinite" }}
            />
            {/* River reflections along the S curve */}
            <ellipse cx="300" cy="75" rx="15" ry="4" fill="rgba(255, 255, 255, 0.3)" opacity="0.8" style={{ animation: "water-shimmer 2s ease-in-out infinite alternate" }} />
            <ellipse cx="600" cy="105" rx="20" ry="5" fill="rgba(255, 255, 255, 0.3)" opacity="0.6" style={{ animation: "water-shimmer 2.5s ease-in-out infinite alternate" }} />
            <ellipse cx="900" cy="75" rx="18" ry="4" fill="rgba(255, 255, 255, 0.3)" opacity="0.7" style={{ animation: "water-shimmer 1.8s ease-in-out infinite alternate" }} />
          </svg>
        </div>

        {/* Dense forest with realistic trees */}
        <div className="absolute top-1/3 w-full h-2/3">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMin slice">
            {/* Background layer trees - small and distant - properly distributed */}
            {Array.from({ length: 50 }, (_, i) => {
              const x = (i * 24) + (Math.random() * 20 - 10); // Better distribution across full width
              const y = 200 + (Math.random() * 80);
              const height = 30 + (Math.random() * 25);
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

            {/* Middle layer trees - medium size - properly distributed */}
            {Array.from({ length: 35 }, (_, i) => {
              const x = (i * 34) + (Math.random() * 30 - 15); // Better distribution
              const y = 280 + (Math.random() * 100);
              const height = 50 + (Math.random() * 35);
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

            {/* Foreground trees - large and detailed - properly distributed */}
            {Array.from({ length: 20 }, (_, i) => {
              const x = (i * 60) + (Math.random() * 40 - 20); // Better distribution
              const y = 380 + (Math.random() * 120);
              const height = 70 + (Math.random() * 50);
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

            {/* Dense undergrowth layer 1 - covering most of the forest floor */}
            {Array.from({ length: 120 }, (_, i) => {
              const x = (i / 120) * 1200 + (Math.random() - 0.5) * 40;
              const y = 420 + (Math.random() * 120);
              const size = 8 + (Math.random() * 18);
              
              return (
                <g key={`undergrowth1-${i}`} transform={`translate(${x},${y})`} opacity="0.8">
                  <ellipse cx="0" cy="0" rx={size * 0.9} ry={size * 0.5} fill="#81b14f" />
                  <ellipse cx={size * 0.3} cy={-size * 0.3} rx={size * 0.6} ry={size * 0.4} fill="#036827" />
                  <ellipse cx={-size * 0.2} cy={-size * 0.2} rx={size * 0.7} ry={size * 0.45} fill="#0C5418" />
                </g>
              );
            })}

            {/* Dense undergrowth layer 2 - additional coverage */}
            {Array.from({ length: 100 }, (_, i) => {
              const x = Math.random() * 1200;
              const y = 450 + (Math.random() * 100);
              const size = 6 + (Math.random() * 12);
              
              return (
                <g key={`undergrowth2-${i}`} transform={`translate(${x},${y})`} opacity="0.7">
                  <ellipse cx="0" cy="0" rx={size * 0.8} ry={size * 0.4} fill="#81b14f" />
                  <ellipse cx={size * 0.4} cy={-size * 0.1} rx={size * 0.5} ry={size * 0.3} fill="#036827" />
                </g>
              );
            })}

            {/* Ground ferns and detailed vegetation */}
            {Array.from({ length: 80 }, (_, i) => {
              const x = Math.random() * 1200;
              const y = 480 + (Math.random() * 80);
              const width = 12 + (Math.random() * 20);
              const height = 8 + (Math.random() * 15);
              
              return (
                <g key={`fern-${i}`} transform={`translate(${x},${y})`} opacity="0.9">
                  {/* Fern fronds */}
                  <ellipse cx="0" cy="0" rx={width * 0.4} ry={height * 0.6} fill="#81b14f" />
                  <ellipse cx={width * 0.2} cy={-height * 0.3} rx={width * 0.3} ry={height * 0.4} fill="#036827" />
                  <ellipse cx={-width * 0.15} cy={-height * 0.2} rx={width * 0.35} ry={height * 0.5} fill="#0C5418" />
                  {/* Detailed fern leaves */}
                  <ellipse cx={width * 0.1} cy={-height * 0.4} rx={width * 0.15} ry={height * 0.25} fill="#81b14f" />
                  <ellipse cx={-width * 0.1} cy={-height * 0.35} rx={width * 0.2} ry={height * 0.3} fill="#036827" />
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