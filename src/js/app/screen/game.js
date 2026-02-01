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

  },
  onEnter: function () {
    this.setBlanked(!app.settings.computed.graphicsOn)

    app.autosave.enable()
    app.autosave.trigger()

    engine.loop.resume()
  },
  onExit: function () {
    app.autosave.disable()
    app.autosave.trigger()

    engine.loop.pause()
  },
  onFrame: function () {
    const game = app.controls.game(),
      ui = app.controls.ui()

    if (ui.pause) {
      return app.screenManager.dispatch('pause')
    }
  },
  // Methods
  getFocusWithinTarget: function () {
    return this.rootElement.querySelector('.a-game--info')
  },
  setBlanked: function (value) {
    if (value) {
      this.rootElement.classList.add('a-game-blanked')
    } else {
      this.rootElement.classList.remove('a-game-blanked')
    }

    return this
  },
})
