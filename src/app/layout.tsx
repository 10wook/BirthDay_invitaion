import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { getSiteUrl, siteConfig } from "@/config/site";
import { trainerConfig } from "@/config/trainer";
import "./globals.css";

const bagel = Bagel_Fat_One({
  variable: "--font-bagel",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `Trainer ${trainerConfig.name} — Pokédex Entry`,
  description: `Trainer No.${trainerConfig.trainerNo} ${trainerConfig.nameKo}의 Birthday Adventure`,
  openGraph: {
    title: `Trainer ${trainerConfig.name} — Birthday Adventure`,
    description: "Press Start to join the adventure!",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFE37A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={bagel.variable}>
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
