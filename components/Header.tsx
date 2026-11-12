"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY } = window;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Clamped: mobile "bounce" scrolling can briefly report values outside 0–100.
      setProgress(max > 0 ? Math.min(100, Math.max(0, (scrollY / max) * 100)) : 0);

      const sections = document.querySelectorAll<HTMLElement>("main section[id]");
      let current = "home";
      sections.forEach((section) => {
        if (scrollY >= section.offsetTop - 120) current = section.id;
      });
      // The last section may be too short to reach the trigger line — select it at the page bottom.
      if (max > 0 && scrollY >= max - 2) current = sections[sections.length - 1]?.id ?? current;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Scroll progress: blue bar + a % badge riding at its tip (decorative, hidden from screen readers) */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="h-1.5 bg-cobalt" style={{ width: `${progress}%` }} />
        {progress >= 1 && (
          <span
            className="absolute top-0 -translate-x-full border-2 border-t-0 border-coal bg-cobalt px-1.5 font-mono text-[0.65rem] leading-3.5 font-bold text-white tabular-nums shadow-[2px_2px_0_var(--color-coal)]"
            // Never slides off the left edge at small values; ends flush with the bar's tip.
            style={{ left: `max(2.75rem, ${progress}%)` }}
          >
            {Math.round(progress)}%
          </span>
        )}
      </div>
      {/* on-bright: the yellow bar keeps black ink in both themes */}
      <header className="on-bright sticky top-0 z-40 border-b-3 border-ink bg-sun dark:border-cream">
        <nav className="mx-auto flex min-h-18 max-w-295 items-center justify-between px-4 sm:px-6">
          <a
            href="#home"
            aria-label="Go to home"
            className="-rotate-2 border-3 border-ink bg-ink px-3.5 py-2.5 font-display text-lg leading-none text-sun uppercase shadow-brutal-sm transition-[rotate] hover:rotate-0"
          >
            {profile.name}
          </a>

          <div className="flex items-center gap-3">
          <button
            type="button"
            className="order-last grid size-11.5 place-content-center gap-1.25 border-3 border-ink bg-card shadow-brutal-sm md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block h-0.75 w-5.5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.75 w-5.5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.75 w-5.5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>

          <ul
            id="nav-links"
            className={`${open ? "grid" : "hidden"} absolute inset-x-0 top-18 gap-2 border-b-3 border-ink bg-sun px-5 pt-3 pb-5 dark:border-cream md:static md:flex md:items-center md:border-0 md:p-0`}
          >
            {navLinks.map(({ href, label }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block border-3 px-3.5 py-3 text-sm font-bold uppercase transition md:inline-block md:px-3 md:py-1.5 ${
                      isActive
                        ? "border-ink bg-ink text-sun"
                        : "border-ink bg-card md:border-transparent md:bg-transparent md:hover:-translate-0.5 md:hover:border-ink md:hover:bg-card md:hover:shadow-brutal-sm"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
