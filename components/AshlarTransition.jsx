"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { makeDiagSteps } from "@/lib/data";

const diagSteps = makeDiagSteps();

export default function AshlarTransition() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".ashlar-stone", {
        opacity: 0,
        scale: 0.2,
        rotate: -8,
        transformOrigin: "center center",
        duration: 0.7,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: root.current, start: "top 88%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} style={{ position: "relative", height: 180, background: "var(--color-canvas)", overflow: "hidden" }}>
      {diagSteps.map((s, i) => (
        <div
          key={i}
          className="ashlar-stone"
          style={{ position: "absolute", left: `${s.left}%`, top: s.top, width: 46, height: 46, background: s.tone }}
        />
      ))}
    </div>
  );
}
