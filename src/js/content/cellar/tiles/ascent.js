content.cellar.tiles.ascent = content.cellar.tiles.invent({
  alwaysAudible: true,
  id: 'ascent',
  name: 'The ascent',
  isAscent: true,
  isUnique: true,
  uniquePerFloor: true,
  weight: 1,
  canGenerate: (tile) => engine.fn.between(tile.z, -1, -3), // Not on first floor
  getEffects: function () {
    const labels = [
      'Second',
      'Third',
      'Fourth',
    ]

    return [
      {
        attribute: {
          label: `${labels[Math.abs(this.z)]} floor opening`,
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
    // TODO: Column of light moving up
  },
  // XXX: Does not extend baseUnique
  getGlobalDonationRate: () => 0,
  getGlobalHealthBonus: () => 0,
})
