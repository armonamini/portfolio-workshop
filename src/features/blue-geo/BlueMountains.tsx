import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shader material for the mountains
const MountainsMaterial = shaderMaterial(
  {
    u_time: 0,
    u_speed: 1,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vPosition;

    uniform float u_time;
    uniform float u_speed;

    // Simple noise function
    float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for(int i = 0; i < 4; i++) {
            value += amplitude * noise(p * frequency);
            amplitude *= 0.5;
            frequency *= 2.0;
        }
        
        return value;
    }

    void main() {
        vUv = uv;
        vPosition = position;
        
        // Create displacement based on noise
        vec2 noiseCoord = uv * 3.0 + u_time * u_speed * 0.1;
        float elevation = fbm(noiseCoord) * 0.3;
        vElevation = elevation;
        
        // Displace vertices
        vec3 newPosition = position;
        newPosition.z += elevation;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vPosition;

    uniform float u_time;
    uniform float u_speed;

    void main() {
        // Base ocean blue color
        vec3 oceanBlue = vec3(0.074, 0.353, 0.541); // #125A8A
        
        // Add elevation-based color variation
        vec3 color = mix(oceanBlue, vec3(0.196, 0.455, 0.690), vElevation);
        
        // Add subtle emissive lines for wireframe effect
        float gridSize = 20.0;
        vec2 grid = fract(vUv * gridSize);
        float line = step(0.95, grid.x) + step(0.95, grid.y);
        
        // Animate the lines
        float lineIntensity = line * (0.3 + 0.2 * sin(u_time * 2.0 + vUv.x * 10.0));
        
        // Add glow effect
        vec3 glowColor = vec3(0.549, 0.776, 0.918); // #8BC6EA
        color = mix(color, glowColor, lineIntensity);
        
        // Add atmospheric fog
        float fog = smoothstep(0.0, 0.5, vUv.y);
        color = mix(color, vec3(0.196, 0.455, 0.690), fog * 0.3);
        
        // Add horizon glow
        float horizon = smoothstep(0.4, 0.6, vUv.y);
        vec3 horizonColor = vec3(0.314, 0.663, 0.863); // #4FA9DC
        color = mix(color, horizonColor, horizon * 0.2);
        
        gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend the material type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mountainsMaterial: any;
    }
  }
}

// Mountains mesh component
const MountainsMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { size } = useThree();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.u_time = clock.getElapsedTime();
      materialRef.current.u_speed = 1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <mountainsMaterial ref={materialRef} />
    </mesh>
  );
};

// Main BlueMountains component
export const BlueMountains = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }}
        camera={{ position: [0, 5, 5], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <MountainsMesh />
      </Canvas>
    </div>
  );
};
