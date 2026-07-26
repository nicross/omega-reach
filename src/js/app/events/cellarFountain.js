content.location.on('cellar-fountain', ({tile}) => {
  const cost = tile.calculateCost(),
    recovery = tile.calculateRecovery()

  app.screen.game.dialog.push({
    title: `Make an earthen wish?`,
    description: `You will donate <strong class="a-game--dialogCurrency">${app.utility.format.currency(cost)}</strong> to recover up to <strong class="a-game--dialogHealth">${app.utility.format.health(recovery)}</strong>.`,
    actions: [
      {
        label: `Toss the credit${cost == 1 ? '' : 's'}`,
        after: () => {
          content.audio.sanityChange.trigger({isUp: true})
          content.cellar.health.add(recovery)
          content.wallet.subtract(cost)
          content.donations.add(cost)

          tile.incrementUses()

          app.screen.game.update()
        },
      },
      {
        label: 'Not now',
      },
    ],
  })

})
