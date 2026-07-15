"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { makeCombBars } from "@/lib/data";

const combBars = makeCombBars();

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Background: slow settle-in zoom (Ken Burns).
      tl.fromTo(".hero-bg", { scale: 1.18 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .fromTo(".hero-overlay", { opacity: 0 }, { opacity: 1, duration: 1.4 }, 0)
        // Eyebrow.
        .fromTo(".hero-eyebrow", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.45)
        // Headline lines: masked reveal (parent has overflow:hidden).
        .fromTo(".hero-line-inner", { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12, ease: "power4.out" }, 0.5)
        .fromTo(".hero-copy", { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9)
        .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, 1.05)
        // Skyline comb grows from the floor.
        .fromTo(
          ".comb-bar",
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, transformOrigin: "bottom center", duration: 0.9, stagger: { each: 0.012, from: "center" }, ease: "power3.out" },
          0.8
        );

      // Scroll parallax: background drifts down, content drifts up + fades.
      gsap.to(".hero-bg", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -14,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-screen-label="Hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 680,
        maxHeight: 940,
        overflow: "hidden",
        background: "var(--color-surface-inverse)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-bg"
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1900&q=80"
        alt="Modern residential build"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        className="hero-overlay anim-hidden"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(6,20,14,.62) 0%,rgba(6,20,14,.24) 42%,rgba(6,20,14,.74) 100%)",
        }}
      />

      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1184,
          margin: "0 auto",
          padding: "0 clamp(20px,4vw,48px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="hero-eyebrow anim-hidden"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,.72)", marginBottom: 26 }}
        >
          Sydney &middot; Residential Builders
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(48px,7.4vw,90px)",
            lineHeight: 1.02,
            letterSpacing: "-1.5px",
            color: "#fff",
            margin: "0 0 26px",
            maxWidth: 840,
          }}
        >
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
            <span className="hero-line-inner anim-hidden" style={{ display: "block" }}>Renovations,</span>
          </span>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
            <span className="hero-line-inner anim-hidden" style={{ display: "block" }}>built to live in.</span>
          </span>
        </h1>
        <p
          className="hero-copy anim-hidden"
          style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.65, color: "rgba(255,255,255,.86)", maxWidth: 460, margin: "0 0 36px" }}
        >
          Kitchens, bathrooms, full renovations and custom builds &mdash; finished to the same standard, every time.
        </p>
        <div className="hero-ctas" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a
            href="#contact"
            className="btn-p hero-cta anim-hidden"
            style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 28px", background: "var(--color-primary)", color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: "var(--radius-md)" }}
          >
            Enquire about your project
          </a>
          <a
            href="#work"
            className="hero-cta anim-hidden"
            style={{ display: "inline-flex", alignItems: "center", height: 52, padding: "0 28px", border: "1px solid rgba(255,255,255,.34)", color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: "var(--radius-md)" }}
          >
            View our work
          </a>
        </div>
      </div>

      {/* Skyline comb */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 132, display: "flex", alignItems: "flex-end", zIndex: 2 }}>
        {combBars.map((bar, i) => (
          <div key={i} className="comb-bar anim-hidden" style={{ flex: 1, height: bar.h, background: bar.tone }} />
        ))}
      </div>
    </section>
  );
}
