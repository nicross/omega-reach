content.cellar.tiles.descent = content.cellar.tiles.invent({
  alwaysAudible: true,
  id: 'descent',
  name: 'The descent',
  isDescent: true,
  isUnique: true,
  uniquePerFloor: true,
  weight: 1,
  canGenerate: (tile) => engine.fn.between(tile.z, 0, -2), // Not past third floor
  canInteractMore: () => true,
  getDestination: function () {
    return content.cellar.tiles.get({
      x: this.x,
      y: this.y,
      z: this.z - 1,
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
          label: `${labels[Math.abs(this.z) + 1]} floor opening`,
          modifiers: ['legendary'],
        },
      },
    ]
  },
  getInteractLabelMore: () => 'Descend',
  onEnter: function () {
    content.cellar.scans.set(this, this.getEffects().length)
  },
  onEnterEffects: function () {},
  onExit: function () {
    content.cellar.scans.set(this, 0)
  },
  onInteractMore: function () {
    content.location.emit('cellar-descent', {
      tile: this,
    })
  },
  alterParticle: function (particle) {
    // TODO: Column of light moving down
  },
  // XXX: Does not extend baseUnique
  getGlobalDonationRate: () => 0,
  getGlobalHealthBonus: () => 0,
})
