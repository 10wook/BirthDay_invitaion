"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { siteConfig } from "@/config/site";
import { FloatingMusicButton } from "./FloatingMusicButton";
import { MusicConsentModal } from "./MusicConsentModal";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useLenis();
  const { isPlaying, isReady, play, pause, toggle } = useBackgroundMusic(
    siteConfig.musicSrc,
  );
  const [showModal, setShowModal] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setShowModal(false);
    setHasDecided(true);
    if (isReady) void play();
  };

  const handleDecline = () => {
    setShowModal(false);
    setHasDecided(true);
    pause();
  };

  return (
    <>
      {children}
      {hasDecided && isReady && (
        <FloatingMusicButton isPlaying={isPlaying} onToggle={toggle} />
      )}
      <MusicConsentModal
        isOpen={showModal && !hasDecided}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}
