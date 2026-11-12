import { profile } from "@/data/portfolio";
import type { Stats } from "@/lib/stats";
import { ArrowDownIcon, AwardIcon, DownloadIcon, PinIcon, SchoolIcon } from "./icons";
import HeroPortrait from "./HeroPortrait";
import MetaChip from "./MetaChip";

const button =
  "brutal-press inline-flex min-h-13.5 w-full items-center justify-center border-3 border-ink px-6 text-[0.95rem] font-bold tracking-wide uppercase shadow-brutal sm:w-auto";

export default function Hero({ stats }: { stats: Stats }) {
  const highlights = [
    { value: profile.cgpa, label: "CGPA", color: "bg-sun text-coal" },
    { value: stats.leetcode.total, label: "LeetCode solved", color: "bg-mint text-coal", href: `https://leetcode.com/u/${profile.handles.leetcode}/` },
    { value: stats.github.contributionsLastYear, label: "GitHub contributions / yr", color: "bg-punch text-coal", href: `https://github.com/${profile.handles.github}` },
  ];

  return (
    <section
      id="home"
      className="relative mx-auto grid max-w-295 items-center gap-14 overflow-x-clip px-5 pt-16 pb-18 sm:px-6 md:min-h-[calc(100vh-72px)] md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] md:py-24"
    >
      <div>
        <div className="mb-4.5 flex flex-wrap items-center gap-3">
          <p data-anim="sticker" className="inline-block border-3 border-ink bg-punch px-2.5 py-1 text-sm font-bold tracking-[0.08em] text-coal uppercase shadow-brutal-sm">
            Student · Builder · Kolkata
          </p>
          {/* "Now" sticker — edit profile.nowLearning in data/portfolio.ts */}
          <p data-anim="sticker" className="inline-flex rotate-[-3deg] items-center gap-2 border-3 border-dashed border-ink bg-card px-2.5 py-1 text-xs font-bold uppercase shadow-brutal-sm">
            <span aria-hidden className="size-2.5 animate-pulse rounded-full bg-mint ring-2 ring-ink" />
            Now learning: <span className="bg-sun px-1 text-coal">{profile.nowLearning}</span>
          </p>
        </div>

        <h1 className="font-display text-[clamp(4.5rem,15vw,11.5rem)] leading-[0.85] tracking-[-0.04em] uppercase text-shadow-[4px_4px_0_var(--color-sun)] [-webkit-text-stroke:2px_var(--color-ink)] sm:text-shadow-[6px_6px_0_var(--color-sun)]">
          Hello
        </h1>

        {/* Visible immediately (no typing reveal) — only the cursor blinks. */}
        <p className="mt-6.5 inline-block animate-caret border-3 border-r-[0.5em] border-ink bg-card px-2.5 py-1.5 text-[clamp(0.88rem,1.8vw,1.1rem)] font-bold tracking-wider whitespace-nowrap shadow-brutal-sm">
          - I&apos;m {profile.name},
        </p>

        <p className="mt-6.5 max-w-190 text-[clamp(1.05rem,2vw,1.35rem)] text-ink/80">
          {profile.intro}
        </p>

        <div className="mt-8.5 flex flex-wrap gap-4">
          <a href="#contact" className={`${button} bg-cobalt text-white`}>
            Contact Me
          </a>
          <a href="#projects" className={`${button} bg-card hover:bg-mint hover:text-coal`}>
            View Projects
          </a>
          <a
            href={profile.resume}
            download="Ratul_Kole_Resume.pdf"
            className={`${button} gap-2 bg-sun text-coal`}
          >
            <DownloadIcon width={18} height={18} />
            Résumé
          </a>
        </div>

        <ul className="mt-10 flex max-w-160 flex-wrap gap-3.5" aria-label="Profile highlights">
          {highlights.map((s) => {
            const body = (
              <>
                <strong data-count={String(s.value)} className="font-display text-2xl leading-none font-normal tabular-nums">{s.value}</strong>
                {s.label}
              </>
            );
            const chip = `${s.color} inline-flex items-baseline gap-2 border-3 border-ink px-3.5 py-2.5 text-[0.8rem] font-bold uppercase shadow-brutal-sm`;
            return (
              <li key={s.label} data-anim="chip">
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noreferrer" className={`${chip} brutal-sink`}>
                    {body}
                  </a>
                ) : (
                  <span className={chip}>{body}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid justify-items-center">
        <HeroPortrait />

        <div className="mt-8.5 w-full max-w-97.5 border-3 border-ink bg-card p-5 shadow-brutal">
          <span className="mb-3 inline-block border-2 border-ink bg-mint px-2 py-0.5 text-[0.7rem] font-bold tracking-wider text-coal uppercase">
            Currently pursuing
          </span>
          <strong className="block leading-snug">{profile.degree}</strong>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <MetaChip icon={SchoolIcon}>{profile.university}</MetaChip>
            <MetaChip icon={PinIcon}>{profile.city}</MetaChip>
            <MetaChip icon={AwardIcon}>CGPA {profile.cgpa}</MetaChip>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-nudge border-3 border-ink bg-card p-1.5 shadow-brutal-sm md:flex"
      >
        <ArrowDownIcon width={28} height={28} />
      </a>
    </section>
  );
}
