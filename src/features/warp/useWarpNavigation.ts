import * as React from "react";
import { useWarpController } from "./useWarpController";
import { useNavigate, useLocation } from "react-router-dom";
import { prefersReducedMotion } from '@/utils/webgl';

export const useWarpNavigation = () => {
  const { begin, complete } = useWarpController();
  const navigate = useNavigate();
  const location = useLocation();

  // Note: We don't auto-complete on route changes anymore
  // The animation will complete naturally after 1.05s

  const start = async (target: string) => {
    console.log('WarpNavigation: start() called with target:', target);
    // Dev override for testing
    const force = typeof window !== 'undefined' && localStorage.getItem('forceWarp') === '1';
    const reduced = prefersReducedMotion && !force;
    
    // Skip warp if reduced motion is preferred
    if (reduced) {
      console.log('WarpNavigation: Reduced motion - navigating directly');
      navigate(target);
      return;
    }

    console.log('WarpNavigation: Starting warp animation');
    await begin({
      durationMs: 1050,
      cueMs: 720,
      onCue: () => {
        console.log('WarpNavigation: Executing navigation to:', target);
        navigate(target);
      },
    });
    console.log('WarpNavigation: Warp animation completed');
  };

  return { start };
};
