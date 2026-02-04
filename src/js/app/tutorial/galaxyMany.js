app.tutorial.galaxyMany = app.tutorial.invent({
  id: 'galaxyMany',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('galaxy') && content.galaxies.count() > 1,
  onActivate: function () {
    [
      {
        title: `[Tutorial] Galaxies:`,
        description: () => ({
          gamepad: `Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd> to navigate between the galaxies you've reached.`,
          keyboard: `Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd> to navigate between the galaxies you've reached.`,
          mouse: `Click the <kbd>Arrow Buttons</kbd> to navigate between the galaxies you've reached.`,
        }[app.settings.computed.inputPreference]),
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
