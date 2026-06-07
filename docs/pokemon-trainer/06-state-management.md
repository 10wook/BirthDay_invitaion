# State Management

| State | Location | Notes |
|-------|----------|-------|
| Loading complete | InvitationPage useState | Shows once per session |
| Music playing | useBackgroundMusic | global |
| Countdown | useCountdown client-only | hydration safe |
| Party card expand | PartyPokemonSection local | optional tap |

No global store needed — React local state + config files.
