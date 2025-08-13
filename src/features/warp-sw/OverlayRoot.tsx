import * as React from "react";
import { StarWarsWarpOverlay } from "./StarWarsWarpOverlay";
import { useWarpController } from "../warp/useWarpController";

export function OverlayRoot() {
  const { active } = useWarpController();
  return (
    <>
      <div
        id="warp-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: active ? 1 : 0,
          transition: 'opacity 220ms ease-out',
          background: 'transparent'
        }}
      >
        <StarWarsWarpOverlay />
      </div>
      
      {/* Credit to Codrops/Mamboleoo as required by license */}
      <div
        style={{
          position: "fixed",
          bottom: "8px",
          right: "8px",
          zIndex: 10000,
          fontSize: "10px",
          color: "rgba(255, 255, 255, 0.6)",
          fontFamily: "monospace",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <a
          href="https://tympanus.net/Development/InfiniteTubes/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
            pointerEvents: "auto",
          }}
          title="Infinite Tubes by Louis Hoebregts / Codrops"
        >
          Warp effect by{" "}
          <span style={{ textDecoration: "underline" }}>
            Infinite Tubes
          </span>
        </a>
      </div>
    </>
  );
}
