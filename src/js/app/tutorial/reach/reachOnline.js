app.tutorial.reachOnline = app.tutorial.invent({
  id: 'reachOnline',
  // Lifecycle
  shouldActivate: () => content.rooms.reach.state.online,
  onUpdate: function () {
    if (!content.location.is('reach')) {
      return
    }

    [
      {
        title: `It's online!`,
        description: `The device thrums back to life, returning vigorously to its preferred state! And lo, its console glows with the promise of your recurring fate.`,
        actions: [
          {
            label: 'Zoom the device',
          }
        ],
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> The reach:`,
        description: () => ({
          gamepad: `Press <kbd>D-Pad Up</kbd>`,
          keyboard: `Press the <kbd>Up Arrow</kbd>`,
          mouse: `Click the <kbd>Up Button</kbd>`,
          touch: `Tap the <kbd>Up Button</kbd>`,
        }[this.getInputPreference()]) + ` to extend <strong>the reach</strong> to its next zoom level. You may ` + ({
          gamepad: `press <kbd>D-Pad Down</kbd>`,
          keyboard: `press the <kbd>Down Arrow</kbd>`,
          mouse: `click the <kbd>Down Button</kbd>`,
          touch: `tap the <kbd>Down Button</kbd>`,
        }[this.getInputPreference()]) + ` to zoom out from any level at any time. Zoom in to proceed.`,
        actions: [
          {
            label: 'Regain control',
          }
        ],
        after: () => {
          this.markComplete()
          app.screen.game.interact.update()
        },
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
