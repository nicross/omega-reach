content.cellar.tiles.vision = content.cellar.tiles.invent({
  id: 'vision',
  name: 'The vision',
  uniquePerRun: true,
  weight: 1/2,
  defaultState: {
    entered: false,
  },
  effectsGlobal: [
    {
      attribute: {
        label: `Weakened sanity`,
        modifiers: [],
      }
    },
  ],
  getGlobalHealthBonus: () => -3,
  onEnterEffects: function () {
    if (this.state.entered) {
      return
    }

    const health = content.cellar.health.amount()
    const target = Math.max(1, health - this.getGlobalHealthBonus())

    if (health > target) {
      content.cellar.health.set(target)
      content.audio.sanityChange.trigger({isUp: false})
    }

    this.state.entered = true
  },
  alterParticle: function (particle) {
    // TODO: Cloud, centered at {0,0,2}, points oscilalting between floor and target
  },
}, content.cellar.tiles.baseUnique)
