content.cellar.tiles.augury = content.cellar.tiles.invent({
  id: 'augury',
  name: 'The augury',
  uniquePerRun: true,
  weight: 1/4,
  // TODO: Global effects (-3 max sanity, once per run)
  alterParticle: function (particle) {
    // TODO: Cloud, centered at {0,0,2}, points oscilalting between floor and target
  },
}, content.cellar.tiles.baseUnique)
