# Warp Navigation Feature

A cinematic portal tunnel overlay that plays when navigating to the Home page.

## Components

- `PortalTunnelOverlay`: Main overlay component with ring tunnel effect
- `useWarpNavigation`: Hook for triggering warp navigation
- `useWarpController`: Hook for managing warp state
- `RingTunnel`: WebGL ring tunnel effect
- `PortalStage`: Portal stage component for reduced motion fallback
- `OverlayRoot`: Root container for overlay components

## Usage

The warp navigation is automatically integrated into the app via `PortalTunnelOverlay` in `App.tsx`. To trigger navigation:

```tsx
import { useWarpNavigation } from '@/features/warp';

const MyComponent = () => {
  const warpNav = useWarpNavigation();
  
  return (
    <button onClick={() => warpNav.start('/home')}>
      Go Home
    </button>
  );
};
```

## Features

- Progressive enhancement (WebGL → 2D fallback)
- Respects `prefers-reduced-motion`
- 1.1s animation timeline with navigation
- Purple color palette matching landing page
- Portal-style circular reveal effect
