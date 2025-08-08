import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, href }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotX = (py - 0.5) * -6; // tilt up/down
    const rotY = (px - 0.5) * 6;  // tilt left/right
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      className={cn(
        "group relative rounded-lg border border-border bg-card text-card-foreground overflow-hidden",
        "transition-transform duration-300 will-change-transform",
        "shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-glow)]"
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="h-full transition-transform duration-300"
        style={{ transform: "perspective(800px) rotateX(0deg) rotateY(0deg)" }}
      >
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={image}
            alt={`${title} project preview`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {href && (
            <Button asChild variant="secondary" size="sm">
              <a href={href} aria-label={`Open ${title} project`}>
                View project
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           aria-hidden="true">
        <div className="absolute -inset-32 bg-[radial-gradient(200px_200px_at_var(--x,50%)_var(--y,50%),hsl(var(--accent)/0.15),transparent_70%)]" />
      </div>
    </article>
  );
};

export default ProjectCard;
