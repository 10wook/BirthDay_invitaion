"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

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
        <h2 className="font-display mt-3 text-xl font-bold text-text">Adventure BGM?</h2>
        <p className="mt-2 text-sm text-text-light">배경음악을 켜면 더 몰입감 있게 즐길 수 있어요</p>
        <div className="mt-5 flex flex-col gap-2">
          <Button variant="secondary" size="lg" sfx="none" onClick={onAccept}>
            Music ON
          </Button>
          <Button variant="ghost" size="lg" sfx="none" onClick={onDecline}>
            No thanks
          </Button>
        </div>
      </div>
    </Modal>
  );
}
