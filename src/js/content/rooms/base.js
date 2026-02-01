content.rooms.base = {
  // Attributes
  id: undefined,
  name: undefined,
  description: undefined,
  interactLabel: 'Examine',
  moveDownLabel: 'No down',
  moveLeftLabel: 'No left',
  moveRightLabel: 'No right',
  moveUpLabel: 'No up',
  // Transitions
  transitions: {},
  // State
  state: {},
  // Main methods
  export: function () {
    return {...this.state}
  },
  extend: function (definition) {
    return engine.fn.extend(this, definition)
  },
  import: function (state) {
    this.state = {...state}
    return this
  },
  // Attribute getters (override to return dynamic values)
  getAttributeLabels: function () {
    return []
  },
  getDescription: function () {
    return this.description
  },
  getInteractLabel: function () {
    return this.interactLabel
  },
  getMoveDownLabel: function () {
    return this.moveDownLabel
  },
  getMoveLeftLabel: function () {
    return this.moveLeftLabel
  },
  getMoveRightLabel: function () {
    return this.moveRightLabel
  },
  getMoveUpLabel: function () {
    return this.moveUpLabel
  },
  getName: function () {
    return this.name
  },
  isDiscovered: () => true,
  // Interaction
  canInteract: () => false,
  onInteract: () => {}, // Return a string to announce to interface
  // Movement
  canEnter: () => true,
  canMove: function (direction) {
    // TODO: Handle scrollable rooms

    return content.rooms.get(this.transitions[direction])?.canEnter()
      ?? false
  },
  canMoveDown: function () {
    return this.canMove('down')
  },
  canMoveLeft: function () {
    return this.canMove('left')
  },
  canMoveRight: function () {
    return this.canMove('right')
  },
  canMoveUp: function () {
    return this.canMove('up')
  },
  move: function (direction) {
    if (!this.canMove(direction)) {
      return this
    }

    // TODO: Handle scrollable rooms
    content.location.set(this.transitions[direction])

    return this
  },
  moveDown: function () {
    return this.move('down')
  },
  moveLeft: function () {
    return this.move('left')
  },
  moveRight: function () {
    return this.move('right')
  },
  moveUp: function () {
    return this.move('up')
  },
  onEnter: function () {},
  onExit: function () {},
}
