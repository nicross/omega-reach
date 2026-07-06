content.rooms.lobby = content.rooms.invent({
  // Attributes
  id: 'lobby',
  name: 'The lobby',
  description: 'Closed to visitors',
  defaultProgram: 'lobby',
  moveDownLabel: 'To the reliquary',
  moveRightLabel: 'To the atrium',
  moveUpLabel: 'To the emporium',
  // Transitions
  transitions: {
    down: 'reliquary',
    right: 'atrium',
    up: 'emporium',
  },
  // Methods
  getDescription: function () {
    return this.isOpen()
      ? 'Open to visitors'
      : 'Closed to visitors'
  },
  isDiscovered: function () {
    return this.isOpen()
  },
  isOpen: () => content.conservatory.isOpen(),
  // Interactions
  canInteractFreely: () => true,
  // Atrium
  getAtriumMuffle: () => 1/4,
  getAtriumPan: () => 2/3,
  // Reach
  getReachMuffle: () => 1 - (1/4),
  getReachPan: () => 1/2,
})
