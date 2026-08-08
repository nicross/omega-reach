app.tutorial.cellar = app.tutorial.invent({
  id: 'cellar',
  // Lifecycle
  shouldActivate: () => content.location.is('cellar'),
  onUpdate: function () {
    if (!content.location.is('cellar')) {
      return
    }

    [
      {
        title: `Was this always here?`,
        description: `You follow the shopkeeper into the <em>earthen labyrinth</em> undetected. Perhaps this is a shortcut to wherever they find their wares? Yet, the darkness which enshrouds their footsteps seems to creep much deeper than that.`,
        actions: [
          {
            label: 'Be careful',
          }
        ],
        after: () => this.markComplete(),
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Sanity:`,
        description: `<strong class="a-game--dialogHealth">Sanity <i aria-hidden="true" role="presentation" title="Sanity">☥</i></strong> is your main resource when exploring <strong>the cellar</strong>. Use it to reveal unexplored areas—but beware! You will faint if it reaches zero.`,
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
