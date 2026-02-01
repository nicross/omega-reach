content.rooms.reach = content.rooms.invent({
  // Attributes
  id: 'reach',
  name: 'The Reach',
  description: 'Beyond the end of time',
  moveDownLabel: 'To Atrium',
  moveUpLabel: 'Zoom In',
  // Transitions
  transitions: {
    up: 'horizon',
    down: 'atrium',
  },
  // State
  state: {
    online: false,
  },
  // Interaction
  canInteract: () => true,
  onInteract: function () {
    this.state.online = !this.state.online

    return this.getAttributeLabels()[0]?.label
  },
  // Attributes
  getAttributeLabels: function () {
    return [
      {
        label: `Reach ${this.state.online ? 'online' : 'offline'}`,
        modifiers: this.state.online ? [] : ['undiscovered'],
      },
    ]
  },
  // ...
})
