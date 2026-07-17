content.location.on('cellar-fountain', ({tile}) => {
  const cost = tile.calculateCost()

  app.screen.game.dialog.push({
    title: `Make an earthen wish?`,
    description: `You will recover <strong class="a-game--dialogHealth">${app.utility.format.health(1)}</strong> for <strong class="a-game--dialogCurrency">${app.utility.format.currency(cost)}</strong>.`,
    actions: [
      {
        label: `Toss the credit${cost == 1 ? '' : 's'}`,
        after: () => {
          content.audio.sanityChange.trigger({isUp: true})
          content.cellar.health.add(1)
          content.wallet.subtract(cost)

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
