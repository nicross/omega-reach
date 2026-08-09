app.tutorial.stockroomStolen = app.tutorial.invent({
  id: 'stockroomStolen',
  // Lifecycle
  shouldActivate: () => content.location.is('stockroom') && content.stockroom.hasStolen(),
  onUpdate: function () {
    if (!content.location.is('stockroom')) {
      return
    }

    [
      {
        title: `Is this truly you?`,
        description: `By your decisive fist, the ecstatic thrill fills you like commanding <strong>the reach</strong>. Yet, to what end could this ecstacy beseech? Will you commit to deceiving the shopkeeper and your tactical synergy?`,
        actions: [
          {
            label: `Consider putting it back`,
          },
        ],
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Unstealing:`,
        description: () => ({
          gamepad: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} any <kbd>Face Button</kbd>`,
          keyboard: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} <kbd>Enter</kbd> or <kbd>Spacebar</kbd>`,
          mouse: `${app.settings.computed.inputHold ? 'Click and hold' : 'Click'} the <kbd>Return Button</kbd>`,
          touch: `${app.settings.computed.inputHold ? 'Tap and hold' : 'Tap'} the <kbd>Return Button</kbd>`,
        }[app.tutorial.getInputPreference()]) + ` to put an instrument from your inventory back into <strong>the stockroom</strong>.`,
        actions: [
          {
            label: 'Regain control',
          }
        ],
        after: () => this.markComplete(),
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
