engine.loop.on('frame', ({paused}) => {
  if (paused) {
    return
  }

  const value = app.screen.game.scan.value()

  if (!value) {
    return
  }

  app.haptics.enqueue({
    duration: engine.loop.delta() * 1000,
    strongMagnitude: Math.random() * value,
    weakMagnitude: Math.random() * value,
  })
})

engine.ready(() => {
  app.screen.game.scan.on('trigger', () => {
    app.haptics.enqueue({
      duration: 100,
      startDelay: 200,
      strongMagnitude: 1,
      weakMagnitude: 1,
    })

    app.haptics.enqueue({
      duration: 100,
      startDelay: 400,
      strongMagnitude: 1,
      weakMagnitude: 1,
    })
  })
})
