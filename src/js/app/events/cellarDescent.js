content.location.on('cellar-descent', ({tile}) => {
  tile.exit()

  const destination = tile.getDestination()
  content.cellar.position.set(destination)
  content.cellar.discovered.set(destination, true)

  content.rooms.cellar.updateNameShort()
  content.rooms.cellar.updateProgram()
  content.cellar.tiles.current().enter()

  // Get audio, haptics, live region, etc. updates for free
  app.screen.game.movement.emit('move', {
    isOut: true,
  })

  app.screen.game.update()
  app.tutorial.update()
})
