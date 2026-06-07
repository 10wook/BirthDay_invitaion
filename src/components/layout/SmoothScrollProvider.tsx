"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { useAudio } from "@/components/audio/useAudio";
import { FloatingMusicButton } from "./FloatingMusicButton";
import { MusicConsentModal } from "./MusicConsentModal";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function AudioUI({ children }: { children: React.ReactNode }) {
  useLenis();
  const {
    isPlaying,
    isReady,
    bgmVolume,
    hasConsented,
    toggleBgm,
    setBgmVolume,
    setConsented,
  } = useAudio();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (hasConsented) return;
    const consent = sessionStorage.getItem("audio_consent");
    if (consent) return;
    const timer = setTimeout(() => setShowModal(true), 800);
    return () => clearTimeout(timer);
  }, [hasConsented]);

  const handleAccept = () => {
    setShowModal(false);
    setConsented(true);
  };

  const handleDecline = () => {
    setShowModal(false);
    setConsented(false);
  };

  return (
    <>
      {children}
      {hasConsented && isReady && (
        <FloatingMusicButton
          isPlaying={isPlaying}
          volume={bgmVolume}
          onToggle={toggleBgm}
          onVolumeChange={setBgmVolume}
        />
      )}
      <MusicConsentModal
        isOpen={showModal && !hasConsented}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <AudioProvider>
      <AudioUI>{children}</AudioUI>
    </AudioProvider>
  );
}
