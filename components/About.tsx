import { about } from "@/data/portfolio";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="I build things, then break them, then build them better." />
      <p data-anim="slam" className="max-w-190 border-3 border-ink bg-card p-5 text-[clamp(1.05rem,2vw,1.35rem)] text-ink/80 shadow-brutal sm:p-7">
        {about}
      </p>
    </Section>
  );
}
