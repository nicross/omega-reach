content.rooms.horizon = content.rooms.invent({
  // Attributes
  id: 'horizon',
  name: 'The Horizon',
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
    content.rooms.galaxy.state = {name: galaxy.name}
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
