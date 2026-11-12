import { education } from "@/data/portfolio";
import { metaIcons } from "./icons";
import MetaChip from "./MetaChip";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const markers = ["bg-sun", "bg-punch", "bg-mint"];

export default function Education() {
  return (
    <Reveal id="education">
      <SectionHeading eyebrow="Education" title="Where I learn." />
      <ol className="mt-9 grid gap-6.5 border-l-6 border-ink pl-6 md:pl-8">
        {education.map((item, i) => (
          <li
            key={item.title}
            className="brutal-lift relative border-3 border-ink bg-card p-6 shadow-brutal"
          >
            <span
              aria-hidden
              className={`absolute top-6.5 -left-9.5 size-5 border-3 border-ink md:-left-11.5 ${markers[i % markers.length]}`}
            />
            <span className="mb-3 inline-block bg-cobalt px-2 py-0.5 text-[0.8rem] font-bold text-white">
              {item.period}
            </span>
            <h3 className="font-display text-lg leading-tight uppercase">{item.title}</h3>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {item.meta.map((m) => (
                <MetaChip key={m.text} icon={metaIcons[m.icon]} tooltip={m.tooltip}>
                  {m.text}
                </MetaChip>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
