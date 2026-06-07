"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin } from "lucide-react";
import { registerGsapPlugins } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

const mapLinks = [
  { label: "카카오맵 🗺", href: siteConfig.kakaoMapUrl },
  { label: "네이버지도 📍", href: siteConfig.naverMapUrl },
  { label: "구글맵 🌍", href: siteConfig.googleMapUrl },
];

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-location-animate]"), {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="location">
      <section ref={sectionRef}>
        <SectionTitle subtitle="📍 Location" title="오시는 길" />

        <div data-location-animate className="cute-card p-5">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 shrink-0 text-primary-pink" size={20} />
            <div>
              <h3 className="font-accent text-xl text-text">
                {siteConfig.venueName}
              </h3>
              <p className="font-body mt-1 text-base leading-relaxed text-text-light">
                {siteConfig.address}
              </p>
            </div>
          </div>
        </div>

        <div
          data-location-animate
          className="mt-4 flex flex-col gap-3"
        >
          {mapLinks.map((link) => (
            <Button
              key={link.label}
              variant="secondary"
              size="lg"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Button>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
