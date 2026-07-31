content.cellar.tiles.nexus = content.cellar.tiles.invent({
  id: 'nexus',
  name: 'The nexus',
  isNexus: true,
  uniquePerFloor: true,
  weight: 4,
  getDialogs: () => [
    {
      title: `It's a teleporter.`,
      description: `Hourly, the obsolete machine might devour the sanity of a thousand <em>earthen suns</em>. Yet, you fancy its promising…`,
      actions: [
        {label: 'checkpoint.'},
        {label: 'touchstone.'},
        {label: 'loophole.'},
        {label: 'escape.'},
      ],
    },
    {
      tutorial: true,
      title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> The nexus`,
      description: `<kbd>Interact</kbd> to return to previously-visited locations.`,
    },
  ],
  canInteractMore: () => true,
  getEffects: function () {
    return [
      {
        attribute: {
          label: `Quantum teleporter`,
          modifiers: ['legendary'],
        },
      },
    ]
  },
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
    const originalDistance = vector.distance() / radius

    if (originalDistance > 1) {
      return
    }

    const time = content.time.value()

    vector = vector
      .normalize()
      .scale(0.5 + (0.5 * Math.sin(engine.const.tau * (time/5 + originalDistance))))
      .rotate(Math.sin(engine.const.tau * time/15 * particle.twinkleFrequencies[1]))

    const newDistance = vector.distance()

    vector = vector.scale(radius)

    particle.target.x = vector.x
    particle.target.y = vector.y
    particle.target.z += (1 - originalDistance) * 6

    particle.target.h += engine.fn.lerpExp(1/4, 0, newDistance, 0.1666)
    particle.target.s = 0.666 + (0.333 * Math.sin(engine.const.tau * time/3 * particle.twinkleFrequencies[0]))
  },
}, content.cellar.tiles.baseUnique)
