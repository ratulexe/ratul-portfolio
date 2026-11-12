import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";
import { loadDisplayFont } from "@/lib/displayFont";

// The preview card shown when the site link is shared (LinkedIn, WhatsApp, X, Slack…).
// Generated once at build time.

export const alt = `${profile.name} — Web developer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0a0a";
const PAPER = "#f5f0e1";

export default async function Image() {
  const headline = profile.name.toUpperCase();
  const tagline = "WEB DEVELOPER · NODE.JS · FIREBASE";
  const chips = ["B.TECH CSE · JIS UNIVERSITY", `NOW: ${profile.nowLearning.toUpperCase()}`];

  const [font, portrait] = await Promise.all([
    loadDisplayFont(headline + tagline + chips.join("") + "OPEN TO INTERNSHIPS</>"),
    readFile(join(process.cwd(), "public/assets/ratul-cutout-2026.png")),
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

        {/* Same look as the hero: pink block with a hard shadow, cut-out portrait rising out of it */}
        <div style={{ display: "flex", position: "relative", width: 400, height: 500 }}>
          <div
            style={{
              position: "absolute",
              left: 20,
              bottom: 0,
              width: 360,
              height: 320,
              backgroundColor: "#ff6fa8",
              border: `6px solid ${INK}`,
              boxShadow: `14px 14px 0 ${INK}`,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img> */}
          <img
            src={portraitSrc}
            alt=""
            width={266}
            height={480}
            style={{ position: "absolute", left: 67, bottom: 6, filter: "grayscale(1)" }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 70,
              display: "flex",
              backgroundColor: "#ffd23f",
              border: `5px solid ${INK}`,
              boxShadow: `6px 6px 0 ${INK}`,
              padding: "10px 16px",
              fontSize: 34,
            }}
          >
            {"</>"}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Archivo Black", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
