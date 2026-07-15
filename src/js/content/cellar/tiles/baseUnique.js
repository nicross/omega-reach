content.cellar.tiles.baseUnique = content.cellar.tiles.base.extend({
  alwaysAudible: true,
  effectsOnEnter: [],
  isUnique: true,
  getEffects: function () {
    return [...this.effectsOnEnter, {
      apply: () => {},
      attribute: {
        label: 'Nexus of power',
        modifiers: ['legendary'],
      },
    }]
  },
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
