"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import fnMark from "@/public/fn-logo-mark.png";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const root = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Menu panel is dark, so its controls always read light.
  const linkColor = scrolled ? "var(--color-ink)" : "rgba(255,255,255,0.82)";
  const brandColor = scrolled ? "var(--color-ink)" : "#fff";
  const barColor = open ? "#fff" : scrolled ? "var(--color-ink)" : "#fff";

  useGSAP(
    () => {
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: () => window.innerHeight * 0.7,
          end: "+=1",
          onEnter: () => setScrolled(true),
          onLeaveBack: () => setScrolled(false),
        },
      });

      gsap.from(root.current, { y: -24, opacity: 0, duration: 0.9, ease: "power3.out" });
      gsap.from(".nav-item", {
        y: -12,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        delay: 0.25,
        ease: "power2.out",
      });

      return () => st.scrollTrigger && st.scrollTrigger.kill();
    },
    { scope: root }
  );

  // Animate the mobile panel open/closed.
  useGSAP(
    () => {
      const panel = document.querySelector(".nav-panel");
      if (!panel) return;
      if (open) {
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(panel, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" });
        gsap.fromTo(
          ".nav-panel-link",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.06, ease: "power2.out" }
        );
      } else {
        gsap.to(panel, {
          opacity: 0,
          y: -12,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <header
      ref={root}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: open
          ? "var(--green-900)"
          : scrolled
          ? "rgba(247,245,241,0.86)"
          : "transparent",
        borderBottom: `1px solid ${scrolled && !open ? "var(--color-hairline)" : "transparent"}`,
        backdropFilter: scrolled && !open ? "saturate(180%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled && !open ? "saturate(180%) blur(12px)" : "none",
        transition: "background-color .3s ease, border-color .3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
          padding: "0 clamp(20px,4vw,48px)",
        }}
      >
        <a
          href="#top"
          className="nav-item"
          onClick={() => setOpen(false)}
          // gap = jarak antara logo dan tulisan "F&N Projects"
          style={{ display: "flex", alignItems: "center", gap: 18 }}
        >
          <Image
            src={fnMark}
            alt="F&N Projects"
            height={40}
            width={40}
            style={{ height: 40, width: 40, display: "block" }}
            priority
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 17,
              lineHeight: 1,
              letterSpacing: ".5px",
              color: open ? "#fff" : brandColor,
              transition: "color .3s ease",
              whiteSpace: "nowrap",
            }}
          >
            F&amp;N&nbsp;Projects
          </span>
        </a>

        {/* Desktop links */}
        <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "clamp(16px,2.4vw,34px)" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="lnk nav-item"
              style={{ fontSize: 13, fontWeight: 500, color: linkColor, transition: "color .3s ease" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-p nav-item"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 40,
              padding: "0 20px",
              background: "var(--color-primary)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
            }}
          >
            Enquire
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="nav-burger nav-item"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            width: 44,
            height: 44,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <span style={{ ...burgerBar, background: barColor, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ ...burgerBar, background: barColor, opacity: open ? 0 : 1 }} />
          <span style={{ ...burgerBar, background: barColor, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className="nav-panel"
        style={{
          display: "none",
          flexDirection: "column",
          gap: 4,
          padding: "8px clamp(20px,4vw,48px) 28px",
          borderTop: "1px solid var(--color-hairline-inverse)",
        }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav-panel-link"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "16px 0",
              fontFamily: "var(--font-display)",
              fontSize: 22,
              color: "#fff",
              borderBottom: "1px solid var(--color-hairline-inverse)",
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-panel-link"
          onClick={() => setOpen(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 52,
            marginTop: 18,
            background: "#fff",
            color: "var(--color-primary)",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: "var(--radius-md)",
          }}
        >
          Enquire
        </a>
      </div>
    </header>
  );
}

const burgerBar = {
  display: "block",
  width: 22,
  height: 2,
  borderRadius: 2,
  transition: "transform .28s ease, opacity .2s ease, background-color .3s ease",
};
