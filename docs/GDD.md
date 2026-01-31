# The Omega Reach: Tactile universe explorer
Reach beyond the end of time in this submission to Games for Blind Gamers 5.

## Features
- Multisensory exploration of cosmic and musical objects
- Procedurally-generated galaxies, stars, planets, and moons to explore
- Procedurally-generated instruments to collect and play
- A rewards system for exploring, collecting, and playing instruments

## Development timeline
- Weekend 1: Foundation
  - Basic application, settings, controls, user interface, etc.
  - Room manager / navigation / state
  - Reach manager / navigation / state
  - Inspection mechanic and haptics
  - Scan mechanic and haptics
  - Instrument system
  - Tutorial sequence + tutorial galaxy/star/instrument
- Week 1: Core game loop
  - Galaxy generation / discovery system / state
  - Solar system generation / discovery system / state
  - Instrument generation
  - Quirk and instrument discovery
  - Toasts
- Weekend 2: Basic audio
  - Gallery footsteps
  - Reach drone, on/off/program transitions
  - Inspection hot/cold cue
  - Scan/appraise progress bars
  - Scan/appraise/inspect success cue
  - Deep field / galaxy inspection synth (musical against Reach hum)
- Week 2: Music
  - Instrument audio
  - Instrument haptics
  - Star audio (generate chord system and fade/filter out as exploring planets and moons)
  - Star/planet/star inspection synth (musical against chord)
- Weekend 3: Basic graphics
  - Program manager
  - Placeholder programs for each object type
  - Reusable particle system
  - Particle systems for all tutorial objects
  - Generic systems for everything else
- Week 3: Stellar object particle systems (go wild)
- Weekend 4: Stretch goal - Shop implementation
  - Currency system and exploration income
  - Instrument appraisal
  - Instrument level ups
  - Shop screen
  - Instrument generation for shop
- Week 4: Polish
- Weekend 5: Polish

## Map
Current room is a state machine, navigated with directional buttons

     ◀ (Moons) ▶
    ◀ (Planets) ▶
     ◀ (Stars) ▶
    ◀ (Galaxies) ▶
     (Deep Field)
        Reach
Lobby  Atrium  Shop
  ◀ (Instruments) ▶

### Atrium
- The central hub
- Bulletin board with messages like: 2 new (unappraised) instruments, 1 new item in shop, 2 new visitors
- Footsteps sounds with reverb when entering/exiting this room

### Gallery
> MVP: No appraisal or quirks, just free play

- Browse and play instruments, sorted by newest first
- Instruments must be appraised (scanned) before playing
- When appraised, assigned a rarity and condition, and 0-3 undiscovered quirks
- Playing the instrument for 1,3,5 minutes discovers a quirk
- Rarest, best condition, with 3 discovered quirks sells for most at shop

### Shop
> MVP: Closed for season (not implemented)

- Buy randomly-generated unappraised instruments (so you can possibly turn profits)
- Sell appraised instruments (do not need to be fully upgraded)
- Currency
  - Start with 100 credits
  - Equivalent to Common + Mint Condition + 0 quirks
  - Gain 1 per star/planet/moon scan/quirk/instrument

### Lobby
> MVP: Closed to visitors (not implemented)

- Randomly generated visitors with different "quests"
  - Conversation (musings, feedback on museum, here for a specific instrument, etc.)
  - Trades (e.g. a random instrument for Artifact Q3Y4)
  - Accusal of theft (choice: give away for free or charge full price)
  - Play an instrument (I want to hear a song from galaxy XYZ)
  - Find a new instrument from already discovered galaxy

### Reach
- Inspect to turn on and off (clickity-clack sounds)
- When on, it produces a hum/buzz that reacts to program changes (e.g. get softer at each zoom level, attack/decay on program transitions)
- An internal state manager for handling up/down/left/right navigation and program changes
- When deep field is used, it adds a new galaxy to galaxies and goes to it
- When galaxy is used, it adds a new star to that galaxy and goes to it

## Settings
- Main volume (default max)
- Vibration strength (default max)
- Input preference (default dual analog stick)
- Hold confirm to interact (default true)

## Tutorial
- Load conservatory
- Text: you wake from your nap at the conservatory, must have been quadrillions of years, no visitors this time, and then you remember your purpose as the curator
- Text: need to activate the omega reach, the console has (a grid of buttons, a trackball, joysticks and triggers - this choice should set the input preference), need to find the right spot, or confirm to skip
- Text: the omega reach stirs back to life, ready to support your objective, its humming filling you with memories of
- Load intergalactic map
- Text: with it you reach into the black, pulling closer the edge of time, you must interact to reach deeper, or hold confirm to skip
- Load galactic map
- Text: you reach into {{galaxy}}, revealing its worlds at edge of time, interact to reach deeper, or confirm to skip
- Load star
- Text: you reach into {{star}}, confirm to scan, found a planet, navigate down to continue
- Load planet
- Text: you calibrate it to {{planet}}, scan it to continue, quirk and a moon detected, explain quirks, navigate right to continue
- Load moon
- Text: you calibrate it to {{moon}} scan to continue, instrument detected, interact to continue
- Text: instrument found, you year to play it, navigate to the conservatory to do that
- When entering galaxy map next time: you may interact with the galaxy to reach new stars
- When entering intergalactic map next time: you may interact with the deep field to reach new galaxies
- When entering home next time: you may inspect your recovered instruments from here

## Brainstorming
### Instrument quirks
- Highly popular
- Famous autograph
- Forbidden
- Replica
- (Epic / Mythical / Religious / Political / Cultural / Fictional) lore
- (Ancient / Classical / Retro / Modern / Futuristic / Heat death) period
- (Exotic / Radioactive / Synthetic / Living / Organic / Metallic / Silicate) matter
- (Ornate / Commemorative / Complex / Ergonomic / Compact / Functional) design

### Planets quirks
- Highly metallic
- High/low density
- Strong/weak magnetic field
- Organic compounds
- Ancient ruins/fossils
- Abandoned cities
- Geologically active
- Heavy water
- Mining sites
- Research stations
- Terraformed
- Retrograde orbit/spin
- Fast/slow rotation
- Extreme tilt
- Radio station
- Distress beacon
- Precious metals/minerals
- Subsurface ocean
- Breathable atmosphere
- Spaceship graveyard
- Toxic atmosphere
- Radioactive
- (Intelligent / Animal / Floral / Fungal / Microbial / Primordial) life

### Galaxy names
- Every Greek letter except for Omega (23 variants)
- Pattern ideas:
  - [1-999] (23 * 998, 23k possibilities, simplest)
  - [A-Z][1-999] (23 * 36 * 998, 83k possibilities)
  - [A-Z][A-Z]-[1-999] (23 * 36^2 * 998, 3M possibilities, most realistic)

### Universe generation
- Galaxy generation (tutorial galaxy uses this algorithm)
  - Generate unique galaxy name, used as its seed
  - Generate galaxy properties
    - Age
  - Initialize instrument counter
- Star generation (tutorial star is pre-authored)
  - Generate unique star name, used as its seed
  - Generate star
    - Type (weighted by galaxy age)
    - Age (limited by type / galaxy age)
    - Radius (weighted by type)
    - 0-1 quirks
    - 0-10 planets (based on star type/age)
    - Generate planets
      - Distance from star
      - Type (based on star type/age and distance from star)
      - Radius (weighted by type)
      - 0-2 quirks
      - 0-5 moons (weighted by type)
      - Generate moons
        - Type (based on star type/age and distance from star)
        - Radius
        - 0-1 quirks
