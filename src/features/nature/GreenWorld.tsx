import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Fog } from "three";
import * as THREE from "three";

const Hills = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Generate hills geometry with noise
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 100, 100);
    const positions = geo.attributes.position.array as Float32Array;
    
    // Simple noise function
    const noise = (x: number, z: number) => {
      return Math.sin(x * 0.3) * Math.cos(z * 0.2) * 0.8 + 
             Math.sin(x * 0.8) * Math.cos(z * 0.5) * 0.3;
    };
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 1];
      positions[i + 2] = noise(x, z);
    }
    
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);
  
  const vertexShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      // Gentle displacement
      pos.z += sin(pos.x * 0.5 + uTime * 0.3) * 0.1 + cos(pos.y * 0.3 + uTime * 0.2) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
  
  const fragmentShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float uTime;
    
    void main() {
      // Gradient from grove colors
      float height = (vPosition.z + 1.0) * 0.5;
      vec3 color1 = vec3(0.18, 0.49, 0.20); // grove-600
      vec3 color2 = vec3(0.25, 0.64, 0.30); // grove-500
      vec3 color3 = vec3(0.41, 0.76, 0.45); // grove-400
      
      vec3 color = mix(color1, color2, height);
      color = mix(color, color3, smoothstep(0.7, 1.0, height));
      
      // Subtle wireframe effect
      vec3 grid = abs(fract(vPosition.xy * 10.0) - 0.5) / fwidth(vPosition.xy * 10.0);
      float line = min(grid.x, grid.y);
      float wireframe = 1.0 - min(line, 1.0);
      
      color = mix(color, vec3(0.4, 0.8, 0.6), wireframe * 0.1);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
      />
    </mesh>
  );
};

const Lake = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = -1.8 + Math.sin(time * 0.5) * 0.02;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[2, -1.8, 0]}>
      <planeGeometry args={[4, 2]} />
      <meshLambertMaterial 
        color={new THREE.Color().setHSL(154/360, 0.51, 0.24)} 
        transparent 
        opacity={0.7} 
      />
    </mesh>
  );
};

const Fireflies = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      pointsRef.current.rotation.y += 0.0005;
      
      // Gentle opacity pulse
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(time * 2) * 0.3;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={new THREE.Color().setHSL(163/360, 0.9, 0.53)}
        transparent
        opacity={0.8}
        toneMapped={false}
      />
    </points>
  );
};

const CameraDrift = () => {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.1) * 0.5;
    state.camera.position.z = 3 + Math.cos(time * 0.08) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const GreenWorld = () => {
  // Performance settings
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  
  return (
    <Canvas
      gl={{ 
        antialias: false, 
        powerPreference: 'high-performance', 
        alpha: true 
      }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.fog = new Fog('#0b1f14', 3, 12);
      }}
      dpr={dpr}
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 1, 3], fov: 75 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.6} 
        color={new THREE.Color().setHSL(120/360, 0.3, 0.8)}
      />
      
      <Hills />
      <Lake />
      <Fireflies />
      <CameraDrift />
    </Canvas>
  );
};

export default GreenWorld;