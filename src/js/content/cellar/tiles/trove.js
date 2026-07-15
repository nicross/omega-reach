content.cellar.tiles.trove = content.cellar.tiles.invent({
  id: 'trove',
  name: 'The trove',
  uniquePerRun: true,
  weight: 1/4,
  // TODO: Global effects (+50% donations, once per run)
  alterParticle: function (particle) {
    // TODO: Pile of colorful dust
  },
}, content.cellar.tiles.baseUnique)
