# Component Structure

| Section | Component | Data |
|---------|-----------|------|
| Loading | PokedexLoadingScreen | trainerConfig |
| Hero | HeroSection | trainerNo, name |
| Profile | TrainerProfileSection | stats, HP/EXP bars |
| Log | AdventureLogSection | adventureLog[] |
| Badges | MemoryBadgesSection | badges[] |
| Party | PartyPokemonSection | partySlots[6] |
| Photos | PhotoDexSection | galleryImages |
| Video | VideoMemorySection | memoryVideoSrc |
| Level Up | NextLevelUpSection | countdown + EXP |
| Location | LocationSection | maps |
| RSVP | JoinAdventureSection | form URLs |
| Ending | EndingSection | closing message |

## Shared UI
- `DexCard` — rounded game panel with border
- `StatBar` — HP/EXP progress bars
- `SectionTitle` — dex header style
