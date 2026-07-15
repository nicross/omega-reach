content.cellar.tiles.quagmire = content.cellar.tiles.invent({
  id: 'quagmire',
  name: 'The quagmire',
  uniquePerRun: true,
  weight: 1/4,
  // TODO: Global effects (-50% donations, once per run)
  alterParticle: function (particle) {
    // TODO: Simplex noise adding to the floor
  },
}, content.cellar.tiles.baseUnique)
