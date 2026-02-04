content.rooms.gallery = content.rooms.invent({
  // Attributes
  id: 'gallery',
  name: 'The gallery',
  description: 'Devoid of instruments',
  moveLeftLabel: 'Previous instrument',
  moveRightLabel: 'Next instrument',
  moveUpLabel: 'To Atrium',
  // Transitions
  transitions: {
    up: 'atrium',
  },
  // ...
})
