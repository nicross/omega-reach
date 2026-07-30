content.cellar.tiles.nexus = content.cellar.tiles.invent({
  id: 'nexus',
  name: 'The nexus',
  uniquePerFloor: true,
  weight: 4,
  getDialogs: () => [
    {
      title: `It's a checkpoint.`,
      description: ``,
    },
    {
      tutorial: true,
      title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> The nexus`,
      description: `<kbd>Interact</kbd> to return to a previously-visited location.`,
    },
  ],
  canInteractMore: () => true,
  getInteractLabelMore: () => 'Interact',
  onInteractMore: function () {
    content.location.emit('cellar-nexus', {
      tile: this,
    })
  },
  alterParticle: function (particle) {

  },
}, content.cellar.tiles.baseUnique)
