"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { closingMessage } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.from(section.querySelectorAll("[data-closing-deco]"), {
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.5,
        ease: "back.out(1.7)",
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
    <SectionWrapper id="closing" fullHeight className="flex items-center pb-24">
      <section
        ref={sectionRef}
        className="relative flex min-h-[50vh] flex-col items-center justify-center py-16 text-center"
      >
        <div className="mb-6 flex gap-3">
          {["💕", "✨", "🎀", "✨", "💕"].map((emoji, i) => (
            <span
              key={i}
              data-closing-deco
              className="text-2xl animate-heart"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <h2
          ref={textRef}
          className="font-accent text-[28px] leading-snug text-text"
        >
          {closingMessage}
        </h2>

        <p
          data-closing-deco
          className="font-body mt-6 text-base text-text-light"
        >
          See you soon 🎂
        </p>

        <span
          data-closing-deco
          className="mt-8 text-4xl animate-float"
        >
          🎈
        </span>
      </section>
    </SectionWrapper>
  );
}
