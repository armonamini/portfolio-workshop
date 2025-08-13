import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { useWarpController } from "./useWarpController";
import { SpiralTunnelScene } from "./SpiralTunnelScene";
import { prefersReducedMotion } from '@/utils/webgl';

export function HyperspaceOverlay() {
  const { active, complete } = useWarpController();
  const [progress, setProgress] = React.useState(0);
  const [webglError, setWebglError] = React.useState(false);
  const startTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (active) {
      console.log('HyperspaceOverlay: Starting animation');
      startTimeRef.current = Date.now();
      
      // Animate progress from 0 to 1 over 1 second
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min(elapsed / 1000, 1);
        setProgress(newProgress);
        
        if (newProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log('HyperspaceOverlay: Animation complete');
          complete();
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setProgress(0);
      setWebglError(false);
    }
  }, [active, complete]);

  // Don't render anything if not active
  if (!active) return null;

  // Use fallback for reduced motion preference or WebGL errors
  if (prefersReducedMotion || webglError) {
    return (
      <div
        id="warp-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: active ? 1 : 0,
          transition: "opacity 150ms ease-out",
          background: "transparent",
        }}
        aria-hidden
      >
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, 
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
      </div>
    );
  }

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
      <Canvas
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={(error) => {
          console.error('WebGL error:', error);
          setWebglError(true);
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
        }}
      >
        <SpiralTunnelScene 
          progress={progress}
          onComplete={() => {
            console.log('SpiralTunnelScene: Animation complete');
            complete();
          }}
        />
      </Canvas>
    </div>
  );
}
