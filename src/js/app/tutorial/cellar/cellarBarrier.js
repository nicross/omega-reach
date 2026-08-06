app.tutorial.cellarBarrier = app.tutorial.invent({
  id: 'cellarBarrier',
  // Lifecycle
  shouldActivate: () => content.location.is('cellar'),
  onUpdate: function () {
    if (!content.location.is('cellar') || !content.cellar.barrier.has(1)) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Greed`,
        description: `<strong class="a-game--dialogBarrier">Greed <i aria-hidden="true" role="presentation" title="Greed">⸸</i></strong> will protect you when exploring <strong>the cellar</strong>. It is spent whenever your sanity would otherwise reach zero.`,
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
