content.rooms.shop = content.rooms.invent({
  // Attributes
  id: 'shop',
  name: 'The shop',
  description: 'Out for lunch',
  moveLeftLabel: 'To the atrium',
  // Transitions
  transitions: {
    left: 'atrium',
  },
  // ...
})
