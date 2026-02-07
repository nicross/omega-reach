content.rooms.horizon = content.rooms.invent({
  // Attributes
  id: 'horizon',
  name: 'The horizon',
  description: 'Zooming into focus',
  moveDownLabel: 'Zoom out',
  moveUpLabel: 'Zoom in',
  // Transitions
  transitions: {
    up: 'galaxy',
    down: 'reach',
  },
  // Interaction
  canInteract: () => true,
  onInteract: function () {
    const galaxy = content.galaxies.new()

    content.rooms.galaxy.setGalaxyByName(galaxy.name)
    content.rooms.star.reset()
    content.rooms.planet.reset()
    content.rooms.moon.reset()

    content.location.set('galaxy')
  },
  // Attributes
  getAttributeLabels: function () {
    return [
      {
        label: 'Unexamined galaxies',
        modifiers: ['undiscovered'],
      },
    ]
  },
  // Movement
  canEnter: () => Boolean(content.rooms.reach.state.online),
})
