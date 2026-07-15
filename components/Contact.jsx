"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const inputStyle = {
  height: 48,
  padding: "0 15px",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  color: "#fff",
  background: "rgba(255,255,255,.06)",
  border: "1px solid var(--color-hairline-inverse)",
  borderRadius: "var(--radius-md)",
  outline: "none",
};

export default function Contact() {
  const root = useRef(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      // Slow parallax drift on the architectural backdrop.
      gsap.fromTo(
        ".contact-bg",
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      gsap.from(".contact-reveal", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
      gsap.from(".contact-form", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      ref={root}
      id="contact"
      data-screen-label="Contact"
      style={{ position: "relative", overflow: "hidden", background: "var(--color-surface-inverse)", color: "var(--color-on-inverse)", padding: "clamp(20px,3vw,40px) clamp(20px,4vw,48px) clamp(64px,8vw,96px)" }}
    >
      {/* Architectural backdrop */}
      <div
        className="contact-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Vignette only — no colour wash, edges fall off to keep the copy legible. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.90) 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1184, margin: "0 auto", display: "flex", gap: "clamp(40px,6vw,88px)", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 400px" }}>
          <div className="contact-reveal" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 24 }}>
            Get in touch
          </div>
          <h2 className="contact-reveal" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(34px,4.6vw,56px)", lineHeight: 1.06, letterSpacing: "-1px", margin: "0 0 30px", maxWidth: 520 }}>
            Let&apos;s build something considered.
          </h2>
          <p className="contact-reveal" style={{ fontSize: 16, lineHeight: 1.7, color: "var(--color-on-inverse-muted)", maxWidth: 440, margin: "0 0 40px" }}>
            Tell us about your renovation or build and we&apos;ll be in touch to arrange a consultation.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="contact-reveal">
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 12 }}>Email</div>
              <a href="mailto:eliot@fnprojects.org" className="mail" style={mailStyle}>eliot@fnprojects.org</a>
              <a href="mailto:admin@fnprojects.org" className="mail" style={{ ...mailStyle, marginBottom: 0 }}>admin@fnprojects.org</a>
            </div>
            <div className="contact-reveal">
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 12 }}>Mobile</div>
              <a href="tel:0413502063" className="mail" style={{ ...mailStyle, display: "inline-block", marginRight: 28, marginBottom: 0 }}>0413 502 063</a>
              <a href="tel:0432945722" className="mail" style={{ ...mailStyle, display: "inline-block", marginBottom: 0 }}>0432 945 722</a>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="contact-form"
          style={{ flex: "1 1 360px", maxWidth: 460, background: "rgba(8,12,10,0.46)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid var(--color-hairline-inverse)", borderRadius: "var(--radius-lg)", padding: "clamp(24px,2.6vw,34px)", display: "flex", flexDirection: "column", gap: 18 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Name</span>
            <input type="text" placeholder="Your name" style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Email</span>
            <input type="email" placeholder="you@email.com" style={inputStyle} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>About your project</span>
            <textarea rows={4} placeholder="Renovation, kitchen, custom build&hellip;" style={{ ...inputStyle, height: "auto", padding: "13px 15px", resize: "vertical" }} />
          </label>
          <button type="submit" className="btn-p" style={{ height: 52, background: "#fff", color: "var(--color-primary)", fontSize: 14, fontWeight: 600, border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-body)" }}>
            {sent ? "Thanks — we'll be in touch" : "Send enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}

const mailStyle = {
  display: "block",
  fontFamily: "var(--font-display)",
  fontSize: "clamp(20px,2vw,26px)",
  color: "#fff",
  opacity: 0.92,
  marginBottom: 6,
};
