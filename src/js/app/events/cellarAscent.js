content.location.on('cellar-ascent', ({tile}) => {
  content.cellar.position.set(
    tile.getDestination()
  )

  content.rooms.cellar.updateNameShort()

  // XXX: descent tiles don't need onEnter/onExit/onActivate/onDeactivate

  app.screen.game.update()
  app.tutorial.update()

  // Get audio, haptics, live region, etc. updates for free
  app.screen.game.movement.emit('move', {
    isIn: true,
  })
})
