content.cellar.tiles.descent = content.cellar.tiles.invent({
  alwaysAudible: true,
  id: 'descent',
  name: 'The descent',
  isDescent: true,
  isUnique: true,
  uniquePerFloor: true,
  weight: 1,
  canGenerate: (tile) => engine.fn.between(tile.z, 0, -2), // Not past third floor
  getEffects: function () {
    const labels = [
      'First',
      'Second',
      'Third',
    ]

    return [
      {
        attribute: {
          label: `${labels[Math.abs(this.z - 1)]} floor opening`,
          modifiers: ['legendary'],
        },
      },
    ]
  },
  onEnter: function () {
    content.cellar.scans.set(this, this.getEffects().length)
  },
  onEnterEffects: function () {},
  onExit: function () {
    content.cellar.scans.set(this, 0)
  },
  alterParticle: function (particle) {
    // TODO: Column of light moving down
  },
  // XXX: Does not extend baseUnique
  getGlobalDonationRate: () => 0,
  getGlobalHealthBonus: () => 0,
})
