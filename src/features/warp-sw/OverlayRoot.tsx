import * as React from "react";
import { StarWarsWarpOverlay } from "./StarWarsWarpOverlay";

export function OverlayRoot() {
  return (
    <>
      <StarWarsWarpOverlay />
      
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
