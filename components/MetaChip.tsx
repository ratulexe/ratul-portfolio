import type { ReactNode, SVGProps } from "react";

/** Small bordered chip with an icon, e.g. "JIS University". Optional hover tooltip. */
export default function MetaChip({
  icon: Icon,
  tooltip,
  children,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
  tooltip?: string;
  children: ReactNode;
}) {
  return (
    <span
      title={tooltip}
      data-tooltip={tooltip}
      className={`relative inline-flex max-w-full items-center gap-1.5 border-2 border-ink bg-card px-2.25 py-1 text-[0.72rem] font-bold ${
        tooltip
          ? "md:after:pointer-events-none md:after:absolute md:after:bottom-full md:after:left-1/2 md:after:z-50 md:after:mb-2 md:after:w-max md:after:-translate-x-1/2 md:after:translate-y-1.5 md:after:border-2 md:after:border-ink md:after:bg-sun md:after:text-coal md:after:px-2.5 md:after:py-1.5 md:after:opacity-0 md:after:shadow-brutal-sm md:after:transition md:after:content-[attr(data-tooltip)] md:hover:after:translate-y-0 md:hover:after:opacity-100"
          : ""
      }`}
    >
      <Icon width={12} height={12} className="shrink-0" />
      {children}
    </span>
  );
}
