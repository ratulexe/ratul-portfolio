"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Brutalist motion for the home page, driven by data attributes in the markup:
 *
 *   data-anim="sticker"  stamped on (scale + tilt), hero
 *   data-anim="drop"     fades in (opacity), hero portrait
 *   data-anim="chip"     snaps in one after another, hero stats
 *   data-anim="heading"  skewed, stepped slide-in when scrolled to
 *   data-anim="slam"     cards slam up into place when scrolled to
 *   data-anim="marquee"  leans with scroll speed
 *   data-anim="spin" / "float" / "blink" / "zap"  idle loops on the hero stickers
 *   data-count="88"      number counts up in chunky steps when scrolled to
 *
 * The headline, name and intro are deliberately NOT animated so the page paints fast.
 * Nothing is hidden in the HTML itself: without JS (or with reduced motion) the page is static.
 */
export default function PageMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      // ---- Hero entrance ----
      gsap
        .timeline({ defaults: { ease: "back.out(3)" }, delay: 0.1 })
        .from("[data-anim=sticker]", {
          scale: 1.8,
          rotation: () => gsap.utils.random(-20, 20),
          autoAlpha: 0,
          duration: 0.3,
          stagger: 0.12,
          clearProps: "transform",
        })
        .from(
          "[data-anim=drop]",
          // Portrait fades in — no movement. Starts at 15% (not 0) so browsers count it as
          // painted immediately, which keeps the page-speed (LCP) score unaffected.
          { opacity: 0.15, duration: 0.8, ease: "power2.out", clearProps: "opacity" },
          0,
        )
        .from(
          "[data-anim=chip]",
          { y: -26, autoAlpha: 0, duration: 0.3, stagger: 0.08, clearProps: "transform" },
          "-=0.35",
        );

      // ---- Hero sticker idle loops (stepped, so they feel mechanical, not floaty) ----
      gsap.to("[data-anim=spin]", {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 16,
        ease: "steps(48)",
        repeat: -1,
      });
      gsap.to("[data-anim=float]", { y: -5, duration: 0.5, ease: "steps(2)", yoyo: true, repeat: -1 });
      // Terminal cursor "_" blinks on/off
      gsap.to("[data-anim=blink]", { autoAlpha: 0, duration: 0.5, ease: "steps(1)", yoyo: true, repeat: -1 });
      // Lightning bolt: a short, hard jitter every few seconds, then snaps straight
      gsap
        .timeline({ repeat: -1, repeatDelay: 2.8, delay: 1.5 })
        .to("[data-anim=zap]", {
          rotation: () => gsap.utils.random(-14, 14),
          scale: () => gsap.utils.random(1.05, 1.15),
          transformOrigin: "50% 50%",
          duration: 0.07,
          ease: "steps(1)",
          repeat: 5,
          repeatRefresh: true,
        })
        .to("[data-anim=zap]", { rotation: 0, scale: 1, duration: 0.07, ease: "steps(1)" });

      // ---- Section headings: hard, skewed, stepped slide ----
      gsap.utils.toArray<HTMLElement>("[data-anim=heading]").forEach((el) => {
        gsap.from(el, {
          xPercent: -8,
          skewX: 14,
          autoAlpha: 0,
          duration: 0.4,
          ease: "steps(4)",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // ---- Cards slam into place (hidden only now that JS is running) ----
      gsap.set("[data-anim=slam]", {
        autoAlpha: 0,
        y: 70,
        rotation: () => gsap.utils.random(-5, 5),
      });
      ScrollTrigger.batch("[data-anim=slam]", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            duration: 0.45,
            ease: "back.out(2.2)",
            stagger: 0.08,
            // Hand transforms back to CSS so the brutal hover lift keeps working.
            clearProps: "transform,opacity,visibility",
          }),
      });

      // ---- Odometer-style counters ----
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = el.dataset.count ?? "";
        const end = Number(target);
        if (!Number.isFinite(end)) return;
        const decimals = target.split(".")[1]?.length ?? 0;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: end,
          duration: 0.9,
          ease: "steps(12)",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = counter.value.toFixed(decimals);
          },
          onComplete: () => {
            el.textContent = target;
          },
        });
      });

      // ---- Marquee leans with scroll speed, then snaps back ----
      const marquee = document.querySelector<HTMLElement>("[data-anim=marquee]");
      if (marquee) {
        const skewTo = gsap.quickTo(marquee, "skewX", { duration: 0.3, ease: "power3.out" });
        ScrollTrigger.create({
          onUpdate: (self) => skewTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -250)),
        });
        ScrollTrigger.addEventListener("scrollEnd", () => skewTo(0));
      }
    });
  });

  return null;
}
