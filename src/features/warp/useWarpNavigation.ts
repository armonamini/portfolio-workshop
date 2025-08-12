import * as React from "react";
import { useWarpController } from "./useWarpController";
import { useNavigate, useLocation } from "react-router-dom";
import { prefersReducedMotion } from '@/utils/webgl';

export const useWarpNavigation = () => {
  const { begin, complete } = useWarpController();
  const navigate = useNavigate();

  const start = async (target: string) => {
    console.log('WarpNavigation: start() called with target:', target);
    // Skip warp if reduced motion is preferred
    if (prefersReducedMotion) {
      console.log('WarpNavigation: Reduced motion - navigating directly');
      navigate(target);
      return;
    }

    console.log('WarpNavigation: Starting warp animation');
    await begin({
      durationMs: 1000,
      cueMs: 700,
      onCue: () => {
        console.log('WarpNavigation: Executing navigation to:', target);
        navigate(target);
      },
    });
    console.log('WarpNavigation: Warp animation completed');
  };

  return { start };
};
