"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { registerGsapPlugins } from "@/lib/gsap";
import { storyItems } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll("[data-story-item]").forEach((item) => {
        const text = item.querySelector("[data-story-text]");
        const image = item.querySelector("[data-story-image]");

        gsap.from(text, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(image, {
          scale: 0.9,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="story">
      <section ref={sectionRef}>
        <SectionTitle subtitle="💌 Our Story" title="우리의 이야기" />

        <div className="flex flex-col gap-12">
          {storyItems.map((item) => (
            <div key={item.id} data-story-item className="flex flex-col gap-5">
              <p
                data-story-text
                className="font-accent text-center text-[22px] leading-snug text-text"
              >
                {item.text}
              </p>
              <div
                data-story-image
                className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-3xl border-2 border-secondary-pink shadow-[0_8px_24px_rgba(255,183,213,0.3)]"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 90vw, 320px"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
