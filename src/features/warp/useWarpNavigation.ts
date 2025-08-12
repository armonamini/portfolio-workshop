import * as React from "react";
import { useWarpController } from "./useWarpController";
import { useNavigate, useLocation } from "react-router-dom";
import { prefersReducedMotion } from '@/utils/webgl';

export const useWarpNavigation = () => {
  const { begin, complete } = useWarpController();
  const navigate = useNavigate();
  const location = useLocation();

  // If the route changes for any reason, hide overlay (belt-and-suspenders)
  React.useEffect(() => { complete(); }, [location?.pathname, complete]);

  const start = async (target: string) => {
    // Skip warp if reduced motion is preferred
    if (prefersReducedMotion) {
      navigate(target);
      return;
    }

    await begin({
      durationMs: 1000,
      cueMs: 700,
      onCue: () => navigate(target),
    });
  };

  return { start };
};
