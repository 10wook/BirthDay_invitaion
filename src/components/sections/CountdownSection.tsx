"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CountdownSkeleton } from "./CountdownDisplay";

const CountdownDisplay = dynamic(
  () => import("./CountdownDisplay").then((mod) => mod.CountdownDisplay),
  { ssr: false, loading: () => <CountdownSkeleton /> },
);

export function CountdownSection() {
  return (
    <SectionWrapper id="countdown">
      <section>
        <SectionTitle subtitle="⏳ D-Day" title="생일까지" />
        <CountdownDisplay />
        <p className="font-body mt-8 text-center text-base text-text-light">
          {siteConfig.eventDateDisplay} · {siteConfig.eventTime}
        </p>
      </section>
    </SectionWrapper>
  );
}
