content.moons = (() => {
  const generated = new Map(),
    namesByPlanet = new Map()

  function extractPlanetName(name) {
    return /(.+\D)\d+/.exec(name)[1]
  }

  function generate(name) {
    const planetName = extractPlanetName(name)
    const planet = content.planets.get(planetName)

    const srand = (seed) => engine.fn.srand('moon', name, 'attribute', seed)()

    const type = engine.fn.chooseWeighted(generateTypes(planet), srand('type'))

    const moon = {
      age: srand('age') * planet.age,
      habitability: srand('habitability') * planet.habitability * type.habitability,
      mass: srand('mass') * planet.mass,
      name,
      planet,
      quirks: [],
      radius: srand('radius'),
      type: type.label,
    }

    if (type.commonQuirks.length && srand('quirk', 'common1', 'roll') < moon.wildcard) {
      moon.quirks.push({
        name: engine.fn.chooseSplice(
          type.commonQuirks,
          srand('quirk', 'common1', 'type')
        ),
      })
    }

    if (type.commonQuirks.length && srand('quirk', 'common2', 'roll') < moon.wildcard/2) {
      moon.quirks.push({
        name: engine.fn.chooseSplice(
          type.commonQuirks,
          srand('quirk', 'common2', 'type')
        ),
      })
    }

    if (type.rareQuirks.length && srand('quirk', 'rare', 'roll') < moon.wildcard/3) {
      moon.quirks.push({
        isRare: true,
        name: engine.fn.chooseSplice(
          type.rareQuirks,
          srand('quirk', 'rare', 'type')
        ),
      })
    }

    moon.instrument = srand('instrument', 'roll') < type.instrument * planet.star.wildcard/4

    return moon
  }

  function generateTypes(planet) {
    return [
      {
        label: 'Generic moon',
        habitability: 1,
        instrument: 1,
        moons: 1,
        weight: 1,
        commonQuirks: [],
        rareQuirks: [],
      },
    ]
  }

  return {
    get: function (name) {
      if (!generated.has(name)) {
        generated.set(name, generate(name))
      }

      return generated.get(name)
    },
    namesForPlanet: (planetName) => {
      const planet = content.planets.get(planetName)
      const names = []

      for (let i = 0; i < planet.children; i += 1) {
        names.push(
          `${planet.name}${2 + i}`
        )
      }

      return names
    },
    namesForMoon: function (moonName) {
      return this.namesForPlanet(
        extractPlanetName(moonName)
      )
    },
    reset: function () {
      generated.clear()
      namesByPlanet.clear()

      return this
    },
  }
})()

engine.state.on('reset', () => content.moons.reset())
