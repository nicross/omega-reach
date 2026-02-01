app.tutorial = (() => {
  let test = false

  return {
    export: function() {
      return {test}
    },
    import: function(data = {}) {
      if (!data.test) {
        [
          {
            title: 'Wake up',
            description: 'You pull yourself from your nap at the center of time.',
            actions: [
              {
                label: 'Continue',
                before: () => test = true,
              }
            ],
          },
        ].forEach((x) => app.screen.game.dialog.push(x))
      }

      return this
    },
    reset: function() {
      return this
    },
  }
})()

engine.state.on('import', ({tutorial}) => app.tutorial.import(tutorial))
engine.state.on('export', (data) => data.tutorial = app.tutorial.export())
engine.state.on('reset', () => app.tutorial.reset())
