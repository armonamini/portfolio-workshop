import * as React from "react";

const CloudsTransition = () => {
  return (
    <div className="absolute inset-x-0 -top-24 h-72 pointer-events-none overflow-visible z-20" aria-hidden="true">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Noise texture for cloud realism */}
          <filter id="cloudNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          {/* Soft blur for cloud edges */}
          <filter id="cloudSoft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
          
          <filter id="cloudMedium" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          
          <filter id="cloudSharp" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* Textured cloud filter */}
          <filter id="cloudTexture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" seed="5" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="6" />
          </filter>

          {/* Gradient for purple side (top) */}
          <linearGradient id="purpleFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(250, 70%, 15%)" />
            <stop offset="50%" stopColor="hsl(260, 50%, 25%)" />
            <stop offset="100%" stopColor="hsl(240, 40%, 35%)" />
          </linearGradient>

          {/* Gradient for blue side (bottom) */}
          <linearGradient id="blueFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(220, 45%, 45%)" />
            <stop offset="50%" stopColor="hsl(210, 50%, 60%)" />
            <stop offset="100%" stopColor="hsl(200, 60%, 75%)" />
          </linearGradient>
        </defs>

        {/* Solid base layer - completely covers the seam */}
        <rect x="0" y="60" width="1200" height="180" fill="hsl(240, 45%, 32%)" />

        {/* === PURPLE SIDE CLOUDS (Top - dipping from landing page) === */}
        
        {/* Dense purple cloud bank - back layer */}
        <g filter="url(#cloudTexture)" opacity="1">
          <ellipse cx="-50" cy="40" rx="200" ry="70" fill="hsl(255, 65%, 18%)" />
          <ellipse cx="150" cy="30" rx="250" ry="85" fill="hsl(250, 60%, 16%)" />
          <ellipse cx="400" cy="45" rx="280" ry="90" fill="hsl(252, 62%, 17%)" />
          <ellipse cx="700" cy="35" rx="300" ry="95" fill="hsl(248, 58%, 15%)" />
          <ellipse cx="1000" cy="40" rx="260" ry="88" fill="hsl(254, 64%, 18%)" />
          <ellipse cx="1250" cy="50" rx="220" ry="75" fill="hsl(250, 60%, 16%)" />
        </g>

        {/* Mid purple clouds */}
        <g filter="url(#cloudMedium)" opacity="1">
          <ellipse cx="50" cy="70" rx="180" ry="65" fill="hsl(248, 55%, 24%)" />
          <ellipse cx="250" cy="80" rx="220" ry="75" fill="hsl(252, 52%, 26%)" />
          <ellipse cx="500" cy="75" rx="250" ry="80" fill="hsl(246, 58%, 22%)" />
          <ellipse cx="750" cy="85" rx="230" ry="78" fill="hsl(250, 54%, 25%)" />
          <ellipse cx="1000" cy="78" rx="210" ry="72" fill="hsl(248, 56%, 23%)" />
          <ellipse cx="1200" cy="82" rx="190" ry="68" fill="hsl(252, 52%, 26%)" />
        </g>

        {/* Front purple clouds with texture */}
        <g filter="url(#cloudTexture)" opacity="0.95">
          <ellipse cx="100" cy="100" rx="160" ry="55" fill="hsl(242, 48%, 32%)" />
          <ellipse cx="320" cy="110" rx="200" ry="65" fill="hsl(238, 45%, 35%)" />
          <ellipse cx="580" cy="105" rx="220" ry="70" fill="hsl(244, 50%, 30%)" />
          <ellipse cx="850" cy="115" rx="200" ry="68" fill="hsl(240, 46%, 33%)" />
          <ellipse cx="1100" cy="108" rx="180" ry="60" fill="hsl(246, 48%, 31%)" />
        </g>

        {/* === TRANSITION LAYER (Middle - the thick band) === */}
        
        {/* Core dense cloud layer */}
        <g filter="url(#cloudMedium)" opacity="1">
          <ellipse cx="0" cy="140" rx="200" ry="70" fill="hsl(230, 42%, 42%)" />
          <ellipse cx="200" cy="150" rx="240" ry="78" fill="hsl(228, 40%, 45%)" />
          <ellipse cx="450" cy="145" rx="260" ry="82" fill="hsl(232, 44%, 40%)" />
          <ellipse cx="700" cy="155" rx="280" ry="85" fill="hsl(226, 38%, 48%)" />
          <ellipse cx="950" cy="148" rx="250" ry="80" fill="hsl(230, 42%, 44%)" />
          <ellipse cx="1200" cy="152" rx="220" ry="75" fill="hsl(228, 40%, 46%)" />
        </g>

        {/* Textured middle band */}
        <g filter="url(#cloudTexture)" opacity="0.9">
          <ellipse cx="80" cy="160" rx="180" ry="60" fill="hsl(224, 38%, 52%)" />
          <ellipse cx="300" cy="170" rx="210" ry="68" fill="hsl(220, 36%, 55%)" />
          <ellipse cx="550" cy="165" rx="240" ry="72" fill="hsl(226, 40%, 50%)" />
          <ellipse cx="800" cy="175" rx="220" ry="70" fill="hsl(222, 38%, 53%)" />
          <ellipse cx="1050" cy="168" rx="200" ry="65" fill="hsl(224, 36%, 56%)" />
        </g>

        {/* === BLUE SIDE CLOUDS (Bottom - transitioning to sky) === */}
        
        {/* Dense blue-white clouds */}
        <g filter="url(#cloudMedium)" opacity="1">
          <ellipse cx="50" cy="200" rx="170" ry="58" fill="hsl(215, 45%, 62%)" />
          <ellipse cx="250" cy="210" rx="200" ry="65" fill="hsl(212, 50%, 68%)" />
          <ellipse cx="480" cy="205" rx="230" ry="70" fill="hsl(218, 48%, 60%)" />
          <ellipse cx="720" cy="215" rx="210" ry="68" fill="hsl(214, 52%, 65%)" />
          <ellipse cx="960" cy="208" rx="190" ry="62" fill="hsl(210, 46%, 70%)" />
          <ellipse cx="1180" cy="212" rx="170" ry="58" fill="hsl(216, 50%, 66%)" />
        </g>

        {/* Lighter fluffy clouds */}
        <g filter="url(#cloudTexture)" opacity="0.95">
          <ellipse cx="100" cy="235" rx="150" ry="50" fill="hsl(208, 55%, 75%)" />
          <ellipse cx="320" cy="245" rx="180" ry="58" fill="hsl(205, 60%, 80%)" />
          <ellipse cx="560" cy="240" rx="200" ry="62" fill="hsl(210, 58%, 72%)" />
          <ellipse cx="800" cy="250" rx="190" ry="60" fill="hsl(206, 62%, 78%)" />
          <ellipse cx="1040" cy="242" rx="170" ry="55" fill="hsl(208, 56%, 76%)" />
        </g>

        {/* Bright white puffy cloud bottoms - rounded shapes */}
        <g filter="url(#cloudSharp)" opacity="0.9">
          {/* Left cluster */}
          <ellipse cx="80" cy="280" rx="90" ry="45" fill="hsl(200, 70%, 90%)" />
          <ellipse cx="150" cy="295" rx="70" ry="38" fill="hsl(198, 75%, 92%)" />
          <ellipse cx="40" cy="290" rx="60" ry="35" fill="hsl(202, 72%, 88%)" />
          
          {/* Left-center cluster */}
          <ellipse cx="280" cy="275" rx="100" ry="50" fill="hsl(200, 72%, 88%)" />
          <ellipse cx="350" cy="290" rx="85" ry="45" fill="hsl(196, 78%, 91%)" />
          <ellipse cx="220" cy="285" rx="70" ry="40" fill="hsl(202, 74%, 89%)" />
          <ellipse cx="400" cy="300" rx="60" ry="35" fill="hsl(198, 76%, 93%)" />
          
          {/* Center cluster */}
          <ellipse cx="520" cy="270" rx="110" ry="55" fill="hsl(200, 70%, 87%)" />
          <ellipse cx="600" cy="288" rx="95" ry="48" fill="hsl(198, 75%, 90%)" />
          <ellipse cx="680" cy="295" rx="80" ry="42" fill="hsl(202, 72%, 92%)" />
          <ellipse cx="480" cy="290" rx="65" ry="38" fill="hsl(196, 78%, 89%)" />
          
          {/* Right-center cluster */}
          <ellipse cx="800" cy="275" rx="105" ry="52" fill="hsl(200, 74%, 88%)" />
          <ellipse cx="880" cy="292" rx="88" ry="46" fill="hsl(198, 76%, 91%)" />
          <ellipse cx="740" cy="288" rx="72" ry="40" fill="hsl(204, 70%, 89%)" />
          <ellipse cx="950" cy="298" rx="65" ry="36" fill="hsl(196, 80%, 93%)" />
          
          {/* Right cluster */}
          <ellipse cx="1050" cy="278" rx="95" ry="48" fill="hsl(200, 72%, 89%)" />
          <ellipse cx="1130" cy="290" rx="80" ry="44" fill="hsl(198, 74%, 91%)" />
          <ellipse cx="1000" cy="295" rx="68" ry="38" fill="hsl(202, 76%, 87%)" />
          <ellipse cx="1180" cy="300" rx="55" ry="32" fill="hsl(196, 78%, 92%)" />
        </g>

        {/* Extra puffy wisps at very bottom for soft fade */}
        <g filter="url(#cloudSoft)" opacity="0.6">
          <ellipse cx="120" cy="310" rx="100" ry="35" fill="hsl(200, 65%, 92%)" />
          <ellipse cx="350" cy="315" rx="120" ry="40" fill="hsl(198, 70%, 94%)" />
          <ellipse cx="600" cy="318" rx="140" ry="42" fill="hsl(202, 68%, 93%)" />
          <ellipse cx="850" cy="312" rx="130" ry="38" fill="hsl(196, 72%, 94%)" />
          <ellipse cx="1100" cy="316" rx="110" ry="36" fill="hsl(200, 66%, 92%)" />
        </g>

        {/* Animated wisps for subtle movement */}
        <g opacity="0.6" filter="url(#cloudSharp)">
          <ellipse cx="200" cy="130" rx="60" ry="20" fill="hsl(240, 40%, 40%)">
            <animate attributeName="cx" values="200;230;200" dur="12s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="700" cy="180" rx="80" ry="25" fill="hsl(220, 45%, 55%)">
            <animate attributeName="cx" values="700;670;700" dur="15s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1000" cy="230" rx="70" ry="22" fill="hsl(205, 55%, 72%)">
            <animate attributeName="cx" values="1000;1030;1000" dur="10s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
};

export default CloudsTransition;