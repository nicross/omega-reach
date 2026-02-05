app.tutorial.galaxyMany = app.tutorial.invent({
  id: 'galaxyMany',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.galaxies.count() > 1,
  onUpdate: function () {
    if (!content.location.is('galaxy')) {
      return
    }

    if (this.preventDouble()) {
      return
    }

    [
      {
        title: `[Tutorial] Galaxies:`,
        description: () => ({
          gamepad: `You've picked a second galaxy! Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd> to navigate between the galaxies you've reached.`,
          keyboard: `You've picked a second galaxy! Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd> to navigate between the galaxies you've reached.`,
          mouse: `You've picked a second galaxy! Click the <kbd>Arrow Buttons</kbd> to navigate between the galaxies you've reached.`,
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
