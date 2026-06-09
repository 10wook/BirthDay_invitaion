"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { trainerConfig } from "@/config/trainer";
import { PokedexLoadingScreen } from "@/components/sections/PokedexLoadingScreen";
import { BirthdayInviteSection } from "@/components/sections/BirthdayInviteSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PokeballDecorations } from "@/components/decorations/PokeballDecorations";
import { LegendaryDuelBackground } from "@/components/decorations/LegendaryDuelBackground";

const TrainerProfileSection = dynamic(() =>
  import("@/components/sections/TrainerProfileSection").then((m) => m.TrainerProfileSection),
);
const MemoryBadgesSection = dynamic(() =>
  import("@/components/sections/MemoryBadgesSection").then((m) => m.MemoryBadgesSection),
);
const PartyPokemonSection = dynamic(() =>
  import("@/components/sections/PartyPokemonSection").then((m) => m.PartyPokemonSection),
);
const AdventureLogSection = dynamic(() =>
  import("@/components/sections/AdventureLogSection").then((m) => m.AdventureLogSection),
);
const PhotoDexSection = dynamic(
  () => import("@/components/sections/PhotoDexSection").then((m) => m.PhotoDexSection),
  { ssr: false },
);
const VideoMemorySection = dynamic(() =>
  import("@/components/sections/VideoMemorySection").then((m) => m.VideoMemorySection),
);
const NextLevelUpSection = dynamic(
  () => import("@/components/sections/NextLevelUpSection").then((m) => m.NextLevelUpSection),
  { ssr: false },
);
const LocationSection = dynamic(() =>
  import("@/components/sections/LocationSection").then((m) => m.LocationSection),
);
const JoinAdventureSection = dynamic(() =>
  import("@/components/sections/JoinAdventureSection").then((m) => m.JoinAdventureSection),
);
const EndingSection = dynamic(() =>
  import("@/components/sections/EndingSection").then((m) => m.EndingSection),
);

export function InvitationPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("pokedex_loaded") === "1") {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <LegendaryDuelBackground />
      <PokeballDecorations />
      {loading && <PokedexLoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <SiteHeader />
          <main className="relative z-[2] mx-auto max-w-[430px] pt-11">
          <BirthdayInviteSection />
          <HeroSection />
          <TrainerProfileSection />
          <MemoryBadgesSection />
          <PartyPokemonSection />
          <AdventureLogSection />
          <PhotoDexSection />
          <VideoMemorySection />
          <NextLevelUpSection />
          <LocationSection />
          <JoinAdventureSection />
          <EndingSection />
        </main>
        </>
      )}
    </>
  );
}
