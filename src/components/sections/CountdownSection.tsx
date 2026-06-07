"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CountdownSkeleton } from "./CountdownDisplay";

const CountdownDisplay = dynamic(
  () =>
    import("./CountdownDisplay").then((mod) => mod.CountdownDisplay),
  { ssr: false, loading: () => <CountdownSkeleton /> },
);

export function CountdownSection() {
  return (
    <SectionWrapper id="countdown" className="bg-cream/5">
      <section>
        <SectionTitle subtitle="Countdown" title="D-Day" />
        <CountdownDisplay />
        <p className="mt-10 text-center text-sm text-warm-gray">
          {siteConfig.eventDateDisplay} · {siteConfig.eventTime}
        </p>
      </section>
    </SectionWrapper>
  );
}
