app.tutorial.atrium = app.tutorial.invent({
  id: 'atrium',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => true,
  onUpdate: function () {
    [
      {
        title: `Wake up.`,
        description: `You stir from your nap at the center of time. A familiar warmth fills you as you flex your senses. Has it already been a quadrillion years?`,
        actions: [
          {
            label: 'Look around',
          }
        ],
      },
      {
        title: `You're in the atrium.`,
        description: `It connects the various rooms of The Omega Conservatory. From this vantage, everything seems to happen all at once through the above skylight. Perhaps you might dwell a bit longer to ponder its wonder?`,
        actions: [
          {
            label: 'Snap out of it',
          }
        ],
      },
      {
        title: `No, you are the curator!`,
        description: `With the auction house cleared and the cycle soon ending, the gallery sits criminally empty. It would be best for you to preserve as much as you can by using The Reach.`,
        actions: [
          {
            label: 'Get to work',
          }
        ],
      },
      {
        title: `[Tutorial] Movement:`,
        description: () => ({
          gamepad: `Use the <kbd>Directional Pad</kbd> to navigate the conservatory. Find your way to The Reach to fulfil your duties.`,
          keyboard: `Use the <kbd>Arrow Keys</kbd> to navigate the conservatory. Find your way to The Reach to fulfil your duties.`,
          mouse: `Click the <kbd>Arrow Buttons</kbd> to navigate the conservatory. Find your way to The Reach to fulfil your duties.`,
        }[app.settings.computed.inputPreference]),
        actions: [
          {
            label: 'Regain control',
            before: () => this.markComplete(),
          }
        ],
      },
      ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
