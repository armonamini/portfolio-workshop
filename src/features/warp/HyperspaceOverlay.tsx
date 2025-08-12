import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWarpController } from "./useWarpController";

function Tunnel({ durationMs = 1000, onDone }: { durationMs?: number; onDone: () => void }) {
  const mat = React.useRef<THREE.ShaderMaterial>(null!);
  const start = React.useRef<number | null>(null);

  useFrame((state, delta) => {
    if (!mat.current) return;
    if (start.current == null) start.current = state.clock.elapsedTime;
    const elapsedMs = (state.clock.elapsedTime - start.current) * 1000;
    const progress = Math.min(1, elapsedMs / durationMs);
    mat.current.uniforms.u_time.value += delta;
    mat.current.uniforms.u_progress.value = progress;
    if (progress >= 1) onDone();        // 🔔 not optional!
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        uniforms={{
          u_time: { value: 0 },
          u_progress: { value: 0 },
          u_resolution: { value: new THREE.Vector2() },
        }}
        vertexShader={`varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`}
        fragmentShader={`precision highp float; varying vec2 vUv; uniform float u_time; uniform float u_progress;
          void main(){
            // keep simple while testing; replace with your tunnel after
            vec2 uv = vUv * 2.0 - 1.0;
            float r = length(uv);
            float streak = smoothstep(0.0, 0.02, fract(20.0*(r - u_progress)));
            float glow = pow(1.0 - r, 3.0);
            vec3 col = mix(vec3(0.07,0.0,0.15), vec3(1.0,0.4,0.9), clamp(streak+glow,0.0,1.0));
            gl_FragColor = vec4(col, clamp(streak+glow,0.0,1.0));
          }`}
      />
    </mesh>
  );
}

export function HyperspaceOverlay() {
  const { active, complete } = useWarpController();

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
        <Canvas
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)} // ← fully transparent clear
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Tunnel durationMs={1000} onDone={complete} />
        </Canvas>
      )}
    </div>
  );
}
