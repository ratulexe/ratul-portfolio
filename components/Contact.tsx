import { contacts, type ContactLink } from "@/data/portfolio";
import { CodeIcon, GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./icons";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const icons: Record<ContactLink["icon"], typeof MailIcon> = {
  mail: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  leetcode: CodeIcon,
  x: XIcon,
};

export default function Contact() {
  return (
    <Section id="contact" className="pb-18">
      <SectionHeading eyebrow="Contact" title="Say hi." big />
      <ul className="flex flex-wrap gap-4.5">
        {contacts.map((c) => {
          const Icon = icons[c.icon];
          return (
            <li key={c.label} data-anim="slam">
              <a
                href={c.href}
                aria-label={c.label}
                title={c.label}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`brutal-press grid size-17 place-items-center border-3 border-ink shadow-brutal ${c.color}`}
              >
                <Icon width={28} height={28} />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
