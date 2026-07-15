"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import fnMark from "@/public/fn-logo-rounded.png";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const root = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      // Drive the nav "scrolled" state off the hero height, 1:1 with the design.
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: () => window.innerHeight * 0.7,
          end: "+=1",
          onEnter: () => setScrolled(true),
          onLeaveBack: () => setScrolled(false),
        },
      });

      // Entrance: nav drops in, links + CTA stagger.
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

  return (
    <header
      ref={root}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 76,
        padding: "0 clamp(20px,4vw,48px)",
        background: scrolled ? "rgba(247,245,241,0.86)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--color-hairline)" : "transparent"}`,
        backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none",
        transition: "background-color .3s ease, border-color .3s ease",
      }}
    >
      <a href="#top" className="nav-item" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Image
          src={fnMark}
          alt="F&N Projects"
          height={44}
          width={44}
          style={{ height: 44, width: 44 }}
          priority
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            letterSpacing: ".5px",
            color: scrolled ? "var(--color-ink)" : "#fff",
            transition: "color .3s ease",
            whiteSpace: "nowrap",
          }}
        >
          F&amp;N&nbsp;Projects
        </span>
      </a>

      <nav style={{ display: "flex", alignItems: "center", gap: "clamp(16px,2.4vw,34px)" }}>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="lnk nav-item nav-link-hide"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: scrolled ? "var(--color-ink)" : "rgba(255,255,255,0.82)",
              transition: "color .3s ease",
            }}
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
    </header>
  );
}
