import { Suspense, lazy, useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shader source code as strings
const vertexShader = `
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
`;

const fragmentShader = `
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
      
      // Add very subtle emissive lines for wireframe effect (much more subtle)
      float gridSize = 40.0; // Increased grid size for less density
      vec2 grid = fract(vUv * gridSize);
      float line = step(0.98, grid.x) + step(0.98, grid.y); // Much thinner lines
      
      // Animate the lines very subtly
      float lineIntensity = line * (0.05 + 0.03 * sin(u_time * 1.0 + vUv.x * 5.0)); // Much lower intensity
      
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
`;

// Mountains mesh component
const MountainsMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_speed: { value: 1 },
      },
    });
  }, []);

  useFrame(({ clock }) => {
    if (material) {
      material.uniforms.u_time.value = clock.getElapsedTime();
      material.uniforms.u_speed.value = 1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <primitive object={material} attach="material" />
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
