"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import Lightbox from "@/components/Lightbox";

const STRIPS = 8;

export default function FeaturedWork() {
  const root = useRef(null);
  const trackRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + projects.length) % projects.length)), []);
  const nextLb = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % projects.length)), []);

  function scrollGallery(dir) {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector(".gal-item");
    const step = item ? item.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  useGSAP(
    () => {
      gsap.from(".work-head", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });

      // Venetian-blind reveal: cover strips retract alternately to unveil each photo.
      gsap.utils.toArray(".gal-item").forEach((item, i) => {
        const strips = item.querySelectorAll(".gal-strip");
        gsap.fromTo(
          strips,
          { scaleX: 1 },
          {
            scaleX: 0,
            duration: 0.7,
            ease: "power3.inOut",
            stagger: { each: 0.05, from: "start" },
            delay: i * 0.08,
            scrollTrigger: { trigger: ".gal-track", start: "top 82%" },
          }
        );
      });

      // Captions rise in behind the reveal.
      gsap.from(".gal-cap", {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gal-track", start: "top 82%" },
      });

      // Drag-to-scroll for pointer devices.
      const track = trackRef.current;
      if (!track) return;
      let down = false, startX = 0, startScroll = 0, moved = false;
      const onDown = (e) => {
        down = true;
        moved = false;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        track.style.cursor = "grabbing";
      };
      const onMove = (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startScroll - dx;
      };
      const onUp = () => {
        down = false;
        track.style.cursor = "grab";
      };
      const onClick = (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      track.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      track.addEventListener("click", onClick, true);
      track.style.cursor = "grab";
      return () => {
        track.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        track.removeEventListener("click", onClick, true);
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" data-screen-label="Featured work" style={{ background: "var(--color-canvas)", padding: "clamp(64px,9vw,104px) 0" }}>
      <div style={{ maxWidth: 1184, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <div className="work-head" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 22 }}>
          Featured projects
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: "clamp(32px,4vw,48px)" }}>
          <h2 className="work-head" style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(30px,3.6vw,44px)", lineHeight: 1.14, letterSpacing: "-.5px", margin: 0 }}>
            Recent work
          </h2>
          <div className="work-head" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button type="button" onClick={() => scrollGallery(-1)} aria-label="Previous" className="gal-arrow" style={arrowStyle}>
              &larr;
            </button>
            <button type="button" onClick={() => scrollGallery(1)} aria-label="Next" className="gal-arrow" style={arrowStyle}>
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div
        id="gal-track"
        ref={trackRef}
        className="gal-track"
        style={{
          display: "flex",
          gap: "clamp(16px,2vw,28px)",
          maxWidth: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "0 clamp(20px,4vw,48px)",
          // Keeps the container gutter at the far-left edge when items snap.
          scrollPaddingLeft: "clamp(20px,4vw,48px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((p, i) => (
          <div key={p.title} className="gal-item" style={{ flex: "0 0 clamp(240px,30vw,392px)", scrollSnapAlign: "start" }}>
            <button
              type="button"
              className="gal-frame"
              aria-label={`View ${p.title} full screen`}
              onClick={() => setLightbox(i)}
              style={{ aspectRatio: "3 / 4", overflow: "hidden", background: "var(--color-canvas-soft)", position: "relative", display: "block", width: "100%", padding: 0, border: "none", cursor: "zoom-in" }}
            >
              <div
                className="gal-img"
                style={{ width: "100%", height: "100%", backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center", transition: "transform .5s ease-out" }}
              />
              {/* Venetian-blind cover strips (retract on reveal) */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                {Array.from({ length: STRIPS }).map((_, s) => (
                  <div
                    key={s}
                    className="gal-strip"
                    style={{ flex: 1, background: "var(--color-canvas)", transformOrigin: s % 2 === 0 ? "left center" : "right center" }}
                  />
                ))}
              </div>
            </button>
            <div style={{ padding: "18px 2px 0" }}>
              <div className="gal-cap" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 9 }}>{p.category}</div>
              <div className="gal-cap" style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.2, color: "var(--color-ink)", marginBottom: 8 }}>{p.title}</div>
              <div className="gal-cap" style={{ fontSize: 14, lineHeight: 1.55, color: "var(--color-body)", marginBottom: 10, maxWidth: 420 }}>{p.desc}</div>
              <div className="gal-cap" style={{ fontSize: 13, color: "var(--color-muted)" }}>{p.location}</div>
            </div>
          </div>
        ))}
        <div style={{ flex: "0 0 clamp(4px,4vw,44px)" }} />
      </div>

      <Lightbox items={projects} index={lightbox} onClose={closeLb} onPrev={prevLb} onNext={nextLb} />
    </section>
  );
}

const arrowStyle = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  border: "1px solid var(--color-hairline-strong)",
  background: "transparent",
  color: "var(--color-ink)",
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color .15s ease, color .15s ease",
};
