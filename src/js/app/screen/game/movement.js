app.screen.game.movement = (() => {
  const downElement = document.querySelector('.a-game--down'),
    leftElement = document.querySelector('.a-game--left'),
    rightElement = document.querySelector('.a-game--right'),
    upElement = document.querySelector('.a-game--up')

  let canDown = false,
    canLeft = false,
    canRight = false,
    canUp = false

  return {
    down: function () {
      if (!canDown) {
        return this
      }

      content.location.get().moveDown()
      app.screen.game.update()

      return this
    },
    left: function () {
      if (!canLeft) {
        return this
      }

      content.location.get().moveLeft()
      app.screen.game.update()

      return this
    },
    right: function () {
      if (!canRight) {
        return this
      }

      content.location.get().moveRight()
      app.screen.game.update()

      return this
    },
    up: function () {
      if (!canUp) {
        return this
      }

      content.location.get().moveUp()
      app.screen.game.update()

      return this
    },
    update: function () {
      const room = content.location.get()

      // Down
      canDown = room.canMoveDown()

      const downLabel = room.getMoveDownLabel()

      downElement.ariaLabel = downLabel
      downElement.title = downLabel

      if (canDown) {
        downElement.removeAttribute('aria-disabled')
      } else {
        downElement.setAttribute('aria-disabled', true)
      }

      // Left
      canLeft = room.canMoveLeft()

      const leftLabel = room.getMoveLeftLabel()

      leftElement.ariaLabel = leftLabel
      leftElement.title = leftLabel

      if (canLeft) {
        leftElement.removeAttribute('aria-disabled')
      } else {
        leftElement.setAttribute('aria-disabled', true)
      }

      // Right
      canRight = room.canMoveRight()

      const rightLabel = room.getMoveRightLabel()

      rightElement.ariaLabel = rightLabel
      rightElement.title = rightLabel

      if (canRight) {
        rightElement.removeAttribute('aria-disabled')
      } else {
        rightElement.setAttribute('aria-disabled', true)
      }

      // Up
      canUp = room.canMoveUp()

      const upLabel = room.getMoveUpLabel()

      upElement.ariaLabel = upLabel
      upElement.title = upLabel

      if (canUp) {
        upElement.removeAttribute('aria-disabled')
      } else {
        upElement.setAttribute('aria-disabled', true)
      }

      return this
    },
  }
})()
