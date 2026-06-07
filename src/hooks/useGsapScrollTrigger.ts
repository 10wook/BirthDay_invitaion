"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/gsap";

export function useGsapScrollTrigger<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: DependencyList = [],
): RefObject<T | null> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    registerGsapPlugins();
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      callback(ctx);
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
