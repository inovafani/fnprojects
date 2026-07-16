import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "F&N Projects — Renovations, built to live in.",
  description:
    "Premium residential building & renovation across Brisbane. Kitchens, bathrooms, full renovations and custom builds — finished to the same standard, every time.",
  metadataBase: new URL("https://fnprojects.org"),
  openGraph: {
    title: "F&N Projects — Renovations, built to live in.",
    description:
      "Premium residential building & renovation across Brisbane. Finished to the same standard, every time.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0b4a2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* No-JS fallback: reveal-hidden elements stay visible if JS never runs. */}
        <noscript>
          <style>{`.anim-hidden{opacity:1 !important;transform:none !important}.gal-strip{transform:scaleX(0) !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
