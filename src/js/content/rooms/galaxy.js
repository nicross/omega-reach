content.rooms.galaxy = content.rooms.invent({
  // Attributes
  id: 'galaxy',
  name: '(Galaxy name)',
  description: '(Galaxy description)',
  moveDownLabel: 'Zoom out',
  moteLeftLabel: 'Previous galaxy',
  moteRightLabel: 'Next galaxy',
  moveUpLabel: 'Zoom in',
  // Transitions
  transitions: {
    up: 'star',
    down: 'horizon',
  },
  // Methods
  getDescription: function () {
    return content.galaxies.get(this.state.name).description
  },
  getName: function () {
    return this.state.name
  },
  // Interaction
  canInteract: () => true,
  onInteract: function () {
    // TODO: Discover star
  },
  // Attributes
  getAttributeLabels: function () {
    return [
      {
        label: 'Unexamined stars',
        modifiers: ['undiscovered'],
      },
    ]
  },
  // Movement
  canEnter: () => content.galaxies.names().length > 0,
  canMoveLeft: () => content.galaxies.names().length > 1,
  canMoveRight: () => content.galaxies.names().length > 1,
  moveLeft: function () {
    const names = content.galaxies.names()

    this.state.name = names[
      engine.fn.wrap(names.indexOf(this.state.name) - 1, 0, names.length)
    ]

    return this.move('left')
  },
  moveRight: function () {
    const names = content.galaxies.names()

    this.state.name = names[
      engine.fn.wrap(names.indexOf(this.state.name) + 1, 0, names.length)
    ]

    return this.move('right')
  },
})
