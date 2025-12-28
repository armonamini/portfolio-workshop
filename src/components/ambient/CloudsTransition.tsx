import * as React from "react";

const CloudsTransition = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-64 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for clouds - matches the space theme colors */}
          <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 89%, 14%)" stopOpacity="1" />
            <stop offset="40%" stopColor="hsl(230, 70%, 25%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(200, 60%, 70%)" stopOpacity="0" />
          </linearGradient>
          
          <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(240, 50%, 20%)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(220, 40%, 40%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Cloud shape filters for soft edges */}
          <filter id="cloudBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          
          <filter id="cloudBlurLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* Background gradient fade from space to sky */}
        <rect x="0" y="0" width="1200" height="300" fill="url(#cloudGradient1)" />

        {/* Cloud layer 1 - furthest back, largest */}
        <g filter="url(#cloudBlur)" opacity="0.7">
          <ellipse cx="100" cy="80" rx="180" ry="60" fill="hsl(230, 50%, 30%)" />
          <ellipse cx="300" cy="100" rx="220" ry="70" fill="hsl(230, 45%, 35%)" />
          <ellipse cx="600" cy="70" rx="250" ry="80" fill="hsl(230, 50%, 28%)" />
          <ellipse cx="900" cy="90" rx="200" ry="65" fill="hsl(230, 48%, 32%)" />
          <ellipse cx="1100" cy="75" rx="180" ry="55" fill="hsl(230, 52%, 30%)" />
        </g>

        {/* Cloud layer 2 - mid layer */}
        <g filter="url(#cloudBlurLight)" opacity="0.6">
          <ellipse cx="50" cy="120" rx="120" ry="45" fill="hsl(220, 40%, 45%)" />
          <ellipse cx="250" cy="140" rx="150" ry="50" fill="hsl(220, 38%, 48%)" />
          <ellipse cx="450" cy="130" rx="180" ry="55" fill="hsl(220, 42%, 42%)" />
          <ellipse cx="700" cy="150" rx="200" ry="60" fill="hsl(220, 40%, 46%)" />
          <ellipse cx="950" cy="135" rx="170" ry="50" fill="hsl(220, 44%, 44%)" />
          <ellipse cx="1150" cy="145" rx="140" ry="45" fill="hsl(220, 40%, 48%)" />
        </g>

        {/* Cloud layer 3 - closest, wispy */}
        <g filter="url(#cloudBlurLight)" opacity="0.4">
          <ellipse cx="150" cy="180" rx="100" ry="35" fill="hsl(210, 35%, 55%)" />
          <ellipse cx="400" cy="200" rx="130" ry="40" fill="hsl(210, 32%, 58%)" />
          <ellipse cx="650" cy="190" rx="150" ry="45" fill="hsl(210, 38%, 52%)" />
          <ellipse cx="850" cy="210" rx="120" ry="38" fill="hsl(210, 35%, 56%)" />
          <ellipse cx="1050" cy="195" rx="110" ry="35" fill="hsl(210, 36%, 54%)" />
        </g>

        {/* Subtle animated wisps using CSS animation via style */}
        <g opacity="0.3">
          <ellipse cx="200" cy="250" rx="80" ry="25" fill="hsl(200, 30%, 65%)">
            <animate attributeName="cx" values="200;220;200" dur="8s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="500" cy="260" rx="100" ry="30" fill="hsl(200, 28%, 68%)">
            <animate attributeName="cx" values="500;480;500" dur="10s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="800" cy="245" rx="90" ry="28" fill="hsl(200, 32%, 62%)">
            <animate attributeName="cx" values="800;820;800" dur="9s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="255" rx="70" ry="22" fill="hsl(200, 30%, 66%)">
            <animate attributeName="cx" values="1100;1080;1100" dur="7s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
};

export default CloudsTransition;
