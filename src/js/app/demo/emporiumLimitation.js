app.tutorial.cellarLimitation = app.tutorial.invent({
  id: 'cellarLimitation',
  // Lifecycle
  shouldActivate: () => app.isDemo() && content.location.is('emporium'),
  onUpdate: function () {
    if (!content.location.is('emporium')) {
      return
    }

    ;[
      {
        tutorial: true,
        title: `<span class="u-highlight">[Demo limitation]</span>`,
        description: `<strong>The emproium</strong> is not ready to host auctions. Thanks for playing!`,
        actions: [
          {
            label: `Regain control`,
          },
        ],
      },
      {
        title: `<q>Hey bidder! It's the curator…</q>`,
        description: `It's the auctioneer and their cacophony of chanting. This time, their rhythmic stream of consciousness glissandos toward a tone which augments the art's <em>earthern roots</em>.`,
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
