"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades/slides its section in when it scrolls into view (and out again when it leaves).
 *
 * The section is visible in the server-rendered HTML and only hides once JavaScript
 * has started, so content never stays invisible if the script is slow or fails to load.
 */
export default function Reveal({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  // null = JS not running yet (show content), true/false = observed state
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      data-hidden={visible === false || undefined}
      className={`mx-auto max-w-295 px-5 py-18 transition-[opacity,translate] duration-400 ease-[cubic-bezier(0.2,1.4,0.4,1)] data-hidden:translate-y-6 data-hidden:opacity-0 motion-reduce:translate-y-0! motion-reduce:opacity-100! sm:px-6 md:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
