"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { registerGsapPlugins } from "@/lib/gsap";
import { partySlots } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function PartyPokemonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-party]"), {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="party">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Party" title="Party Members" />
        <div className="grid grid-cols-2 gap-3">
          {partySlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              data-party
              onClick={() => setActive(active === slot.id ? null : slot.id)}
              className="dex-card overflow-hidden p-0 text-left transition-transform active:scale-[0.98]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={slot.image}
                  alt={slot.nickname}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 45vw"
                  loading="lazy"
                />
                <span className="absolute left-2 top-2 rounded-md bg-poke-red px-2 py-0.5 text-xs font-bold text-white">
                  #{slot.slotNo}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-bold">{slot.nickname}</p>
                {active === slot.id && (
                  <p className="mt-1 text-xs text-text-light">{slot.story}</p>
                )}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-text-light">
          Tap a slot to view memory
        </p>
      </section>
    </SectionWrapper>
  );
}
