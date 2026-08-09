app.tutorial.atriumWallet = app.tutorial.invent({
  id: 'atriumWallet',
  // Lifecycle
  shouldActivate: () => content.location.is('atrium') && content.wallet.has(51),
  onUpdate: function () {
    if (!content.location.is('atrium')) {
      return
    }

    [
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Credits:`,
        description: `<strong class="a-game--dialogCurrency">Credits <i aria-hidden="true" role="presentation" title="Credit">¤</i></strong> are used to purchase instruments from <strong>the shop</strong>. You may now check your wallet from <strong>the atrium</strong>.`,
        actions: [
          {
            label: app.tutorial.tutorialComplete.complete ? 'Regain control' : 'Next tutorial',
          }
        ],
        after: () => this.markComplete(),
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
