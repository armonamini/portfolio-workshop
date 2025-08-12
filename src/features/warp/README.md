# Warp Navigation Feature

A cinematic hyperspace tunnel overlay that plays when navigating to the Home page.

## Components

- `HyperspaceOverlay`: Main overlay component with WebGL/fallback support
- `useWarpNavigation`: Hook for triggering warp navigation
- `FallbackCanvas`: 2D canvas fallback for non-WebGL devices
- `TunnelScene`: Three.js tunnel effect with shader material

## Usage

```tsx
import { useWarpNavigation, HyperspaceOverlay } from '@/features/warp';

const MyComponent = () => {
  const warpNav = useWarpNavigation();
  
  return (
    <>
      <button onClick={() => warpNav.start('/home')}>
        Go Home
      </button>
      <HyperspaceOverlay 
        isActive={warpNav.isActive} 
        onComplete={() => console.log('Warp complete')} 
      />
    </>
  );
};
```

## Features

- Progressive enhancement (WebGL → 2D fallback)
- Respects `prefers-reduced-motion`
- 1.1s animation timeline with navigation at 700ms
- Purple color palette matching landing page
- White flash effect at peak intensity
