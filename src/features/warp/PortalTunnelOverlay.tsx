import * as React from "react";
import { useWarpController } from "./useWarpController";
import { PortalStage } from "./PortalStage";
import { RingTunnel } from "./RingTunnel";
import { OverlayRoot } from "./OverlayRoot";
import { prefersReducedMotion } from '@/utils/webgl';

interface PortalTunnelOverlayProps {
  centerX: number;
  centerY: number;
}

export function PortalTunnelOverlay({ centerX, centerY }: PortalTunnelOverlayProps) {
  const { active, complete } = useWarpController();
  const [progress, setProgress] = React.useState(0);
  const [webglError, setWebglError] = React.useState(false);
  const [overlayOpacity, setOverlayOpacity] = React.useState(0);

  const startTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (active) {
      console.log('PortalTunnelOverlay: Starting animation');
      startTimeRef.current = Date.now();

      // Fade in overlay quickly
      setOverlayOpacity(1);

      // Animate progress from 0 to 1 over 1.1 seconds for cinematic speed
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min(elapsed / 1100, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log('PortalTunnelOverlay: Animation complete');
          complete();
        }
      };

      requestAnimationFrame(animate);
    } else {
      setProgress(0);
      setWebglError(false);
      setOverlayOpacity(0);
    }
  }, [active, complete]);

  // Don't render anything if not active
  if (!active) return null;

  // Use fallback for reduced motion preference or WebGL errors
  if (prefersReducedMotion || webglError) {
    return (
      <OverlayRoot active={active}>
        {/* Portal Stage for reduced motion */}
        <PortalStage 
          active={active} 
          progress={progress} 
          centerX={centerX} 
          centerY={centerY} 
        />
        
        {/* Simple overlay for reduced motion */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${centerX}px ${centerY}px,
            rgba(128, 0, 255, ${0.3 + progress * 0.4}) 0%,
            rgba(64, 0, 128, ${0.2 + progress * 0.3}) 50%,
            rgba(32, 0, 64, ${0.1 + progress * 0.2}) 100%)`,
          transform: `scale(${1 + progress * 0.5})`,
          transition: "all 0.1s linear"
        }}>
          {/* Animated stars */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(2px 2px at 20px 30px, #ffffff, transparent), radial-gradient(2px 2px at 40px 70px, #ffffff, transparent), radial-gradient(1px 1px at 90px 40px, #ffffff, transparent), radial-gradient(1px 1px at 130px 80px, #ffffff, transparent), radial-gradient(2px 2px at 160px 30px, #ffffff, transparent)",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 100px",
            animation: "warp-stars 1s linear infinite",
            opacity: progress
          }} />
        </div>
      </OverlayRoot>
    );
  }

  return (
    <OverlayRoot active={active}>
      {/* Layer B: Portal Stage (Home page with growing clip-path) */}
      <PortalStage 
        active={active} 
        progress={progress} 
        centerX={centerX} 
        centerY={centerY} 
      />

      {/* Layer A: Spiral Tunnel Ring */}
      <RingTunnel
        centerPx={[centerX, centerY]}
        innerPx={progress * Math.max(window.innerWidth, window.innerHeight) * 0.8}
        thicknessPx={80}
        durationMs={1100}
        onDone={() => {
          console.log('RingTunnel: Animation complete');
          complete();
        }}
      />
    </OverlayRoot>
  );
}
