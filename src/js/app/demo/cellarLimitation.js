app.tutorial.cellarLimitation = app.tutorial.invent({
  id: 'cellarLimitation',
  // State
  initialState: {
    tutorial: false,
  },
  // Lifecycle
  shouldActivate: () => content.location.is('cellar'),
  onUpdate: function () {
    if (!(content.location.is('cellar') && content.cellar.position.get().z == -3)) {
      return
    }

    // Prevent double on cellar-death event, but only for the current run
    if (this.preventDouble(content.cellar.run.count())) {
      return
    }

    if (!this.state.tutorial) {
      app.screen.game.dialog.push({
        title: `<span class="u-highlight">[Demo limitation]</span>`,
        description: `You have reached the end of <strong>the cellar</strong>. Thanks for playing!`,
        actions: [
          {
            label: `Regain control`,
            after: () => this.state.tutorial = true,
          },
        ],
      })
    }

    app.screen.game.dialog.push({
      title: `What was that?`,
      description: `Swiftly the air swells and you…`,
      actions: [
        {
          label: `brace for it.`,
        },
        {
          label: `accept it.`,
        },
      ],
      before: () => {
        content.audio.footsteps.trigger({
          count: 8,
          delay: 1/5,
          duration: 1/6,
          pan: engine.fn.randomSign(),
          velocity: 1,
        })

        content.cellar.health.set(1)
      },
      after: () => {
        content.location.emit('cellar-death')
      },
    })
  },
})
