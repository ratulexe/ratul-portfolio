import { brandIcon } from "@/lib/brandIcon";

// iPhone/iPad home-screen icon (generated at build time). Opaque backdrop: iOS
// doesn't support transparency and rounds the corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return brandIcon(180, true);
}
