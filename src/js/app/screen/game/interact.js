app.screen.game.interact = (() => {
  const progressElement = document.querySelector('.a-game--interactProgress'),
    pubsub = engine.tool.pubsub.create(),
    rootElement = document.querySelector('.a-game--interact')

  let canInteract,
    isCooldown = false,
    value = 0

  rootElement.addEventListener('click', () => {
    if (!app.settings.computed.inputHold) {
      app.screen.game.interact.click()
    }
  })

  function trigger() {
    isCooldown = true

    pubsub.emit('trigger')
    console.log('interact trigger')

    app.screen.game.update()
  }

  return pubsub.decorate({
    click: function () {
      if (isCooldown || !canInteract) {
        return this
      }

      trigger()

      return this
    },
    decrement: function () {
      value = app.settings.computed.inputHold
        ? engine.fn.accelerateValue(value, 0, 8)
        : 0

      progressElement.style.width = `${value * 100}%`

      return this
    },
    increment: function () {
      if (isCooldown || !canInteract) {
        return this
      }

      value = app.settings.computed.inputHold
        ? engine.fn.accelerateValue(value, 1, 1/2)
        : 0

      progressElement.style.width = `${value * 100}%`

      if (value >= 1) {
        trigger()
      }

      return this
    },
    setCooldown: function (nextValue) {
      isCooldown = Boolean(nextValue)

      return this
    },
    update: function () {
      value = 0

      canInteract = Math.random() > 0.5

      if (app.settings.computed.inputHold) {
        rootElement.classList.remove('a-game--interact-instant')
      } else {
        rootElement.classList.add('a-game--interact-instant')
      }

      if (canInteract) {
        rootElement.removeAttribute('aria-disabled')
      } else {
        rootElement.setAttribute('aria-disabled', true)
      }

      progressElement.style.width = `0%`

      return this
    },
    value: () => value,
  })
})()
