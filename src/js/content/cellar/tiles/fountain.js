content.cellar.tiles.fountain = content.cellar.tiles.invent({
  id: 'fountain',
  name: 'The fountain',
  uniquePerFloor: true,
  weight: 4,
  onEnterEffects: function () {
    // Add one health

    if (content.cellar.health.isMax()) {
      return
    }

    content.cellar.health.add(1)
    content.audio.sanityChange.trigger({isUp: true})

    this.effectsOnEnter.push({
      attribute: {
        label: 'Sanity recovered',
        modifiers: [],
      },
    })
  },
  alterParticle: function (particle) {
    // TODO: Opposite of pit
  },
}, content.cellar.tiles.baseUnique)
