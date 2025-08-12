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
    if (!active) return;
    setActive(false);
    window.setTimeout(() => { resolverRef.current?.(); resolverRef.current = null; }, 220); // fade-out room
  }, [active]);

  const begin = React.useCallback(({ durationMs = 1000, cueMs = 700, onCue }: BeginOpts) => {
    if (active) return Promise.resolve(); // ignore double clicks
    setActive(true);
    window.setTimeout(() => onCue?.(), cueMs);
    if (safetyRef.current) window.clearTimeout(safetyRef.current);
    safetyRef.current = window.setTimeout(() => complete(), durationMs + 50);
    return new Promise<void>((resolve) => { resolverRef.current = resolve; });
  }, [active, complete]);

  const value = React.useMemo(() => ({ active, begin, complete }), [active, begin, complete]);
  return React.createElement(Ctx.Provider, { value }, children);
};

export const useWarpController = () => {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useWarpController must be used inside <WarpProvider>");
  return v;
};
