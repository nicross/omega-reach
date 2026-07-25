// Need a place to put state for app/events/cellarDeath 🤷‍♀️

app.tutorial.death = app.tutorial.invent({
  id: 'death',
  // Lifecycle
  shouldActivate: () => false,
  onUpdate: function () {},
})
