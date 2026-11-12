// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: "Ratul Kole",
  role: "Computer Science & Engineering student",
  intro:
    "A Computer Science & Engineering student and technophile who loves building for the web, trying out new tech, and sharpening problem-solving with Data Structures & Algorithms.",
  degree: "B.Tech in Computer Science & Engineering",
  university: "JIS University",
  city: "Kolkata",
  cgpa: "8.4",
  email: "ratulk.cse.24.jisu@gmail.com",
  resume: "/assets/resume.pdf",
  portrait: "/assets/ratul-cutout-2026.webp",
  /** Shown as the sticker in the hero — update it whenever your focus changes. */
  nowLearning: "DSA in C++",
  handles: {
    github: "ratulexe",
    leetcode: "ratulexe",
    x: "byratul13",
  },
};

/**
 * The site's public address — used for share previews (Open Graph) and canonical links.
 * When you connect a custom domain (e.g. ratulkole.dev), change only this line.
 */
export const siteUrl = "https://ratulkole.vercel.app";

export const siteDescription =
  "Ratul Kole — B.Tech CSE student at JIS University, Kolkata. Web developer (Node.js, Express, Firebase) solving DSA in C++. Projects, live coding stats and résumé.";

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Stats" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const marqueeItems = [
  "Web Developer",
  "DSA",
  "Node.js",
  "JavaScript",
  "Open to Internships",
];

export const about =
  "I am currently pursuing B.Tech in Computer Science & Engineering at JIS University, Kolkata. I enjoy building real-world applications, improving my problem-solving skills, and working with web technologies across frontend, backend, and databases. I am seeking an internship where I can apply my technical skills, gain industry experience, and contribute to impactful projects.";

export type MetaIcon = "school" | "pin" | "award" | "book";

export type EducationItem = {
  period: string;
  title: string;
  meta: { icon: MetaIcon; text: string; tooltip?: string }[];
};

export const education: EducationItem[] = [
  {
    period: "2024 - Present",
    title: "Bachelor of Technology in Computer Science & Engineering",
    meta: [
      { icon: "school", text: "JIS University" },
      { icon: "pin", text: "Agarpara, Kolkata" },
      { icon: "award", text: "CGPA: 8.4" },
    ],
  },
  {
    period: "2024",
    title: "Class XII",
    meta: [
      { icon: "school", text: "Anandanagar Ananda Chandra Roy High School" },
      {
        icon: "book",
        text: "WBCHSE",
        tooltip: "West Bengal Council of Higher Secondary Education",
      },
      { icon: "award", text: "80%" },
    ],
  },
  {
    period: "2022",
    title: "Class X",
    meta: [
      { icon: "school", text: "Anandanagar Ananda Chandra Roy High School" },
      {
        icon: "book",
        text: "WBBSE",
        tooltip: "West Bengal Board of Secondary Education",
      },
      { icon: "award", text: "79.9%" },
    ],
  },
];

/**
 * Hackathons, certifications, open-source PRs, clubs… Add entries here and they appear
 * in the Achievements section under the live stats. Example:
 *   { title: "Smart India Hackathon — Finalist", year: "2026", detail: "Built X with Y.", href: "https://…" }
 */
export type Achievement = { title: string; year: string; detail: string; href?: string };

export const achievements: Achievement[] = [];

/** Logo for skills without an image file (see components/SkillLogo.tsx). */
export type SkillIcon = "sql" | "mysql" | "tailwind" | "api" | "githubcli";

/** A skill shows either a logo image or a drawn icon. */
export type Skill = { name: string; logo?: string; icon?: SkillIcon };

export type SkillGroup = {
  title: string;
  headerClass: string;
  large?: boolean;
  skills: Skill[];
};

