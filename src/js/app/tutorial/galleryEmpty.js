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
        title: `It's empty.`,
        description: `Briefly you entertain the sweet memory of how it will soon be. The cacophony of melodies shall be deafening!`,
        actions: [
          {
            label: 'Come back later',
          }
        ],
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
