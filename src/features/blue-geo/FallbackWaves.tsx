import { useEffect, useState } from 'react';

export const FallbackWaves = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            var(--ocean-900) 0%, 
            var(--ocean-800) 25%, 
            var(--ocean-700) 50%, 
            var(--ocean-600) 75%, 
            var(--ocean-500) 100%)`
        }}
      />
      
      {/* Animated waves */}
      <div className="absolute inset-0">
        {/* Wave 1 */}
        <svg
          className="absolute bottom-0 w-full h-1/3 opacity-30"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,150 Q300,100 600,150 T1200,150 L1200,200 L0,200 Z"
            fill="var(--ocean-300)"
            className="animate-pulse"
          />
        </svg>
        
        {/* Wave 2 */}
        <svg
          className="absolute bottom-0 w-full h-1/4 opacity-40"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 Q400,80 800,120 T1200,120 L1200,150 L0,150 Z"
            fill="var(--ocean-200)"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
        
        {/* Wave 3 */}
        <svg
          className="absolute bottom-0 w-full h-1/5 opacity-50"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 Q500,40 1000,80 T1200,80 L1200,100 L0,100 Z"
            fill="var(--ocean-accent)"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>
      
      {/* Atmospheric glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center top, 
            var(--ocean-accent) 0%, 
            transparent 70%)`,
          opacity: 0.3
        }}
      />
      
      {/* Horizon line */}
      <div 
        className="absolute bottom-1/3 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            var(--ocean-accent) 50%, 
            transparent 100%)`,
          opacity: 0.6
        }}
      />
    </div>
  );
};
