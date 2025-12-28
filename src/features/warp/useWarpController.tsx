import * as React from "react";

type BeginOpts = { 
  durationMs?: number; 
  cueMs?: number; 
  onCue?: () => void;
  centerX?: number;
  centerY?: number;
};

type Ctx = {
  active: boolean;
  centerX: number;
  centerY: number;
  begin: (o: BeginOpts) => Promise<void>;
  complete: () => void;
};

const WarpContext = React.createContext<Ctx | null>(null);

export const useWarpController = () => {
  const context = React.useContext(WarpContext);
  if (!context) {
    throw new Error("useWarpController must be used within a WarpProvider");
  }
  return context;
};

export const WarpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = React.useState(false);
  const [centerX, setCenterX] = React.useState(0);
  const [centerY, setCenterY] = React.useState(0);
  const resolverRef = React.useRef<(() => void) | null>(null);
  const safetyRef = React.useRef<number | null>(null);

  const complete = React.useCallback(() => {
    console.log('WarpController: complete() called, active:', active);
    if (active) {
      console.log('WarpController: Setting active to false');
      setActive(false);
    }
    if (resolverRef.current) {
      console.log('WarpController: Resolving promise');
      resolverRef.current();
      resolverRef.current = null;
    }
    if (safetyRef.current) {
      clearTimeout(safetyRef.current);
      safetyRef.current = null;
    }
  }, [active]);

  const begin = React.useCallback(async ({ durationMs = 1050, cueMs = 700, onCue, centerX: cx, centerY: cy }: BeginOpts) => {
    console.log('WarpController: begin() called, active:', active);
    if (active) return Promise.resolve();

    console.log('WarpController: Setting active to true');
    setActive(true);
    if (cx !== undefined) setCenterX(cx);
    if (cy !== undefined) setCenterY(cy);

    // Create a promise that resolves when the animation completes
    const promise = new Promise<void>((resolve) => {
      console.log('WarpController: Creating promise');
      resolverRef.current = resolve;
    });

    // Set up the cue (navigation) timing
    window.setTimeout(() => {
      console.log('WarpController: Executing onCue (navigation)');
      if (onCue) onCue();
    }, cueMs);

    // Set up safety timeout to ensure completion
    safetyRef.current = window.setTimeout(() => {
      console.log('WarpController: Safety timeout - calling complete()');
      complete();
    }, durationMs + 100);

    return promise;
  }, [active, complete]);

  const value = React.useMemo(() => ({ active, centerX, centerY, begin, complete }), [active, centerX, centerY, begin, complete]);
  return <WarpContext.Provider value={value}>{children}</WarpContext.Provider>;
};
