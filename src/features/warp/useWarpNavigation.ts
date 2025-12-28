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

  const start = async (target: string, buttonElement?: HTMLElement) => {
    console.log('WarpNavigation: start() called with target:', target);
    
    // Calculate center coordinates from button if provided
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
      console.log('WarpNavigation: Button center calculated:', centerX, centerY);
    }
    
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
      durationMs: 1000,
      cueMs: 700,
      centerX,
      centerY,
      onCue: () => {
        console.log('WarpNavigation: Executing navigation to:', target);
        navigate(target);
      },
    });
    console.log('WarpNavigation: Warp animation completed');
  };

  return { start };
};
