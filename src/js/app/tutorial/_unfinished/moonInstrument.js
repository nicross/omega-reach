app.tutorial.moonInstrument = app.tutorial.invent({
  id: 'instrumentGet',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('moon') && content.instruments.count() > 0,
  onUpdate: function () {
    if (!content.location.is('moon')) {
      return
    }

    [
      {
        title: `Shiny thing!`,
        description: ``,
        actions: [
          {
            label: 'To the gallery',
            before: () => this.markComplete(),
            after: () => app.screen.game.movement.update(),
          }
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
