"use client";

// Single place where GSAP and its plugins are registered (client-side only).
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);
}

/** Animations only run for visitors who haven't asked their device for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { Draggable, gsap, ScrollTrigger, useGSAP };
