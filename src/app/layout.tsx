import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.hostName}의 ${siteConfig.partyTitle}`,
  description: `${siteConfig.hostName}의 생일 파티에 초대합니다. ${siteConfig.eventDateDisplay}`,
  openGraph: {
    title: `${siteConfig.hostName}의 ${siteConfig.partyTitle}`,
    description: "특별한 날, 함께해 주세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${notoSans.variable}`}>
      <body className="noise-overlay min-h-screen bg-charcoal text-ivory antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
