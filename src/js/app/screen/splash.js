app.screen.splash = app.screenManager.invent({
  // Attributes
  id: 'splash',
  parentSelector: '.a-app--splash',
  rootSelector: '.a-splash',
  transitions: {
    interact: function () {
      this.change(
        app.isDemo() && !app.screen.splash.state.initial
          ? 'demo'
          : 'mainMenu'
      )

      app.screen.splash.state.initial = true
    },
  },
  // State
  state: {
    initial: false,
  },
  useBasicFocusMemory: false,
  // Hooks
  onReady: function () {
    const root = this.rootElement

    root.addEventListener('click', () => {
      app.screenManager.dispatch('interact')
    })

    root.querySelector('.a-splash--version').innerHTML = `v${app.version()}`
  },
  onEnter: function () {
    content.audio.reachDrone.reset()
  },
  onFrame: function () {
    const ui = app.controls.ui()

    if (ui.confirm || ui.enter || ui.space || ui.start || ui.select || ui.focus === 0) {
      app.screenManager.dispatch('interact')
    }
  },
  onExit: function () {

  },
})
