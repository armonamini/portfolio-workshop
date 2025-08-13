import * as React from "react";

// Safe error boundary for effects
function ErrorBoundaryFallback({ children }: React.PropsWithChildren) {
  const [ok, setOk] = React.useState(true);
  
  if (!ok) return null;
  
  return (
    <React.ErrorBoundary 
      fallbackRender={() => { 
        setOk(false); 
        return null; 
      }}
    >
      {children}
    </React.ErrorBoundary>
  );
}

// Lazy-loaded effects component
export default function EffectsDesktop() {
  return (
    <ErrorBoundaryFallback>
      <Suspense fallback={null}>
        {/* Effects will be added here when compatible versions are available */}
        {/* <EffectComposer multisampling={0}>
          <Bloom mipmapBlur luminanceThreshold={1} intensity={0.85} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer> */}
      </Suspense>
    </ErrorBoundaryFallback>
  );
}
