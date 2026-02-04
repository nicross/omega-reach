content.rooms.shop = content.rooms.invent({
  // Attributes
  id: 'lobby',
  name: 'The lobby',
  description: 'Closed for the season',
  moveRightLabel: 'To atrium',
  // Transitions
  transitions: {
    right: 'atrium',
  },
  // ...
})
