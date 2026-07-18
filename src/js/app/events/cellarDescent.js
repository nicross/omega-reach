content.location.on('cellar-descent', ({tile}) => {
  content.cellar.position.set(
    tile.getDestination()
  )

  content.rooms.cellar.updateNameShort()
  content.cellar.tiles.current().onEnter()

  app.screen.game.update()
  app.tutorial.update()

  // Get audio, haptics, live region, etc. updates for free
  app.screen.game.movement.emit('move', {
    isOut: true,
  })
})
