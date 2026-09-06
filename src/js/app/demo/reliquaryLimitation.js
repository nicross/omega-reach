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
        title: `Echo? echo!`,
        description: `An extracyclic energy resonates throughout <strong>the reliquary</strong>. Yet, its empty pedestals reject its calls without relics to confer any meaning.`,
        actions: [
          {
            label: `Back to work`,
          },
        ],
      },
      {
        title: `<span class="u-highlight">[Demo limitation]</span>`,
        description: `<strong>The reliquary</strong> is not quite ready to display relics. Here you'll collect unique objects that celebrate the cycles. Thanks for playing!`,
        actions: [
          {
            label: `Regain control`,
            after: () => this.markComplete(),
          },
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
