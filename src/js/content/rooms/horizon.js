content.rooms.horizon = content.rooms.invent({
  // Attributes
  id: 'horizon',
  name: 'The Horizon',
  description: 'Zooming into focus',
  moveDownLabel: 'Zoom out',
  moveUpLabel: 'Zoom in',
  // Transitions
  transitions: {
    down: 'reach',
  },
  // Interaction
  canInteract: () => true,
  onInteract: function () {
    // TODO: Galaxy discovery
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
