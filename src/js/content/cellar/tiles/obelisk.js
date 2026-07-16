content.cellar.tiles.obelisk = content.cellar.tiles.invent({
  id: 'obelisk',
  name: 'The obelisk',
  uniquePerRun: true,
  weight: 1/2,
  defaultState: {
    entered: false,
  },
  effectsGlobal: [
    {
      attribute: {
        label: `Hardened sanity`,
        modifiers: [],
      }
    },
  ],
  getGlobalHealthBonus: () => 5,
  onEnterEffects: function () {
    if (this.state.entered) {
      return
    }

    content.cellar.health.add(this.getGlobalHealthBonus())
    content.audio.sanityChange.trigger({isUp: true})

    this.state.entered = true
  },
  alterParticle: function (particle) {
    // TODO: Tall tower, concentrate particles in center
  },
}, content.cellar.tiles.baseUnique)
