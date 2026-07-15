"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { makePixelGrid, PIXEL_COLS, PIXEL_ROWS } from "@/lib/data";

const pixelGrid = makePixelGrid();

export default function PixelDissolve() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".pixel-cell", {
        opacity: 0,
        scale: 0.3,
        transformOrigin: "center center",
        duration: 0.5,
        ease: "power2.out",
        stagger: { grid: [PIXEL_ROWS, PIXEL_COLS], from: "edges", amount: 0.9 },
        scrollTrigger: { trigger: root.current, start: "top 92%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} style={{ display: "grid", gridTemplateColumns: `repeat(${PIXEL_COLS},1fr)`, height: 132, background: "var(--color-canvas)" }}>
      {pixelGrid.map((cell, i) => (
        <div key={i} className="pixel-cell" style={{ background: "var(--color-primary)", opacity: cell.op }} />
      ))}
    </div>
  );
}
