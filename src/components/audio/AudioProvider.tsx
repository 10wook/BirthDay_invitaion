"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/config/site";
import { audioManager, getAllAudioUrls } from "@/lib/audio/AudioManager";
import { DEFAULT_BGM_VOLUME } from "@/lib/audio/constants";
import type { SfxKey } from "@/lib/audio/sfxMap";

interface AudioContextValue {
  isPlaying: boolean;
  isReady: boolean;
  bgmVolume: number;
  sfxEnabled: boolean;
  hasConsented: boolean;
  playBgm: () => Promise<void>;
  pauseBgm: () => void;
  toggleBgm: () => void;
  setBgmVolume: (v: number) => void;
  playSfx: (key: SfxKey) => void;
  playCry: (name: string, dexNo: number) => void;
  unlock: () => void;
  setConsented: (accepted: boolean) => void;
}

export const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasConsented, setHasConsentedState] = useState(false);
  const [bgmVolume, setBgmVolumeState] = useState(DEFAULT_BGM_VOLUME);
  const [sfxEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("bgm_volume");
    if (stored) {
      const v = parseFloat(stored);
      if (!Number.isNaN(v)) setBgmVolumeState(v);
    }
    const consent = sessionStorage.getItem("audio_consent");
    if (consent === "accepted" || consent === "declined") {
      setHasConsentedState(true);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const urls = getAllAudioUrls(siteConfig.musicSrc);
    void audioManager.preload(urls).then(() => {
      if (mounted) setIsReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const unlock = useCallback(() => {
    audioManager.unlock();
  }, []);

  const playBgm = useCallback(async () => {
    audioManager.unlock();
    await audioManager.playBgm(siteConfig.musicSrc, bgmVolume);
    setIsPlaying(audioManager.isBgmPlaying());
  }, [bgmVolume]);

  const pauseBgm = useCallback(() => {
    audioManager.pauseBgm();
    setIsPlaying(false);
  }, []);

  const toggleBgm = useCallback(() => {
    if (audioManager.isBgmPlaying()) {
      pauseBgm();
    } else {
      void playBgm();
    }
  }, [pauseBgm, playBgm]);

  const setBgmVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setBgmVolumeState(clamped);
    audioManager.setBgmVolume(clamped);
    localStorage.setItem("bgm_volume", String(clamped));
  }, []);

  const playSfx = useCallback(
    (key: SfxKey) => {
      if (!sfxEnabled) return;
      audioManager.unlock();
      audioManager.playSfx(key);
    },
    [sfxEnabled],
  );

  const playCry = useCallback(
    (name: string, dexNo: number) => {
      if (!sfxEnabled) return;
      audioManager.unlock();
      audioManager.playCry(name, dexNo);
    },
    [sfxEnabled],
  );

  const setConsented = useCallback(
    (accepted: boolean) => {
      setHasConsentedState(true);
      sessionStorage.setItem("audio_consent", accepted ? "accepted" : "declined");
      if (accepted) {
        void playBgm();
      } else {
        pauseBgm();
      }
    },
    [pauseBgm, playBgm],
  );

  const value = useMemo(
    () => ({
      isPlaying,
      isReady,
      bgmVolume,
      sfxEnabled,
      hasConsented,
      playBgm,
      pauseBgm,
      toggleBgm,
      setBgmVolume,
      playSfx,
      playCry,
      unlock,
      setConsented,
    }),
    [
      isPlaying,
      isReady,
      bgmVolume,
      sfxEnabled,
      hasConsented,
      playBgm,
      pauseBgm,
      toggleBgm,
      setBgmVolume,
      playSfx,
      playCry,
      unlock,
      setConsented,
    ],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}
