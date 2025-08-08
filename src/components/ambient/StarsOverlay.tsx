import React from "react";

interface Comet {
  id: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const StarsOverlay: React.FC = () => {
  const [comets, setComets] = React.useState<Comet[]>([]);
  const idRef = React.useRef(0);

  const stars = React.useMemo(() => {
    const count = 60;
    return new Array(count).fill(0).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: randomBetween(1, 2.5),
      delay: randomBetween(0, 6),
      duration: randomBetween(5, 10),
      opacity: randomBetween(0.4, 1),
    }));
  }, []);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number }>;
      const targetX = ce.detail?.x ?? window.innerWidth / 2;
      const targetY = ce.detail?.y ?? window.innerHeight / 2;

      // Choose a random edge start
      const edge = Math.floor(Math.random() * 4);
      let startX = 0, startY = 0;
      if (edge === 0) { // top
        startX = randomBetween(0, window.innerWidth);
        startY = -20;
      } else if (edge === 1) { // right
        startX = window.innerWidth + 20;
        startY = randomBetween(0, window.innerHeight * 0.6);
      } else if (edge === 2) { // bottom
        startX = randomBetween(0, window.innerWidth);
        startY = window.innerHeight + 20;
      } else { // left
        startX = -20;
        startY = randomBetween(0, window.innerHeight * 0.6);
      }

      const dx = targetX - startX;
      const dy = targetY - startY;

      const id = ++idRef.current;
      setComets((prev) => [...prev, { id, startX, startY, dx, dy }]);
      // Cleanup after animation ends (~0.9s)
      window.setTimeout(() => {
        setComets((prev) => prev.filter((c) => c.id !== id));
      }, 950);
    };

    window.addEventListener("shooting-star", handler as EventListener);
    return () => window.removeEventListener("shooting-star", handler as EventListener);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Small drifting stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-foreground/70"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `star-drift ${s.duration}s ease-in-out ${s.delay}s infinite` as any,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Comets */}
      {comets.map((c) => (
        <div
          key={c.id}
          className="absolute will-change-transform animate-shoot"
          style={{
            top: c.startY,
            left: c.startX,
            ['--dx' as any]: `${c.dx}px`,
            ['--dy' as any]: `${c.dy}px`,
          }}
          aria-hidden="true"
        >
          <div className="w-1 h-1 rounded-full bg-foreground shadow-[0_0_12px_hsl(var(--accent)/0.8)]" />
          <div className="-mt-1 -ml-6 h-2 w-8 rotate-[-10deg] bg-gradient-to-r from-foreground/50 to-transparent" />
        </div>
      ))}
    </div>
  );
};

export default StarsOverlay;
