import React from "react";

const Waves: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[5]" aria-hidden="true">
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, hsl(var(--primary) / 0.10), transparent 70%)",
          animation: "wave-drift-1 18s ease-in-out infinite alternate",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, hsl(var(--primary-glow) / 0.15) 10%, transparent 40%, transparent 60%, hsl(var(--primary-glow) / 0.10) 90%)",
            backgroundSize: "200% 200%",
            animation: "shimmer-shift 48s linear infinite",
            mixBlendMode: "screen",
            opacity: 0.35,
            maskImage: "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
          }}
        />
      </div>
      <div
        className="absolute bottom-[-10%] left-1/3 w-[120%] h-[60%] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)",
          animation: "wave-drift-2 26s ease-in-out infinite alternate",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(120deg, hsl(var(--accent) / 0.12) 10%, transparent 50%, transparent 60%, hsl(var(--accent) / 0.10) 90%)",
            backgroundSize: "200% 200%",
            animation: "shimmer-shift 60s linear infinite, glow-breathe 24s ease-in-out infinite",
            mixBlendMode: "screen",
            opacity: 0.3,
            maskImage: "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(60% 80% at 50% 50%, white 45%, transparent 85%)",
          }}
        />
      </div>
    </div>
  );
};

export default Waves;
