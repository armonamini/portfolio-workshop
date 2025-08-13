import * as React from "react";

interface CircularMaskProps {
  progress: number;
  children: React.ReactNode;
}

export function CircularMask({ progress, children }: CircularMaskProps) {
  // Calculate the radius based on progress (0 = small circle, 1 = full screen)
  // Use a smooth easing function for more natural expansion
  const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
  const maxRadius = typeof window !== 'undefined' ? Math.max(window.innerWidth, window.innerHeight) * 0.6 : 1000;
  const radius = easedProgress * maxRadius;
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* The actual content (home page) */}
      <div className="w-full h-full">
        {children}
      </div>
      
      {/* Circular mask that reveals the home page content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: `circle(${radius}px at center)`,
          transition: 'clip-path 0.05s ease-out'
        }}
      >
        {/* This div contains the home page content that will be revealed */}
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
} 