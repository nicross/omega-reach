app.tutorial.horizon = app.tutorial.invent({
  id: 'horizon',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('horizon'),
  onUpdate: function () {
    if (!content.location.is('horizon')) {
      return
    }

    [
      {
        title: `It's full of galaxies!`,
        description: `They resolve from the void as you reach into the galactic horizon—first as infrared blobs before more recognizable discs. Although the options are staggeringly numerous, you trust that there are no incorrect choices.`,
        actions: [
          {
            label: 'Reach deeper',
          }
        ],
      },
      {
        title: `[Tutorial] Reaching:`,
        description: `Interact to reach toward a new galaxy to examine. The galaxies you find from here will be saved to revisit later.`,
        actions: [
          {
            label: 'Regain control',
            before: () => this.markComplete(),
          }
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
