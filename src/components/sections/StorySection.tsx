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
      const items = section.querySelectorAll("[data-story-item]");

      items.forEach((item) => {
        const text = item.querySelector("[data-story-text]");
        const image = item.querySelector("[data-story-image]");

        gsap.from(text, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(image, {
          scale: 1.15,
          opacity: 0,
          clipPath: "inset(100% 0 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="story" className="bg-cream/5">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Our Story" title="함께한 이야기" />

        <div className="flex flex-col gap-24 md:gap-32">
          {storyItems.map((item, index) => (
            <div
              key={item.id}
              data-story-item
              className={`flex flex-col items-center gap-10 md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div
                data-story-text
                className="flex-1 text-center md:text-left"
              >
                <p className="font-serif text-3xl leading-snug text-ivory md:text-4xl lg:text-5xl">
                  {item.text}
                </p>
              </div>
              <div
                data-story-image
                className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
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
