import * as React from "react";

interface OverlayRootProps {
  active: boolean;
  children?: React.ReactNode;
}

export function OverlayRoot({ active, children }: OverlayRootProps) {
  return (
    <div
      id="warp-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: active ? 1 : 0,
        transition: 'opacity 220ms ease-out',
        background: 'transparent'
      }}
      aria-hidden
    >
      {children}
    </div>
  );
}

