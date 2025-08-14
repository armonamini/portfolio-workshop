import * as React from "react";

interface WarpControllerState {
  active: boolean;
  begin: (options: {
    durationMs: number;
    cueMs: number;
    onCue: () => void;
  }) => Promise<void>;
  complete: () => void;
}

const WarpContext = React.createContext<WarpControllerState | null>(null);

export const useWarpController = () => {
  const context = React.useContext(WarpContext);
  if (!context) {
    throw new Error("useWarpController must be used within a WarpProvider");
  }
  return context;
};

export const WarpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = React.useState(false);
  const [resolvePromise, setResolvePromise] = React.useState<(() => void) | null>(null);
  const [safetyTimeout, setSafetyTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const complete = React.useCallback(() => {
    console.log('WarpController: complete() called, active:', active);
    if (active) {
      console.log('WarpController: Setting active to false');
      setActive(false);
    }
    if (resolvePromise) {
      console.log('WarpController: Resolving promise');
      resolvePromise();
      setResolvePromise(null);
    }
    if (safetyTimeout) {
      clearTimeout(safetyTimeout);
      setSafetyTimeout(null);
    }
  }, [active, resolvePromise, safetyTimeout]);

  const begin = React.useCallback(async (options: {
    durationMs: number;
    cueMs: number;
    onCue: () => void;
  }) => {
    console.log('WarpController: begin() called, active:', active);
    if (active) return;

    console.log('WarpController: Setting active to true');
    setActive(true);

    // Create a promise that resolves when the animation completes
    const promise = new Promise<void>((resolve) => {
      console.log('WarpController: Creating promise');
      setResolvePromise(() => resolve);
    });

    // Set up the cue (navigation) timing
    const cueTimer = setTimeout(() => {
      console.log('WarpController: Executing onCue (navigation)');
      options.onCue();
    }, options.cueMs);

    // Set up safety timeout to ensure completion
    const safety = setTimeout(() => {
      console.log('WarpController: Safety timeout - calling complete()');
      complete();
    }, options.durationMs + 100);

    setSafetyTimeout(safety);

    // Clean up cue timer when component unmounts or completes
    React.useEffect(() => {
      return () => {
        clearTimeout(cueTimer);
      };
    }, []);

    return promise;
  }, [active, complete]);

  const value = React.useMemo(() => ({
    active,
    begin,
    complete,
  }), [active, begin, complete]);

  return (
    <WarpContext.Provider value={value}>
      {children}
    </WarpContext.Provider>
  );
};


