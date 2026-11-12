import { projects } from "@/data/portfolio";
import { ExternalIcon, GitHubIcon } from "./icons";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const iconLink =
  "brutal-sink relative grid size-12 place-items-center border-3 border-ink bg-card shadow-brutal-sm hover:bg-ink hover:text-white " +
  // tooltip (desktop only)
  "md:after:pointer-events-none md:after:invisible md:after:absolute md:after:bottom-full md:after:left-1/2 md:after:mb-2.5 md:after:-translate-x-1/2 md:after:translate-y-1.5 md:after:border-2 md:after:border-ink md:after:bg-ink md:after:px-2 md:after:py-0.5 md:after:text-[0.72rem] md:after:font-bold md:after:whitespace-nowrap md:after:text-sun md:after:uppercase md:after:opacity-0 md:after:transition md:after:content-[attr(data-tooltip)] md:hover:after:visible md:hover:after:translate-y-0 md:hover:after:opacity-100";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Projects" title="Stuff I built." />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <article
            key={p.name}
            data-anim="slam"
            className={`brutal-lift relative flex min-h-75 flex-col justify-between border-3 border-ink p-6 shadow-brutal *:on-bright ${p.color}`}
          >
            <span
              aria-hidden
              className="absolute top-2.5 right-4 font-display text-[3.4rem] leading-none opacity-[0.12]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-[1.6rem] leading-tight uppercase">{p.name}</h3>
              <p className="mt-3 text-[0.91rem]">{p.description}</p>
              <ul className="mt-4.5 flex flex-wrap gap-2" aria-label="Tech used">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="border-2 border-ink bg-card px-2 py-0.5 text-[0.72rem] font-bold uppercase"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${p.name} on GitHub`}
                data-tooltip="Source Code"
                className={iconLink}
              >
                <GitHubIcon width={24} height={24} />
              </a>
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${p.name} website`}
                data-tooltip="Live Demo"
                className={iconLink}
              >
                <ExternalIcon width={20} height={20} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
