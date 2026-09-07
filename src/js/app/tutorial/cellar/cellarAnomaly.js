app.tutorial.cellarAnomaly = app.tutorial.invent({
  id: 'cellarAnomaly',
  // Lifecycle
  shouldActivate: () => content.location.is('cellar'),
  onUpdate: function () {
    if (!(content.location.is('cellar') && content.cellar.tiles.current().id == 'normal' && !content.cellar.tiles.current().isFullyScanned())) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Anomalies:`,
        description: `<strong>The cellar</strong> is filled with unspeakable evils which affect you when revealed. Examine them at your own risk.`,
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
