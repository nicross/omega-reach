app.tutorial.atrium = app.tutorial.invent({
  id: 'atrium',
  // State
  defaultState: {
    sleeps: 0,
  },
  // Lifecycle
  shouldActivate: () => true,
  onUpdate: function () {
    if (!content.location.is('atrium')) {
      return
    }

    [
      {
        title: this.state.sleeps > 0 ? `Wake up again.` : `Wake up.`,
        description: `You stir from your nap at the center of time. A familiar warmth fills you as you flex your senses. Has it already been ${this.state.sleeps > 0 ? 'another' : 'a'} quadrillion years?`,
        before: () => app.canvas.setBlur(true),
        actions: [
          {
            label: 'Look around',
            after: () => app.canvas.setBlur(false),
          }
        ],
      },
      {
        title: `You're in the atrium.`,
        description: `It connects the various rooms of <strong>The Omega Conservatory</strong>. From this vantage, everything seems to happen all at once through the above skylight. Perhaps you might dwell a bit longer to ponder its wonder?`,
        actions: [
          {
            label: this.state.sleeps > 0 ? 'Snap out of it this time' : 'Snap out of it',
          },
          {
            label: this.state.sleeps > 0 ? 'Snooze again' : 'Fall back to sleep',
            before: () => {
              app.canvas.setBlur(true)

              const dialog = {
                title: 'Just a little longer…',
                description: `You drift back into your nap at the center of time, figuring that the universe will remain there in some form when you ${this.state.sleeps > 0 ? '<em>finally</em> decide' : 'decide'} to get back to work.`,
                actions: [
                  {
                    label: 'Fade to black',
                  },
                ],
              }

              // XXX: Duplicate the dialog to prevent visual flashes (and fully reset on game menu to prevent it from appearing on game load)
              app.screen.game.dialog.purgeQueue().push(dialog).push({
                ...dialog,
                 before: () => {
                   this.state.sleeps += 1
                   app.screen.game.dialog.purgeQueue()
                   app.screenManager.dispatch('sleep')
                 },
              })
            },
          },
        ],
      },
      {
        title: () => `Right, you're the curator!`,
        description: `With <strong>the emporium</strong> cleared and the next cycle starting, <strong>the gallery</strong> sits criminally empty. It would be best for you to preserve as much as you can by using <strong>the reach</strong>.`,
        actions: [
          {
            label: 'Get to work',
          }
        ],
      },
      {
        title: `<span class="u-highlight">[Select tutorial preference…]</span>`,
        description: `When you reach into the unknown, you prefer to…`,
        actions: [
          {
            label: 'have a guiding hand.',
            before: () => app.settings.setTutorialOn(true),
          },
          {
            label: 'reach your own conclusions.',
            before: () => app.settings.setTutorialOn(false),
          },
        ],
        after: () => {
          app.settings.save()
        },
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Moving:`,
        description: () => ({
          gamepad: `Use the <kbd>Directional Pad</kbd>`,
          keyboard: `Use the <kbd>Arrow Keys</kbd>`,
          mouse: `Click the <kbd>Arrow Buttons</kbd>`,
          touch: `Tap the <kbd>Arrow Buttons</kbd>`,
        }[app.tutorial.getInputPreference()]) + ` to navigate the conservatory. Find your way to <strong>the reach</strong> to fulfill your duties.`,
        actions: [
          {
            label: 'Regain control',
          }
        ],
        after: () => this.markComplete(),
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
