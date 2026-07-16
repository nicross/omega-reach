content.cellar.tiles.baseUnique = content.cellar.tiles.base.extend({
  alwaysAudible: true,
  effectsGlobal: [],
  effectsOnEnter: [],
  isUnique: true,
  getEffects: function () {
    return [
      ...this.effectsOnEnter,
      ...this.effectsGlobal,
      {
        apply: () => {},
        attribute: {
          label: 'Nexus of power',
          modifiers: ['legendary'],
        },
      },
    ]
  },
  getGlobalDonationRate: () => 0,
  getGlobalHealthBonus: () => 0,
  onEnter: function () {
    this.effectsOnEnter = []
    this.onEnterEffects()

    content.cellar.scans.set(this, this.getEffects().length)
  },
  onEnterEffects: function () {},
  onExit: function () {
    this.effectsOnEnter = []
    content.cellar.scans.set(this, 0)
  },
})
