content.planets = (() => {
  const generated = new Map(),
    namesByStar = new Map()

  const latinLetters = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y',
    'z',
  ]

  function extractStarName(name) {
    const parts = name.split(' ')
    parts.pop()
    return parts.join(' ')
  }

  function generate(name) {
    const isTutorial = name.includes(content.const.tutorialName)

    const starName = extractStarName(name)
    const star = content.galaxies.get(starName)

    const srand = (...seed) => engine.fn.srand('planet', name, 'attribute', ...seed)()

    const type = engine.fn.chooseWeighted(generateTypes(star), srand('type'))

    const planet = {
      age: srand('age') * star.age,
      children: isTutorial ? 1 : Math.round(engine.fn.lerpExp(0, 6, srand('children') * type.moons, 2)),
      habitability: srand('habitability') * star.habitability * type.habitability,
      mass: srand('mass') * star.mass,
      name,
      quirks: [],
      radius: srand('radius'),
      star,
      type: type.label,
      wildcard: (srand('wildcard') + star.wildcard) * 0.5,
    }

    if (!isTutorial && type.commonQuirks.length && srand('quirk', 'common1', 'roll') < planet.wildcard) {
      planet.quirks.push({
        name: engine.fn.chooseSplice(
          type.commonQuirks,
          srand('quirk', 'common1', 'type')
        ),
      })
    }

    if (!isTutorial && type.commonQuirks.length && srand('quirk', 'common2', 'roll') < planet.wildcard/2) {
      planet.quirks.push({
        name: engine.fn.chooseSplice(
          type.commonQuirks,
          srand('quirk', 'common2', 'type')
        ),
      })
    }

    if (isTutorial || type.rareQuirks.length && srand('quirk', 'rare', 'roll') < planet.wildcard/3) {
      planet.quirks.push({
        isRare: true,
        name: engine.fn.chooseSplice(
          type.rareQuirks,
          srand('quirk', 'rare', 'type')
        ),
      })
    }

    planet.instrument = isTutorial
      ? false
      : srand('instrument', 'roll') < type.instrument * planet.wildcard/4

    return planet
  }

  function generateTypes(star) {
    return [
      {
        label: 'Generic planet',
        habitability: 1,
        instrument: 1,
        moons: 1,
        weight: 1,
        commonQuirks: [
          'Common quirk',
          'Common quirk',
        ],
        rareQuirks: [
          'Rare quirk',
        ],
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
    isComplete: function (planetName) {
      const planet = this.get(planetName)

      if (content.scans.get(planetName) < 1 + planet.quirks.length + (planet.instrument ? 1 : 0)) {
        return false
      }

      for (const moonName of content.moons.namesForPlanet(planetName)) {
        if (!content.moons.isComplete(moonName)) {
          return false
        }
      }

      return true
    },
    namesForStar: (starName) => {
      const star = content.stars.get(starName)

      return latinLetters
        .slice(1, 1 + star.children)
        .map((designation) => `${star.name} ${designation}`)
    },
    namesForPlanet: function (planetName) {
      return this.namesForStar(
        extractStarName(planetName)
      )
    },
    reset: function () {
      generated.clear()
      namesByStar.clear()

      return this
    },
  }
})()

engine.state.on('reset', () => content.planets.reset())
