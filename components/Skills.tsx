import Image from "next/image";
import { concepts, skillGroups, type SkillGroup } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const card = "brutal-lift flex flex-col border-3 border-ink bg-card shadow-brutal";
const cardTitle = "border-b-3 border-ink px-6 py-3.5 font-display text-lg uppercase";

function SkillCard({ group }: { group: SkillGroup }) {
  const box = group.large ? "size-17 sm:size-19" : "size-14.5";
  const img = group.large ? 48 : 36;
  return (
    <article className={card}>
      <h3 className={`${cardTitle} ${group.headerClass}`}>{group.title}</h3>
      <ul
        aria-label={`${group.title} skills`}
        className={`flex grow flex-wrap content-center justify-center p-6 ${group.large ? "gap-3.5 sm:gap-7" : "gap-3.5"}`}
      >
        {group.skills.map((s) => (
          <li
            key={s.name}
            title={s.name}
            className="group flex min-h-26 min-w-18 flex-col items-center sm:min-w-21"
          >
            <div
              className={`${box} grid place-items-center border-3 border-ink bg-cream shadow-brutal-sm transition-[translate,box-shadow,background-color] duration-100 group-hover:translate-0.75 group-hover:bg-sun group-hover:shadow-flat`}
            >
              <Image
                src={s.logo}
                alt={`${s.name} logo`}
                width={img}
                height={img}
                className="object-contain"
                style={{ width: img, height: img }}
              />
            </div>
            <span className="mt-3 max-w-23.5 text-center text-[0.76rem] font-bold uppercase">
              {s.name}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Skills() {
  return (
    <Reveal id="skills">
      <SectionHeading eyebrow="Skills" title="My toolbox." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <SkillCard key={g.title} group={g} />
        ))}

        <article className={card}>
          <h3 className={`${cardTitle} bg-coal text-sun`}>Core Concepts</h3>
          <ol className="grid grow content-center gap-3.5 p-6">
            {concepts.map((c, i) => (
              <li
                key={c.title}
                className="grid grid-cols-[auto_1fr] items-start gap-3.5 border-2 border-ink bg-paper p-3.5 transition-[translate,box-shadow] duration-100 hover:-translate-0.5 hover:shadow-brutal-sm"
              >
                <span className="grid size-9.5 place-items-center border-2 border-ink bg-sun font-display text-sm text-coal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong className="block text-[0.9rem] leading-snug">{c.title}</strong>
                  <p className="mt-1.5 text-[0.8rem] text-ink/80">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </Reveal>
  );
}
