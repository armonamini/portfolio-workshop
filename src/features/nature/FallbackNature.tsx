import React from "react";

const FallbackNature = () => {
  // Create fireflies for reduced motion environment
  const fireflies = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 20 + Math.random() * 60,
    delay: Math.random() * 3,
    size: 2 + Math.random() * 2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden grove-gradient-sky">
      {/* Layered SVG hills with parallax */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Farthest hills */}
        <path
          d="M0,400 Q200,350 400,380 T800,360 Q1000,340 1200,380 L1200,800 L0,800 Z"
          fill={`hsl(var(--grove-700) / 0.6)`}
          className="animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        
        {/* Mid hills */}
        <path
          d="M0,480 Q300,420 600,460 T1200,440 L1200,800 L0,800 Z"
          fill={`hsl(var(--grove-600) / 0.8)`}
        />
        
        {/* Near hills */}
        <path
          d="M0,560 Q150,520 300,540 Q450,560 600,530 Q750,500 900,520 Q1050,540 1200,520 L1200,800 L0,800 Z"
          fill={`hsl(var(--grove-500))`}
        />
        
        {/* Foreground */}
        <path
          d="M0,640 Q100,620 200,630 Q400,650 600,620 Q800,590 1000,610 Q1100,620 1200,600 L1200,800 L0,800 Z"
          fill={`hsl(var(--grove-400))`}
        />
        
        {/* Lake reflection */}
        <ellipse
          cx="400"
          cy="680"
          rx="120"
          ry="15"
          fill={`hsl(var(--grove-800) / 0.7)`}
          opacity="0.6"
        />
      </svg>
      
      {/* CSS Fireflies */}
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute rounded-full animate-firefly"
          style={{
            left: `${firefly.left}%`,
            top: `${firefly.top}%`,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            backgroundColor: `hsl(var(--grove-firefly))`,
            boxShadow: `0 0 ${firefly.size * 3}px hsl(var(--grove-firefly))`,
            animationDelay: `${firefly.delay}s`,
          }}
          aria-hidden="true"
        />
      ))}
      
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default FallbackNature;