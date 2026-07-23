content.programs.emporiumEmpty = content.programs.invent({
  id: 'emporiumEmpty',
  // Synthesis
  invertSynthX: () => true,
  // Particles
  alterParticle: function (particle) {
    const isStage = Math.min(
      engine.fn.clamp(engine.fn.scale(particle.floor.x, -20, -22, 0, 1)),
      engine.fn.clamp(engine.fn.scale(Math.abs(particle.floor.y), 17, 15, 0, 1)),
    )

    const isPodium = Math.min(
      engine.fn.clamp(engine.fn.scale(particle.floor.x, -20, -22, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.x, -24, -26, 1, 0)),
      engine.fn.clamp(engine.fn.scale(particle.floor.y, -3, -2, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.y, 2, 3, 1, 0)),
    )

    const seatingY = engine.fn.clamp(engine.fn.scale(Math.abs(particle.floor.y), 22, 20, 0, 1))

    const isSeating = Math.max(
      Math.min(
        engine.fn.clamp(engine.fn.scale(particle.floor.x, -10, -12, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.x, -14, -16, 1, 0)),
        seatingY,
      ),
      Math.min(
        engine.fn.clamp(engine.fn.scale(particle.floor.x, -0, -2, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.x, -4, -6, 1, 0)),
        seatingY,
      ),
      Math.min(
        engine.fn.clamp(engine.fn.scale(particle.floor.x, 10, 8, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.x, 8, 6, 1, 0)),
        seatingY,
      ),
    ) * engine.fn.clamp(engine.fn.scale(Math.abs(particle.floor.y), 1.25, 3.25, 0, 1))

    particle.target.h = 0
    particle.target.s = 0
    particle.target.v = 1
    particle.target.x = particle.floor.x
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z + (isStage * 2) + (isPodium * 1) + (isSeating * 1)
  },
  // Rumble
  useNavigationalRumble: () => true,
})
