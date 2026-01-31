app.screen.gameMenu = app.screenManager.invent({
  // Attributes
  id: 'gameMenu',
  parentSelector: '.a-app--gameMenu',
  rootSelector: '.a-gameMenu',
  transitions: {
    back: function () {
      this.change('game')
    },
    mainMenu: function () {
      app.screen.gameMenu.clearFocusMemory()

      app.autosave.trigger()
      app.gameState.setLoaded(false)

      // XXX: Autosave trigger uses setTimeout, so enqueue a state reset to prevent progress loss.
      setTimeout(() => engine.state.reset(), 0)

      this.change('mainMenu')
    },
    quit: function () {
      app.autosave.trigger()
      app.quit()
    },
    settings: function () {
      this.change('settings')
    },
  },
  // State
  state: {},
  // Hooks
  onReady: function () {
    const root = this.rootElement

    Object.entries({
      back: root.querySelector('.a-gameMenu--back'),
      mainMenu: root.querySelector('.a-gameMenu--mainMenu'),
      quit: root.querySelector('.a-gameMenu--quit'),
      settings: root.querySelector('.a-gameMenu--settings'),
    }).forEach(([event, element]) => {
      element.addEventListener('click', () => app.screenManager.dispatch(event))
    })

    root.querySelector('.a-gameMenu--action-quit').hidden = !app.isElectron()
  },
  onEnter: function () {},
  onExit: function () {},
  onFrame: function () {
    this.handleBasicInput()
  },
})
