// Loads Archivo Black (TTF) from Google Fonts for generated images (share image, favicon).
// Only the characters in `text` are downloaded. Returns null on failure so callers can
// fall back to the default font instead of breaking the build.
export async function loadDisplayFont(text: string): Promise<ArrayBuffer | null> {
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
