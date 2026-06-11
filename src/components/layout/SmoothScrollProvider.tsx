"use client";

import { useEffect, useState } from "react";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { useAudio } from "@/components/audio/useAudio";
import { initNintendoBootOnAccess } from "@/lib/audio/playNintendoBoot";
import { FloatingMusicButton } from "./FloatingMusicButton";
import { MusicConsentModal } from "./MusicConsentModal";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function AudioUI({ children }: { children: React.ReactNode }) {
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
  const [pokedexReady, setPokedexReady] = useState(false);

  useEffect(() => initNintendoBootOnAccess(), []);

  useEffect(() => {
    if (sessionStorage.getItem("pokedex_loaded") === "1") {
      setPokedexReady(true);
      return;
    }
    const onReady = () => setPokedexReady(true);
    window.addEventListener("pokedex-ready", onReady);
    return () => window.removeEventListener("pokedex-ready", onReady);
  }, []);

  useEffect(() => {
    if (!pokedexReady || hasConsented) return;
    const consent = sessionStorage.getItem("audio_consent");
    if (consent) return;
    const timer = setTimeout(() => setShowModal(true), 800);
    return () => clearTimeout(timer);
  }, [pokedexReady, hasConsented]);

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
    <LenisProvider>
      <AudioProvider>
        <AudioUI>{children}</AudioUI>
      </AudioProvider>
    </LenisProvider>
  );
}
