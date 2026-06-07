"use client";

import { useEffect, useState } from "react";
import type { CountdownValues } from "@/types";

const PLACEHOLDER: CountdownValues = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPast: false,
};

function calculateCountdown(targetDate: Date): CountdownValues {
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

export function useCountdown(targetDateString: string): CountdownValues {
  const [values, setValues] = useState<CountdownValues>(PLACEHOLDER);

  useEffect(() => {
    const target = new Date(targetDateString);
    const tick = () => setValues(calculateCountdown(target));

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  return values;
}
