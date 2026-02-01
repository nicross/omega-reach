app.screen.game.scan = (() => {
  const progressElement = document.querySelector('.a-game--scanProgress'),
    rootElement = document.querySelector('.a-game--scan')

  let canScan,
    cooldown,
    value = 0

  return {
    click: function () {
      if (cooldown || !canScan) {
        return this
      }

      value = app.settings.computed.inputHold
        ? engine.fn.accelerateValue(value, 1, 2)
        : 0

      progressElement.style.width = `${value * 100}%`

      if (value >= 1 || !app.settings.computed.inputHold) {
        cooldown = true
        console.log('scan click')
      }

      return this
    },
    decrement: function () {
      if (cooldown || !canScan) {
        return this
      }

      value = app.settings.computed.inputHold
        ? engine.fn.accelerateValue(value, 0, 8)
        : 0

      progressElement.style.width = `${value * 100}%`

      return this
    },
    update: function () {
      cooldown = false
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
