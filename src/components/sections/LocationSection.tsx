"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, Navigation } from "lucide-react";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

const mapLinks = [
  { label: "카카오맵", href: siteConfig.kakaoMapUrl },
  { label: "네이버지도", href: siteConfig.naverMapUrl },
  { label: "구글맵", href: siteConfig.googleMapUrl },
];

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-location-animate]"), {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="location">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Location" title="오시는 길" />

        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div data-location-animate className="flex-1">
            <div className="mb-6 flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-gold" size={20} />
              <div>
                <h3 className="font-serif text-2xl text-ivory">
                  {siteConfig.venueName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                  {siteConfig.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {mapLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="secondary"
                  size="sm"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center gap-2">
                    <Navigation size={14} />
                    {link.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div
            data-location-animate
            className="relative aspect-[4/3] flex-1 overflow-hidden rounded-sm bg-beige/10"
          >
            {siteConfig.mapEmbedUrl ? (
              <iframe
                src={siteConfig.mapEmbedUrl}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="지도"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <MapPin size={32} className="text-gold/50" />
                <p className="text-sm text-warm-gray">
                  site.ts의 mapEmbedUrl에
                  <br />
                  지도 embed URL을 추가하세요
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
