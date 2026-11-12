import type { Metadata, Viewport } from "next";
import { Archivo_Black, Geist_Mono } from "next/font/google";
import { profile, siteDescription, siteUrl } from "@/data/portfolio";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — Web Developer & CSE Student`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: siteDescription,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: [
    profile.name,
    "portfolio",
    "web developer",
    "Node.js",
    "Express.js",
    "Firebase",
    "DSA",
    "C++",
    "internship",
    "JIS University",
    "Kolkata",
  ],
  alternates: { canonical: "/" },
  // Favicon + Apple icon are generated from app/icon.tsx and app/apple-icon.tsx.
  // The share image itself comes from app/opengraph-image.tsx (added automatically).
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title,
    description: siteDescription,
    locale: "en_IN",
    firstName: "Ratul",
    lastName: "Kole",
  },
  twitter: {
    card: "summary_large_image",
    // Credits shares of this link on X to your account.
    creator: `@${profile.handles.x}`,
    site: `@${profile.handles.x}`,
    title,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffd23f" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

// Runs before first paint: applies the saved theme, else the device's setting — no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script may add the "dark" class before React loads.
    <html
      lang="en"
      className={`${archivoBlack.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* A plain inline script in <head> is the only option that runs before first paint
            (next/script "beforeInteractive" is queued until Next.js loads → white flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning on <body>: extensions (e.g. ColorZilla) add attributes to it. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
