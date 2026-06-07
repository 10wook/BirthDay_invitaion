"use client";

import { Modal } from "@/components/ui/Modal";

interface MusicConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function MusicConsentModal({ isOpen, onAccept, onDecline }: MusicConsentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onDecline}>
      <div className="text-center">
        <p className="text-3xl">🎵</p>
        <h2 className="font-display mt-3 text-xl text-text">Adventure BGM?</h2>
        <p className="mt-2 text-sm text-text-light">Play background music for the full experience</p>
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={onAccept} className="min-h-[48px] rounded-xl border-2 border-dex-border bg-poke-red font-bold text-white shadow-[2px_2px_0_#4B4B4B]">
            Music ON
          </button>
          <button type="button" onClick={onDecline} className="min-h-[44px] rounded-xl border-2 border-dex-border bg-white font-bold text-text-light">
            No thanks
          </button>
        </div>
      </div>
    </Modal>
  );
}
