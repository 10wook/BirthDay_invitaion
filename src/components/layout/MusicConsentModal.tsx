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
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
          <Music className="text-gold" size={28} />
        </div>
        <h2 className="font-serif text-2xl text-ivory md:text-3xl">
          배경 음악을 재생할까요?
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-warm-gray">
          더욱 특별한 초대 경험을 위해
          <br />
          배경 음악과 함께 감상해 주세요.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 rounded-full bg-gold px-6 py-3 text-sm font-medium tracking-wide text-charcoal transition hover:bg-gold-light"
          >
            음악 켜기
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="flex-1 rounded-full border border-warm-gray/40 px-6 py-3 text-sm tracking-wide text-warm-gray transition hover:border-gold/40 hover:text-ivory"
          >
            괜찮아요
          </button>
        </div>
      </div>
    </Modal>
  );
}
