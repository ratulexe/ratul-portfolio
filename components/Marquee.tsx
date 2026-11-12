import { Fragment } from "react";
import { marqueeItems } from "@/data/portfolio";

export default function Marquee() {
  // Content is rendered twice so the -50% translate loops seamlessly.
  const loop = [...marqueeItems, ...marqueeItems];
  return (
    // The tilted strip bleeds past both screen edges on purpose; this wrapper clips that
    // sideways overflow so phones don't widen the whole page (which also pushed the
    // fixed scroll-progress badge off-screen). overflow-x-clip keeps the tilt visible vertically.
    <div className="overflow-x-clip">
    <div
      aria-hidden
      data-anim="marquee"
      className="-mx-2.5 my-3 -rotate-[1.2deg] overflow-hidden border-y-3 border-ink bg-coal py-3.5 text-sun"
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {loop.map((item, i) => (
          <Fragment key={i}>
            <span className="font-display text-[clamp(1.1rem,2.5vw,1.6rem)] whitespace-nowrap uppercase">
              {item}
            </span>
            <span className="font-display text-[clamp(1.1rem,2.5vw,1.6rem)] text-white">✦</span>
          </Fragment>
        ))}
      </div>
    </div>
    </div>
  );
}
