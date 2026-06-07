"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";
import { closingMessage } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

export function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const section = sectionRef.current;
    const text = textRef.current;
    const canvas = canvasRef.current;
    if (!section || !text || !canvas) return;

    // Particle effect
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const count = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 98, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    const gsapCtx = gsap.context(() => {
      gsap.fromTo(
        text,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.from(section.querySelector("[data-closing-sub]"), {
        opacity: 0,
        y: 20,
        delay: 1.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => {
      gsapCtx.revert();
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <SectionWrapper id="closing" fullHeight className="flex items-center">
      <section
        ref={sectionRef}
        className="relative flex min-h-[70vh] flex-col items-center justify-center py-20"
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <h2
          ref={textRef}
          className="relative z-10 text-center font-serif text-4xl leading-snug text-ivory md:text-6xl lg:text-7xl"
        >
          {closingMessage}
        </h2>

        <p
          data-closing-sub
          className="relative z-10 mt-8 text-sm tracking-[0.3em] text-gold uppercase"
        >
          With Love
        </p>
      </section>
    </SectionWrapper>
  );
}
