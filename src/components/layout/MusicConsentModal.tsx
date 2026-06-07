"use client";

import { Modal } from "@/components/ui/Modal";
import { Music } from "lucide-react";

interface MusicConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function MusicConsentModal({
  isOpen,
  onAccept,
  onDecline,
}: MusicConsentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onDecline}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-pink text-3xl">
          🎵
        </div>
        <h2 className="font-display text-xl text-text">배경 음악 틀어볼까?</h2>
        <p className="font-body mt-2 text-base leading-relaxed text-text-light">
          더 귀여운 분위기를 위해
          <br />
          음악과 함께 봐주세요 💕
        </p>
        <div className="mt-6 flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="min-h-[48px] rounded-full bg-primary-pink px-6 py-3 font-body text-lg font-bold text-white"
          >
            음악 켜기 🎶
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="min-h-[44px] rounded-full border-2 border-sky-blue px-6 py-2 font-body text-base text-text-light"
          >
            괜찮아요
          </button>
        </div>
      </div>
    </Modal>
  );
}
