import type { Metadata, Viewport } from "next";
import { Fredoka, Press_Start_2P } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { getSiteUrl, siteConfig } from "@/config/site";
import { trainerConfig } from "@/config/trainer";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `Trainer ${trainerConfig.name} — Pokédex Entry`,
  description: `Trainer No.${trainerConfig.trainerNo} ${trainerConfig.nameKo}의 Birthday Adventure`,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: `Trainer ${trainerConfig.name} — Birthday Adventure`,
    description: "Press Start to join the adventure!",
    type: "website",
    locale: "ko_KR",
    siteName: "Pokédex Birthday Invitation",
    url: getSiteUrl(),
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${trainerConfig.nameKo} Birthday Adventure`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Trainer ${trainerConfig.name} — Birthday Adventure`,
    description: "Press Start to join the adventure!",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFCB05",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${fredoka.variable} ${pressStart.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
