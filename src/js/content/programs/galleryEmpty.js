content.programs.galleryEmpty = content.programs.invent({
  id: 'galleryEmpty',
  // Synthesis
  invertSynthX: () => true,
  // Particles
  alterParticle: function (particle) {
    const isExhibit = Math.max(
      engine.fn.clamp(engine.fn.scale(particle.floor.y, -28.5, -27.5, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.y, -25, -24, 1, 0)),
      engine.fn.clamp(engine.fn.scale(particle.floor.y, 24, 25, 0, 1)) * engine.fn.clamp(engine.fn.scale(particle.floor.y, 27.5, 28.5, 1, 0)),
    )

    particle.target.h = 0
    particle.target.s = 0
    particle.target.v = 1
    particle.target.x = particle.floor.x
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z + (isExhibit * 1)
  },
  // Rumble
  useNavigationalRumble: () => true,
})
