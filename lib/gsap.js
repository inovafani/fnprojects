"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once on the client.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Shared easing language for the whole site — restrained, architectural.
export const EASE = "power3.out";
export const EASE_SOFT = "power2.out";

export { gsap, ScrollTrigger, useGSAP };
