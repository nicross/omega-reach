app.tutorial.starMany = app.tutorial.invent({
  id: 'starMany',
  // Lifecycle
  shouldActivate: () => content.location.is('star') && content.stars.countForStar(content.rooms.star.getStar()?.name) > 1,
  onUpdate: function () {
    if (!content.location.is('star')) {
      return
    }

    if (this.preventDouble()) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Stars:`,
        description: () => `You can revisit any star at any time. ` + ({
          gamepad: `Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd>.`,
          keyboard: `Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd>.`,
          mouse: `Click the <kbd>Arrow Buttons</kbd>`,
          touch: `Tap the <kbd>Arrow Buttons</kbd>`,
        }[this.getInputPreference()]) + ` to navigate between the stars you've reached within this galaxy.`,
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
