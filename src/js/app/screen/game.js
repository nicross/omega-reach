app.screen.game = app.screenManager.invent({
  // Attributes
  id: 'game',
  parentSelector: '.a-app--game',
  rootSelector: '.a-game',
  transitions: {
    pause: function () {
      this.change('gameMenu')
    },
  },
  // State
  state: {},
  // Hooks
  onReady: function () {
    this.dialogElement = this.rootElement.querySelector('.a-game--dialog')
    this.downElement = this.rootElement.querySelector('.a-game--down')
    this.infoElement = this.rootElement.querySelector('.a-game--info')
    this.leftElement = this.rootElement.querySelector('.a-game--left')
    this.menuElement = this.rootElement.querySelector('.a-game--menu')
    this.rightElement = this.rootElement.querySelector('.a-game--right')
    this.interactElement = this.rootElement.querySelector('.a-game--interact')
    this.upElement = this.rootElement.querySelector('.a-game--up')

    this.downElement.addEventListener('click', () => this.movement.down())
    this.leftElement.addEventListener('click', () => this.movement.left())
    this.menuElement.addEventListener('click', () => app.screenManager.dispatch('pause'))
    this.rightElement.addEventListener('click', () => this.movement.right())
    this.upElement.addEventListener('click', () => this.movement.up())
  },
  onEnter: function () {
    this.setBlanked(!app.settings.computed.graphicsOn)

    app.autosave.enable()
    app.autosave.trigger()

    engine.loop.resume()

    this.update()
    this.dialog.checkAdvance()
  },
  onExit: function () {
    app.autosave.disable()
    app.autosave.trigger()

    engine.loop.pause()
  },
  onFrame: function () {
    // Handle input when dialog is open
    this.dialog.checkAdvance()

    if (this.dialog.isOpen()) {
      return this.dialog.handleInput()
    }

    const focus = app.utility.focus.get(),
      game = app.controls.game(),
      ui = app.controls.ui()

    // Pausing
    if (ui.pause) {
      return this.menuElement.click()
    }

    // Movement
    if (ui.moveDown) {
      return this.downElement.click()
    }

    if (ui.moveLeft) {
      return this.leftElement.click()
    }

    if (ui.moveRight) {
      return this.rightElement.click()
    }

    if (ui.moveUp) {
      return this.upElement.click()
    }

    // Scan
    if (ui.interact) {
      if (focus !== this.interactElement && focus?.matches('button,[role="button"]')) {
        return focus.click()
      } else if (!app.settings.computed.inputHold) {
        return this.interact.click()
      }
    }

    if (app.settings.computed.inputHold) {
      if (game.interact && (focus === this.interactElement || !focus?.matches('button,[role="button"]'))) {
        return this.interact.increment()
      } else if (focus === this.interactElement && engine.input.mouse.isButton(0)) {
        return this.interact.increment()
      }
    }

    this.interact.decrement().setCooldown(false)
  },
  // Methods
  getFocusWithinTarget: function () {
    return this.dialog.isOpen() ? this.dialogElement : this.infoElement
  },
  setBlanked: function (value) {
    if (value) {
      this.rootElement.classList.add('a-game-blanked')
    } else {
      this.rootElement.classList.remove('a-game-blanked')
    }

    return this
  },
  // Movement
  update: function () {
    this.info.update()
    this.movement.update()
    this.interact.update().setCooldown(true)

    this.infoElement.focus()

    return this
  },
})
