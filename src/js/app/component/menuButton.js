document.querySelectorAll('.c-menuButton, .a-game').forEach((element) => {
  element.addEventListener('keydown', (e) => {
    if (['Enter','NumpadEnter','Space'].includes(e.key)) {
      e.preventDefault()
    }
  })
})
