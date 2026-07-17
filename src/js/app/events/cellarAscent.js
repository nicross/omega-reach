content.location.on('cellar-ascent', ({tile}) => {
  content.cellar.position.set(
    tile.getDestination()
  )

  content.cellar.tiles.current().onEnter()

  content.audio.zoom.trigger({
    isIn: true,
  })

  app.screen.game.update()
  app.tutorial.update()
})
