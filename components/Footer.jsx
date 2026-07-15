import Image from "next/image";
import fnMark from "@/public/fn-logo-rounded.png";
import { footerServices } from "@/lib/data";

const footLink = { display: "block", fontSize: 14, color: "#fff", opacity: 0.9, marginBottom: 10 };
const colHead = { fontSize: 12, fontWeight: 600, letterSpacing: "1.6px", textTransform: "uppercase", color: "var(--color-on-inverse-muted)", marginBottom: 16 };

export default function Footer() {
  return (
    <footer
      data-screen-label="Footer"
      style={{ background: "var(--green-900,#06331d)", color: "var(--color-on-inverse)", padding: "clamp(48px,6vw,72px) clamp(20px,4vw,48px) clamp(32px,4vw,44px)" }}
    >
      <div style={{ maxWidth: 1184, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "clamp(32px,5vw,64px)", flexWrap: "wrap", paddingBottom: "clamp(40px,5vw,56px)", borderBottom: "1px solid var(--color-hairline-inverse)" }}>
          <div style={{ flex: "1 1 260px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <Image src={fnMark} alt="" height={48} width={48} style={{ height: 48, width: 48 }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: ".5px" }}>F&amp;N&nbsp;Projects</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-on-inverse-muted)", maxWidth: 280, margin: 0 }}>
              Premium residential building &amp; renovation across Sydney and surrounds.
            </p>
          </div>
          <div style={{ flex: "1 1 150px" }}>
            <div style={colHead}>Services</div>
            {footerServices.map((f) => (
              <a key={f} href="#services" style={footLink}>{f}</a>
            ))}
          </div>
          <div style={{ flex: "1 1 150px" }}>
            <div style={colHead}>Company</div>
            <a href="#about" style={footLink}>About</a>
            <a href="#work" style={footLink}>Projects</a>
            <a href="#contact" style={footLink}>Contact</a>
          </div>
          <div style={{ flex: "1 1 220px" }}>
            <div style={colHead}>Contact</div>
            <a href="mailto:eliot@fnprojects.org" className="mail" style={footLink}>eliot@fnprojects.org</a>
            <a href="mailto:admin@fnprojects.org" className="mail" style={footLink}>admin@fnprojects.org</a>
            <a href="tel:0413502063" className="mail" style={footLink}>0413 502 063</a>
            <a href="tel:0432945722" className="mail" style={{ ...footLink, marginBottom: 0 }}>0432 945 722</a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", paddingTop: 24, fontSize: 13, color: "var(--color-on-inverse-muted)" }}>
          <span>&copy; 2026 F&amp;N Projects. All rights reserved.</span>
          <span>Licensed builder &middot; Sydney, Australia</span>
        </div>
      </div>
    </footer>
  );
}
