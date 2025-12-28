import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RingTunnelProps {
  centerPx: [number, number];    // [cx, cy] in pixels
  innerPx: number;               // starting inner radius (px) — sync with portal --r
  thicknessPx: number;           // ring thickness (px)
  durationMs?: number;
  onDone: () => void;
}

export function RingTunnel({
  centerPx,
  innerPx,
  thicknessPx,
  durationMs = 1050,
  onDone,
}: RingTunnelProps) {
  const start = React.useRef<number | null>(null);
  const res = new THREE.Vector2();
  const uniforms = React.useMemo(
    () => ({
      u_time: { value: 0 },
      u_progress: { value: 0 },
      u_resolution: { value: res },
      u_center: { value: new THREE.Vector2() }, // px
      u_inner: { value: innerPx },             // px
      u_thickness: { value: thicknessPx },     // px
    }),
    [innerPx, thicknessPx]
  );

  useFrame(({ gl, clock }) => {
    if (start.current == null) start.current = clock.elapsedTime;
    const t = (clock.elapsedTime - start.current);
    const progress = Math.min(1, (t * 1000) / durationMs);
    uniforms.u_time.value = t;
    uniforms.u_progress.value = progress;

    const { width, height } = gl.domElement;
    res.set(width, height);
    uniforms.u_center.value.set(centerPx[0], centerPx[1]);

    // grow inner radius in px to hug the portal edge
    const targetInner = innerPx + progress * Math.max(width, height) * 0.8;
    uniforms.u_inner.value = targetInner;

    if (progress >= 1) onDone();
  });

  return (
    <Canvas
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
    >
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          toneMapped={false}
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            void main() { 
              vUv = uv; 
              gl_Position = vec4(position, 1.0); 
            }
          `}
          fragmentShader={`
            precision highp float;
            varying vec2 vUv;
            uniform vec2  u_resolution;
            uniform vec2  u_center;      // center in px
            uniform float u_inner;       // inner radius in px
            uniform float u_thickness;   // ring thickness in px
            uniform float u_time;
            uniform float u_progress;

            float sat(float x){ return clamp(x,0.,1.); }
            vec2  toPx(vec2 uv){ return uv * u_resolution; }

            void main(){
              vec2 fragPx = toPx(vUv);
              float r = length(fragPx - u_center);

              // inside portal: fully transparent
              if (r < u_inner) discard;

              // ring mask in px space
              float edge = smoothstep(u_inner, u_inner + u_thickness, r)
                         * (1.0 - smoothstep(u_inner + u_thickness, u_inner + 1.7*u_thickness, r));

              if (edge <= 0.001) discard;

              // spiral/ribbed pattern driven by angle and radius
              vec2  d   = normalize(fragPx - u_center + 1e-6);
              float ang = atan(d.y, d.x);
              float rib = 0.5 + 0.5 * cos(26.0*ang + 8.0*u_time);
              float flow= 0.5 + 0.5 * cos(0.25*r - 18.0*u_time); // r in px for big-scale flow

              float energy = sat(rib*0.9 + flow*0.6) * edge;

              // light-speed flash near 70%
              float flash = smoothstep(0.65,0.72,u_progress) * (1.0 - smoothstep(0.72,0.85,u_progress));

              // emissive color (>1 enables selective bloom if you add it)
              vec3 base  = vec3(0.06, 0.00, 0.13);
              vec3 hot   = vec3(1.8, 0.9, 2.2);
              vec3 col   = mix(base, hot, energy) + flash*1.1;

              // slight vignette for cohesion
              float vign = smoothstep(1.4, 0.2, length((vUv-0.5)*2.0));
              col *= vign;

              gl_FragColor = vec4(col, edge);
            }
          `}
        />
      </mesh>
    </Canvas>
  );
}

