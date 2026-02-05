content.rooms.star = content.rooms.invent({
  // Attributes
  id: 'star',
  name: '(Star name)',
  description: '(Star description)',
  moveDownLabel: 'Zoom out',
  moveLeftLabel: 'Previous star',
  moveRightLabel: 'Next star',
  moveUpLabel: 'Zoom in',
  // Transitions
  transitions: {
    up: 'planet',
    down: 'galaxy',
  },
  // State
  state: {},
  // Methods
  getStar: function () {
    return this.state.name
      ? content.stars.get(this.state.name)
      : undefined
  },
  getDescription: function () {
    const star = this.getStar()

    return content.stars.scanCount(star.name) > 0
      ? star.type
      : 'Unexamined'
  },
  getName: function () {
    return this.getStar().name
  },
  isDiscovered: function () {
    return content.stars.scanCount(this.getStar().name) > 0
  },
  setStarByName: function (name) {
    this.state.name = name

    return this
  },
  // Interaction
  canInteract: function () {
    const star = this.getStar()

    return content.stars.scanCount(star.name) < star.quirks.length + 1
  },
  onInteract: function () {
    const star = this.getStar()
    const scanCount = content.stars.scan(star.name)

    // Initial scan
    if (scanCount == 1) {
      const message = []

      if (star.children) {
        message.push(`${star.children} planet${star.children == 1 ? '' : 's'} detected`)
      }

      if (star.quirks.length) {
        message.push(`${star.quirks.length} quirk${star.quirks.length == 1 ? '' : 's'} detected`)
      }

      return message.join(', ')
    }

    return `${star.quirks[scanCount - 2].name} found`
  },
  // Attributes
  getAttributeLabels: function () {
    const star = this.getStar()
    const scanCount = content.stars.scanCount(this.getStar().name)

    if (!scanCount) {
      return []
    }

    const attributes = []

    if (scanCount > 0 && star.children > 0) {
      attributes.push({
        label: `${star.children} planet${star.children == 1 ? '' : 's'}`,
        modifiers: [star.children > 8 ? 'rare' : ''],
      })
    }

    for (const i in star.quirks) {
      const quirk = star.quirks[i]

      if (scanCount - 1 > i) {
        attributes.push({
          label: quirk.name,
          modifiers: [quirk.isRare ? 'rare' : ''],
        })
      } else {
        attributes.push({
          label: 'Unexamined quirk',
          modifiers: ['undiscovered'],
        })
      }
    }

    return attributes
  },
  // Movement
  canEnter: () => content.stars.namesForGalaxy(content.rooms.galaxy.getGalaxy()?.name).length > 0,
  canMoveLeft: () => content.stars.namesForGalaxy(content.rooms.galaxy.getGalaxy()?.name).length > 1,
  canMoveRight: () => content.stars.namesForGalaxy(content.rooms.galaxy.getGalaxy()?.name).length > 1,
  moveLeft: function () {
    const names = content.stars.namesForStar(this.getStar().name)

    this.setStarByName(
      names[
        engine.fn.wrap(names.indexOf(this.state.name) - 1, 0, names.length)
      ]
    )

    return this.move('left')
  },
  moveRight: function () {
    const names = content.stars.namesForStar(this.getStar().name)

    this.setStarByName(
      names[
        engine.fn.wrap(names.indexOf(this.state.name) + 1, 0, names.length)
      ]
    )

    return this.move('right')
  },
})
