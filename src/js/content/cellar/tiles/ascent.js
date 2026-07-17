content.cellar.tiles.ascent = content.cellar.tiles.invent({
  alwaysAudible: true,
  id: 'ascent',
  name: 'The ascent',
  isAscent: true,
  isUnique: true,
  uniquePerFloor: true,
  weight: 1,
  canGenerate: (tile) => engine.fn.between(tile.z, -1, -3), // Not on first floor
  canInteractMore: () => true,
  getDestination: function () {
    return content.cellar.tiles.get({
      x: this.x,
      y: this.y,
      z: this.z + 1,
    })
  },
  getEffects: function () {
    const labels = [
      'First',
      'Second',
      'Third',
      'Fourth',
    ]

    return [
      {
        attribute: {
          label: `${labels[Math.abs(this.z) - 1]} floor opening`,
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
  getInteractLabelMore: () => 'Ascend',
  onInteractMore: function () {
    content.location.emit('cellar-ascent', {
      tile: this,
    })
  },
  alterParticle: function (particle) {
    // TODO: Column of light moving up
  },
  // XXX: Does not extend baseUnique
  getGlobalDonationRate: () => 0,
  getGlobalHealthBonus: () => 0,
})
