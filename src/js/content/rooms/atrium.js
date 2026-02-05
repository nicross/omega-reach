content.rooms.atrium = content.rooms.invent({
  // Attributes
  id: 'atrium',
  name: 'The atrium',
  description: 'At the center of time',
  moveDownLabel: 'To the gallery',
  moveLeftLabel: 'To the lobby',
  moveRightLabel: 'To the shop',
  moveUpLabel: 'To the reach',
  // Transitions
  transitions: {
    up: 'reach',
    right: 'shop',
    down: 'gallery',
    left: 'lobby',
  },
  // ...
})
