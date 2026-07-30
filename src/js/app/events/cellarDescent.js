content.location.on('cellar-descent', ({tile}) => {
  tile.exit()

  content.cellar.position.set(
    tile.getDestination()
  )

  content.rooms.cellar.updateNameShort()
  content.rooms.cellar.updateProgram()
  content.cellar.tiles.current().enter()

  app.screen.game.update()
  app.tutorial.update()

  // Get audio, haptics, live region, etc. updates for free
  app.screen.game.movement.emit('move', {
    isOut: true,
  })
})
