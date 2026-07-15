"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".tst-eyebrow", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 74%" },
      });
      gsap.from(".tst-col", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tst-grid", start: "top 80%" },
      });
      gsap.from(".tst-mark", {
        scale: 0.4,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".tst-grid", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} data-screen-label="Testimonials" style={{ background: "var(--color-surface-inverse)", color: "var(--color-on-inverse)", padding: "clamp(64px,9vw,104px) clamp(20px,4vw,48px)" }}>
      <div style={{ maxWidth: 1184, margin: "0 auto" }}>
        <div className="tst-eyebrow" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: "clamp(36px,4.4vw,56px)" }}>
          In their words
        </div>
        <div className="tst-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 0 }}>
          {testimonials.map((t) => (
            <div key={t.name} className="tst-col" style={{ display: "flex", flexDirection: "column", padding: "0 clamp(20px,2.6vw,36px)", borderLeft: "1px solid var(--color-hairline-inverse)" }}>
              <div className="tst-mark" style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1, color: "var(--color-primary-tint,#7fb08a)", marginBottom: 18 }}>
                &ldquo;
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(19px,1.9vw,23px)", lineHeight: 1.5, color: "#fff", margin: "0 0 32px" }}>
                {t.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flex: "none" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "var(--color-on-inverse-muted)", marginTop: 2 }}>{t.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
