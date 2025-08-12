import * as React from "react";

type BeginOpts = { durationMs?: number; cueMs?: number; onCue?: () => void };
type Ctx = {
  active: boolean;
  begin: (o: BeginOpts) => Promise<void>;
  complete: () => void;
};

const Ctx = React.createContext<Ctx | null>(null);

export const WarpProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [active, setActive] = React.useState(false);
  const resolverRef = React.useRef<(() => void) | null>(null);
  const safetyRef = React.useRef<number | null>(null);

  const complete = React.useCallback(() => {
    console.log('WarpController: complete() called, active:', active);
    if (!active) return;
    console.log('WarpController: Setting active to false');
    setActive(false);
    window.setTimeout(() => { 
      console.log('WarpController: Resolving promise');
      resolverRef.current?.(); 
      resolverRef.current = null; 
    }, 220); // fade-out room
  }, [active]);

  const begin = React.useCallback(({ durationMs = 1000, cueMs = 700, onCue }: BeginOpts) => {
    console.log('WarpController: begin() called, active:', active);
    if (active) return Promise.resolve(); // ignore double clicks
    console.log('WarpController: Setting active to true');
    setActive(true);
    window.setTimeout(() => {
      console.log('WarpController: Executing onCue (navigation)');
      onCue?.();
    }, cueMs);
    if (safetyRef.current) window.clearTimeout(safetyRef.current);
    safetyRef.current = window.setTimeout(() => {
      console.log('WarpController: Safety timeout - calling complete()');
      complete();
    }, durationMs + 50);
    return new Promise<void>((resolve) => { 
      console.log('WarpController: Creating promise');
      resolverRef.current = resolve; 
    });
  }, [active, complete]);

  const value = React.useMemo(() => ({ active, begin, complete }), [active, begin, complete]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useWarpController = () => {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useWarpController must be used inside <WarpProvider>");
  return v;
};
