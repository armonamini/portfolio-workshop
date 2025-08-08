import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { ArrowRight, Mail, Github, Linkedin } from "lucide-react";
import ProjectCard from "@/components/portfolio/ProjectCard";

const Index = () => {
  const canonical = typeof window !== "undefined" ? `${window.location.origin}/` : "/";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    url: canonical,
    jobTitle: "Creative Developer",
    sameAs: [
      "https://github.com/yourname",
      "https://www.linkedin.com/in/yourname/"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Your Name — Creative Developer Portfolio</title>
        <meta name="description" content="Creative developer portfolio: modern web experiences, performant UI, and polished interactions. Explore selected projects and get in touch." />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Your Name — Creative Developer Portfolio" />
        <meta property="og:description" content="Modern web experiences, performant UI, and polished interactions." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <header className="relative">
        <nav className="container mx-auto flex items-center justify-between py-6">
          <a href="#home" className="text-lg font-semibold tracking-tight text-foreground">Your Name</a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="text-foreground/90 hover:text-foreground transition-colors">Projects</a>
            <a href="#about" className="text-foreground/90 hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="text-foreground/90 hover:text-foreground transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      <main id="home" className="relative overflow-hidden">
        {/* Decorative hero background */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt="Abstract purple gradient background with flowing waves"
            className="h-full w-full object-cover opacity-50"
            aria-hidden="true"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[var(--gradient-subtle)]" aria-hidden="true" />
        </div>

        {/* Hero section */}
        <section className="container mx-auto pt-16 pb-20 md:pt-28 md:pb-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground animate-fade-in-up">
              Your Name — Creative Developer Portfolio
            </h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
              I craft modern interfaces with clean code, strong aesthetics, and subtle interactions. Explore my selected work and let’s create something memorable.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="hero">
                <a href="#projects" aria-label="View Projects">
                  View Projects
                  <ArrowRight className="ml-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact" aria-label="Get in touch">
                  Get in touch
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container mx-auto py-12 md:py-20">
          <header className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Selected Projects</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">A few highlights showcasing design systems, data viz, and immersive interactions.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard
              title="Analytics Dashboard"
              description="A modular, responsive dashboard with real-time charts and theming."
              image={project1}
              href="#"
            />
            <ProjectCard
              title="Mobile Commerce"
              description="Clean, fast, and accessible shopping experience on mobile."
              image={project2}
              href="#"
            />
            <ProjectCard
              title="Creative Landing"
              description="Expressive visuals, strong typography, and subtle motion."
              image={project3}
              href="#"
            />
          </div>
        </section>

        {/* About */}
        <section id="about" className="container mx-auto py-12 md:py-20">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
          </header>
          <div className="max-w-3xl space-y-4 text-foreground/85">
            <p>
              I’m a creative developer focused on crafting elegant, performant UIs. My approach blends solid engineering with thoughtful visual design to deliver products that feel effortless.
            </p>
            <p>
              I collaborate with teams to build design systems, animations that respect performance, and delightful micro-interactions.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container mx-auto py-12 md:py-20">
          <header className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>
          </header>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button asChild variant="secondary">
              <a href="mailto:hello@example.com" aria-label="Email me">
                <Mail className="mr-2" /> hello@example.com
              </a>
            </Button>
            <div className="flex items-center gap-3">
              <a href="https://github.com/yourname" className="inline-flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors" aria-label="GitHub">
                <Github /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/yourname/" className="inline-flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin /> LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="container mx-auto py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Index;
