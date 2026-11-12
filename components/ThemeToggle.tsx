"use client";

/**
 * Light/dark switch. The initial theme is set before paint by the inline script in
 * app/layout.tsx (saved choice → otherwise the device setting), so there is no flash.
 * Icons switch purely with CSS (`dark:`), so server and client render the same markup.
 */
export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Storage blocked (private mode) — the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="brutal-sink grid size-11.5 shrink-0 place-items-center border-3 border-ink bg-card shadow-brutal-sm"
    >
      {/* Moon (shown in light mode) */}
      <svg
        viewBox="0 0 24 24"
        width={22}
        height={22}
        fill="currentColor"
        aria-hidden
        className="dark:hidden"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      {/* Sun (shown in dark mode) */}
      <svg
        viewBox="0 0 24 24"
        width={22}
        height={22}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        aria-hidden
        className="hidden dark:block"
      >
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
      </svg>
    </button>
  );
}
