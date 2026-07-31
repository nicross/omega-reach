app.tutorial.emporiumLimitation = app.tutorial.invent({
  id: 'emporiumLimitation',
  // Lifecycle
  shouldActivate: () => content.location.is('emporium'),
  onUpdate: function () {
    if (!content.location.is('emporium')) {
      return
    }

    ;[
      {
        title: `<span class="u-highlight">[Demo limitation]</span>`,
        description: `<strong>The emproium</strong> is not quite ready to host auctions. Thanks for playing!`,
        actions: [
          {
            label: `Regain control`,
          },
        ],
      },
      {
        title: `<q>No bidders! It's the curator…</q>`,
        description: `It's the auctioneer and their cacophony of chanting. This time, their rhythmic stream of consciousness glissandos toward a tone below their <em>earthern roots</em>.`,
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
