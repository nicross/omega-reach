content.location.on('cellar-nexus', ({tile}) => {
  const destinations = [...new Set([
    // Entrance
    {x: 0, y: 0, z: 0, name: 'Cellar entrance', isEntrance: true},
    // All ascents
    ...content.cellar.tiles.findAll({id: 'ascent'}),
    // All descents where ascent is undiscovered
    ...content.cellar.tiles.findAll({id: 'descent'}).filter((x) => !content.cellar.tiles.find({id: 'ascent', z: x.z - 1})),
    // All nexuses
    ...content.cellar.tiles.findAll({id: 'nexus'}).filter((x) => x !== tile),
    // All uniques
    ...content.cellar.tiles.findAll({isUniquePerRun: true}),
  ])]

  destinations.sort((a, b) => {
    if (a.isEntrance) {return -1}
    if (b.isEntrance) {return 1}

    return a.z == b.z
      ? a.name.localeCompare(b.name)
      : a.z - b.z
  })

  app.screen.game.dialog.push({
    title: `Choose a destination`,
    description: `You will be disintegrated and reintegrated upon reaching your destination. <strong>The Omega Conservatory</strong> is not liable for any unintended side effects.`,
    actions: [
      ...destinations.map((to) => ({
        label: to.z == 0 || tile.isUniquePerRun ? to.name : `${to.name} B${Math.abs(to.z) + 1}`,
        after: () => travel(tile, to),
      })),
      {
        label: 'Not now',
      },
    ],
  })

  function travel(from, to) {
    from.exit()

    content.cellar.position.set(to)

    content.rooms.cellar.updateNameShort()
    content.rooms.cellar.updateProgram()
    content.cellar.tiles.current().enter()

    app.screen.game.update()
    app.tutorial.update()

    // Get audio, haptics, live region, etc. updates for free
    app.screen.game.movement.emit('move', {
      // Default settings, no sound
    })

    content.audio.interactSuccess.trigger({index: 0})
    content.audio.interactComplete.trigger()
  }

})
