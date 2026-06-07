import type { Metadata, Viewport } from "next";
import { Bagel_Fat_One, Gaegu, Hi_Melody } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { FloatingDecorations } from "@/components/decorations/FloatingDecorations";
import { getSiteUrl, siteConfig } from "@/config/site";
import "./globals.css";

const bagel = Bagel_Fat_One({
  variable: "--font-bagel",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const hiMelody = Hi_Melody({
  variable: "--font-hi-melody",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${siteConfig.hostName}의 ${siteConfig.partyTitle}`,
  description: `${siteConfig.hostName}의 생일 파티에 초대합니다 💕 ${siteConfig.eventDateDisplay}`,
  openGraph: {
    title: `${siteConfig.hostName}의 ${siteConfig.partyTitle}`,
    description: "특별한 날, 함께해 주세요 💕",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFB7D5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${bagel.variable} ${gaegu.variable} ${hiMelody.variable}`}
    >
      <body className="min-h-screen antialiased">
        <FloatingDecorations />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
