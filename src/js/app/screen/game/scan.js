app.screen.game.scan = (() => {
  const progressElement = document.querySelector('.a-game--scanProgress'),
    rootElement = document.querySelector('.a-game--scan')

  let canScan,
    cooldown,
    value = 0

  rootElement.addEventListener('click', () => {
    if (!app.settings.computed.inputHold) {
      app.screen.game.scan.click()
    }
  })

  function trigger() {
    cooldown = true
    console.log('scan trigger')
    app.screen.game.update()
  }

  return {
    click: function () {
      if (cooldown || !canScan) {
        return this
      }

      trigger()

      return this
    },
    decrement: function () {
      cooldown = false

      value = app.settings.computed.inputHold
        ? engine.fn.accelerateValue(value, 0, 8)
        : 0

      progressElement.style.width = `${value * 100}%`

      return this
    },
    increment: function () {
      if (cooldown || !canScan) {
        return this
      }

      value = app.settings.computed.inputHold
        ? engine.fn.accelerateValue(value, 1, 2)
        : 0

      progressElement.style.width = `${value * 100}%`

      if (value >= 1) {
        trigger()
      }

      return this
    },
    update: function () {
      value = 0

      canScan = Math.random() > 0.5

      if (app.settings.computed.inputHold) {
        rootElement.classList.remove('a-game--scan-instant')
      } else {
        rootElement.classList.add('a-game--scan-instant')
      }

      if (canScan) {
        rootElement.removeAttribute('aria-disabled')
      } else {
        rootElement.setAttribute('aria-disabled', true)
      }

      progressElement.style.width = `0%`

      return this
    },
    value: () => value,
  }
})()
