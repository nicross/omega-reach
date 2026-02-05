app.tutorial.shopClosed = app.tutorial.invent({
  id: 'shopClosed',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('shop'),
  onUpdate: function () {
    if (!content.location.is('shop')) {
      return
    }

    [
      {
        title: `Be back in five.`,
        description: `You scan <strong>the shop</strong> for its persnickety keeper. It's unclear where they might find a proper meal this late, but their determination is commendable. Honestly, you'd just grab a burger with the reach—capitalism is thievery, <em>too!</em>`,
        actions: [
          {
            label: 'Come back later',
            before: () => this.markComplete(),
          }
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
