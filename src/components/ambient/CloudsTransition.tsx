import * as React from "react";

const CloudsTransition = () => {
  return (
    <div 
      className="absolute left-0 right-0 pointer-events-none overflow-visible z-20"
      style={{
        top: '-200px',
        height: '400px',
      }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cloud shape filters for soft fluffy edges */}
          <filter id="cloudSoft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
          
          <filter id="cloudMedium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          
          <filter id="cloudSharp" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
          
          {/* Inner glow for cloud depth */}
          <filter id="cloudGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* === LAYER 1: Back clouds - large, soft, atmospheric === */}
        <g filter="url(#cloudSoft)" opacity="0.95">
          {/* Left cloud mass */}
          <ellipse cx="-50" cy="200" rx="200" ry="100" fill="hsl(0, 0%, 98%)">
            <animate attributeName="cx" values="-50;-30;-50" dur="25s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="80" cy="180" rx="180" ry="90" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="80;100;80" dur="30s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="150" cy="220" rx="160" ry="80" fill="hsl(0, 0%, 96%)">
            <animate attributeName="cx" values="150;130;150" dur="22s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Center-left cloud mass */}
          <ellipse cx="300" cy="190" rx="220" ry="110" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="300;320;300" dur="28s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="400" cy="210" rx="180" ry="95" fill="hsl(0, 0%, 97%)">
            <animate attributeName="cx" values="400;380;400" dur="24s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Center cloud mass */}
          <ellipse cx="600" cy="200" rx="250" ry="120" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="600;620;600" dur="32s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="550" cy="180" rx="200" ry="100" fill="hsl(0, 0%, 98%)">
            <animate attributeName="cx" values="550;530;550" dur="26s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="700" cy="220" rx="180" ry="90" fill="hsl(0, 0%, 96%)">
            <animate attributeName="cx" values="700;720;700" dur="29s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Center-right cloud mass */}
          <ellipse cx="850" cy="195" rx="200" ry="105" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="850;830;850" dur="27s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="950" cy="215" rx="170" ry="88" fill="hsl(0, 0%, 97%)">
            <animate attributeName="cx" values="950;970;950" dur="23s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Right cloud mass */}
          <ellipse cx="1100" cy="185" rx="190" ry="95" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="1100;1120;1100" dur="30s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1200" cy="205" rx="180" ry="90" fill="hsl(0, 0%, 98%)">
            <animate attributeName="cx" values="1200;1180;1200" dur="25s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1280" cy="195" rx="160" ry="85" fill="hsl(0, 0%, 96%)">
            <animate attributeName="cx" values="1280;1300;1280" dur="28s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* === LAYER 2: Mid clouds - medium detail === */}
        <g filter="url(#cloudMedium)" opacity="0.9">
          {/* Distributed puffy cloud formations */}
          <ellipse cx="50" cy="200" rx="100" ry="55" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="50;70;50" dur="18s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="120" cy="185" rx="80" ry="45" fill="hsl(210, 20%, 95%)">
            <animate attributeName="cx" values="120;100;120" dur="15s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="280" cy="210" rx="120" ry="60" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="280;260;280" dur="20s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="350" cy="190" rx="90" ry="50" fill="hsl(210, 15%, 96%)">
            <animate attributeName="cx" values="350;370;350" dur="17s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="480" cy="195" rx="110" ry="58" fill="hsl(0, 0%, 99%)">
            <animate attributeName="cx" values="480;500;480" dur="19s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="620" cy="205" rx="140" ry="70" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="620;600;620" dur="22s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="700" cy="180" rx="100" ry="52" fill="hsl(210, 18%, 97%)">
            <animate attributeName="cx" values="700;720;700" dur="16s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="850" cy="200" rx="130" ry="65" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="850;830;850" dur="21s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="1000" cy="195" rx="110" ry="55" fill="hsl(0, 0%, 99%)">
            <animate attributeName="cx" values="1000;1020;1000" dur="18s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1080" cy="210" rx="85" ry="48" fill="hsl(210, 15%, 96%)">
            <animate attributeName="cx" values="1080;1060;1080" dur="14s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="1180" cy="190" rx="100" ry="52" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="1180;1200;1180" dur="20s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* === LAYER 3: Front detail clouds - sharp, smaller === */}
        <g filter="url(#cloudSharp)" opacity="0.85">
          {/* Small puffy detail clouds for realism */}
          <ellipse cx="30" cy="195" rx="50" ry="30" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="30;45;30" dur="12s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="90" cy="210" rx="40" ry="25" fill="hsl(210, 10%, 98%)">
            <animate attributeName="cx" values="90;75;90" dur="10s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="200" cy="200" rx="55" ry="32" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="200;215;200" dur="11s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="260" cy="185" rx="45" ry="28" fill="hsl(210, 12%, 97%)">
            <animate attributeName="cx" values="260;245;260" dur="13s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="380" cy="205" rx="60" ry="35" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="380;395;380" dur="14s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="440" cy="190" rx="48" ry="30" fill="hsl(210, 8%, 98%)">
            <animate attributeName="cx" values="440;425;440" dur="11s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="550" cy="198" rx="52" ry="32" fill="hsl(0, 0%, 99%)">
            <animate attributeName="cx" values="550;565;550" dur="12s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="620" cy="215" rx="45" ry="28" fill="hsl(210, 10%, 97%)">
            <animate attributeName="cx" values="620;605;620" dur="10s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="720" cy="195" rx="58" ry="34" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="720;735;720" dur="13s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="780" cy="208" rx="42" ry="26" fill="hsl(210, 12%, 98%)">
            <animate attributeName="cx" values="780;765;780" dur="11s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="880" cy="202" rx="55" ry="33" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="880;895;880" dur="14s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="940" cy="188" rx="48" ry="29" fill="hsl(210, 8%, 97%)">
            <animate attributeName="cx" values="940;925;940" dur="12s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="1040" cy="200" rx="52" ry="31" fill="hsl(0, 0%, 99%)">
            <animate attributeName="cx" values="1040;1055;1040" dur="11s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="212" rx="44" ry="27" fill="hsl(210, 10%, 98%)">
            <animate attributeName="cx" values="1100;1085;1100" dur="13s" repeatCount="indefinite" />
          </ellipse>
          
          <ellipse cx="1180" cy="195" rx="50" ry="30" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="1180;1195;1180" dur="12s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* === LAYER 4: Wispy accent clouds === */}
        <g filter="url(#cloudMedium)" opacity="0.6">
          <ellipse cx="150" cy="170" rx="70" ry="20" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="150;180;150" dur="20s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.4;0.6" dur="15s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="450" cy="165" rx="80" ry="22" fill="hsl(0, 0%, 98%)">
            <animate attributeName="cx" values="450;420;450" dur="22s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.7;0.5" dur="18s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="750" cy="172" rx="75" ry="21" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="750;780;750" dur="19s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.4;0.6" dur="16s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1050" cy="168" rx="85" ry="23" fill="hsl(0, 0%, 99%)">
            <animate attributeName="cx" values="1050;1020;1050" dur="21s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.7;0.5" dur="17s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* === Bottom wisps for blending === */}
        <g filter="url(#cloudSoft)" opacity="0.7">
          <ellipse cx="100" cy="260" rx="150" ry="60" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="100;130;100" dur="25s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="350" cy="270" rx="180" ry="70" fill="hsl(0, 0%, 98%)">
            <animate attributeName="cx" values="350;320;350" dur="28s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="600" cy="265" rx="200" ry="75" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="600;630;600" dur="30s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="850" cy="275" rx="170" ry="65" fill="hsl(0, 0%, 97%)">
            <animate attributeName="cx" values="850;820;850" dur="26s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="260" rx="160" ry="62" fill="hsl(0, 0%, 100%)">
            <animate attributeName="cx" values="1100;1130;1100" dur="27s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
};

export default CloudsTransition;
