import { Helmet } from "react-helmet-async";
import { Suspense, lazy, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { hasWebGL, prefersReducedMotion } from "@/utils/webgl";

// Lazy load the background components
const BlueMountains = lazy(() => import("@/features/blue-geo/BlueMountains").then(m => ({ default: m.BlueMountains })));
const FallbackWaves = lazy(() => import("@/features/blue-geo/FallbackWaves").then(m => ({ default: m.FallbackWaves })));

const Home = () => {
  const [useWebGL, setUseWebGL] = useState(false);
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/home` : "/home";

  useEffect(() => {
    // Check WebGL support and preferences
    const shouldUseWebGL = hasWebGL() && !prefersReducedMotion;
    console.log('Home: WebGL support check:', { hasWebGL: hasWebGL(), prefersReducedMotion, shouldUseWebGL });
    setUseWebGL(shouldUseWebGL);
  }, []);

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
        <title>John's Portfolio — Home</title>
        <meta
          name="description"
          content="Welcome to John's portfolio home page with futuristic blue mountains background."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="John's Portfolio — Home" />
        <meta
          property="og:description"
          content="Welcome to John's portfolio home page with futuristic blue mountains background."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      {/* Background */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0A2F47] to-[#125A8A]" />}>
        {useWebGL ? <BlueMountains /> : <FallbackWaves />}
      </Suspense>
      
      {/* Fallback background in case everything fails */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#0A2F47] to-[#125A8A]" />

      {/* Main content */}
      <main className="relative min-h-screen">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10 p-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">John's Portfolio</h1>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <a href="/">Back to Landing</a>
            </Button>
          </div>
        </nav>

        {/* Hero section */}
        <section className="container mx-auto flex min-h-screen items-center justify-center px-4 pt-20">
          <div className="relative w-full max-w-4xl text-center">
            <h2 
              className="text-5xl md:text-7xl font-black tracking-wider text-white mb-8"
              style={{ 
                fontFamily: "'Orbitron', monospace",
                filter: 'drop-shadow(0 4px 20px rgba(191, 230, 250, 0.5))',
                textShadow: '0 0 30px rgba(191, 230, 250, 0.8), 0 0 60px rgba(191, 230, 250, 0.4)'
              }}
            >
              Welcome Home
            </h2>
            
            <p className="text-xl md:text-2xl text-[#BFE6FA] mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore the depths of creativity in this futuristic space where innovation meets design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-[#125A8A] hover:bg-[#1973B0] text-white border-0">
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="border-[#BFE6FA] text-[#BFE6FA] hover:bg-[#BFE6FA]/10">
                Contact Me
              </Button>
            </div>
          </div>
        </section>

        {/* Content sections */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">About</h3>
              <p className="text-[#BFE6FA] leading-relaxed">
                A creative developer passionate about building immersive digital experiences 
                that push the boundaries of what's possible on the web.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Three.js', 'WebGL', 'Node.js', 'Python'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-[#125A8A]/50 text-[#BFE6FA] rounded-full text-sm border border-[#BFE6FA]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
