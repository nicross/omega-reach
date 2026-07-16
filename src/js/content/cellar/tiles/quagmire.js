content.cellar.tiles.quagmire = content.cellar.tiles.invent({
  id: 'quagmire',
  name: 'The quagmire',
  uniquePerRun: true,
  weight: 1/2,
  effectsGlobal: [
    {
      attribute: {
        label: `Deflated donations`,
        modifiers: [],
      }
    },
  ],
  getGlobalDonationRate: () => -1/3,
  alterParticle: function (particle) {
    // TODO: Simplex noise adding to the floor
  },
}, content.cellar.tiles.baseUnique)
