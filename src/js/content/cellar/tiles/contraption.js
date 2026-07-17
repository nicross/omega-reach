content.cellar.tiles.contraption = content.cellar.tiles.invent({
  id: 'contraption',
  name: 'The contraption',
  uniquePerFloor: true,
  defaultState: {
    delta: 0,
  },
  onEnterEffects: function () {
    // Health trends toward zero or max, whichever is closest

    if (!content.cellar.health.has(2) || content.cellar.health.isMax()) {
      return
    }

    const health = content.cellar.health.amount(),
      midpoint = Math.floor(content.cellar.health.max() * 0.5)

    this.state.delta = 0

    if (health < midpoint) {
      this.state.delta = -1

      content.cellar.health.subtract(1)
      content.audio.sanityChange.trigger({isUp: false})

      this.effectsOnEnter.push({
        attribute: {
          label: `Sanity drained`,
          modifiers: [],
        },
      })
    } else if (health > midpoint) {
      this.state.delta = 1

      content.cellar.health.add(1)
      content.audio.sanityChange.trigger({isUp: true})

      this.effectsOnEnter.push({
        attribute: {
          label: `Sanity recovered`,
          modifiers: [],
        },
      })
    }
  },
  alterParticle: function (particle) {
    // TODO: Like ziggurat, but contracts/retracts from center (+/- based on this.state.delta)
  },
}, content.cellar.tiles.baseUnique)
