content.rooms.emporium = content.rooms.invent({
  // Attributes
  id: 'emporium',
  name: 'The emporium',
  description: 'Bereft of bidders',
  defaultProgram: 'emporiumEmpty',
  moveDownLabel: 'To the lobby',
  // Transitions
  transitions: {
    down: 'lobby',
  },
  // Methods
  isDiscovered: () => true,
  // Interactions
  canInteractFreely: () => true,
  // Atrium
  getAtriumMuffle: () => 13/16,
  getAtriumPan: () => 0,
  // Reach
  getReachMuffle: () => 1 - (1/32),
  getReachPan: () => 0,
})
