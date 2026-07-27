content.cellar.tiles.kiln = content.cellar.tiles.invent({
  id: 'kiln',
  name: 'The kiln',
  uniquePerRun: true,
  weight: 1,
  defaultState: {
    entered: false,
    exited: false,
  },
  effectsGlobal: [
    {
      attribute: {
        label: 'Instrument recovered',
        modifiers: ['instrument'],
      },
    },
  ],
  onEnterEffects: function () {
    if (this.state.entered) {
      return
    }

    content.instruments.add(
      content.cellar.instruments.generateUniqueName()
    )

    content.audio.interactSuccess.trigger({
      index: 2,
    })

    content.audio.interactComplete.trigger()

    this.state.entered = true
  },
  onExitEffects: function () {
    this.state.exited = true
  },
  alterParticle: function (particle) {
    const radius = 10,
      square = 10

    if (Math.abs(particle.target.x) > square || Math.abs(particle.target.y) > square) {
      return
    }

    const distance = 1 - (engine.tool.vector2d.create(particle.target).distance() / radius)

    if (distance < 0) {
      return
    }

    // TODO: mound with excited particles when !this.state.exited
  },
}, content.cellar.tiles.baseUnique)
