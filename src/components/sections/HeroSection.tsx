"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { trainerConfig } from "@/config/trainer";
import { siteConfig } from "@/config/site";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.from(content.querySelectorAll("[data-hero]"), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const scrollToProfile = () => {
    document.getElementById("trainer-profile")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-[2] flex h-[100dvh] min-h-[640px] items-center justify-center px-4"
    >
      <div ref={contentRef} className="dex-screen mx-auto w-full max-w-[430px] p-6 text-center">
        <p data-hero className="text-xs font-bold uppercase tracking-widest text-poke-red">
          Pokédex Entry
        </p>
        <p data-hero className="mt-2 font-mono text-sm text-text-light">
          No.{trainerConfig.trainerNo}
        </p>
        <h1 data-hero className="font-display mt-3 text-3xl leading-tight text-text">
          {trainerConfig.name.toUpperCase()}
        </h1>
        <p data-hero className="mt-2 text-lg font-bold text-text">
          {siteConfig.partyTitle}
        </p>
        <p data-hero className="mt-1 text-base text-text-light">
          {trainerConfig.birthday}
        </p>
        <div data-hero className="mt-8">
          <Button variant="primary" size="lg" onClick={scrollToProfile}>
            ▶ Press Start
          </Button>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
