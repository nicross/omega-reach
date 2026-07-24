content.rooms.reliquary = content.rooms.invent({
  // Attributes
  id: 'reliquary',
  name: 'The reliquary',
  description: 'Bereft of relics',
  defaultProgram: 'reliquaryEmpty',
  moveUpLabel: 'To the lobby',
  // Transitions
  transitions: {
    up: 'lobby',
  },
  // Methods
  isDiscovered: () => true,
  // Interactions
  canInteractFreely: () => true,
  // Atrium
  getAtriumMuffle: () => 1,
  getAtriumPan: () => 0,
  // Reach
  getReachMuffle: () => 1 - (1/32),
  getReachPan: () => 1/2,
})
