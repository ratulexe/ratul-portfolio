import type { ReactNode } from "react";

/**
 * Standard page section (spacing + max width + anchor id).
 * Scroll animations are handled per element by GSAP — see components/motion/PageMotion.tsx.
 */
export default function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto max-w-295 px-5 py-18 sm:px-6 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
