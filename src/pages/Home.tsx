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

      <main className="relative min-h-screen overflow-hidden">
        {/* Sky gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-blue-800 to-slate-900" />
        
        {/* Stars in the sky */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-32 left-40 w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-16 left-80 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-40 left-60 w-0.5 h-0.5 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute top-24 left-120 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Lush Green Hills - Multiple layers */}
        <div className="pointer-events-none absolute inset-0 -z-[5]" aria-hidden="true">
          {/* Far hills - dark green */}
          <div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[140%] h-[50%] blur-3xl"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 50%, rgba(34, 197, 94, 0.15), transparent 70%)",
              animation: "wave-drift-1 20s ease-in-out infinite alternate",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(22, 163, 74, 0.12) 10%, transparent 40%, transparent 60%, rgba(21, 128, 61, 0.10) 90%)",
                backgroundSize: "200% 200%",
                animation: "shimmer-shift 50s linear infinite",
                mixBlendMode: "screen",
                opacity: 0.4,
                maskImage: "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
              }}
            />
          </div>

          {/* Middle hills - medium green */}
          <div
            className="absolute top-[25%] left-1/3 w-[130%] h-[55%] blur-3xl"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 50%, rgba(74, 222, 128, 0.12), transparent 70%)",
              animation: "wave-drift-2 24s ease-in-out infinite alternate",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(34, 197, 94, 0.15) 10%, transparent 50%, transparent 60%, rgba(22, 163, 74, 0.12) 90%)",
                backgroundSize: "200% 200%",
                animation: "shimmer-shift 55s linear infinite, glow-breathe 28s ease-in-out infinite",
                mixBlendMode: "screen",
                opacity: 0.35,
                maskImage: "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
              }}
            />
          </div>

          {/* Near hills - light green */}
          <div
            className="absolute top-[35%] left-1/4 w-[120%] h-[60%] blur-3xl"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 50%, rgba(132, 204, 22, 0.10), transparent 70%)",
              animation: "wave-drift-1 18s ease-in-out infinite alternate",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(74, 222, 128, 0.12) 10%, transparent 40%, transparent 60%, rgba(34, 197, 94, 0.10) 90%)",
                backgroundSize: "200% 200%",
                animation: "shimmer-shift 45s linear infinite",
                mixBlendMode: "screen",
                opacity: 0.3,
                maskImage: "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
              }}
            />
          </div>

          {/* Foreground hills - bright green */}
          <div
            className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[110%] h-[65%] blur-3xl"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 50%, rgba(163, 230, 53, 0.08), transparent 70%)",
              animation: "wave-drift-2 22s ease-in-out infinite alternate",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(120deg, rgba(132, 204, 22, 0.10) 10%, transparent 50%, transparent 60%, rgba(74, 222, 128, 0.08) 90%)",
                backgroundSize: "200% 200%",
                animation: "shimmer-shift 52s linear infinite, glow-breathe 26s ease-in-out infinite",
                mixBlendMode: "screen",
                opacity: 0.25,
                maskImage: "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
              }}
            />
          </div>
        </div>

        {/* Lush Forest - Multiple layers of trees */}
        <div className="absolute bottom-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            {/* Background trees - smaller, swaying gently */}
            <g transform="translate(50,620)" opacity="0.6" className="animate-sway-slow">
              <polygon points="0,0 -8,25 8,25" fill="#166534" />
              <rect x="-1" y="25" width="2" height="8" fill="#92400e" />
            </g>
            <g transform="translate(120,625)" opacity="0.7" className="animate-sway-medium">
              <polygon points="0,0 -10,30 10,30" fill="#15803d" />
              <rect x="-1.5" y="30" width="3" height="10" fill="#92400e" />
            </g>
            <g transform="translate(200,615)" opacity="0.5" className="animate-sway-slow">
              <polygon points="0,0 -7,22 7,22" fill="#166534" />
              <rect x="-1" y="22" width="2" height="7" fill="#92400e" />
            </g>
            <g transform="translate(280,630)" opacity="0.6" className="animate-sway-medium">
              <polygon points="0,0 -9,28 9,28" fill="#15803d" />
              <rect x="-1.2" y="28" width="2.4" height="9" fill="#92400e" />
            </g>
            <g transform="translate(350,620)" opacity="0.7" className="animate-sway-slow">
              <polygon points="0,0 -8,26 8,26" fill="#166534" />
              <rect x="-1.1" y="26" width="2.2" height="8" fill="#92400e" />
            </g>
            <g transform="translate(420,625)" opacity="0.6" className="animate-sway-medium">
              <polygon points="0,0 -9,29 9,29" fill="#15803d" />
              <rect x="-1.3" y="29" width="2.6" height="9" fill="#92400e" />
            </g>
            <g transform="translate(500,615)" opacity="0.5" className="animate-sway-slow">
              <polygon points="0,0 -7,24 7,24" fill="#166534" />
              <rect x="-1" y="24" width="2" height="8" fill="#92400e" />
            </g>
            <g transform="translate(580,630)" opacity="0.7" className="animate-sway-medium">
              <polygon points="0,0 -10,31 10,31" fill="#15803d" />
              <rect x="-1.4" y="31" width="2.8" height="10" fill="#92400e" />
            </g>
            <g transform="translate(650,620)" opacity="0.6" className="animate-sway-slow">
              <polygon points="0,0 -8,27 8,27" fill="#166534" />
              <rect x="-1.2" y="27" width="2.4" height="8" fill="#92400e" />
            </g>
            <g transform="translate(720,625)" opacity="0.7" className="animate-sway-medium">
              <polygon points="0,0 -9,30 9,30" fill="#15803d" />
              <rect x="-1.3" y="30" width="2.6" height="9" fill="#92400e" />
            </g>
            <g transform="translate(800,615)" opacity="0.5" className="animate-sway-slow">
              <polygon points="0,0 -7,23 7,23" fill="#166534" />
              <rect x="-1" y="23" width="2" height="7" fill="#92400e" />
            </g>
            <g transform="translate(880,630)" opacity="0.6" className="animate-sway-medium">
              <polygon points="0,0 -10,32 10,32" fill="#15803d" />
              <rect x="-1.4" y="32" width="2.8" height="10" fill="#92400e" />
            </g>
            <g transform="translate(950,620)" opacity="0.7" className="animate-sway-slow">
              <polygon points="0,0 -8,28 8,28" fill="#166534" />
              <rect x="-1.2" y="28" width="2.4" height="8" fill="#92400e" />
            </g>
            <g transform="translate(1020,625)" opacity="0.6" className="animate-sway-medium">
              <polygon points="0,0 -9,29 9,29" fill="#15803d" />
              <rect x="-1.3" y="29" width="2.6" height="9" fill="#92400e" />
            </g>
            <g transform="translate(1100,615)" opacity="0.5" className="animate-sway-slow">
              <polygon points="0,0 -7,25 7,25" fill="#166534" />
              <rect x="-1" y="25" width="2" height="8" fill="#92400e" />
            </g>

            {/* Middle layer trees - medium size, more sway */}
            <g transform="translate(80,580)" opacity="0.8" className="animate-sway-medium">
              <polygon points="0,0 -12,35 12,35" fill="#15803d" />
              <polygon points="0,20 -10,50 10,50" fill="#15803d" />
              <rect x="-2" y="50" width="4" height="15" fill="#92400e" />
            </g>
            <g transform="translate(180,590)" opacity="0.9" className="animate-sway-slow">
              <polygon points="0,0 -14,40 14,40" fill="#166534" />
              <polygon points="0,25 -12,55 12,55" fill="#166534" />
              <rect x="-2.5" y="55" width="5" height="18" fill="#92400e" />
            </g>
            <g transform="translate(280,585)" opacity="0.8" className="animate-sway-medium">
              <polygon points="0,0 -13,38 13,38" fill="#15803d" />
              <polygon points="0,22 -11,52 11,52" fill="#15803d" />
              <rect x="-2" y="52" width="4" height="16" fill="#92400e" />
            </g>
            <g transform="translate(380,595)" opacity="0.9" className="animate-sway-slow">
              <polygon points="0,0 -15,42 15,42" fill="#166534" />
              <polygon points="0,28 -13,58 13,58" fill="#166534" />
              <rect x="-2.5" y="58" width="5" height="19" fill="#92400e" />
            </g>
            <g transform="translate(480,580)" opacity="0.8" className="animate-sway-medium">
              <polygon points="0,0 -11,32 11,32" fill="#15803d" />
              <polygon points="0,18 -9,47 9,47" fill="#15803d" />
              <rect x="-1.8" y="47" width="3.6" height="14" fill="#92400e" />
            </g>
            <g transform="translate(580,590)" opacity="0.9" className="animate-sway-slow">
              <polygon points="0,0 -14,41 14,41" fill="#166534" />
              <polygon points="0,26 -12,56 12,56" fill="#166534" />
              <rect x="-2.5" y="56" width="5" height="18" fill="#92400e" />
            </g>
            <g transform="translate(680,585)" opacity="0.8" className="animate-sway-medium">
              <polygon points="0,0 -12,36 12,36" fill="#15803d" />
              <polygon points="0,21 -10,51 10,51" fill="#15803d" />
              <rect x="-2" y="51" width="4" height="15" fill="#92400e" />
            </g>
            <g transform="translate(780,595)" opacity="0.9" className="animate-sway-slow">
              <polygon points="0,0 -16,44 16,44" fill="#166534" />
              <polygon points="0,29 -13,59 13,59" fill="#166534" />
              <rect x="-2.5" y="59" width="5" height="20" fill="#92400e" />
            </g>
            <g transform="translate(880,580)" opacity="0.8" className="animate-sway-medium">
              <polygon points="0,0 -13,37 13,37" fill="#15803d" />
              <polygon points="0,23 -11,53 11,53" fill="#15803d" />
              <rect x="-2" y="53" width="4" height="16" fill="#92400e" />
            </g>
            <g transform="translate(980,590)" opacity="0.9" className="animate-sway-slow">
              <polygon points="0,0 -15,43 15,43" fill="#166534" />
              <polygon points="0,27 -12,57 12,57" fill="#166534" />
              <rect x="-2.5" y="57" width="5" height="19" fill="#92400e" />
            </g>
            <g transform="translate(1080,585)" opacity="0.8" className="animate-sway-medium">
              <polygon points="0,0 -11,33 11,33" fill="#15803d" />
              <polygon points="0,19 -9,48 9,48" fill="#15803d" />
              <rect x="-1.8" y="48" width="3.6" height="14" fill="#92400e" />
            </g>

            {/* Foreground trees - larger, more detailed, gentle sway */}
            <g transform="translate(100,620)" opacity="1" className="animate-sway-slow">
              <polygon points="0,0 -16,48 16,48" fill="#16a34a" />
              <polygon points="0,30 -14,63 14,63" fill="#16a34a" />
              <polygon points="0,55 -10,78 10,78" fill="#16a34a" />
              <rect x="-3" y="78" width="6" height="25" fill="#92400e" />
            </g>
            <g transform="translate(220,610)" opacity="1" className="animate-sway-medium">
              <polygon points="0,0 -18,52 18,52" fill="#15803d" />
              <polygon points="0,32 -15,67 15,67" fill="#15803d" />
              <polygon points="0,58 -12,82 12,82" fill="#15803d" />
              <rect x="-3.5" y="82" width="7" height="28" fill="#92400e" />
            </g>
            <g transform="translate(340,625)" opacity="1" className="animate-sway-slow">
              <polygon points="0,0 -17,50 17,50" fill="#16a34a" />
              <polygon points="0,31 -14,65 14,65" fill="#16a34a" />
              <polygon points="0,56 -11,80 11,80" fill="#16a34a" />
              <rect x="-3" y="80" width="6" height="26" fill="#92400e" />
            </g>
            <g transform="translate(460,615)" opacity="1" className="animate-sway-medium">
              <polygon points="0,0 -19,54 19,54" fill="#15803d" />
              <polygon points="0,33 -16,69 16,69" fill="#15803d" />
              <polygon points="0,59 -13,84 13,84" fill="#15803d" />
              <rect x="-3.5" y="84" width="7" height="29" fill="#92400e" />
            </g>
            <g transform="translate(580,620)" opacity="1" className="animate-sway-slow">
              <polygon points="0,0 -16,49 16,49" fill="#16a34a" />
              <polygon points="0,30 -14,64 14,64" fill="#16a34a" />
              <polygon points="0,55 -11,79 11,79" fill="#16a34a" />
              <rect x="-3" y="79" width="6" height="25" fill="#92400e" />
            </g>
            <g transform="translate(700,610)" opacity="1" className="animate-sway-medium">
              <polygon points="0,0 -18,53 18,53" fill="#15803d" />
              <polygon points="0,32 -15,68 15,68" fill="#15803d" />
              <polygon points="0,58 -12,83 12,83" fill="#15803d" />
              <rect x="-3.5" y="83" width="7" height="28" fill="#92400e" />
            </g>
            <g transform="translate(820,625)" opacity="1" className="animate-sway-slow">
              <polygon points="0,0 -17,51 17,51" fill="#16a34a" />
              <polygon points="0,31 -14,66 14,66" fill="#16a34a" />
              <polygon points="0,56 -11,81 11,81" fill="#16a34a" />
              <rect x="-3" y="81" width="6" height="26" fill="#92400e" />
            </g>
            <g transform="translate(940,615)" opacity="1" className="animate-sway-medium">
              <polygon points="0,0 -19,55 19,55" fill="#15803d" />
              <polygon points="0,33 -16,70 16,70" fill="#15803d" />
              <polygon points="0,59 -13,85 13,85" fill="#15803d" />
              <rect x="-3.5" y="85" width="7" height="29" fill="#92400e" />
            </g>
            <g transform="translate(1060,620)" opacity="1" className="animate-sway-slow">
              <polygon points="0,0 -16,50 16,50" fill="#16a34a" />
              <polygon points="0,30 -14,65 14,65" fill="#16a34a" />
              <polygon points="0,55 -11,80 11,80" fill="#16a34a" />
              <rect x="-3" y="80" width="6" height="25" fill="#92400e" />
            </g>
          </svg>
        </div>

        {/* Forest ground cover */}
        <div className="absolute bottom-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            {/* Forest floor */}
            <rect x="0" y="750" width="1200" height="50" fill="#365314" opacity="0.9" />
            <rect x="0" y="760" width="1200" height="40" fill="#3f6212" opacity="0.7" />
            
            {/* Fallen leaves scattered */}
            <ellipse cx="150" cy="755" rx="8" ry="4" fill="#84cc16" opacity="0.8" />
            <ellipse cx="280" cy="758" rx="6" ry="3" fill="#65a30d" opacity="0.7" />
            <ellipse cx="420" cy="752" rx="10" ry="5" fill="#84cc16" opacity="0.9" />
            <ellipse cx="550" cy="756" rx="7" ry="4" fill="#65a30d" opacity="0.8" />
            <ellipse cx="680" cy="753" rx="9" ry="4" fill="#84cc16" opacity="0.7" />
            <ellipse cx="820" cy="757" rx="5" ry="3" fill="#65a30d" opacity="0.9" />
            <ellipse cx="950" cy="754" rx="8" ry="4" fill="#84cc16" opacity="0.8" />
            <ellipse cx="1080" cy="756" rx="6" ry="3" fill="#65a30d" opacity="0.7" />
            
            {/* Moss patches */}
            <ellipse cx="200" cy="765" rx="25" ry="8" fill="#4ade80" opacity="0.5" />
            <ellipse cx="450" cy="768" rx="20" ry="6" fill="#4ade80" opacity="0.4" />
            <ellipse cx="750" cy="766" rx="30" ry="10" fill="#4ade80" opacity="0.6" />
            <ellipse cx="1000" cy="767" rx="18" ry="7" fill="#4ade80" opacity="0.5" />
            
            {/* Small forest mushrooms */}
            <ellipse cx="180" cy="745" rx="3" ry="6" fill="#dc2626" opacity="0.9" />
            <ellipse cx="185" cy="743" rx="2" ry="4" fill="#dc2626" opacity="0.7" />
            <ellipse cx="480" cy="748" rx="2" ry="5" fill="#dc2626" opacity="0.8" />
            <ellipse cx="720" cy="746" rx="3" ry="7" fill="#dc2626" opacity="0.9" />
            <ellipse cx="725" cy="744" rx="2" ry="5" fill="#dc2626" opacity="0.7" />
            <ellipse cx="1050" cy="747" rx="2" ry="6" fill="#dc2626" opacity="0.8" />
          </svg>
        </div>

        {/* Floating elements - fireflies and seeds */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-yellow-300 rounded-full opacity-70 animate-firefly shadow-lg shadow-yellow-300/50" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-60 animate-firefly" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/5 left-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-firefly" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-200 rounded-full opacity-80 animate-firefly" style={{ animationDelay: '6s' }} />
        <div className="absolute top-3/5 left-2/3 w-1 h-1 bg-yellow-300 rounded-full opacity-60 animate-firefly" style={{ animationDelay: '8s' }} />
        
        {/* Floating seeds */}
        <div className="absolute top-1/3 left-1/2 w-0.5 h-0.5 bg-amber-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/5 right-1/4 w-0.5 h-0.5 bg-amber-100 rounded-full opacity-35 animate-float" style={{ animationDelay: '3s' }} />

        {/* Fog overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(120% 80% at 50% 10%, transparent 40%, rgba(15, 23, 42, 0.4) 90%)'
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 flex min-h-screen flex-col">
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