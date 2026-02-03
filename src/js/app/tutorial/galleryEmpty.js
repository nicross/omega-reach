app.tutorial.galleryEmpty = app.tutorial.invent({
  id: 'galleryEmpty',
  // State
  state: {},
  // Lifecycle
  shouldActivate: () => content.location.is('gallery'),
  onUpdate: function () {
    if (!content.location.is('gallery')) {
      return
    }

    [
      {
        title: `Something's missing.`,
        description: `Briefly you entertain your sweet memories of how it will soon be. The cacophony of melodies shall be deafening!`,
        actions: [
          {
            label: 'Come back later',
            before: () => this.markComplete(),
          }
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
