content.rooms.atrium = content.rooms.invent({
  // Attributes
  id: 'atrium',
  name: 'The Atrium',
  description: 'At the center of time',
  moveDownLabel: 'To Gallery',
  moveLeftLabel: 'To Lobby',
  moveRightLabel: 'To Shop',
  moveUpLabel: 'To Reach',
  // Transitions
  transitions: {
    up: 'reach',
    down: 'gallery',
  },
  // ...
})
