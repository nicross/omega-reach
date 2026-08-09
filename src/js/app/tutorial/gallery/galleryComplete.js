app.tutorial.galleryComplete = app.tutorial.invent({
  id: 'galleryComplete',
  // Lifecycle
  shouldActivate: () => content.location.is('gallery') && content.rooms.gallery.isComplete(),
  onUpdate: function () {
    if (!(content.location.is('gallery') && content.rooms.gallery.isComplete())) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Performing:`,
        description: `Instruments can be freely played once they are fully appraised. Explore and enjoy their unique textures at your own pace!`,
        actions: [
          {
            label: 'Next tutorial',
          }
        ],
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Selling:`,
        description: () => `Dislike anything? or just need some funds for <strong>the shop</strong>? ` + ({
          gamepad: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} any <kbd>Face Button</kbd>`,
          keyboard: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} <kbd>Enter</kbd> or <kbd>Spacebar</kbd>`,
          mouse: `${app.settings.computed.inputHold ? 'Click and hold' : 'Click'} the <kbd>Sell Button</kbd>`,
          touch: `${app.settings.computed.inputHold ? 'Tap and hold' : 'Tap'} the <kbd>Sell Button</kbd>`,
        }[app.tutorial.getInputPreference()]) + ` to sell any instrument. You will be prompted to confirm your choice.`,
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
