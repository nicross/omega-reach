app.screen.demo = app.screenManager.invent({
  // Attributes
  id: 'demo',
  parentSelector: '.a-app--demo',
  rootSelector: '.a-demo',
  transitions: {
    back: function () {
      this.change('splash')
    },
    confirm: function () {
      this.change('mainMenu')
    },
  },
  // State
  state: {},
  useBasicFocusMemory: false,
  // Hooks
  onEnter: function () {
    const root = this.rootElement

    Object.entries({
      confirm: root.querySelector('.a-demo--confirm'),
    }).forEach(([event, element]) => {
      element.addEventListener('click', () => app.screenManager.dispatch(event))
    })
  },
  onFrame: function () {
    const focus = app.utility.focus.get(),
      focusables = app.utility.focus.selectFocusable(this.rootElement),
      ui = app.controls.ui()

    if (focus === focusables[0] && (ui.confirm || ui.dialogA || ui.dialogB)) {
      focusables[1].focus()
      return
    }

    this.handleBasicInput()
  },
})
