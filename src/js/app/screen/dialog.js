app.screen.game.dialog = (() => {
  const queue = []

  const rootElement = document.querySelector('.a-game--dialog')

  const actionsElement = document.querySelector('.a-game--dialogActions'),
    descriptionElement = document.querySelector('.a-game--dialogDescription'),
    textElement = document.querySelector('.a-game--dialogText'),
    titleElement = document.querySelector('.a-game--dialogTitle')

  let isOpen

  rootElement.setAttribute('aria-hidden', 'true')
  app.utility.focus.trap(rootElement)

  function close() {
    app.screen.game.rootElement.classList.remove('a-game-dialog')

    document.querySelector('.a-game--info').removeAttribute('aria-hidden')
    document.querySelector('.a-game--nav').removeAttribute('aria-hidden')

    app.utility.focus.set(app.screen.game.rootElement)
    rootElement.setAttribute('aria-hidden', true)

    isOpen = false
  }

  function render({
    actions = [],
    description = '',
    title = '',
  } = {}) {
    titleElement.innerHTML = `${title}:`
    descriptionElement.innerHTML = description

    actionsElement.innerHTML = '';

    for (const {
      callback,
      label,
    } of actions) {
      const container = app.utility.dom.toElement(
        `<li><button class="c-menuButton" type="button">${label}</button></li>`
      )

      const clickHandler = () => {
        if (callback) {
          callback()
        }

        advance()
      }

      container.querySelector('button').addEventListener('click', clickHandler)

      actionsElement.appendChild(container)
    }

    if (actions.length == 1) {
      textElement._clickHandler = (e) => {
        if (actions[0].callback) {
          actions[0].callback()
        }

        advance()
      }

      textElement.addEventListener('click', textElement._clickHandler)
      textElement.ariaDescription = actions[0].label
      textElement.role = 'button'
    } else {
      textElement.ariaDescription = `${actions.length} actions`
      textElement.removeAttribute('role')
      textElement.removeEventListener('click', textElement._clickHandler)
    }

    app.utility.focus.setWithin(rootElement)
  }

  function open() {
    app.screen.game.rootElement.classList.add('a-game-dialog')

    rootElement.removeAttribute('aria-hidden')

    document.querySelector('.a-game--info').setAttribute('aria-hidden', true)
    document.querySelector('.a-game--nav').setAttribute('aria-hidden', true)

    isOpen = true
  }

  function advance() {
    const next = queue.shift()

    if (next) {
      if (!isOpen) {
        open()
      }

      render(next)
    } else {
      close()
    }
  }

  return {
    /*
      {
        title: '',
        description: '',
        actions: [
          {
            label: '',
            callback: () => {},
          }
        ],
      }
    */
    push: function (dialog) {
      queue.push(dialog)

      if (!isOpen) {
        advance()
      }

      return this
    },
  }
})()
