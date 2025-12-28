import * as React from "react";

const CloudsTransition = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-48 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for clouds - matches the space theme colors */}
          <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(230, 89%, 14%)" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(240, 60%, 20%)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(210, 70%, 55%)" stopOpacity="0" />
          </linearGradient>

          {/* Cloud shape filters for soft edges */}
          <filter id="cloudBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          
          <filter id="cloudBlurLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* Background gradient fade from space to sky */}
        <rect x="0" y="0" width="1200" height="200" fill="url(#cloudGradient1)" />

        {/* Cloud layer 1 - densest, dark purple-blue */}
        <g filter="url(#cloudBlur)" opacity="0.95">
          <ellipse cx="0" cy="30" rx="150" ry="50" fill="hsl(250, 60%, 18%)" />
          <ellipse cx="150" cy="40" rx="180" ry="55" fill="hsl(245, 55%, 20%)" />
          <ellipse cx="350" cy="35" rx="200" ry="60" fill="hsl(250, 58%, 17%)" />
          <ellipse cx="550" cy="45" rx="190" ry="58" fill="hsl(248, 62%, 19%)" />
          <ellipse cx="750" cy="38" rx="210" ry="62" fill="hsl(250, 56%, 18%)" />
          <ellipse cx="950" cy="42" rx="185" ry="55" fill="hsl(252, 60%, 20%)" />
          <ellipse cx="1150" cy="35" rx="170" ry="52" fill="hsl(248, 58%, 17%)" />
        </g>

        {/* Cloud layer 2 - mid purple */}
        <g filter="url(#cloudBlur)" opacity="0.9">
          <ellipse cx="80" cy="60" rx="140" ry="48" fill="hsl(240, 50%, 28%)" />
          <ellipse cx="250" cy="70" rx="170" ry="52" fill="hsl(238, 48%, 30%)" />
          <ellipse cx="450" cy="65" rx="190" ry="56" fill="hsl(242, 52%, 26%)" />
          <ellipse cx="650" cy="75" rx="200" ry="58" fill="hsl(240, 50%, 28%)" />
          <ellipse cx="850" cy="68" rx="180" ry="54" fill="hsl(244, 54%, 25%)" />
          <ellipse cx="1050" cy="72" rx="160" ry="50" fill="hsl(238, 50%, 30%)" />
        </g>

        {/* Cloud layer 3 - lighter purple/blue transition */}
        <g filter="url(#cloudBlurLight)" opacity="0.85">
          <ellipse cx="50" cy="95" rx="130" ry="42" fill="hsl(230, 45%, 38%)" />
          <ellipse cx="200" cy="105" rx="150" ry="46" fill="hsl(228, 42%, 42%)" />
          <ellipse cx="380" cy="100" rx="170" ry="50" fill="hsl(232, 48%, 36%)" />
          <ellipse cx="560" cy="110" rx="180" ry="52" fill="hsl(230, 44%, 40%)" />
          <ellipse cx="740" cy="102" rx="165" ry="48" fill="hsl(234, 46%, 38%)" />
          <ellipse cx="920" cy="108" rx="155" ry="46" fill="hsl(228, 44%, 42%)" />
          <ellipse cx="1100" cy="98" rx="140" ry="44" fill="hsl(232, 48%, 36%)" />
        </g>

        {/* Cloud layer 4 - blue-ish, closest to sky */}
        <g filter="url(#cloudBlurLight)" opacity="0.7">
          <ellipse cx="100" cy="130" rx="120" ry="38" fill="hsl(220, 40%, 48%)" />
          <ellipse cx="280" cy="140" rx="140" ry="42" fill="hsl(218, 38%, 52%)" />
          <ellipse cx="480" cy="135" rx="160" ry="46" fill="hsl(222, 42%, 46%)" />
          <ellipse cx="680" cy="145" rx="170" ry="48" fill="hsl(220, 40%, 50%)" />
          <ellipse cx="880" cy="138" rx="150" ry="44" fill="hsl(224, 44%, 48%)" />
          <ellipse cx="1080" cy="142" rx="130" ry="40" fill="hsl(218, 40%, 52%)" />
        </g>

        {/* Cloud layer 5 - lightest wisps */}
        <g filter="url(#cloudBlurLight)" opacity="0.5">
          <ellipse cx="150" cy="165" rx="100" ry="32" fill="hsl(210, 35%, 58%)" />
          <ellipse cx="350" cy="175" rx="120" ry="36" fill="hsl(208, 32%, 62%)" />
          <ellipse cx="550" cy="170" rx="140" ry="40" fill="hsl(212, 38%, 56%)" />
          <ellipse cx="750" cy="180" rx="130" ry="38" fill="hsl(210, 36%, 60%)" />
          <ellipse cx="950" cy="172" rx="110" ry="34" fill="hsl(214, 34%, 58%)" />
          <ellipse cx="1150" cy="178" rx="100" ry="32" fill="hsl(208, 32%, 62%)" />
        </g>

        {/* Subtle animated wisps */}
        <g opacity="0.3">
          <ellipse cx="200" cy="190" rx="80" ry="22" fill="hsl(200, 30%, 68%)">
            <animate attributeName="cx" values="200;220;200" dur="8s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="600" cy="195" rx="100" ry="26" fill="hsl(200, 28%, 70%)">
            <animate attributeName="cx" values="600;580;600" dur="10s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1000" cy="188" rx="90" ry="24" fill="hsl(200, 32%, 66%)">
            <animate attributeName="cx" values="1000;1020;1000" dur="9s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
};

export default CloudsTransition;
