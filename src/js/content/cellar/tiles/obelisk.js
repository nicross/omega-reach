content.cellar.tiles.obelisk = content.cellar.tiles.invent({
  id: 'obelisk',
  name: 'The obelisk',
  uniquePerRun: true,
  weight: 1/4,
  // TODO: Global effects (+3 max sanity, once per run)
  alterParticle: function (particle) {
    // TODO: Tall tower, concentrate particles in center
  },
}, content.cellar.tiles.baseUnique)
