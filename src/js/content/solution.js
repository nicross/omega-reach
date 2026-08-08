content.solution = (() => {
  const minSequentialDistance = 1

  const solutionStrategies = {
    gamepad: () => engine.tool.vector3d.create({
      x: engine.fn.randomFloat(-1, 1),
      y: engine.fn.randomFloat(-1, 1),
      z: engine.fn.randomFloat(-1, 1),
    }).normalize(),
    keyboard: () => engine.fn.choose([...Object.values(
      app.controls.interactions.keyboardMappings()
    )], Math.random()),
    midi: () => engine.fn.choose([...Object.values(
      app.controls.midi.getMappings()
    )], Math.random()),
    mouse: () => engine.tool.vector3d.create({
      x: engine.fn.randomFloat(0, 1),
      y: engine.fn.randomFloat(-1, 1),
      z: engine.fn.randomFloat(-1, 1),
    }).normalize(),
  }

  let isMirror = false,
    previous,
    solution

  return {
    generate: function () {
      if (solution) {
        previous = solution
      }

      if (!content.location.get()?.hasSolution()) {
        solution = undefined

        return this
      }

      const isInverted = content.programs.get()?.invertSynthX() ? -1 : 1

      do {
        solution = solutionStrategies[app.settings.computed.inputPreference]()
        solution.x *= isInverted
      } while (
           previous
        && previous.distance(solution) < minSequentialDistance
        && (!isMirror || previous.distance(solution) > 2 - minSequentialDistance)
      )

      return this
    },
    get: () => solution,
    has: () => Boolean(solution),
    isMirror: () => isMirror,
    reset: function () {
      previous = undefined
      solution = undefined

      return this
    },
    setMirror: function (value) {
      isMirror = Boolean(value)

      return this
    },
  }
})()

engine.state.on('reset', () => content.solution.reset())
