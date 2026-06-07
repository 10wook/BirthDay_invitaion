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
      <div className="border-b border-[#E5E7EB] bg-[#FFCB05]/15 px-5 py-4">
        {subtitle && <span className="promo-label text-[10px]">{subtitle}</span>}
        <h3 className="font-display mt-2 text-xl font-bold text-text">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
      <div className="border-t border-[#E5E7EB] px-5 py-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] rounded-full bg-[#FFCB05] text-sm font-bold text-[#222] shadow-sm"
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}
