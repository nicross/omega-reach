app.tutorial.reachOnline = app.tutorial.invent({
  id: 'reachOnline',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('reach') && content.rooms.reach.state.online,
  onUpdate: function () {
    if (!content.location.is('reach')) {
      return
    }

    [
      {
        title: `It's online!`,
        description: `The device thrums to life, returning virogously to its preferred state. And lo, its console glows with the promise of your recurring fate.`,
        actions: [
          {
            label: 'Use the device',
          }
        ],
      },
      {
        title: `[Tutorial] The Reach:`,
        description: () => ({
          gamepad: `Press <kbd>D-Pad Up</kbd> to extend it to the next zoom level.`,
          keyboard: `Press the <kbd>Up Arrow</kbd> to extend it to the next zoom level.`,
          mouse: `Click the <kbd>Up Button</kbd> to extend it to the next zoom level.`,
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
