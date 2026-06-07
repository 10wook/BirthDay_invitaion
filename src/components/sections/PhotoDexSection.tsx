"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { registerGsapPlugins } from "@/lib/gsap";
import { galleryImages } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export function PhotoDexSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-photo-dex]", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: { trigger: section, start: "top 80%" },
      });
    }, section);
    return () => ctx.revert();
  }, [mounted]);

  return (
    <SectionWrapper id="photo-dex">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Gallery" title="Photo Dex" />
        <div data-photo-dex>
          {!mounted ? (
            <div className="aspect-[4/5] animate-pulse rounded-xl bg-primary-yellow/30" />
          ) : (
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              slidesPerView={1.1}
              centeredSlides
              loop
              spaceBetween={12}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="gallery-swiper !pb-10"
            >
              {galleryImages.map((img) => (
                <SwiperSlide key={img.src}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-dex-border">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="85vw" loading="lazy" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </SectionWrapper>
  );
}
