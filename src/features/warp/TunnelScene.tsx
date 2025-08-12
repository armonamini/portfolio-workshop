import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shader material for the tunnel effect
const TunnelMaterial = shaderMaterial(
  {
    u_time: 0,
    u_speed: 1,
    u_intensity: 1,
    u_resolution: new THREE.Vector2(),
    u_aspect: 1,
    u_flash: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader (imported from file)
  `
    precision highp float;

    uniform float u_time;
    uniform float u_speed;
    uniform float u_intensity;
    uniform vec2 u_resolution;
    uniform float u_aspect;
    uniform float u_flash;

    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        
        // Polar coordinates for tunnel effect
        vec2 center = vec2(0.5, 0.5);
        vec2 polar = uv - center;
        float angle = atan(polar.y, polar.x);
        float radius = length(polar);
        
        // Tunnel movement
        float tunnel = radius + u_time * u_speed * 0.5;
        float tunnel_wrap = mod(tunnel, 0.1);
        
        // Streak effect
        float streak = sin(angle * 8.0 + u_time * 2.0) * 0.5 + 0.5;
        streak *= sin(radius * 20.0 - u_time * 3.0) * 0.5 + 0.5;
        
        // Intensity based on radius and time
        float intensity = (1.0 - radius) * u_intensity;
        intensity *= streak * tunnel_wrap * 2.0;
        
        // Purple color palette matching landing page
        vec3 color1 = vec3(0.5, 0.2, 0.8); // Purple
        vec3 color2 = vec3(0.8, 0.3, 1.0); // Light purple
        vec3 color3 = vec3(0.3, 0.1, 0.6); // Dark purple
        
        vec3 tunnel_color = mix(color1, color2, streak);
        tunnel_color = mix(tunnel_color, color3, radius);
        
        // Add white flash
        vec3 flash_color = vec3(1.0, 1.0, 1.0);
        tunnel_color = mix(tunnel_color, flash_color, u_flash);
        
        // Fade out at edges
        float fade = 1.0 - smoothstep(0.4, 0.5, radius);
        
        gl_FragColor = vec4(tunnel_color * intensity * fade, intensity * fade);
    }
  `
);

// Extend the material type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      tunnelMaterial: any;
    }
  }
}

// Tunnel mesh component
const TunnelMesh = ({ onComplete }: { onComplete?: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [startTime] = useState(Date.now());
  const { size } = useThree();

  useFrame(() => {
    if (!materialRef.current) return;

    const elapsed = (Date.now() - startTime) / 1000;
    const progress = Math.min(elapsed / 1.1, 1);

    // Update uniforms based on animation timeline
    materialRef.current.u_time = elapsed;
    materialRef.current.u_speed = 1 + progress * 2; // Accelerate
    materialRef.current.u_intensity = Math.min(progress * 3, 1); // Build intensity
    
    // White flash at peak (around 700ms)
    if (progress > 0.6 && progress < 0.8) {
      materialRef.current.u_flash = Math.sin((progress - 0.6) * Math.PI / 0.2) * 0.8;
    } else {
      materialRef.current.u_flash = 0;
    }

    // Fade out at the end
    if (progress > 0.85) {
      materialRef.current.u_intensity *= (1 - (progress - 0.85) / 0.15);
    }

    // Complete animation
    if (progress >= 1) {
      setTimeout(() => {
        onComplete?.();
      }, 100);
    }
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.u_resolution.set(size.width, size.height);
      materialRef.current.u_aspect = size.width / size.height;
    }
  }, [size]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <tunnelMaterial ref={materialRef} transparent />
    </mesh>
  );
};

// Main tunnel scene
interface TunnelSceneProps {
  onComplete?: () => void;
  onWebGLLost?: () => void;
}

export const TunnelScene = ({ onComplete, onWebGLLost }: TunnelSceneProps) => {
  const handleContextLost = () => {
    onWebGLLost?.();
  };

  return (
    <Canvas
      onContextLost={handleContextLost}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      }}
    >
      <TunnelMesh onComplete={onComplete} />
    </Canvas>
  );
};
