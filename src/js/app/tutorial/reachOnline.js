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
        description: `The device thrums, returning virogously to its preferred state. The console now glows with the promise of your perennial delights.`,
        actions: [
          {
            label: 'Use the device',
          }
        ],
      },
      {
        title: `[Tutorial] Using the reach:`,
        description: () => ({
          gamepad: `Press <kbd>D-Pad Up</kbd> to extend its reach.`,
          keyboard: `Press the <kbd>Up Arrow</kbd> to extend its reach.`,
          mouse: `Click the <kbd>Up Button</kbd> to extend its reach.`,
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
