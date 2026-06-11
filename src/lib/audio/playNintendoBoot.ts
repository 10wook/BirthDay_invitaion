const SESSION_KEY = "nintendo_boot_session";

/** 닌텐도 부팅음 — AudioManager와 독립, 세션당 1회 */
export function playNintendoBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(SESSION_KEY) === "1") return false;

  sessionStorage.setItem(SESSION_KEY, "1");
  const audio = new Audio("/sfx/nintendo-boot.mp4");
  audio.volume = 0.7;

  void audio.play().catch(() => {
    sessionStorage.removeItem(SESSION_KEY);
  });

  return true;
}

export function initNintendoBootOnAccess(): () => void {
  playNintendoBoot();

  const onGesture = () => playNintendoBoot();
  window.addEventListener("pointerdown", onGesture, { once: true });
  return () => window.removeEventListener("pointerdown", onGesture);
}
