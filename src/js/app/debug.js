app.debug = {}

app.debug.drawCellarMap = function (radius = 5, position = content.cellar.position.get()) {
  const map = []

  for (let y = position.y + radius; y >= position.y - radius; y -= 1) {
    let row = []

    for (let x = position.x - radius; x <= position.x + radius; x += 1) {
      row.push(
        content.cellar.tiles.isOffLimits({x, y, z: position.z}) ? 'X' : ' '
      )
    }

    map.push(row)
  }

  return map
}

app.debug.enqueueMovement = async function (directions = [], delay = 1000/3) {
  for (const direction of directions) {
    await engine.fn.promise(delay)
    app.screen.game.movement[direction]()
  }
}
