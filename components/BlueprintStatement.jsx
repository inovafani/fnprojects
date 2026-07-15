"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import fnMark from "@/public/fn-logo-rounded.png";

export default function BlueprintStatement() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".bp-grid", {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      // Grid drifts subtly on scroll for depth.
      gsap.to(".bp-grid-fine", {
        backgroundPositionY: "+=60px",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.from(".bp-logo", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: root.current, start: "top 62%" },
      });
      gsap.from(".bp-rule", {
        scaleX: 0,
        transformOrigin: "center center",
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 58%" },
      });
      gsap.from(".bp-line-inner", {
        yPercent: 115,
        duration: 1.05,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 56%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-screen-label="Brand statement"
      style={{ position: "relative", overflow: "hidden", background: "var(--color-canvas)", padding: "clamp(64px,9vw,110px) clamp(20px,4vw,48px) 0" }}
    >
      <div
        className="bp-grid bp-grid-fine"
        style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--color-hairline-soft) 1px,transparent 1px),linear-gradient(90deg,var(--color-hairline-soft) 1px,transparent 1px)", backgroundSize: "52px 52px" }}
      />
      <div
        className="bp-grid"
        style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--color-hairline) 1px,transparent 1px),linear-gradient(90deg,var(--color-hairline) 1px,transparent 1px)", backgroundSize: "260px 260px" }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", textAlign: "center", paddingBottom: "clamp(48px,7vw,88px)" }}>
        <Image className="bp-logo" src={fnMark} alt="F&N Projects" height={132} width={132} style={{ height: 132, width: 132, marginBottom: 8 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, margin: "18px 0 26px" }}>
          <span className="bp-rule" style={{ width: 64, height: 1, background: "var(--color-hairline-strong)" }} />
          <span className="bp-rule" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--color-primary)" }}>
            Our promise
          </span>
          <span className="bp-rule" style={{ width: 64, height: 1, background: "var(--color-hairline-strong)" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(30px,4.2vw,52px)", lineHeight: 1.12, letterSpacing: "-.7px", color: "var(--color-ink)", margin: 0 }}>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="bp-line-inner" style={{ display: "block" }}>Every project finished to the</span>
          </span>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em" }}>
            <span className="bp-line-inner" style={{ display: "block" }}>same standard &mdash; yours.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
