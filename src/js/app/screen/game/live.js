app.screen.game.live = (() => {
  const rootElement = document.querySelector('.a-game--live')

  return {
    set: function (value) {
      rootElement.innerHTML = value
        ? `<span id="${app.utility.dom.generateUniqueId()}">${value}</span>`
        : value

      return this
    },
  }
})()
