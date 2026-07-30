content.cellar.tiles.baseUnique = content.cellar.tiles.base.extend({
  alwaysAudible: true,
  effectsGlobal: [],
  effectsOnEnter: [],
  isUnique: true,
  canGenerate: (tile) => engine.fn.between(tile.z, 0, -2), // Not past third floor
  getDialogs: () => [],
  getEffects: function () {
    return [
      ...this.effectsOnEnter,
      ...this.effectsGlobal,
      {
        attribute: {
          label: 'Radix of power',
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
    this.onExitEffects()

    content.cellar.scans.set(this, 0)
  },
  onExitEffects: function () {},
})
