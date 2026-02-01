/*
  app.screen.game.dialog.push({
    title: '',
    description: '',
    actions: [
      {
        label: '',
        callback: () => {},
      }
    ],
  })
*/

app.screen.game.dialog = (() => {
  const queue = []

  const rootElement = document.querySelector('.a-game--dialog')

  const actionsElement = document.querySelector('.a-game--dialogActions'),
    descriptionElement = document.querySelector('.a-game--dialogDescription'),
    textElement = document.querySelector('.a-game--dialogText'),
    titleElement = document.querySelector('.a-game--dialogTitle')

  let current,
    isOpen

  rootElement.setAttribute('aria-hidden', 'true')
  app.utility.focus.trap(rootElement)

  function close() {
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
      textElement.ariaDescription = actions[0].label
      textElement.role = 'button'
    } else {
      textElement.ariaDescription = `${actions.length} actions`
      textElement.removeAttribute('role')
    }

    app.utility.focus.setWithin(rootElement)
  }

  function open() {
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

      current = next
      render(next)
    } else {
      current = undefined
      close()
    }
  }

  return {
    handleInput: function () {
      const focus = app.utility.focus.get(),
        ui = app.controls.ui()

      if (ui.confirm) {
        if (current.actions.length == 1) {
          if (current.actions[0].callback) {
            current.actions[0].callback()
          }

          advance()
        } else if (focus) {
          focus.click()
        }
      }

      if (ui.up || ui.left) {
        app.utility.focus.setPreviousFocusable(rootElement)
      }

      if (ui.down || ui.right) {
        app.utility.focus.setNextFocusable(rootElement)
      }

      return this
    },
    isOpen: () => isOpen,
    push: function (dialog) {
      queue.push(dialog)

      if (!isOpen) {
        advance()
      }

      return this
    },
  }
})()
