"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const open = index !== null && index >= 0;
  const root = useRef(null);

  // Keyboard control + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, onPrev, onNext]);

  useGSAP(
    () => {
      if (!open || !root.current) return;
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.26, ease: "power2.out" });
      gsap.fromTo(
        ".lb-fig",
        { scale: 0.94, y: 10, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.42, ease: "power3.out" }
      );
    },
    { dependencies: [open, index] }
  );

  if (!open) return null;
  const item = items[index];

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — project image ${index + 1} of ${items.length}`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(8,14,10,0.95)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px,4vw,48px)",
      }}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="lb-btn"
        style={{ ...ctrl, position: "absolute", top: "clamp(14px,2.5vw,28px)", right: "clamp(14px,2.5vw,28px)" }}
      >
        &#10005;
      </button>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "clamp(20px,2.9vw,34px)",
          left: "clamp(16px,4vw,48px)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "1.4px",
          color: "rgba(255,255,255,0.62)",
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </div>

      {/* Prev */}
      <button
        type="button"
        aria-label="Previous image"
        className="lb-btn lb-arrow"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        style={{ ...ctrl, position: "absolute", left: "clamp(10px,2.5vw,28px)", top: "50%", transform: "translateY(-50%)" }}
      >
        &larr;
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next image"
        className="lb-btn lb-arrow"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{ ...ctrl, position: "absolute", right: "clamp(10px,2.5vw,28px)", top: "50%", transform: "translateY(-50%)" }}
      >
        &rarr;
      </button>

      {/* Figure — stop propagation so clicking the photo doesn't close */}
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()} style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.img}
          alt={item.title}
          style={{
            maxHeight: "72vh",
            maxWidth: "min(92vw, 720px)",
            objectFit: "contain",
            borderRadius: "var(--radius-sm)",
            boxShadow: "var(--shadow-inverse-float)",
            display: "block",
          }}
        />
        <figcaption style={{ textAlign: "center", marginTop: 20, maxWidth: 560 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-primary-tint,#7fb08a)", marginBottom: 8 }}>
            {item.category}
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px,2.2vw,24px)", lineHeight: 1.25, color: "#fff", marginBottom: 8 }}>
            {item.title}
          </div>
          <div className="lb-desc" style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.68)", marginBottom: 6 }}>
            {item.desc}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.location}</div>
        </figcaption>
      </figure>
    </div>
  );
}

const ctrl = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.28)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontSize: 17,
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  transition: "background-color .15s ease, border-color .15s ease",
};
