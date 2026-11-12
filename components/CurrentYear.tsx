"use client";

/** Rendered on the client so the year stays correct without rebuilding the static site. */
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
