content.instruments = (() => {
  const map = new Map()

  const defaultState = {}

  return {
    add: function (name) {
      map.set(name, {...defaultState})
      return this
    },
    export: function () {
      const data = {}

      for (const [name, {name: _name, ...state}] of map.entries()) {
        data[name] = state
      }

      return data
    },
    get: function (name) {
      if (!map.has(name)) {
        map.set({
          name,
          ...defaultState,
        })
      }

      return map.get(name)
    },
    import: function (data = {}) {
      for (const [name, state] of Object.entries(data)) {
        map.set(name, {name, ...state})
      }

      return this
    },
    names: () => [...map.values()],
    remove: function (name) {
      map.delete(name)
      return this
    },
    reset: function () {
      map.clear()
      return this
    },
  }
})()

engine.state.on('import', ({instruments}) => content.instruments.import(instruments))
engine.state.on('export', (data) => data.instruments = content.instruments.export())
engine.state.on('reset', () => content.instruments.reset())
