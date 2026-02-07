content.rooms.moon = content.rooms.invent({
  // Attributes
  id: 'moon',
  name: '(Moon name)',
  description: '(Moon description)',
  moveDownLabel: 'Zoom out',
  moveLeftLabel: 'Previous moon',
  moveRightLabel: 'Next moon',
  // Transitions
  transitions: {
    down: 'planet',
  },
  // State
  state: {},
  // Methods
  getMoon: function () {
    return this.state.name
      ? content.moons.get(this.state.name)
      : undefined
  },
  getDescription: function () {
    const moon = this.getMoon()

    return content.scans.is(moon.name)
      ? moon.type
      : 'Unexamined'
  },
  getName: function () {
    return this.getMoon().name
  },
  getNameShort: function () {
    return this.getName().split(' ').pop()
  },
  isDiscovered: function () {
    return content.scans.is(this.getMoon().name)
  },
  setMoonByName: function (name) {
    this.state.name = name

    return this
  },
  // Interaction
  canInteract: function () {
    const moon = this.getMoon()

    return content.scans.get(moon.name) < 1 + moon.quirks.length + (moon.instrument ? 1 : 0)
  },
  onInteract: function () {
    const moon = this.getMoon()
    const scans = content.scans.increment(moon.name)

    // Initial scan
    if (scans == 1) {
      const message = []

      if (moon.quirks.length) {
        message.push(`${moon.quirks.length} quirk${moon.quirks.length == 1 ? '' : 's'} detected`)
      }

      return message.join(', ')
    }

    // Quirks
    if (scans < 1 + moon.quirks.length) {
      return `${moon.quirks[scans - 2].name} found`
    }

    // Instrument
    content.instruments.add(moon.name)

    return `Instrument recovered`
  },
  // Attributes
  getAttributeLabels: function () {
    const moon = this.getMoon()
    const scans = content.scans.get(moon.name)

    if (!scans) {
      return []
    }

    const attributes = []

    for (const i in moon.quirks) {
      const quirk = moon.quirks[i]

      if (scans - 1 > i) {
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

    if (moon.instrument) {
      if (scans > 1 + moon.quirks.length) {
        attributes.push({
          label: 'Instrument recovered',
          modifiers: ['instrument'],
        })
      } else {
        attributes.push({
          label: 'Unrecovered instrument',
          modifiers: ['undiscovered','instrument'],
        })
      }
    }

    return attributes
  },
  // Movement
  canEnter: () => content.moons.namesForPlanet(content.rooms.planet.getPlanet()?.name).length > 0,
  canMoveLeft: () => content.moons.namesForPlanet(content.rooms.planet.getPlanet()?.name).length > 1,
  canMoveRight: () => content.moons.namesForPlanet(content.rooms.planet.getPlanet()?.name).length > 1,
  getMoveUpLabel: function () {
    return this.canMoveUp() ? 'Zoom in' : 'Max zoom reached'
  },
  moveLeft: function () {
    const names = content.moons.namesForMoon(this.getMoon().name)

    this.setMoonByName(
      names[
        engine.fn.wrap(names.indexOf(this.state.name) - 1, 0, names.length)
      ]
    )

    return this.move('left')
  },
  moveRight: function () {
    const names = content.moons.namesForMoon(this.getMoon().name)

    this.setMoonByName(
      names[
        engine.fn.wrap(names.indexOf(this.state.name) + 1, 0, names.length)
      ]
    )

    return this.move('right')
  },
})
