content.cellar.tiles.fountain = content.cellar.tiles.invent({
  id: 'fountain',
  name: 'The fountain',
  uniquePerFloor: true,
  weight: 4,
  defaultState: {
    uses: 0,
  },
  calculateCost: function (uses = this.state.uses + 1) {
    // Fibonacci sequence, starting at second term: 1, 2, 3, 5, 8, 13...
    let x = 1,
      y = 0

    for (let i = 0; i < uses; i += 1) {
      [x, y] = [x+y, x]
    }

    return x
  },
  canInteractMore: function () {
    return !content.cellar.health.isMax() && content.wallet.has(this.calculateCost())
  },
  getInteractLabelMore: () => 'Interact',
  incrementUses: function () {
    this.state.uses += 1

    return this
  },
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
  onInteractMore: function () {
    content.location.emit('cellar-fountain', {
      tile: this,
    })
  },
  alterParticle: function (particle) {
    // TODO: Opposite of pit
  },
}, content.cellar.tiles.baseUnique)
