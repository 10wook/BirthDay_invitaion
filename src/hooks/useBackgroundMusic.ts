"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useBackgroundMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    const handleError = () => setIsReady(false);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      void play();
    }
  }, [isPlaying, pause, play]);

  return { isPlaying, isReady, play, pause, toggle };
}
