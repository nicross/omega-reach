content.location.on('cellar-descent', ({tile}) => {
  content.cellar.position.set(
    tile.getDestination()
  )

  content.cellar.tiles.current().onEnter()

  content.audio.zoom.trigger({
    isIn: false,
  })

  app.screen.game.update()
  app.tutorial.update()
})
