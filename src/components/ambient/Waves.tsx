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
      />
      <div
        className="absolute bottom-[-10%] left-1/3 w-[120%] h-[60%] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, hsl(var(--accent) / 0.08), transparent 70%)",
          animation: "wave-drift-2 26s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
};

export default Waves;
