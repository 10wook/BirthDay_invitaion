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

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    registerGsapPlugins();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-gallery-swiper]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <SectionWrapper id="gallery">
      <section ref={sectionRef}>
        <SectionTitle subtitle="📸 Memories" title="추억 갤러리" />

        <div data-gallery-swiper>
          {!mounted ? (
            <div className="aspect-[4/5] animate-pulse rounded-3xl bg-secondary-pink/40" />
          ) : (
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              slidesPerView={1.15}
              spaceBetween={16}
              centeredSlides
              loop
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="gallery-swiper !pb-10"
            >
              {galleryImages.map((image) => (
                <SwiperSlide key={image.src}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-white shadow-[0_8px_24px_rgba(255,183,213,0.35)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 430px) 85vw, 360px"
                      loading="lazy"
                    />
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
