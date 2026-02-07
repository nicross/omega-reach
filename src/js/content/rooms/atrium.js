content.rooms.atrium = content.rooms.invent({
  // Attributes
  id: 'atrium',
  name: 'The atrium',
  description: 'At the center of time',
  moveDownLabel: 'To the gallery',
  moveLeftLabel: 'To the lobby',
  moveRightLabel: 'To the shop',
  moveUpLabel: 'To the reach',
  // Transitions
  transitions: {
    up: 'reach',
    right: 'shop',
    down: 'gallery',
    left: 'lobby',
  },
  // Methods
  getAttributeLabels: function () {
    const attributes = []

    if (content.instruments.hasUnscanned()) {
      attributes.push({
        label: 'Unappraised instruments',
        modifiers: ['undiscovered'],
      })
    }

    return attributes
  },
})
