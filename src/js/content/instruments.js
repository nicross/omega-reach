content.instruments = (() => {
  const generated = new Map(),
    states = new Map()

  const defaultState = {}

  function generate(name) {
    const srand = (seed) => engine.fn.srand('instrument', name, 'attribute', seed)()

    const rarity = srand('rarity')

    const instrument = {
      name,
      quirks: [],
      rarity: engine.fn.chooseWeighted([
        {label: 'Common', weight: 1},
        {label: 'Uncommon', weight: 1},
        {label: 'Rare', weight: 1},
        {label: 'Legendary', weight: 1},
      ], rarity).label,
    }

    instrument.quirks.push({
      name: 'Common quirk'
    })

    instrument.quirks.push({
      isRare: true,
      name: 'Rare quirk',
    })

    return instrument
  }

  return {
    add: function (name) {
      states.set(name, {...defaultState})

      return this
    },
    count: () => states.size,
    export: function () {
      const data = {}

      for (const [name, {name: _name, ...state}] of states.entries()) {
        data[name] = state
      }

      return data
    },
    get: function (name) {
      if (!generated.has(name)) {
        generated.set(name, generate(name))
      }

      if (!states.has(name)) {
        states.set(name, {...defaultState})
      }

      const instrument = generated.get(name)
      instrument.state = states.get(name)

      return instrument
    },
    has: (name) => states.has(name),
    import: function (data = {}) {
      for (const [name, state] of Object.entries(data)) {
        states.set(name, {name, ...state})
      }

      return this
    },
    names: () => [...states.keys()],
    remove: function (name) {
      generated.delete(name)
      states.delete(name)

      return this
    },
    reset: function () {
      generated.clear()
      states.clear()

      return this
    },
  }
})()

engine.state.on('import', ({instruments}) => content.instruments.import(instruments))
engine.state.on('export', (data) => data.instruments = content.instruments.export())
engine.state.on('reset', () => content.instruments.reset())
