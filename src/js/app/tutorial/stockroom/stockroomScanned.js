app.tutorial.stockroomScanned = app.tutorial.invent({
  id: 'stockroomScanned',
  // Lifecycle
  shouldActivate: () => content.location.is('stockroom') && content.rooms.stockroom.isComplete(),
  onUpdate: function () {
    if (!content.location.is('stockroom')) {
      return
    }

    [
      {
        title: `It's exquisite!`,
        description: `Why might the shopkeeper be hiding this gem? You mire the logistics and whether to be generous. If they were simply following their duties, then you'd eventually be exchanging these for credits.`,
        actions: [
          {
            label: `Consider taking it`,
          },
        ],
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Stealing:`,
        description: () => ({
          gamepad: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} any <kbd>Face Button</kbd>`,
          keyboard: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} <kbd>Enter</kbd> or <kbd>Spacebar</kbd>`,
          mouse: `${app.settings.computed.inputHold ? 'Click and hold' : 'Click'} the <kbd>Steal Button</kbd>`,
          touch: `${app.settings.computed.inputHold ? 'Tap and hold' : 'Tap'} the <kbd>Steal Button</kbd>`,
        }[app.tutorial.getInputPreference()]) + ` to add an instrument from <strong>the stockroom</strong> into your inventory.`,
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
