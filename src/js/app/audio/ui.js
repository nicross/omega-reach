app.audio.ui = {
  hoverMemory : undefined,
}

// Clicking
document.addEventListener('click', (e) => {
  if (!e.target.matches('.c-menuButton, .c-menuButton *, .c-select *, .c-toggle, .c-toggle *, .a-game--menu, .a-game--interact[aria-disabled="true"], .a-game--interact[aria-disabled="true"] *')) {
    return
  }

  if (e.target.matches('.c-toggle, .c-toggle *')) {
    const button = e.target.closest('.c-toggle').querySelector('.c-toggle--button')

    return content.audio.ui.value({
      enabled: button.getAttribute('aria-disabled') != 'true',
      strength: button.getAttribute('aria-checked') == 'true' ? 1 : 0,
    })
  }

  const button = e.target.closest('.c-menuButton, .a-game--interact') || e.target

  content.audio.ui.click({
    enabled: button.getAttribute('aria-disabled') != 'true',
    strength: button.hasAttribute('aria-disabled') ? 0 : 1,
  })
})

engine.ready(() => {
  app.screen.game.movement.on('disallowed', (e) => {
    content.audio.ui.click({
      enabled: 0,
      pan: ['left','right'].includes(e.direction) ? (e.direction == 'right' ? 1/2 : -1/2) : 0,
      strength: e.direction == 'down' ? -0.5 : (['left','right'].includes(e.direction) ? 0: 0.5),
    })
  })
})

// Focusing
document.addEventListener('focusin', (e) => {
  if (e.target.matches('.a-app--screen') || e.target.closest('.a-app--splash') || e.target.matches('[tabindex="0"]') || e.target.matches(':hover')) {
    return
  }

  content.audio.ui.focus({
    enabled: e.target.matches('.c-menuButton, .c-select, .c-select *, .c-slider, .c-slider *, .c-toggle, .c-toggle *, .a-game--nav button, .a-game--nav button *') && e.target.getAttribute('aria-disabled') != 'true',
    note: (() => {
      const selectorNotes = {
        '.a-game--down': 63,
        '.a-game--interact, .a-game--interact *': 65,
        '.a-game--left': 70,
        '.a-game--right': 67,
        '.a-game--up': 72,
      }

      for (const [selector, note] of Object.entries(selectorNotes)) {
        if (e.target.matches(selector)) {
          return note - 12
        }
      }
    })(),
    pan: e.target.matches('.a-game--left, .a-game--right') ? (e.target.matches('.a-game--right') ? 1/2 : -1/2) : 0,
    strength: 1,
  })
})

// Hovering
document.addEventListener('mouseover', (e) => {
  const target = e.target.closest('button,[role="button"]') || e.target

  if (target === app.audio.ui.hoverMemory) {
    return
  }

  app.audio.ui.hoverMemory = target

  if (target.matches('.a-app--screen') || target.closest('.a-app--splash') || target.matches('[tabindex="0"]')) {
    return
  }

  if (!app.utility.focus.isFocusable(target)) {
    return
  }

  // XXX: Copied via focusing
  content.audio.ui.focus({
    enabled: e.target.matches('.c-menuButton, .c-select, .c-select *, .c-slider, .c-slider *, .c-toggle, .c-toggle *, .a-game--nav button, .a-game--nav button *') && e.target.getAttribute('aria-disabled') != 'true',
    note: (() => {
      const selectorNotes = {
        '.a-game--down': 63,
        '.a-game--interact, .a-game--interact *': 65,
        '.a-game--left': 70,
        '.a-game--right': 67,
        '.a-game--up': 72,
      }

      for (const [selector, note] of Object.entries(selectorNotes)) {
        if (e.target.matches(selector)) {
          return note - 12
        }
      }
    })(),
    pan: e.target.matches('.a-game--left, .a-game--right') ? (e.target.matches('.a-game--right') ? 1/2 : -1/2) : 0,
    strength: 1,
  })
})

// Sliders
document.addEventListener('input', (e) => {
  if (!e.target.matches('.c-slider input')) {
    return
  }

  content.audio.ui.value({
    enabled: true,
    strength: engine.fn.scale(e.target.value, e.target.min, e.target.max, 0, 1),
  })
})
