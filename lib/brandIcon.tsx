import { ImageResponse } from "next/og";
import { loadDisplayFont } from "./displayFont";

const INK = "#0a0a0a";
const SUN = "#ffd23f";
const PAPER = "#f5f0e1";

/**
 * Brutalist "RK" tile — yellow square, thick black border, hard offset shadow —
 * matching the logo in the header. Used for the favicon and the Apple touch icon.
 *
 * @param px      canvas size in pixels
 * @param backdrop fill the canvas behind the tile (Apple icons can't be transparent)
 */
export async function brandIcon(px: number, backdrop = false) {
  const font = await loadDisplayFont("RK");
  const unit = px / 32; // design grid: 32 × 32
  // Smaller tile on the Apple icon so it has breathing room inside iOS's rounded mask.
  const tile = Math.round((backdrop ? 21 : 26) * unit);
  const border = Math.max(2, Math.round(2 * unit));
  const shadow = Math.max(2, Math.round(3.5 * unit));
  // Centre tile + shadow together as one visual block.
  const pad = Math.max(0, Math.floor((px - (tile + shadow)) / 2));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: pad,
          backgroundColor: backdrop ? PAPER : "transparent",
        }}
      >
        <div
          style={{
            width: tile,
            height: tile,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: SUN,
            border: `${border}px solid ${INK}`,
            boxShadow: `${shadow}px ${shadow}px 0 ${INK}`,
            color: INK,
            fontFamily: font ? "Archivo Black" : "sans-serif",
            fontSize: Math.round((tile / 26) * 13.5),
            letterSpacing: -0.5 * unit,
            lineHeight: 1,
          }}
        >
          RK
        </div>
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: font ? [{ name: "Archivo Black", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
