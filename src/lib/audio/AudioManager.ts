import { DEFAULT_BGM_VOLUME, DEFAULT_SFX_VOLUME } from "./constants";
import { getPokemonCryFallbackUrl, getPokemonCryUrl } from "./pokemonCries";
import { SFX, type SfxKey, SFX_VOLUME } from "./sfxMap";

class AudioManager {
  private static instance: AudioManager;
  private unlocked = false;
  private bgmAudio: HTMLAudioElement | null = null;
  private sfxCache = new Map<string, HTMLAudioElement>();
  private activeSfxNodes: HTMLAudioElement[] = [];
  private activeSfxCount = 0;

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  unlock(): void {
    this.unlocked = true;
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  async preload(urls: string[]): Promise<void> {
    await Promise.all(
      urls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const audio = new Audio(url);
            audio.preload = "auto";
            audio.addEventListener("canplaythrough", () => resolve(), { once: true });
            audio.addEventListener("error", () => resolve(), { once: true });
            this.sfxCache.set(url, audio);
          }),
      ),
    );
  }

  stopAllSfx(): void {
    for (const node of this.activeSfxNodes) {
      node.pause();
    }
    this.activeSfxNodes = [];
    this.activeSfxCount = 0;
  }

  async playBgm(src: string, volume = DEFAULT_BGM_VOLUME): Promise<void> {
    if (!this.unlocked) return;

    this.stopAllSfx();

    if (!this.bgmAudio || this.bgmAudio.src !== this.resolveSrc(src)) {
      this.bgmAudio?.pause();
      this.bgmAudio = new Audio(src);
      this.bgmAudio.loop = true;
      this.bgmAudio.preload = "auto";
    }

    this.bgmAudio.volume = volume;

    try {
      await this.bgmAudio.play();
    } catch {
      // autoplay blocked
    }
  }

  pauseBgm(): void {
    this.bgmAudio?.pause();
  }

  setBgmVolume(volume: number): void {
    if (this.bgmAudio) {
      this.bgmAudio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  isBgmPlaying(): boolean {
    return Boolean(this.bgmAudio && !this.bgmAudio.paused);
  }

  playSfx(key: SfxKey): void {
    if (!this.unlocked) return;
    this.playUrl(SFX[key], SFX_VOLUME[key] ?? DEFAULT_SFX_VOLUME);
  }

  playCry(name: string, dexNo: number): void {
    if (!this.unlocked) return;
    this.playUrl(getPokemonCryUrl(name, dexNo), 0.55, getPokemonCryFallbackUrl(dexNo));
  }

  private playUrl(src: string, volume = DEFAULT_SFX_VOLUME, fallbackSrc?: string): void {
    if (!this.unlocked) return;

    this.stopAllSfx();

    const cached = this.sfxCache.get(src);
    const audio = cached ? (cached.cloneNode() as HTMLAudioElement) : new Audio(src);

    audio.volume = volume;
    this.activeSfxCount += 1;
    this.activeSfxNodes.push(audio);

    const cleanup = () => {
      this.activeSfxCount = Math.max(0, this.activeSfxCount - 1);
      this.activeSfxNodes = this.activeSfxNodes.filter((n) => n !== audio);
    };

    audio.addEventListener("ended", cleanup, { once: true });

    const tryFallback = () => {
      if (!fallbackSrc) {
        cleanup();
        return;
      }
      this.activeSfxCount = Math.max(0, this.activeSfxCount - 1);
      this.playUrl(fallbackSrc, volume);
    };

    audio.addEventListener("error", tryFallback, { once: true });

    void audio.play().catch(tryFallback);
  }

  muteAll(): void {
    this.pauseBgm();
  }

  private resolveSrc(src: string): string {
    if (typeof window === "undefined") return src;
    return new URL(src, window.location.origin).href;
  }
}

export const audioManager = AudioManager.getInstance();

export function getAllAudioUrls(bgmSrc: string): string[] {
  return [bgmSrc, ...Object.values(SFX)];
}
