import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

// The preview card shown when the site link is shared (LinkedIn, WhatsApp, X, Slack…).
// Generated once at build time.

export const alt = `${profile.name} — Full-stack developer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0a0a";
const PAPER = "#f5f0e1";

/** Loads Archivo Black from Google Fonts (TTF). Falls back to the default font on failure. */
async function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Archivo+Black&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const headline = profile.name.toUpperCase();
  const tagline = "FULL-STACK DEV · NODE.JS · FIREBASE";
  const chips = ["B.TECH CSE · JIS UNIVERSITY", `NOW: ${profile.nowLearning.toUpperCase()}`];

  const [font, portrait] = await Promise.all([
    loadDisplayFont(headline + tagline + chips.join("") + "OPEN TO INTERNSHIPS"),
    readFile(join(process.cwd(), "public/assets/ratul-portrait-transparent.png")),
  ]);
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;
  const display = font ? "Archivo Black" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: PAPER,
          backgroundImage: `linear-gradient(rgba(10,10,10,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(10,10,10,0.07) 2px, transparent 2px)`,
          backgroundSize: "48px 48px",
          borderBottom: `24px solid ${INK}`,
          color: INK,
          fontFamily: display,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              backgroundColor: "#ff6fa8",
              border: `5px solid ${INK}`,
              boxShadow: `6px 6px 0 ${INK}`,
              padding: "8px 16px",
              fontSize: 26,
            }}
          >
            OPEN TO INTERNSHIPS
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -3,
              textShadow: "6px 6px 0 #ffd23f",
            }}
          >
            {headline}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30 }}>{tagline}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            {chips.map((c, i) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  backgroundColor: i === 0 ? "#ffffff" : "#2ee59d",
                  border: `4px solid ${INK}`,
                  boxShadow: `5px 5px 0 ${INK}`,
                  padding: "8px 14px",
                  fontSize: 22,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 380,
            height: 380,
            overflow: "hidden",
            backgroundColor: "#3a5bff",
            border: `6px solid ${INK}`,
            boxShadow: `16px 16px 0 ${INK}`,
            transform: "rotate(3deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
          <img
            src={portraitSrc}
            alt=""
            width={440}
            height={440}
            style={{ marginLeft: -30, marginTop: -10, filter: "grayscale(1)" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Archivo Black", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
