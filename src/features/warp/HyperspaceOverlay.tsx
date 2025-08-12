import { Suspense, lazy, useEffect, useState } from 'react';
import { hasWebGL, prefersReducedMotion } from '@/utils/webgl';
import { FallbackCanvas } from './FallbackCanvas';

// Lazy load Three.js components
const TunnelScene = lazy(() => import('./TunnelScene').then(m => ({ default: m.TunnelScene })));

interface HyperspaceOverlayProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const HyperspaceOverlay = ({ isActive, onComplete }: HyperspaceOverlayProps) => {
  const [useWebGL, setUseWebGL] = useState(false);
  const [webglContextLost, setWebglContextLost] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Check WebGL support and preferences
      const shouldUseWebGL = hasWebGL() && !prefersReducedMotion && !webglContextLost;
      setUseWebGL(shouldUseWebGL);
    }
  }, [isActive, webglContextLost]);

  const handleWebGLLost = () => {
    setWebglContextLost(true);
    setUseWebGL(false);
  };

  const handleComplete = () => {
    console.log('HyperspaceOverlay: Animation complete');
    onComplete?.();
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {useWebGL ? (
        <Suspense fallback={<FallbackCanvas isActive={true} onComplete={handleComplete} />}>
          <TunnelScene onComplete={handleComplete} onWebGLLost={handleWebGLLost} />
        </Suspense>
      ) : (
        <FallbackCanvas isActive={true} onComplete={handleComplete} />
      )}
    </div>
  );
};
