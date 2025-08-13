import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

// Shader source code as strings
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float u_time;

float band(float x, float w){ return smoothstep(0.5-w,0.5,x)-smoothstep(0.5,0.5+w,x); }

void main(){
  // mix multiple moving bands along Y for ribbed, high-speed look
  float s1 = band(fract(vUv.y*18.0 - u_time*6.0), 0.08);
  float s2 = band(fract(vUv.y*36.0 - u_time*9.0), 0.04);
  float s3 = band(fract(vUv.y*72.0 - u_time*12.0), 0.02);
  float energy = clamp(s1*0.9 + s2*0.7 + s3*0.5, 0.0, 1.5);

  // slight radial darkening via vUv.x to fake depth toward tube center
  float radial = smoothstep(1.0, 0.3, abs(vUv.x-0.5)*2.0);

  // Enhanced emissive color with built-in bloom effect
  vec3 darkColor = vec3(0.04, 0.0, 0.08);
  vec3 brightColor = vec3(2.5, 1.2, 3.0); // More intense for bloom effect
  vec3 col = mix(darkColor, brightColor, energy) * radial;

  // Built-in vignette effect
  float vignette = 1.0 - smoothstep(0.3, 0.9, length(vUv - 0.5) * 2.0);
  col *= vignette;

  // Add subtle chromatic aberration for cinematic feel
  float aberration = 0.02;
  float r = smoothstep(0.5 - aberration, 0.5 + aberration, vUv.x);
  float b = smoothstep(0.5 - aberration, 0.5 + aberration, vUv.x + 0.01);
  col.r *= r;
  col.b *= b;

  gl_FragColor = vec4(col, radial);  // alpha helps overlay blend
}
`;

interface TubeSceneProps {
  progress: number;
  onComplete?: () => void;
}

export function TubeScene({ progress, onComplete }: TubeSceneProps) {
  const { camera } = useThree();
  const tubeRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const startTimeRef = useRef(0);
  
  // Create star particles
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < 1000; i++) {
      positions.push(
        (Math.random() - 0.5) * 1000, // x
        (Math.random() - 0.5) * 1000, // y
        (Math.random() - 0.5) * 1000  // z
      );
      colors.push(1, 1, 1); // white stars
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, []);

  // Create a cinematic S-curve tunnel path
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.8, 0.2, -4),
      new THREE.Vector3(-0.6, 0.0, -8),
      new THREE.Vector3(0.6, -0.2, -12),
      new THREE.Vector3(0, 0, -16)
    ];
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, []);

  // Create tube geometry with proper sizing
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 320, 1.25, 64, false);
  }, [curve]);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      toneMapped: false, // Required for selective bloom
    });
  }, []);

  // Camera travel animation with proper tunnel perspective
  useFrame((state) => {
    if (!material) return;

    // Update shader time
    material.uniforms.u_time.value = state.clock.elapsedTime;

    // Animate camera through tube with ease-in/out
    const t = progress;
    if (t > 0 && t <= 1) {
      // Apply easing for more cinematic feel
      const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      // Get position along the curve
      const pos = curve.getPointAt(easedT);
      const tangent = curve.getTangentAt(easedT).normalize();
      
      // Position camera inside the tube
      camera.position.copy(pos);
      
      // Look ahead along the curve for proper tunnel perspective
      const lookAhead = pos.clone().add(tangent);
      camera.lookAt(lookAhead);
      
      // Stabilize camera roll
      const up = new THREE.Vector3(0, 1, 0);
      camera.up.lerp(up, 0.2);
    }

    // Check if animation is complete
    if (progress >= 1.0 && onComplete) {
      onComplete();
    }
  });

  // Reset camera on mount - start at tunnel entrance
  useEffect(() => {
    camera.position.set(0, 0, -2);
    camera.lookAt(0, 0, -4);
  }, [camera]);

    return (
    <>
      {/* Tube mesh */}
      <mesh ref={tubeRef} geometry={tubeGeometry}>
        <primitive object={material} attach="material" />
      </mesh>
      
      {/* Star particles for space atmosphere */}
      <points geometry={starGeometry}>
        <pointsMaterial 
          size={1}
          vertexColors={true}
          transparent={true}
          opacity={0.6}
        />
      </points>
    </>
  );
} 