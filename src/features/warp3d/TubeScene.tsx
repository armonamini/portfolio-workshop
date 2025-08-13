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

  // emissive color ( > 1 enables selective bloom)
  vec3 col = mix(vec3(0.04,0.0,0.08), vec3(1.8,0.9,2.2), energy) * radial;

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

  // Create a much longer, wider tunnel path for immersive travel
  const curve = useMemo(() => {
    const points = [];
    // Create a very long path with gentle curves
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const x = Math.sin(t * Math.PI * 1.5) * 8; // Wider S-curve
      const y = Math.sin(t * Math.PI * 3) * 3; // More vertical movement
      const z = -200 + t * 400; // Much longer tunnel from -200 to +200
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, []);

  // Create tube geometry - massive tunnel for full visibility
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 800, 50.0, 64, false);
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

  // Camera travel animation
  useFrame((state) => {
    if (!material) return;

    // Update shader time
    material.uniforms.u_time.value = state.clock.elapsedTime;

    // Animate camera through tube
    const t = progress;
    if (t > 0 && t <= 1) {
      // Get position along the curve
      const pos = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t).normalize();
      
      // Position camera inside the tube
      camera.position.copy(pos);
      
      // Look ahead along the curve for proper tunnel perspective
      const lookAhead = curve.getPointAt(Math.min(t + 0.1, 1.0));
      camera.lookAt(lookAhead);
      
      // Stabilize camera roll
      const up = new THREE.Vector3(0, 1, 0);
      camera.up.lerp(up, 0.1);
    }

    // Check if animation is complete
    if (progress >= 1.0 && onComplete) {
      onComplete();
    }
  });

  // Reset camera on mount - start deep inside the tunnel
  useEffect(() => {
    camera.position.set(0, 0, -150); // Start inside the massive tunnel
    camera.lookAt(0, 0, -140);
  }, [camera]);

    return (
    <>
      {/* Tube mesh */}
      <mesh ref={tubeRef} geometry={tubeGeometry}>
        <primitive object={material} attach="material" />
      </mesh>
      
      {/* Tunnel exit light */}
      <mesh position={[0, 0, 200]}>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial 
          color={0xffffff} 
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Additional exit glow */}
      <mesh position={[0, 0, 200]}>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial 
          color={0xffffff} 
          transparent={true}
          opacity={0.1}
        />
      </mesh>
      
      {/* Star particles */}
      <points geometry={starGeometry}>
        <pointsMaterial 
          size={2}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
        />
      </points>
    </>
  );
} 