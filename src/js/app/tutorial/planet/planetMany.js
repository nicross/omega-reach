app.tutorial.planetMany = app.tutorial.invent({
  id: 'planetMany',
  // Lifecycle
  shouldActivate: () => content.location.is('planet') && content.planets.namesForPlanet(content.rooms.planet.getPlanet()?.name).length > 1,
  onUpdate: function () {
    if (!content.location.is('planet')) {
      return
    }

    if (this.preventDouble()) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Planets:`,
        description: () => `Some stars have multiple planets to examine. ` + ({
          gamepad: `Press <kbd>D-Pad Right</kbd> and <kbd>D-Pad Left</kbd>`,
          keyboard: `Press <kbd>Right Arrow</kbd> and <kbd>Left Arrow</kbd>`,
          mouse: `Click the <kbd>Arrow Buttons</kbd>`,
          touch: `Tap the <kbd>Arrow Buttons</kbd>`,
        }[app.tutorial.getInputPreference()]) + ` to navigate between the planets around this star.`,
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
