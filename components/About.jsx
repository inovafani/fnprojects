"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stats } from "@/lib/data";

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      // Reveal the intro block.
      gsap.from(".about-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });

      // Stat columns rise, hairline separators draw, numbers count up.
      const cols = gsap.utils.toArray(".stat-col");
      gsap.from(cols, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stat-row", start: "top 82%" },
      });

      cols.forEach((col) => {
        const numEl = col.querySelector(".stat-num");
        const target = Number(numEl.dataset.value);
        const suffix = numEl.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".stat-row", start: "top 82%" },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.v) + suffix;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      data-screen-label="About"
      style={{ background: "var(--color-canvas)", padding: "clamp(64px,9vw,104px) clamp(20px,4vw,48px) clamp(56px,7vw,88px)" }}
    >
      <div style={{ maxWidth: 1184, margin: "0 auto" }}>
        <div
          className="about-reveal"
          style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 24 }}
        >
          Who we are
        </div>
        <div style={{ display: "flex", gap: "clamp(40px,7vw,96px)", flexWrap: "wrap", alignItems: "flex-start" }}>
          <h2
            className="about-reveal"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(30px,3.6vw,44px)", lineHeight: 1.16, letterSpacing: "-.5px", color: "var(--color-ink)", margin: 0, flex: "1 1 460px", maxWidth: 620 }}
          >
            A builder for homeowners who care about the finish.
          </h2>
          <div className="about-reveal" style={{ flex: "1 1 320px", maxWidth: 420 }}>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-body)", margin: "0 0 20px" }}>
              We handle every stage of your renovation, from first sketch to final handover, so the only thing left for you to do is enjoy the result.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-body)", margin: 0 }}>
              Considered detailing, clean architectural finishes and quiet, durable materials &mdash; work that&apos;s built to last and made to live in.
            </p>
          </div>
        </div>

        <div
          className="stat-row"
          style={{ display: "flex", gap: 0, flexWrap: "wrap", marginTop: "clamp(48px,6vw,72px)", borderTop: "1px solid var(--color-hairline)" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-col"
              style={{
                flex: "1 1 200px",
                padding: i === 0 ? "28px 28px 28px 0" : "28px",
                borderRight: i < stats.length - 1 ? "1px solid var(--color-hairline)" : "none",
              }}
            >
              <div
                className="stat-num"
                data-value={s.value}
                data-suffix={s.suffix}
                style={{ fontFamily: "var(--font-display)", fontSize: 38, lineHeight: 1, color: "var(--color-ink)" }}
              >
                0{s.suffix}
              </div>
              <div style={{ fontSize: 14, color: "var(--color-muted)", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
