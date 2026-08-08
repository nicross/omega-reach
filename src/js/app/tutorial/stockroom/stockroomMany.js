app.tutorial.stockroomMany = app.tutorial.invent({
  id: 'stockroomMany',
  // Lifecycle
  shouldActivate: () => content.location.is('stockroom') && content.stockroom.countGenerated() > 1,
  onUpdate: function () {
    if (!content.location.is('stockroom')) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Wares:`,
        description: () => `<strong>The stockroom</strong> can hold many instruments. ` + ({
          gamepad: `Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd>`,
          keyboard: `Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd>`,
          mouse: `Click the <kbd>Arrow Buttons</kbd>`,
          touch: `Tap the <kbd>Arrow Buttons</kbd>`,
        }[this.getInputPreference()]) + ` to navigate between the shopkeeper's wares.`,
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
