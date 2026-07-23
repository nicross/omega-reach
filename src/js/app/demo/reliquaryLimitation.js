app.tutorial.reliquaryLimitation = app.tutorial.invent({
  id: 'reliquaryLimitation',
  // Lifecycle
  shouldActivate: () => content.location.is('reliquary'),
  onUpdate: function () {
    if (!content.location.is('reliquary')) {
      return
    }

    ;[
      {
        title: `<span class="u-highlight">[Demo limitation]</span>`,
        description: `<strong>The reliquary</strong> is not ready to house relics. Thanks for playing!`,
        actions: [
          {
            label: `Regain control`,
          },
        ],
      },
      {
        title: `Echo? echo!`,
        description: `An extracyclic energy resonates throughout <strong>the reliquary</strong>. Yet, its empty pedestals reject its calls without relics to confer any meaning.`,
        actions: [
          {
            label: `Back to work`,
            after: () => this.markComplete(),
          },
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
