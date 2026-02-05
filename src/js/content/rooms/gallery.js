content.rooms.gallery = content.rooms.invent({
  // Attributes
  id: 'gallery',
  name: 'The gallery',
  description: 'Bereft of instruments',
  moveLeftLabel: 'Previous instrument',
  moveRightLabel: 'Next instrument',
  moveUpLabel: 'To the atrium',
  // Transitions
  transitions: {
    up: 'atrium',
  },
  // ...
})
