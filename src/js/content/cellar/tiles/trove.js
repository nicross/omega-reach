content.cellar.tiles.trove = content.cellar.tiles.invent({
  id: 'trove',
  name: 'The trove',
  uniquePerRun: true,
  weight: 1/2,
  effectsGlobal: [
    {
      attribute: {
        label: `Inflated donations`,
        modifiers: [],
      }
    },
  ],
  getGlobalDonationRate: () => 2/3,
  alterParticle: function (particle) {
    // TODO: Pile of colorful dust
  },
}, content.cellar.tiles.baseUnique)
