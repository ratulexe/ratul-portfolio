import Image from "next/image";
import { profile } from "@/data/portfolio";

/**
 * Hero visual: cut-out portrait breaking out of a pink brutalist shield, surrounded by
 * stickers. Coordinates use a 100 × 115 grid that matches the container's aspect ratio.
 *
 *   Shield:   M8,38 H92 V84 L50,113 L8,84 Z
 *   The photo is clipped to the shield's sides and bottom, but NOT its top edge,
 *   so the head and shoulders rise above it.
 */
const SHIELD = "M8,38 H92 V84 L50,113 L8,84 Z";
// Same shape as a CSS clip-path, with the top edge pushed up to 0 so the head can break out.
const PHOTO_CLIP = "polygon(8% 0, 92% 0, 92% 73.04%, 50% 98.26%, 8% 73.04%)";

// Hard-edged 12-point starburst (outer radius 50, inner 30).
const STAR = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 === 0 ? 50 : 30;
  const a = (Math.PI / 12) * i - Math.PI / 2;
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

// Chunky zig-zag lightning bolt in a 100 × 100 box.
const BOLT = "62,2 16,58 46,58 34,98 86,38 56,38 70,2";

export default function HeroPortrait() {
  return (
    <div className="relative mx-auto aspect-[100/115] w-[min(330px,100%)] md:w-[min(420px,100%)]">
      {/* Shield shadow + fill (behind the photo) */}
      <svg
        aria-hidden
        viewBox="0 0 100 115"
        className="absolute inset-0 size-full overflow-visible"
        preserveAspectRatio="none"
      >
        <path d={SHIELD} transform="translate(3.2 3.2)" className="fill-ink" />
        <path
          d={SHIELD}
          className="fill-punch stroke-ink"
          strokeWidth={3}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Portrait — animated as one piece by GSAP ("drop") */}
      <div data-anim="drop" className="absolute inset-0" style={{ clipPath: PHOTO_CLIP }}>
        <Image
          src={profile.portrait}
          alt={`Portrait of ${profile.name}`}
          width={609}
          height={1100}
          preload
          sizes="(min-width: 768px) 260px, 210px"
          className="absolute bottom-[1.5%] left-1/2 h-[99%] w-auto max-w-none -translate-x-1/2 grayscale contrast-125"
        />
      </div>

      {/* Shield outline drawn again on top, on the sides and bottom only, so the body
          sits inside the frame while the top edge stays behind the head. */}
      <svg
        aria-hidden
        viewBox="0 0 100 115"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        preserveAspectRatio="none"
      >
        <path
          d="M92,38 V84 L50,113 L8,84 V38"
          className="fill-none stroke-ink"
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* ---- Stickers ---- */}

      {/* Code speech bubble (top-left) */}
      <div
        data-anim="sticker"
        className="absolute top-[9%] -left-[2%] z-10 grid size-[23%] place-items-center border-3 border-ink bg-sun text-coal shadow-brutal"
        aria-hidden
      >
        <span data-anim="float" className="font-display text-[clamp(1rem,4.5vw,1.9rem)] leading-none">
          &lt;/&gt;
        </span>
        {/* bubble tail */}
        <span className="absolute -bottom-[11px] left-[26%] size-4 rotate-45 border-r-3 border-b-3 border-ink bg-sun" />
      </div>

      {/* Lightning bolt (top-right) — "zaps" every few seconds (GSAP: data-anim="zap") */}
      <svg
        data-anim="sticker"
        aria-hidden
        viewBox="-4 -4 112 112"
        className="absolute top-[10%] -right-[3%] z-10 w-[25%] overflow-visible md:-right-[6%]"
      >
        <g data-anim="zap">
          <polygon points={BOLT} transform="translate(5 5)" className="fill-ink" />
          <polygon points={BOLT} className="fill-sun stroke-ink" strokeWidth={3.5} strokeLinejoin="round" />
        </g>
      </svg>

      {/* "Available" tag — a vertical sticker standing in the empty pink strip right of the
          body, straddling the shield's edge.
          Positions/writing-mode are inline styles (and `translate`, not transform, so GSAP's
          stamp animation doesn't clash). */}
      <div
        data-anim="sticker"
        className="absolute z-10"
        style={{ left: "89%", top: "39%", translate: "-50% 0" }}
      >
        <span
          className="block border-3 border-ink bg-cobalt font-bold tracking-wider whitespace-nowrap text-white uppercase shadow-brutal-sm"
          style={{ writingMode: "vertical-rl", fontSize: "0.62rem", lineHeight: 1.2, padding: "8px 4px" }}
        >
          Available for
          <br />
          internship
        </span>
      </div>

      {/* Terminal prompt badge (bottom-left) — the "_" cursor blinks (GSAP: data-anim="blink") */}
      <div
        data-anim="sticker"
        aria-hidden
        className="absolute bottom-[14%] -left-[3%] z-10 grid size-[21%] place-items-center rounded-full border-3 border-ink bg-mint text-coal shadow-brutal"
      >
        <svg viewBox="0 0 48 48" className="w-[62%]">
          <path
            d="M10 15 L21 24 L10 33"
            className="fill-none stroke-current"
            strokeWidth={5}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <rect data-anim="blink" x="25" y="29" width="14" height="5" className="fill-current" />
        </svg>
      </div>

      {/* Starburst (bottom-right) */}
      <svg
        data-anim="sticker"
        aria-hidden
        viewBox="-4 -4 112 112"
        className="absolute -right-[2%] bottom-[2%] z-10 w-[25%] overflow-visible md:-right-[4%]"
      >
        <g data-anim="spin">
          <polygon points={STAR} transform="translate(4 4)" className="fill-ink" />
          <polygon points={STAR} className="fill-sun stroke-ink" strokeWidth={3} strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
