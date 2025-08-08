import React from "react";

interface Comet {
  id: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
  duration: number;
  colorVar: "--star-gold" | "--star-magenta";
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const StarsOverlay: React.FC = () => {
  const [comets, setComets] = React.useState<Comet[]>([]);
  const idRef = React.useRef(0);

  const stars = React.useMemo(() => {
    const count = 80;
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
    const timeouts: number[] = [];

    const spawn = () => {
      const edge = Math.floor(Math.random() * 4);
      let startX = 0, startY = 0, endX = 0, endY = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (edge === 0) { // left -> right
        startX = -20;
        startY = randomBetween(0, h * 0.9);
        endX = w + 20;
        endY = startY + randomBetween(-h * 0.2, h * 0.2);
      } else if (edge === 1) { // right -> left
        startX = w + 20;
        startY = randomBetween(0, h * 0.9);
        endX = -20;
        endY = startY + randomBetween(-h * 0.2, h * 0.2);
      } else if (edge === 2) { // top -> bottom
        startX = randomBetween(0, w);
        startY = -20;
        endX = startX + randomBetween(-w * 0.2, w * 0.2);
        endY = h + 20;
      } else { // bottom -> top
        startX = randomBetween(0, w);
        startY = h + 20;
        endX = startX + randomBetween(-w * 0.2, w * 0.2);
        endY = -20;
      }

      const dx = endX - startX;
      const dy = endY - startY;

      const id = ++idRef.current;
      const duration = randomBetween(8, 14);
      const colorVar = Math.random() < 0.5 ? "--star-gold" : "--star-magenta";

      setComets((prev) => [...prev, { id, startX, startY, dx, dy, duration, colorVar }]);

      const timeout = window.setTimeout(() => {
        setComets((prev) => prev.filter((c) => c.id !== id));
      }, duration * 1000 + 300);
      timeouts.push(timeout);
    };

    const interval = window.setInterval(spawn, 2000);
    for (let i = 0; i < 3; i++) {
      window.setTimeout(spawn, i * 600);
    }

    return () => {
      window.clearInterval(interval);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
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
            ['--dur' as any]: `${c.duration}s`,
            ['--comet-color' as any]: `var(${c.colorVar})`,
          }}
          aria-hidden="true"
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: 'hsl(var(--comet-color))',
              boxShadow: '0 0 12px hsl(var(--comet-color) / 0.8)',
            }}
          />
          <div
            className="-mt-1 -ml-6 h-1 w-16"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--comet-color)) 0%, hsl(var(--comet-color) / 0) 100%)',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StarsOverlay;
