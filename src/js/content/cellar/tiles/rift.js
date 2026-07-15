content.cellar.tiles.rift = content.cellar.tiles.invent({
  id: 'rift',
  name: 'The rift',
  uniquePerFloor: true,
  onEnterEffects: function () {
    // Health *= 0.5

    if (!content.cellar.health.has(2)) {
      return
    }

    content.cellar.health.set(
      Math.ceil(
        content.cellar.health.amount() * 0.5
      )
    )

    content.audio.sanityChange.trigger({isUp: false})

    this.effectsOnEnter.push({
      attribute: {
        label: 'Sanity drained',
        modifiers: [],
      },
    })
  },
  alterParticle: function (particle) {
    // TODO: Simplex noise subtracting the floor
  },
}, content.cellar.tiles.baseUnique)
