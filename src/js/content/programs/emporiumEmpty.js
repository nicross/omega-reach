content.programs.emporiumEmpty = content.programs.invent({
  id: 'emporiumEmpty',
  // Synthesis
  invertSynthX: () => true,
  // Particles
  alterParticle: function (particle) {
    particle.target.h = 0
    particle.target.s = 0
    particle.target.v = 1
    particle.target.x = particle.floor.x
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z
  },
  // Rumble
  useNavigationalRumble: () => true,
})
