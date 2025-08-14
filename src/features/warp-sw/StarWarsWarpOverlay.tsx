import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useWarpController } from "../warp/useWarpController";
import { prefersReducedMotion } from '@/utils/webgl';

// Star Wars Tunnel Scene Component
function StarWarsTunnelScene({ progress }: { progress: number }) {
  const { camera } = useThree();
  const curveRef = React.useRef<THREE.CatmullRomCurve3>();
  const tubeRef = React.useRef<THREE.Mesh>();
  const particlesRef = React.useRef<THREE.Points>();
  const [fov, setFov] = React.useState(45);
  const [flashIntensity, setFlashIntensity] = React.useState(0);

  // Create the S-curve for the tunnel
  React.useEffect(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(5, 0, -20),
      new THREE.Vector3(-5, 0, -30),
      new THREE.Vector3(0, 0, -40),
      new THREE.Vector3(0, 0, -50),
      new THREE.Vector3(0, 0, -60),
    ];
    curveRef.current = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  }, []);

  // Create tube geometry
  React.useEffect(() => {
    if (!curveRef.current) return;

    const tubeGeometry = new THREE.TubeGeometry(
      curveRef.current,
      400, // tubularSegments
      1.2, // radius
      64,  // radialSegments
      false // closed
    );

    if (tubeRef.current) {
      tubeRef.current.geometry.dispose();
      tubeRef.current.geometry = tubeGeometry;
    }
  }, []);

  // Create particle system
  React.useEffect(() => {
    if (!curveRef.current) return;

    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const point = curveRef.current.getPointAt(t);
      const tangent = curveRef.current.getTangentAt(t);
      // Calculate normal and binormal manually since CatmullRomCurve3 doesn't have these methods
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      // Position particles in a cylinder around the curve
      const radius = 2 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      
      positions[i * 3] = point.x + normal.x * Math.cos(angle) * radius + binormal.x * Math.sin(angle) * radius;
      positions[i * 3 + 1] = point.y + normal.y * Math.cos(angle) * radius + binormal.y * Math.sin(angle) * radius;
      positions[i * 3 + 2] = point.z + normal.z * Math.cos(angle) * radius + binormal.z * Math.sin(angle) * radius;

      // Velocity towards camera
      velocities[i * 3] = -tangent.x * (2 + Math.random() * 3);
      velocities[i * 3 + 1] = -tangent.y * (2 + Math.random() * 3);
      velocities[i * 3 + 2] = -tangent.z * (2 + Math.random() * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      color: 0x4488ff,
      size: 2,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    if (particlesRef.current) {
      particlesRef.current.geometry.dispose();
      particlesRef.current.geometry = geometry;
      particlesRef.current.material = material;
    }
  }, []);

  // Animate camera and effects
  useFrame((state, delta) => {
    if (!curveRef.current) return;

    // Speed ramp: accelerate mid-way, then sharply spike for "lightspeed"
    let speedMultiplier = 1;
    if (progress > 0.5) {
      speedMultiplier = 1 + (progress - 0.5) * 2;
    }
    if (progress > 0.7) {
      speedMultiplier = 3 + (progress - 0.7) * 10; // Sharp spike
    }

    // Camera travel along the curve
    const t = progress;
    const point = curveRef.current.getPointAt(t);
    const tangent = curveRef.current.getTangentAt(t).normalize();

    camera.position.copy(point);
    camera.lookAt(point.clone().add(tangent));

    // FOV animation during lightspeed
    if (progress > 0.7) {
      const fovProgress = (progress - 0.7) / 0.3;
      setFov(45 + fovProgress * 20); // 45 → 65
    } else {
      setFov(45);
    }

    // Lightspeed flash effect
    if (progress > 0.7 && progress < 0.78) {
      const flashProgress = (progress - 0.7) / 0.08;
      setFlashIntensity(Math.sin(flashProgress * Math.PI) * 2);
    } else {
      setFlashIntensity(0);
    }

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = particlesRef.current.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] * delta * speedMultiplier;
        positions[i + 1] += velocities[i + 1] * delta * speedMultiplier;
        positions[i + 2] += velocities[i + 2] * delta * speedMultiplier;

        // Reset particles that pass the camera
        if (positions[i + 2] > 5) {
          const t = Math.random();
          const point = curveRef.current.getPointAt(t);
          positions[i] = point.x;
          positions[i + 1] = point.y;
          positions[i + 2] = point.z;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Tunnel */}
      <mesh ref={tubeRef}>
        <tubeGeometry args={[curveRef.current!, 400, 1.2, 64, false]} />
        <meshStandardMaterial 
          color={0x224466} 
          transparent 
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Particles */}
      <points ref={particlesRef} />

      {/* Lightspeed flash */}
      {flashIntensity > 0 && (
        <mesh>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial 
            color={0xffffff} 
            transparent 
            opacity={flashIntensity * 0.3}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} color={0x4488ff} />
    </>
  );
}

// Main Star Wars Warp Overlay Component
export function StarWarsWarpOverlay() {
  const { active, complete } = useWarpController();
  const [progress, setProgress] = React.useState(0);
  const [webglError, setWebglError] = React.useState(false);
  const [overlayOpacity, setOverlayOpacity] = React.useState(0);
  const startTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (active) {
      console.log('StarWarsWarpOverlay: Starting animation');
      startTimeRef.current = Date.now();
      setOverlayOpacity(1);

      // Animate progress from 0 to 1 over 1.05 seconds
      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min(elapsed / 1050, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log('StarWarsWarpOverlay: Animation complete');
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

  // Dev override for testing
  const force = typeof window !== 'undefined' && localStorage.getItem('forceWarp') === '1';
  const reduced = prefersReducedMotion && !force;
  
  // Use fallback for reduced motion preference or WebGL errors
  if (reduced || webglError) {
    console.log('StarWarsWarpOverlay: Using fallback (reduced motion or WebGL error)');
    console.log('  - reduced motion:', reduced);
    console.log('  - webgl error:', webglError);
    
    // Call complete immediately for fallback to avoid hanging
    React.useEffect(() => {
      if (active) {
        const timer = setTimeout(() => {
          console.log('StarWarsWarpOverlay: Fallback animation complete');
          complete();
        }, 200);
        return () => clearTimeout(timer);
      }
    }, [active, complete]);
    return (
      <div
        id="warp-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
          opacity: active ? 1 : 0,
          transition: "opacity 200ms ease-out",
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
        }} />
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
        transition: "opacity 220ms ease-out",
        background: "transparent",
      }}
      aria-hidden
    >
      <Canvas
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          // Handle WebGL context loss
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.error('WebGL context lost');
            setWebglError(true);
            complete();
          }, false);
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
        {/* Temporary backdrop for testing - remove in production */}
        <color attach="background" args={['black']} />
        <StarWarsTunnelScene progress={progress} />
        
        {/* Post-processing effects temporarily disabled for stability */}
        {/* {window.innerWidth > 768 && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur luminanceThreshold={1} intensity={0.85} />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        )} */}
      </Canvas>
    </div>
  );
}
