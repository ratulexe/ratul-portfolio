import { profile } from "@/data/portfolio";
import CurrentYear from "./CurrentYear";
import { DownloadIcon } from "./icons";

const link =
  "inline-flex items-center gap-1.5 border-2 px-3 py-1.5 text-sm font-bold uppercase transition-colors duration-100";

export default function Footer() {
  return (
    <footer className="border-t-3 border-ink bg-coal text-cream">
      <div className="mx-auto flex max-w-295 flex-col items-start gap-4 px-5 py-7 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          © <CurrentYear /> {profile.name}. Built with Next.js, React & Tailwind CSS.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={profile.resume}
            download="Ratul_Kole_Resume.pdf"
            className={`${link} border-sun bg-sun text-coal hover:border-white hover:bg-white`}
          >
            <DownloadIcon width={16} height={16} />
            Download Resume
          </a>
          <a href="#home" className={`${link} border-white hover:border-sun hover:bg-sun hover:text-coal`}>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
