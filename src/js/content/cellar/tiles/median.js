content.cellar.tiles.median = content.cellar.tiles.invent({
  id: 'median',
  name: 'The median',
  uniquePerFloor: true,
  onEnterEffects: function () {
    // Health set to 50% max

    const health = content.cellar.health.amount(),
      target = Math.ceil(content.cellar.health.amount() * 0.5)

    if (health == target) {
      return
    }

    content.cellar.health.set(target)
    content.audio.sanityChange.trigger({isUp: health < target})

    this.effectsOnEnter.push({
      attribute: {
        label: `Sanity ${health < target ? 'restored' : 'drained'}`,
        modifiers: [],
      },
    })
  },
  alterParticle: function (particle) {
    // TODO: Spinning ridge, oscillating in thickness
  },
}, content.cellar.tiles.baseUnique)
