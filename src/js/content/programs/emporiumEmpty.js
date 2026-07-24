content.programs.emporiumEmpty = content.programs.invent({
  id: 'emporiumEmpty',
  // Synthesis
  invertSynthX: () => true,
  // Particles
  alterParticle: function (particle) {
    const isPodium = Math.min(
      engine.fn.clamp(engine.fn.scale(particle.floor.x, -34, -35, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.x, -37.5, -38.5, 1, 0)),
      engine.fn.clamp(engine.fn.scale(particle.floor.y, -3.5, -2.5, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.y, 2.5, 3.5, 1, 0)),
    )

    const isSeating = particle.floor.x > -30

    particle.target.h = isSeating ? 0 : 35/360
    particle.target.s = isSeating ? 0 : (1 - engine.fn.clamp(Math.abs(particle.floor.y) / 30)) ** 4
    particle.target.v = isSeating ? (engine.fn.clamp(engine.fn.scale(particle.floor.x, 10, -30, 1, 0)) ** 1) : ((1 - engine.fn.clamp(Math.abs(particle.floor.y) / 30)) ** 1)
    particle.target.x = isSeating ? Math.round(particle.floor.x) : particle.floor.x * 2
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z + (engine.fn.clamp(engine.fn.scale(particle.target.x, 10, -30, 0, 1)) * -5) + (isPodium * 2)
  },
  // Rumble
  useNavigationalRumble: () => true,
})
