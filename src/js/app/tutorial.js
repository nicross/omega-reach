app.tutorial = (() => {
  const registry = new Map(),
    sorted = []

  const sortDebounced = engine.fn.debounced(() => {
    sorted.sort((a, b) => {
      return a.weight - b.weight
    })
  }, 1)

  let isImported = false

  return {
    export: function () {
      const states = {}

      for (const [id, tutorial] of registry.entries()) {
        states[id] = tutorial.export()
      }

      return states
    },
    get: (id) => registry.get(id),
    getInputPreference: (raw = false) => {
      const aliases = {
        midi: 'keyboard',
      }

      const preference = app.settings.computed.inputPreference

      return !raw && aliases[preference]
        ? aliases[preference]
        : preference
    },
    import: function (states = {}) {
      for (const [id, tutorial] of registry.entries()) {
        if (id in states) {
          tutorial.import(states[id])
        }
      }

      isImported = true
      this.update()

      return this
    },
    invent: function (prototype) {
      if (!this.base.isPrototypeOf(prototype)) {
        prototype = this.base.extend(prototype)
      }

      registry.set(prototype.id, prototype)

      sorted.push(prototype)
      sortDebounced()

      return prototype
    },
    isActive: function (id) {
      return registry.get(id)?.active ?? false
    },
    isComplete: function (id) {
      return registry.get(id)?.complete ?? false
    },
    reset: function () {
      isImported = false

      for (const tutorial of registry.values()) {
        tutorial.reset()
      }

      return this
    },
    update: function() {
      if (!isImported) {
        return this
      }

      for (const tutorial of sorted) {
        tutorial.update()
      }

      return this
    },
  }
})()

engine.state.on('import', ({tutorial}) => app.tutorial.import(tutorial))
engine.state.on('export', (data) => data.tutorial = app.tutorial.export())
engine.state.on('reset', () => app.tutorial.reset())

// Update tutorial on room enter / interact
engine.ready(() => {
  content.location.on('enter', () => app.tutorial.update())
  content.location.on('interact', () => app.tutorial.update())

  // Handle cellar move events
  content.location.on('move', ({isCellar}) => {
    if (isCellar) {
      app.tutorial.update()
    }
  })
})
