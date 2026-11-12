import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { getStats } from "@/lib/stats";

// Regenerate this page in the background at most every 6 hours so the
// LeetCode / GitHub numbers stay current without redeploying.
// Must be a literal (statically analyzable) — matches REFRESH_SECONDS in lib/stats.ts.
export const revalidate = 21600;

export default async function Home() {
  const stats = await getStats();

  return (
    <>
      <Header />
      <main>
        <Hero stats={stats} />
        <Marquee />
        <About />
        <Education />
        <Achievements stats={stats} />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
