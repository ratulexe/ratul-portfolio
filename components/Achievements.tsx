import { achievements, profile, projects } from "@/data/portfolio";
import type { ContributionDay, Stats } from "@/lib/stats";
import { ExternalIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// min-w-0: lets the wide contribution calendar scroll inside its card instead of
// stretching the grid column past the screen on phones.
const card = "brutal-lift min-w-0 border-3 border-ink bg-card p-5 shadow-brutal sm:p-6";
const bigNumber = "font-display text-[clamp(2.8rem,7vw,4rem)] leading-none";
const label = "mt-2 text-sm font-bold uppercase";

const heatLevels = [
  "bg-ink/10",
  "bg-mint/35",
  "bg-mint/65",
  "bg-mint",
  "bg-cobalt",
] as const;

/** Splits the daily calendar into week columns (Sunday first), padding the first week. */
function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const padded: (ContributionDay | null)[] = [...Array(firstWeekday).fill(null), ...days];
  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

function LiveBadge({ live, source }: { live: boolean; source?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border-2 border-ink px-2 py-0.5 text-[0.68rem] font-bold tracking-wider text-coal uppercase ${
        live ? "bg-mint" : "bg-sun"
      }`}
      title={live ? `Fetched live${source ? ` from ${source}` : ""}` : "API unreachable — showing last known value"}
      data-source={source}
    >
      <span aria-hidden className={`size-2 border border-coal ${live ? "animate-pulse bg-coal" : "bg-transparent"}`} />
      {live ? "Live" : "Cached"}
    </span>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs font-bold uppercase underline decoration-2 underline-offset-4 hover:text-cobalt"
    >
      {children}
      <ExternalIcon width={12} height={12} />
    </a>
  );
}

export default function Achievements({ stats }: { stats: Stats }) {
  const { leetcode, github, live } = stats;
  const weeks = toWeeks(github.days);
  const difficulty = [
    { name: "Easy", count: leetcode.easy, color: "bg-mint" },
    { name: "Medium", count: leetcode.medium, color: "bg-sun" },
    { name: "Hard", count: leetcode.hard, color: "bg-punch" },
  ];

  return (
    <Reveal id="achievements">
      <SectionHeading eyebrow="Stats" title="Proof, not promises." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LeetCode */}
        <article className={card}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg uppercase">LeetCode</h3>
            <LiveBadge live={live.leetcode} />
          </div>
          <p className={`${bigNumber} mt-5`}>{leetcode.total}</p>
          <p className={label}>Problems solved</p>

          {/* Stacked difficulty bar */}
          <div
            className="mt-5 flex h-5 border-3 border-ink"
            role="img"
            aria-label={difficulty.map((d) => `${d.count} ${d.name}`).join(", ")}
          >
            {difficulty.map((d) =>
              d.count > 0 ? (
                <span
                  key={d.name}
                  className={`${d.color} border-r-3 border-ink last:border-r-0`}
                  style={{ flexGrow: d.count }}
                />
              ) : null,
            )}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold uppercase">
            {difficulty.map((d) => (
              <li key={d.name} className="inline-flex items-center gap-1.5">
                <span aria-hidden className={`size-3 border-2 border-ink ${d.color}`} />
                {d.count} {d.name}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <SourceLink href={`https://leetcode.com/u/${profile.handles.leetcode}/`}>
              View profile
            </SourceLink>
          </div>
        </article>

        {/* GitHub contributions */}
        <article className={`${card} lg:col-span-2`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg uppercase">GitHub</h3>
            <LiveBadge
              live={live.github}
              source={github.source === "official" ? "GitHub's official API" : "a public mirror of GitHub"}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <p className={bigNumber}>{github.contributionsLastYear}</p>
              <p className={label}>Contributions · last 12 months</p>
            </div>
            <div>
              <p className={bigNumber}>{github.repos}</p>
              <p className={label}>Public repos</p>
            </div>
          </div>

          {weeks.length > 0 && (
            <div className="mt-6 overflow-x-auto pb-2">
              <div
                className="grid w-max grid-flow-col grid-rows-7 gap-0.75 border-3 border-ink bg-paper p-2"
                role="img"
                aria-label={`GitHub contribution calendar: ${github.contributionsLastYear} contributions in the last year`}
              >
                {weeks.flatMap((week, w) =>
                  week.map((day, d) =>
                    day ? (
                      <span
                        key={day.date}
                        title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                        className={`size-2.5 ${heatLevels[day.level]}`}
                      />
                    ) : (
                      <span key={`pad-${w}-${d}`} className="size-2.5" />
                    ),
                  ),
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <SourceLink href={`https://github.com/${profile.handles.github}`}>View profile</SourceLink>
            <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase">
              Less
              {heatLevels.map((c) => (
                <span key={c} aria-hidden className={`size-2.5 ${c}`} />
              ))}
              More
            </span>
          </div>
        </article>

        {/* Quick facts */}
        <article className={`${card} bg-sun text-coal`}>
          <p className={bigNumber}>{projects.length}</p>
          <p className={label}>Live projects shipped</p>
        </article>
        <article className={`${card} bg-punch text-coal`}>
          <p className={bigNumber}>{leetcode.medium + leetcode.hard}</p>
          <p className={label}>Medium + Hard problems cracked</p>
        </article>
        <article className={`${card} bg-mint text-coal`}>
          <p className={bigNumber}>{profile.cgpa}</p>
          <p className={label}>CGPA at JIS University</p>
        </article>
      </div>

      {achievements.length > 0 && (
        <ol className="mt-8 grid gap-4">
          {achievements.map((a) => (
            <li key={a.title} className={`${card} grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-5`}>
              <span className="self-start bg-cobalt px-2 py-0.5 text-sm font-bold text-white">{a.year}</span>
              <div>
                <h3 className="font-display text-lg uppercase">
                  {a.href ? (
                    <a href={a.href} target="_blank" rel="noreferrer" className="hover:text-cobalt">
                      {a.title}
                    </a>
                  ) : (
                    a.title
                  )}
                </h3>
                <p className="mt-1 text-sm">{a.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-6 text-xs font-bold uppercase opacity-70">
        Stats pulled live from GitHub &amp; LeetCode · refreshed every 6 hours
      </p>
    </Reveal>
  );
}
