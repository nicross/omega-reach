content.stars = (() => {
  const generated = new Map(),
    namesByGalaxy = new Map(),
    scansByName = new Map()

  const latinLetters = [
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y',
    'Z',
  ]

  function extractGalaxyName(name) {
    const parts = name.split(' ')
    parts.pop()
    return parts.join(' ')
  }

  function generate(name) {
    const galaxyName = extractGalaxyName(name)
    const galaxy = content.galaxies.get(galaxyName)

    const srand = (seed) => engine.fn.srand('star', name, 'attribute', seed)()

    const star = {
      age: srand('age') * galaxy.age,
      children: Math.round(engine.fn.lerpExp(0, 12, srand('children'), 1.5)),
      galaxy,
      mass: srand('mass') * galaxy.mass,
      name,
      planets: [],
      quirks: [],
      radius: srand('radius'),
      scanCount: getScansForName(name),
      type: engine.fn.chooseWeighted([
        {label: 'Main Sequence Star', weight: engine.fn.lerp(1/2, 0, galaxy.age)},
        {label: 'White Dwarf', weight: engine.fn.lerp(0, 1/2, galaxy.age)},
        {label: 'Black Hole', weight: engine.fn.lerp(0, 1/6/2, galaxy.age)},
        {label: 'Neutron Star', weight: engine.fn.lerp(0, 1/6/2, galaxy.age)},
        {label: 'Red Supergiant', weight: engine.fn.lerp(1/3/2, 1/6/2, galaxy.age)},
        {label: 'Blue Hypergiant', weight: engine.fn.lerp(1/3/2, 1/6/2, galaxy.age)},
      ], srand('type')).label,
      wildcard: srand('wildcard') * galaxy.wildcard,
    }

    // TODO: Quirk generation
    star.quirks.push({
      name: 'Common Quirk',
      isRare: false,
    })

    star.quirks.push({
      name: 'Rare Quirk',
      isRare: true,
    })

    return star
  }

  function getNamesForGalaxy(galaxyName) {
    if (!namesByGalaxy.has(galaxyName)) {
      namesByGalaxy.set(galaxyName, new Set())
    }

    return namesByGalaxy.get(galaxyName)
  }

  function getScansForName(starName) {
    if (!scansByName.has(starName)) {
      scansByName.set(starName, 0)
    }

    return scansByName.get(starName)
  }

  function incrementScansForName(starName) {
    scansByName.set(starName, getScansForName(starName) + 1)
  }

  function randomInteger(max) {
    return engine.fn.randomInt(1, max)
  }

  function randomLatin() {
    return engine.fn.choose(latinLetters, Math.random())
  }

  function uniqueName(galaxyName) {
    const names = getNamesForGalaxy(galaxyName)

    let name

    do {
      name = engine.fn.choose([
        () => `${randomLatin()}${randomInteger(9)}${randomLatin()}${randomInteger(9)}`,
        () => `${randomLatin()}${randomLatin()}${randomInteger(99)}`,
        () => `${randomLatin()}${randomInteger(999)}`,
        () => `${randomInteger(9999)}`,
      ], Math.random())()
    } while (names.has(name))

    return `${galaxyName} ${name}`
  }

  return {
    export: () => {
      const discovered = {},
        scans = {}

      for (const [galaxyName, starNames] of namesByGalaxy.entries()) {
        discovered[galaxyName] = [...starNames]
      }

      for (const [starName, scanCount] of scansByName.entries()) {
        scans[starName] = scanCount
      }

      return {
        discovered,
        scans,
      }
    },
    get: function (name) {
      if (!generated.has(name)) {
        generated.set(name, generate(name))
      }

      return generated.get(name)
    },
    import: function ({
      discovered = {},
      scans = {},
    } = {}) {
      for (const [galaxyName, starNames] of Object.entries(discovered)) {
        const names = getNamesForGalaxy(galaxyName)

        for (const starName of starNames) {
          names.add(starName)
        }
      }

      for (const [starName, scanCount] of Object.entries(scans)) {
        scansByName.set(starName, scanCount)
      }

      return this
    },
    namesForGalaxy: (galaxyName) => [...getNamesForGalaxy(galaxyName)],
    namesForStar: (starName) => [...getNamesForGalaxy(extractGalaxyName(starName))],
    new: function (galaxyName) {
      const name = uniqueName(galaxyName)
      getNamesForGalaxy(galaxyName).add(name)
      return this.get(name)
    },
    reset: function () {
      generated.clear()
      namesByGalaxy.clear()
      scansByName.clear()

      return this
    },
    scan: function (starName) {
      incrementScansForName(starName)
      return getScansForName(starName)
    },
    scanCount: (starName) => getScansForName(starName),
  }
})()

engine.state.on('import', ({stars}) => content.stars.import(stars))
engine.state.on('export', (data) => data.stars = content.stars.export())
engine.state.on('reset', () => content.stars.reset())
