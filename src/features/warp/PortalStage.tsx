import * as React from "react";
import { lazy, Suspense } from "react";
import { FallbackWaves } from "@/features/blue-geo/FallbackWaves";

// Lazy load the Home component to avoid bundling it in the main chunk
const HomeComponent = lazy(() => import("@/pages/Home").then(m => ({ default: m.default })));

interface PortalStageProps {
  active: boolean;
  progress: number;
  centerX: number;
  centerY: number;
}

export function PortalStage({ active, progress, centerX, centerY }: PortalStageProps) {
  // Calculate the radius based on progress
  // Start small and grow to cover the entire screen
  const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.1;
  const radius = progress * maxRadius;

  if (!active) return null;

  return (
    <div
      id="portal-stage"
      className="portal-stage"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        clipPath: `circle(${radius}px at ${centerX}px ${centerY}px)`,
        transition: "clip-path 0.1s linear",
        '--r': `${radius}px`,
        '--cx': `${centerX}px`,
        '--cy': `${centerY}px`,
      } as React.CSSProperties}
      aria-hidden
    >
      {/* Render the Home component inside the portal */}
      <Suspense fallback={<FallbackWaves />}>
        <HomeComponent />
      </Suspense>
    </div>
  );
}
