content.programs.reliquaryEmpty = content.programs.invent({
  id: 'reliquaryEmpty',
  // Synthesis
  invertSynthX: () => true,
  // Particles
  alterParticle: function (particle) {
    const radius = 2.5,
      y = 10

    const distances = [
      engine.tool.vector2d.create({x: -40, y}).distance(particle.target),
      engine.tool.vector2d.create({x: -40, y: -y}).distance(particle.target),
      engine.tool.vector2d.create({x: -30, y}).distance(particle.target),
      engine.tool.vector2d.create({x: -30, y: -y}).distance(particle.target),
      engine.tool.vector2d.create({x: -20, y}).distance(particle.target),
      engine.tool.vector2d.create({x: -20, y: -y}).distance(particle.target),
      engine.tool.vector2d.create({x: -10, y}).distance(particle.target),
      engine.tool.vector2d.create({x: -10, y: -y}).distance(particle.target),
      engine.tool.vector2d.create({x: 0, y}).distance(particle.target),
      engine.tool.vector2d.create({x: 0, y: -y}).distance(particle.target),
    ]

    const closest = Math.min(...distances)

    const isPedestal = closest < radius
      ? content.fn.gain((1 - (closest / radius)) ** 0.75, 2)
      : 0

    particle.target.h = 0
    particle.target.s = 0
    particle.target.v = 1
    particle.target.x = particle.floor.x
    particle.target.y = particle.floor.y
    particle.target.z = particle.floor.z + (isPedestal * 2.5)
  },
  // Rumble
  useNavigationalRumble: () => true,
})
