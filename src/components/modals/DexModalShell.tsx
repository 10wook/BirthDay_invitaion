"use client";

import { Modal } from "@/components/ui/Modal";

interface DexModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DexModalShell({ isOpen, onClose, title, subtitle, children }: DexModalShellProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0">
      <div className="game-window border-0 border-b-[3px] border-dex-border bg-[#C8F0C0] px-5 py-4 shadow-none">
        {subtitle && <p className="font-system text-[8px] text-poke-red">{subtitle}</p>}
        <h3 className="font-display mt-1 text-xl text-text">{title}</h3>
      </div>
      <div
        className="modal-scroll overflow-y-auto overscroll-contain bg-cream p-5"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <div className="border-t-[3px] border-dex-border bg-cream px-5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="font-system w-full min-h-[48px] rounded-md border-[3px] border-dex-border bg-primary-yellow text-text shadow-[inset_0_0_0_2px_#fff,inset_0_0_0_4px_#383838,3px_3px_0_#383838]"
        >
          ▶ CLOSE
        </button>
      </div>
    </Modal>
  );
}
