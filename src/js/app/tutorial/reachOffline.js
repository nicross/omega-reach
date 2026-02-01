app.tutorial.reachOffline = app.tutorial.invent({
  id: 'reachOffline',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('reach'),
  onUpdate: function () {
    if (!content.location.is('reach')) {
      return
    }

    [
      {
        title: `It's the Omega Reach.`,
        description: `...`,
        actions: [
          {
            label: 'Approach the device',
          }
        ],
      },
      {
        title: `[Tutorial] Input preference:`,
        description: `You sit at the device. Upon its inert console rests…`,
        actions: [
          {
            label: 'two joysticks',
            before: () => app.settings.setInputPreference('gamepad'),
            after: () => app.settings.save(),
          },
          {
            label: 'a trackball',
            before: () => app.settings.setInputPreference('mouse'),
            after: () => app.settings.save(),
          },
          {
            label: 'an array of keys',
            before: () => app.settings.setInputPreference('keyboard'),
            after: () => app.settings.save(),
          },
        ],
      },
      {
        title: `Yet, it's offline.`,
        description: `You recall there being a specific input sequence to power it on. It's somewhere in that waking memory of yours.`,
        actions: [
          {
            label: 'Turn on the device',
          }
        ],
      },
      {
        title: `[Tutorial] Interactions:`,
        description: () => ({
          gamepad: `Hold one or both <kbd>Triggers</kbd> and move the <kbd>Analog Sticks</kbd> to interact. Locate the sweet spot to proceed.`,
          keyboard: `Press one or more keys to interact. Each key points to a location. Locate the sweet spot to proceed.`,
          mouse: `Click to interact at that location. Locate the sweet spot to proceed.`,
        }[app.settings.computed.inputPreference]),
        actions: [
          {
            label: 'Next tutorial',
          }
        ],
      },
      {
        title: `[Tutorial] Interactions:`,
        description: () => ({
          gamepad: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} the <kbd>A</kbd> button to skip the current interaction.`,
          keyboard: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} <kbd>Enter</kbd> or <kbd>Spacebar</kbd> to skip the current interaction.`,
          mouse: `${app.settings.computed.inputHold ? 'Click and hold' : 'Click'} the <kbd>Examine Button</kbd> to skip the current interaction.`,
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
