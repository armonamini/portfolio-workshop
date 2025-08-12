import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hasWebGL, prefersReducedMotion } from '@/utils/webgl';

interface WarpNavigation {
  start: (targetPath: string) => void;
  isActive: boolean;
  progress: number;
}

export const useWarpNavigation = (): WarpNavigation => {
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Cleanup effect - reset warp state when location changes
  useEffect(() => {
    if (isActive) {
      // If we're on a different page and warp is still active, reset it
      const timer = setTimeout(() => {
        setIsActive(false);
        setProgress(0);
      }, 1500); // Give it 1.5 seconds max

      return () => clearTimeout(timer);
    }
  }, [location.pathname, isActive]);

  const start = useCallback((targetPath: string) => {
    // Skip warp if reduced motion is preferred
    if (prefersReducedMotion) {
      navigate(targetPath);
      return;
    }

    setIsActive(true);
    setProgress(0);

    const startTime = Date.now();
    const totalDuration = 1100; // 1.1 seconds total
    const navigationTime = 700; // Navigate at 700ms

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(elapsed / totalDuration, 1);
      
      setProgress(currentProgress);

      // Navigate at the specified time
      if (elapsed >= navigationTime && elapsed < navigationTime + 50) {
        navigate(targetPath);
      }

      if (currentProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - reset after a short delay
        setTimeout(() => {
          setIsActive(false);
          setProgress(0);
        }, 200);
      }
    };

    requestAnimationFrame(animate);
  }, [navigate]);

  // Add a method to manually reset the warp state
  const reset = useCallback(() => {
    setIsActive(false);
    setProgress(0);
  }, []);

  return { start, isActive, progress, reset };
};
