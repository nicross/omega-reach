content.cellar.tiles.juncture = content.cellar.tiles.invent({
  id: 'juncture',
  name: 'The juncture',
  uniquePerFloor: true,
  onEnterEffects: function () {
    // Health *= 1.5

    if (content.cellar.health.isMax()) {
      return
    }

    content.cellar.health.set(
      Math.round(
        content.cellar.health.amount() * 1.5
      )
    )

    content.audio.sanityChange.trigger({isUp: true})

    this.effectsOnEnter.push({
      attribute: {
        label: 'Sanity recovered',
        modifiers: [],
      },
    })
  },
  alterParticle: function (particle) {
    // TODO: Particles moving toward center
  },
}, content.cellar.tiles.baseUnique)
