app.debug = {}

app.debug.enqueueMovement = async function (directions = [], delay = 1000/3) {
  for (const direction of directions) {
    await engine.fn.promise(delay)
    app.screen.game.movement[direction]()
  }
}
