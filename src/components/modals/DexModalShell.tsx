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
    <Modal isOpen={isOpen} onClose={onClose} className="max-h-[85vh] overflow-y-auto p-0">
      <div className="border-b-2 border-dex-border bg-sky-blue/30 px-5 py-4">
        {subtitle && <p className="font-system text-poke-red">{subtitle}</p>}
        <h3 className="font-display mt-1 text-xl text-text">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
      <div className="border-t-2 border-dex-border px-5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="font-system w-full min-h-[44px] rounded-xl border-2 border-dex-border bg-primary-yellow font-bold text-text"
        >
          CLOSE
        </button>
      </div>
    </Modal>
  );
}
