import { PokeballIcon } from "@/components/ui/PokeballIcon";
import { trainerConfig } from "@/config/trainer";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[40] border-b-[3px] border-dex-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-[430px] items-center gap-2.5 px-4">
        <PokeballIcon size={22} />
        <div className="min-w-0 flex-1">
          <p className="font-system truncate text-[8px] leading-none text-game-blue">
            포켓몬 도감 · No.{trainerConfig.trainerNo}
          </p>
          <p className="font-display truncate text-sm font-bold leading-tight">
            {trainerConfig.nameKo}
          </p>
        </div>
        <span className="font-system shrink-0 rounded border-2 border-dex-border bg-primary-yellow px-1.5 py-0.5 text-[7px] text-poke-red shadow-[1px_1px_0_#383838]">
          Lv.{trainerConfig.level}
        </span>
      </div>
    </header>
  );
}
