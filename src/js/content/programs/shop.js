content.programs.shop = content.programs.invent({
  id: 'shop',
  fieldDefinitions: {
    flicker: {type: '1d'},
  },
  // Synthesis
  invertSynthX: function () {
    return !content.solution.has()
  },
  // Particles
  alterParticle: function (particle) {
    const isOnline = content.rooms.reach.state.online,
      isStockroom = engine.fn.between(particle.floor.y, 10, 15) && content.stockroom.isOpen(),
      time = content.time.value()

    const isCountertop = Math.min(
      engine.fn.clamp(engine.fn.scale(particle.floor.x, -8.5, -7.5, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.x, -2.5, -1.5, 1, 0)),
      Math.max(
        engine.fn.clamp(engine.fn.scale(particle.floor.y, -10, -9, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.y, 9, 10, 1, 0)),
        engine.fn.clamp(engine.fn.scale(particle.floor.y, 15, 16, 0, 1)),
      ),
    )

    particle.target.h = engine.fn.lerp(-25, 25, content.fn.gain(this.fields.flicker.valueAt({x: time}, 6), 1.5)) / 360
    particle.target.s = 0
    particle.target.v = 1
    particle.target.x = isStockroom ? particle.floor.x : Math.max(particle.floor.x, particle.floor.y > -10 ? -10 : -20)
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z + (isCountertop * 1) + (particle.floor.y > -10 ? Math.max(0, -particle.floor.x - 10) : Math.max(0, -particle.floor.x - 20))

    if (isStockroom) {
      particle.target.z = particle.floor.z
    }

    // Atrium waterfall
    if (particle.floor.y < -10 && particle.floor.x <= -20) {
      particle.target.h = isOnline ? particle.target.h : engine.fn.scale(Math.sin(engine.const.tau * time * particle.twinkleFrequencies[0]), -1, 1, -1/2, -1/4)
      particle.target.s = engine.fn.scale(Math.sin(engine.const.tau * time * particle.twinkleFrequencies[1]), -1, 1, 0.333, 1)
      particle.target.v = engine.fn.scale(Math.sin(engine.const.tau * time * particle.twinkleFrequencies[2]), -1, 1, 0, 1)
      particle.target.z = particle.target.z - particle.floor.z + engine.fn.wrap(particle.target.z - (time * 0.333), particle.floor.z, particle.target.z)
    }
  },
  // Rumble
  useNavigationalRumble: () => true,
})
