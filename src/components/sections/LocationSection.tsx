"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin } from "lucide-react";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { DexCard } from "@/components/ui/DexCard";

const maps = [
  { label: "카카오맵", href: siteConfig.kakaoMapUrl },
  { label: "네이버 지도", href: siteConfig.naverMapUrl },
  { label: "구글 지도", href: siteConfig.googleMapUrl },
];

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-loc]"), {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="location">
      <section ref={sectionRef}>
        <SectionTitle subtitle="지도" title="장소 안내" />
        <DexCard data-loc>
          <div className="flex gap-3">
            <MapPin className="shrink-0 text-poke-red" size={20} />
            <div>
              <p className="font-bold">{siteConfig.venueName}</p>
              <p className="mt-1 text-sm text-text-light">{siteConfig.address}</p>
            </div>
          </div>
        </DexCard>
        <div className="mt-3 flex flex-col gap-2">
          {maps.map((m) => (
            <Button key={m.label} variant="secondary" size="lg" href={m.href} target="_blank" rel="noopener noreferrer">
              {m.label}
            </Button>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
