import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

// Temporarily disabled Three.js components to fix white screen issue
// const BlueMountains = lazy(() => import("@/features/blue-geo/BlueMountains").then(m => ({ default: m.BlueMountains })));
// const FallbackWaves = lazy(() => import("@/features/blue-geo/FallbackWaves").then(m => ({ default: m.FallbackWaves })));

const Home = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/home` : "/home";

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

      {/* Background - using CSS gradient for now */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0A2F47] to-[#125A8A]" />
      
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
            {/* Content removed as requested */}
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
