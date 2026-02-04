app.tutorial.reachOnline = app.tutorial.invent({
  id: 'reachOnline',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('reach') && content.rooms.reach.state.online,
  onActivate: function () {
    [
      {
        title: `It's online!`,
        description: `The device thrums back to life, returning virogously to its preferred state! And lo, its console glows with the promise of your recurring fate.`,
        actions: [
          {
            label: 'Use the device',
          }
        ],
      },
      {
        title: `[Tutorial] Reaching:`,
        description: () => ({
          gamepad: `Press <kbd>D-Pad Up</kbd> to extend it to the next zoom level. You may power it off and on while not in-use.`,
          keyboard: `Press the <kbd>Up Arrow</kbd> to extend it to the next zoom level. You may power it off and on while not in-use.`,
          mouse: `Click the <kbd>Up Button</kbd> to extend it to the next zoom level. You may power it off and on while not in-use.`,
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
