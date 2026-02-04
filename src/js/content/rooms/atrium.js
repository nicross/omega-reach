content.rooms.atrium = content.rooms.invent({
  // Attributes
  id: 'atrium',
  name: 'The atrium',
  description: 'At the center of time',
  moveDownLabel: 'To gallery',
  moveLeftLabel: 'To lobby',
  moveRightLabel: 'To shop',
  moveUpLabel: 'To reach',
  // Transitions
  transitions: {
    up: 'reach',
    right: 'shop',
    down: 'gallery',
    left: 'lobby',
  },
  // ...
})
