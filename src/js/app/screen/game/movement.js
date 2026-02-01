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

      console.log('moved down')
      app.screen.game.update()

      return this
    },
    left: function () {
      if (!canLeft) {
        return this
      }

      console.log('moved left')
      app.screen.game.update()

      return this
    },
    right: function () {
      if (!canRight) {
        return this
      }

      console.log('moved right')
      app.screen.game.update()

      return this
    },
    up: function () {
      if (!canUp) {
        return this
      }

      console.log('moved up')
      app.screen.game.update()

      return this
    },
    update: function () {
      // Down
      canDown = Math.random() > 0.5

      const downLabel = 'Move down'

      downElement.ariaLabel = downLabel
      downElement.title = downLabel

      if (canDown) {
        downElement.removeAttribute('aria-disabled')
      } else {
        downElement.setAttribute('aria-disabled', true)
      }

      // Left
      canLeft = Math.random() > 0.5

      const leftLabel = 'Move left'

      leftElement.ariaLabel = leftLabel
      leftElement.title = leftLabel

      if (canLeft) {
        leftElement.removeAttribute('aria-disabled')
      } else {
        leftElement.setAttribute('aria-disabled', true)
      }

      // Right
      canRight = Math.random() > 0.5

      const rightLabel = 'Move right'

      rightElement.ariaLabel = rightLabel
      rightElement.title = rightLabel

      if (canRight) {
        rightElement.removeAttribute('aria-disabled')
      } else {
        rightElement.setAttribute('aria-disabled', true)
      }

      // Up
      canUp = Math.random() > 0.5

      const upLabel = 'Move right'

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