const logo = (file: string) => `/assets/logos/${file}`;

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    headerClass: "bg-sun text-coal",
    large: true,
    skills: [
      { name: "C", logo: logo("C.webp") },
      { name: "C++", logo: logo("cpp.webp") },
      { name: "JavaScript", logo: logo("JavaScript.webp") },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    title: "Frontend",
    headerClass: "bg-punch text-coal",
    skills: [
      { name: "HTML5", logo: logo("HTML5.webp") },
      { name: "CSS", logo: logo("CSS3.svg") },
      { name: "Bootstrap", logo: logo("Bootstrap.webp") },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend",
    headerClass: "bg-mint text-coal",
    skills: [
      { name: "Node.js", logo: logo("Node.js.webp") },
      { name: "Express.js", logo: logo("Express.webp") },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    title: "Databases",
    headerClass: "bg-tangerine text-coal",
    skills: [
      { name: "MongoDB", logo: logo("MongoDB.webp") },
      { name: "Firebase", logo: logo("Firebase.webp") },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    title: "Tools",
    headerClass: "bg-cobalt text-white",
    skills: [
      { name: "VS Code", logo: logo("Visual Studio Code (VS Code).webp") },
      { name: "Git", logo: logo("Git.webp") },
      { name: "GitHub", logo: logo("GitHub.webp") },
      { name: "GitHub CLI", icon: "githubcli" },
      { name: "Gemini", logo: logo("google-gemini-icon.webp") },
      // Transparent background (renamed from chatgpt-icon so image caches can't serve the old white version).
      { name: "ChatGPT", logo: logo("chatgpt-logo.webp") },
    ],
  },
];

export const concepts = [
  {
    title: "Data Structures & Algorithms",
    text: "Problem solving, logic building, and efficient thinking.",
  },
  {
    title: "Object-Oriented Programming",
    text: "Classes, objects, encapsulation, and reusable code design.",
  },
];

export type Project = {
  name: string;
  description: string;
  tags: string[];
  repo: string;
  live: string;
  color: string;
};

export const projects: Project[] = [
  {
    name: "Aashray AI",
    description:
      "AI-powered disaster evacuation platform that recommends shelters by location, capacity, safety and road conditions, with real-time occupancy tracking, reservation codes and an operator dashboard.",
    tags: ["React", "Firebase", "Tailwind CSS"],
    repo: "https://github.com/ratulexe/aashray-ai",
    live: "https://aashray-ai.vercel.app",
    color: "bg-tangerine text-coal",
  },
  {
    name: "MedMinder",
    description:
      "A medicine reminder system with authentication, scheduling, Firebase Firestore, and external medicine API integration.",
    tags: ["Node.js", "Express.js", "Firebase"],
    repo: "https://github.com/ratulexe/medminder",
    live: "https://medminder-s4.web.app/",
    color: "bg-sun text-coal",
  },
  {
    name: "CloudMate",
    description:
      "A weather application for checking current weather details with a clean interface and simple user experience.",
    tags: ["Weather App", "API", "JavaScript"],
    repo: "https://github.com/ratulexe/CloudMate",
    live: "https://ratulexe.github.io/CloudMate/",
    color: "bg-punch text-coal",
  },
  {
    name: "AptitudeArena",
    description:
      "A quiz and aptitude practice application designed to help users test knowledge and improve problem-solving speed.",
    tags: ["Quiz App", "Aptitude", "Practice"],
    repo: "https://github.com/ratulexe/AptitudeArena",
    live: "https://ratulexe.github.io/AptitudeArena/",
    color: "bg-mint text-coal",
  },
];

export type ContactLink = {
  label: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "leetcode" | "x";
  color: string;
  external: boolean;
};

export const contacts: ContactLink[] = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "mail",
    color: "bg-sun text-coal",
    external: false,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ratul13/",
    icon: "linkedin",
    color: "bg-cobalt text-white",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/ratulexe",
    icon: "github",
    color: "bg-punch text-coal",
    external: true,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/ratulexe/",
    icon: "leetcode",
    color: "bg-mint text-coal",
    external: true,
  },
  {
    label: "X (formerly Twitter) @byratul13",
    href: "https://x.com/byratul13",
    icon: "x",
    color: "bg-coal text-cream",
    external: true,
  },
];
