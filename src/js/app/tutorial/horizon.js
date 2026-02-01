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
        description: ``,
        actions: [
          {
            label: 'Reach deeper',
          }
        ],
      },
      {
        title: `[Tutorial] Finding galaxies:`,
        description: `Interact to find a new galaxy to examine.`,
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
