import * as React from "react";
import { useWarpController } from "./useWarpController";

export function HyperspaceOverlay() {
  const { active, complete } = useWarpController();

  React.useEffect(() => {
    if (active) {
      console.log('HyperspaceOverlay: Starting animation');
      
      // Simple timeout to complete the animation
      const timer = setTimeout(() => {
        console.log('HyperspaceOverlay: Completing animation');
        complete();
      }, 1000);
      
      return () => {
        console.log('HyperspaceOverlay: Cleaning up timer');
        clearTimeout(timer);
      };
    }
  }, [active, complete]);

  return (
    <div
      id="warp-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 220ms ease-out",
        background: "transparent",
      }}
      aria-hidden
    >
      {active && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(128, 0, 255, 0.8) 0%, rgba(64, 0, 128, 0.6) 50%, rgba(32, 0, 64, 0.4) 100%)",
          animation: "warp-pulse 1s ease-in-out"
        }}>
          {/* Animated stars */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(2px 2px at 20px 30px, #ffffff, transparent), radial-gradient(2px 2px at 40px 70px, #ffffff, transparent), radial-gradient(1px 1px at 90px 40px, #ffffff, transparent), radial-gradient(1px 1px at 130px 80px, #ffffff, transparent), radial-gradient(2px 2px at 160px 30px, #ffffff, transparent)",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 100px",
            animation: "warp-stars 1s linear infinite"
          }} />
          

        </div>
      )}
    </div>
  );
}
