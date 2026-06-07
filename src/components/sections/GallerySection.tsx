"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { registerGsapPlugins } from "@/lib/gsap";
import { galleryImages } from "@/config/content";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionTitle } from "@/components/ui/SectionTitle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
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
      gsap.from(section.querySelector("[data-gallery-swiper]"), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <SectionWrapper id="gallery">
      <section ref={sectionRef}>
        <SectionTitle subtitle="Memories" title="추억 갤러리" />

        <div data-gallery-swiper className="relative px-2 md:px-8">
          {!mounted ? (
            <div className="flex h-[400px] items-center justify-center text-warm-gray">
              ...
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              slidesPerView={1.2}
              spaceBetween={20}
              centeredSlides
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              effect="fade"
              fadeEffect={{ crossFade: true }}
              breakpoints={{
                768: { slidesPerView: 2.2, spaceBetween: 30 },
                1024: { slidesPerView: 2.5, spaceBetween: 40 },
              }}
              className="gallery-swiper !pb-14"
            >
              {galleryImages.map((image) => (
                <SwiperSlide key={image.src}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.02]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, 400px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/10" />
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
