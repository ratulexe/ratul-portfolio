import type { Metadata } from "next";
import Link from "next/link";
import NotFoundMotion from "@/components/motion/NotFoundMotion";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `404 — Page not found | ${profile.name}`,
  robots: { index: false },
};

const button =
  "brutal-press inline-flex min-h-13.5 items-center justify-center border-3 border-ink px-6 text-[0.95rem] font-bold tracking-wide uppercase shadow-brutal";

export default function NotFound() {
  return (
    <NotFoundMotion>
      <main className="mx-auto grid min-h-dvh max-w-295 content-center overflow-x-clip px-5 py-16 sm:px-6">
        <p
          data-anim="sticker"
          className="mb-6 inline-block -rotate-2 self-start justify-self-start border-3 border-ink bg-punch px-2.5 py-1 text-sm font-bold tracking-[0.08em] text-coal uppercase shadow-brutal-sm"
        >
          Error · 404
        </p>

        <h1
          aria-label="404"
          className="font-display text-[clamp(7rem,30vw,18rem)] leading-[0.8] tracking-[-0.04em] text-shadow-[6px_6px_0_var(--color-sun)] [-webkit-text-stroke:2px_var(--color-ink)] sm:text-shadow-[10px_10px_0_var(--color-sun)]"
        >
          {/* Each digit is its own piece so it can drop, glitch and be dragged. */}
          {"404".split("").map((d, i) => (
            <span
              key={i}
              data-digit
              aria-hidden
              className="inline-block cursor-grab touch-none select-none active:cursor-grabbing"
            >
              {d}
            </span>
          ))}
        </h1>

        <p
          data-anim="hint"
          className="invisible mt-4 text-xs font-bold tracking-wider uppercase opacity-0"
        >
          ↑ psst — grab a number and drag it
        </p>

        <div
          data-anim="card"
          className="mt-6 max-w-160 border-3 border-ink bg-card p-5 shadow-brutal sm:p-7"
        >
          <h2 className="font-display text-[clamp(1.5rem,4vw,2.4rem)] leading-tight uppercase">
            This page doesn&apos;t exist.
          </h2>
          <p className="mt-3 text-ink/80">
            The link may be broken or the page was moved. Everything worth seeing is on the home page.
          </p>
        </div>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link href="/" data-anim="button" className={`${button} bg-cobalt text-white`}>
            ← Back home
          </Link>
          <Link href="/#projects" data-anim="button" className={`${button} bg-sun text-coal`}>
            See projects
          </Link>
        </div>
      </main>
    </NotFoundMotion>
  );
}
