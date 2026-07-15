"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/data";

export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.from(".svc-head", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.from(".svc-row", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".svc-list", start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="services"
      data-screen-label="Services"
      style={{ background: "var(--color-surface-inverse)", color: "var(--color-on-inverse)", padding: "clamp(64px,8vw,96px) clamp(20px,4vw,48px)" }}
    >
      <div style={{ maxWidth: 1184, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, flexWrap: "wrap", marginBottom: "clamp(32px,4vw,52px)" }}>
          <div>
            <div className="svc-head" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 22 }}>
              What we build
            </div>
            <h2 className="svc-head" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(30px,3.6vw,44px)", lineHeight: 1.14, letterSpacing: "-.5px", margin: 0, maxWidth: 620 }}>
              Five disciplines, one standard of finish.
            </h2>
          </div>
          <a className="lnk svc-head" href="#contact" style={{ fontSize: 14, fontWeight: 600, color: "#fff", borderBottom: "1px solid rgba(255,255,255,.4)", paddingBottom: 4 }}>
            Talk to us about your project &rarr;
          </a>
        </div>

        <div className="svc-list" style={{ borderTop: "1px solid var(--color-hairline-inverse)" }}>
          {services.map((svc) => (
            <div
              key={svc.no}
              className="svc-row"
              style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,4vw,48px)", padding: "clamp(20px,2.6vw,30px) 4px", borderBottom: "1px solid var(--color-hairline-inverse)" }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,.42)", width: 34, flex: "none" }}>{svc.no}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, color: "#fff", flex: "1 1 260px" }}>{svc.name}</span>
              <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--color-on-inverse-muted)", flex: "1 1 300px", maxWidth: 420 }}>{svc.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
