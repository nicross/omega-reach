app.tutorial.horizon = app.tutorial.invent({
  id: 'horizon',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('horizon'),
  onActivate: function () {
    [
      {
        title: `It's full of galaxies!`,
        description: `They resolve from the void as you reach into <strong>the horizon</strong>—first as infrared blobs before more recognizable discs. Although the options are staggeringly numerous, you trust its lack of incorrect choices.`,
        actions: [
          {
            label: 'Reach deeper',
          }
        ],
      },
      {
        title: `[Tutorial] Reaching:`,
        description: `Interact to zoom in to a new galaxy. The galaxies you find from here will be remembered for later.`,
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
