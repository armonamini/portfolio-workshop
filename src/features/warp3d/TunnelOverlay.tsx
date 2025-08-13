import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { useWarpController } from "../warp/useWarpController";
import { TubeScene } from "./TubeScene";
import { FallbackCanvas } from "../warp/FallbackCanvas";
import { prefersReducedMotion } from '@/utils/webgl';


export function TunnelOverlay() {
  const { active, complete } = useWarpController();
  const [progress, setProgress] = React.useState(0);
  const [webglError, setWebglError] = React.useState(false);
  const [overlayOpacity, setOverlayOpacity] = React.useState(0);

  const startTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (active) {
      console.log('TunnelOverlay: Starting animation');
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
          console.log('TunnelOverlay: Animation complete');
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
        opacity: overlayOpacity,
        transition: "opacity 800ms ease-in-out",
        background: "transparent", // Transparent to show landing page underneath
      }}
      aria-hidden
    >
      {/* Tunnel Canvas */}
      <Canvas
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true, // Alpha for transparent overlay
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
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
        <TubeScene
          progress={progress}
          onComplete={() => {
            console.log('TubeScene: Animation complete');
            complete();
          }}
        />
        

      </Canvas>


    </div>
  );
} 