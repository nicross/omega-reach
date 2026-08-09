app.tutorial.moonMany = app.tutorial.invent({
  id: 'moonMany',
  // Lifecycle
  shouldActivate: () => content.location.is('moon') && content.moons.namesForMoon(content.rooms.moon.getMoon()?.name).length > 1,
  onUpdate: function () {
    if (!content.location.is('moon')) {
      return
    }

    if (this.preventDouble()) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Moons:`,
        description: () => `Some planets have multiple moons to examine. ` + ({
          gamepad: `Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd>`,
          keyboard: `Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd>`,
          mouse: `Click the <kbd>Arrow Buttons</kbd>`,
          touch: `Tap the <kbd>Arrow Buttons</kbd>`,
        }[app.tutorial.getInputPreference()]) + ` to navigate between the moons around this planet.`,
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
