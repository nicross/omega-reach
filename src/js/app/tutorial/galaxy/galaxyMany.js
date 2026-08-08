app.tutorial.galaxyMany = app.tutorial.invent({
  id: 'galaxyMany',
  // Lifecycle
  shouldActivate: () => content.location.is('galaxy') && content.galaxies.count() > 1,
  onUpdate: function () {
    if (!content.location.is('galaxy')) {
      return
    }

    if (this.preventDouble()) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Galaxies:`,
        description: () => `You can revisit any galaxy at any time. ` + ({
          gamepad: `Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd>`,
          keyboard: `Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd>`,
          mouse: `Click the <kbd>Arrow Buttons</kbd>`,
          touch: `Tap the <kbd>Arrow Buttons</kbd>`,
        }[this.getInputPreference()]) + ` to navigate between the galaxies you've reached.`,
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
