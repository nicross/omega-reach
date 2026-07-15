content.cellar.tiles.pit = content.cellar.tiles.invent({
  id: 'pit',
  name: 'The pit',
  uniquePerRun: true,
  weight: 1/12,
  onEnterEffects: function () {
    if (!content.cellar.health.has(2)) {
      return
    }

    content.cellar.health.subtract(1)
    content.audio.sanityChange.trigger({isUp: false})

    this.effectsOnEnter.push({
      attribute: {
        label: 'Sanity drained',
        modifiers: [],
      },
    })
  },
  alterParticle: function (particle) {
    const radius = 10

    if (Math.abs(particle.target.x) > radius || Math.abs(particle.target.y) > radius) {
      return
    }

    let vector = engine.tool.vector2d.create(particle.target)
    const distance = 1 - (vector.distance() / radius)

    if (distance < 0) {
      return
    }

    const time = content.time.value()

    vector = vector.rotate(
      engine.const.tau * time * 0.05 * distance
    )

    particle.target.x = vector.x
    particle.target.y = vector.y
    particle.target.z -= distance * 2

    particle.target.v *= 1 - distance
  },
}, content.cellar.tiles.baseUnique)
