import { about } from "@/data/portfolio";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <Reveal id="about">
      <SectionHeading eyebrow="About" title="I build things, then break them, then build them better." />
      <p className="max-w-190 border-3 border-ink bg-card p-5 text-[clamp(1.05rem,2vw,1.35rem)] text-ink/80 shadow-brutal sm:p-7">
        {about}
      </p>
    </Reveal>
  );
}
