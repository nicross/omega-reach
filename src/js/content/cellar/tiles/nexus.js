content.cellar.tiles.nexus = content.cellar.tiles.invent({
  id: 'nexus',
  name: 'The nexus',
  uniquePerFloor: true,
  weight: 4,
  getDialogs: () => [
    {
      title: `It's a checkpoint.`,
      description: ``,
    },
    {
      tutorial: true,
      title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> The nexus`,
      description: `<kbd>Interact</kbd> to return to a previously-visited location.`,
    },
  ],
  canInteractMore: () => true,
  getInteractLabelMore: () => 'Teleport',
  onInteractMore: function () {
    content.location.emit('cellar-nexus', {
      tile: this,
    })
  },
  alterParticle: function (particle) {
    const radius = 3.333

    if (Math.abs(particle.target.x) > radius || Math.abs(particle.target.y) > radius) {
      return
    }

    let vector = engine.tool.vector2d.create(particle.target)
    const distance = vector.distance() / radius

    if (distance > 1) {
      return
    }

    const time = content.time.value()

    vector = vector
      .normalize()
      .scale(0.5 + (0.5 * Math.sin(engine.const.tau * (time/5 + distance))))
      .scale(radius)
      .rotate(Math.sin(engine.const.tau * time/15 * particle.twinkleFrequencies[1]))

    particle.target.x = vector.x
    particle.target.y = vector.y
    particle.target.z += (1 - distance) * 4

    particle.target.s = 0.666 + (0.333 * Math.sin(engine.const.tau * time * particle.twinkleFrequencies[2]))
  },
}, content.cellar.tiles.baseUnique)
