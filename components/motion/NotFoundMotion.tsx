"use client";

import { useRef, type ReactNode } from "react";
import { Draggable, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Brutalist motion for the 404 page: hard stamps, bouncing digits, a stepped
 * "glitch" every few seconds, and digits you can drag around (they spring back).
 * Without JavaScript or with reduced motion, the page simply shows statically.
 */
export default function NotFoundMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope);
        const digits = q("[data-digit]");

        // Entrance — glitching and dragging only start once it has fully finished,
        // so on slow devices they can never fight the drop-in.
        const entrance = gsap
          .timeline({ defaults: { ease: "back.out(3)" } })
          .from(q("[data-anim=sticker]"), { scale: 2.2, rotation: -25, autoAlpha: 0, duration: 0.3 })
          .from(
            digits,
            {
              yPercent: -130,
              rotation: () => gsap.utils.random(-35, 35),
              autoAlpha: 0,
              duration: 0.55,
              ease: "bounce.out",
              stagger: 0.12,
            },
            "-=0.05",
          )
          .from(q("[data-anim=card]"), { x: -70, autoAlpha: 0, duration: 0.35 }, "-=0.25")
          .from(q("[data-anim=button]"), { y: 30, autoAlpha: 0, duration: 0.3, stagger: 0.08 }, "-=0.15")
          // The hint starts invisible in the HTML and only appears when dragging actually works.
          .to(q("[data-anim=hint]"), { autoAlpha: 1, duration: 0.3, ease: "steps(3)" });

        // Glitch: a burst of hard, stepped jitters every few seconds
        const glitch = gsap
          .timeline({ repeat: -1, repeatDelay: 2.6, paused: true })
          .to(digits, {
            x: () => gsap.utils.random(-12, 12),
            y: () => gsap.utils.random(-6, 6),
            skewX: () => gsap.utils.random(-14, 14),
            duration: 0.06,
            ease: "steps(1)",
            repeat: 5,
            repeatRefresh: true,
            stagger: 0.02,
          })
          .to(digits, { x: 0, y: 0, skewX: 0, duration: 0.06, ease: "steps(1)" });

        // Drag the digits; they snap back with a heavy wobble.
        // Created only AFTER the entrance: Draggable pulls elements inside their bounds the
        // moment it's created, which would shove the still-falling digits off their spot.
        let drags: Draggable[] = [];
        const makeDraggable = () =>
          Draggable.create(digits, {
          type: "x,y",
          bounds: scope.current,
          onPress() {
            glitch.pause();
            gsap.to(this.target, {
              scale: 1.1,
              rotation: gsap.utils.random(-10, 10),
              skewX: 0,
              duration: 0.15,
              ease: "steps(2)",
            });
          },
          onRelease() {
            gsap.to(this.target, {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.35)",
              onComplete: () => {
                glitch.resume();
              },
            });
          },
        });

        // Hand over from the entrance: dragging now, first glitch a beat later.
        entrance.call(() => {
          drags = makeDraggable();
        });
        entrance.call(
          () => {
            // If a digit is being dragged right now, onRelease will start the glitch instead.
            if (!drags.some((d) => d.isPressed)) glitch.play();
          },
          [],
          "+=1.2",
        );

        return () => drags.forEach((d) => d.kill());
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
