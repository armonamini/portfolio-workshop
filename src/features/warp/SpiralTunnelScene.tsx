import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

// Simplified shader source code
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float u_time;
uniform float u_progress;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
    float t = u_time;
    
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    // Progress-based zoom
    float z = smoothstep(0.0, 1.0, u_progress);
    r = r / (1.0 - 0.8 * z + 0.001);
    
    // Spiral effect
    a += 4.0 * log(r + 0.001) + 2.0 * t;
    
    // Create ribbed tunnel effect
    float ang = 0.5 + 0.5 * cos(16.0 * a + 6.0 * t);
    float rad = 0.5 + 0.5 * cos(40.0 * r - 12.0 * t);
    float bands = pow(ang * rad, 1.0);
    
    // Depth falloff
    float depth = pow(1.0 - clamp(r, 0.0, 1.0), 2.0);
    
    // Flash effect
    float flash = smoothstep(0.6, 0.7, u_progress) * (1.0 - smoothstep(0.7, 0.8, u_progress));
    
    // Color palette
    vec3 color1 = vec3(0.1, 0.0, 0.3);  // Deep purple
    vec3 color2 = vec3(0.7, 0.1, 0.8);  // Magenta
    vec3 color3 = vec3(1.0, 0.4, 0.9);  // Hot pink
    
    float energy = clamp(bands * 1.2 + depth * 0.8, 0.0, 1.0);
    vec3 col = mix(mix(color1, color2, energy), color3, energy * 0.6);
    col += flash * vec3(1.0, 1.0, 1.0);
    
    // Final color with falloff
    float falloff = 0.8 / (0.3 + r * r);
    vec3 finalColor = clamp(col, 0.0, 1.0) * falloff;
    
    gl_FragColor = vec4(finalColor, clamp(energy + flash, 0.0, 1.0));
}
`;

interface SpiralTunnelSceneProps {
  progress: number;
  onComplete?: () => void;
}

export function SpiralTunnelScene({ progress, onComplete }: SpiralTunnelSceneProps) {
  const { size } = useThree();

  // Create shader material with error handling
  const material = useMemo(() => {
    try {
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_progress: { value: 0 },
          u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      
      // Check for shader compilation errors
      if (mat.fragmentShader && mat.vertexShader) {
        console.log('Shader material created successfully');
      }
      
      return mat;
    } catch (error) {
      console.error('Error creating shader material:', error);
      // Fallback to a simple colored material
      return new THREE.MeshBasicMaterial({
        color: 0x8000ff,
        transparent: true,
        opacity: 0.8,
      });
    }
  }, [size.width, size.height]);

  // Create a full-screen quad
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);

  useFrame((state) => {
    if (!material || material.type !== 'ShaderMaterial') return;

    try {
      const shaderMat = material as THREE.ShaderMaterial;
      
      // Set time uniform
      shaderMat.uniforms.u_time.value = state.clock.elapsedTime;
      
      // Set progress uniform
      shaderMat.uniforms.u_progress.value = progress;
      
      // Set resolution uniform
      shaderMat.uniforms.u_resolution.value.set(size.width, size.height);

      // Check if animation is complete
      if (progress >= 1.0 && onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error in SpiralTunnelScene useFrame:', error);
    }
  });

  return (
    <mesh geometry={geometry} material={material} />
  );
} 