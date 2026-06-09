"use client";

import { useAudio } from "@/components/audio/useAudio";
import { Modal } from "@/components/ui/Modal";

interface MusicConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function MusicConsentModal({ isOpen, onAccept, onDecline }: MusicConsentModalProps) {
  const { playSfx, unlock } = useAudio();

  const handleAccept = () => {
    unlock();
    playSfx("CONFIRM");
    onAccept();
  };

  const handleDecline = () => {
    unlock();
    playSfx("CLICK");
    onDecline();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleDecline}>
      <div className="text-center">
        <p className="text-3xl">🎵</p>
        <h2 className="font-display mt-3 text-xl text-text">배경음악 재생?</h2>
        <p className="mt-2 text-sm text-text-light">음악을 켜면 더 생생한 모험을 즐길 수 있어요</p>
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={handleAccept} className="min-h-[48px] rounded-xl border-2 border-dex-border bg-poke-red font-bold text-white shadow-[2px_2px_0_#4B4B4B]">
            음악 켜기
          </button>
          <button type="button" onClick={handleDecline} className="min-h-[44px] rounded-xl border-2 border-dex-border bg-white font-bold text-text-light">
            괜찮아요
          </button>
        </div>
      </div>
    </Modal>
  );
}
