import React from "react";

export const FallbackWaves: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #125A8A 50%, #0f172a 100%)",
        }}
      />
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] blur-2xl opacity-40"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(18, 90, 138, 0.3), transparent 70%)",
          animation: "wave-drift-1 18s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-1/3 w-[120%] h-[60%] blur-2xl opacity-30"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(139, 198, 234, 0.2), transparent 70%)",
          animation: "wave-drift-2 26s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
};

export default FallbackWaves;

