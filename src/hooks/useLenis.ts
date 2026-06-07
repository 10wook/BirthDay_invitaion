"use client";

import { useLenisInstance } from "@/components/layout/LenisProvider";

/** @deprecated use LenisProvider + useLenisInstance */
export function useLenis() {
  useLenisInstance();
}

export { useLenisInstance, LenisProvider } from "@/components/layout/LenisProvider";
