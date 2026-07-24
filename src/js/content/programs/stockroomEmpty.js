content.programs.stockroomEmpty = content.programs.invent({
  id: 'stockroomEmpty',
  // Synthesis
  invertSynthX: () => true,
  // Particles
  alterParticle: function (particle) {
    const isShelf = 1
      * engine.fn.clamp(engine.fn.scale(Math.abs(particle.floor.x + 16) % 10, 0, 0.5, 0, 1))
      * engine.fn.clamp(engine.fn.scale(Math.abs(particle.floor.x + 16) % 10, 4.5, 5, 1, 0))
      * engine.fn.clamp(engine.fn.scale(Math.abs(particle.floor.y), 4.5, 5, 0, 1))

    particle.target.h = 0
    particle.target.s = 0
    particle.target.v = 1
    particle.target.x = particle.floor.x
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z + (isShelf * 3)
  },
  // Rumble
  useNavigationalRumble: () => true,
})
