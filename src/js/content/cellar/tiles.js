content.cellar.tiles = (() => {
  const cache = engine.tool.cache3d.create(),
    registry = new Map(),
    uniques = []

  const offLimits = [
    engine.tool.vector3d.create({x: 0, y: 2, z: 0}), // stockroom
    engine.tool.vector3d.create({x: 0, y: 1, z: 0}), // shop
    engine.tool.vector3d.create({x: -1, y: 1, z: 0}), // atrium
    engine.tool.vector3d.create({x: -1, y: 2, z: 0}), // reach
    engine.tool.vector3d.create({x: -2, y: 2, z: 0}), // emporium
    engine.tool.vector3d.create({x: -2, y: 1, z: 0}), // lobby
    engine.tool.vector3d.create({x: -2, y: 0, z: 0}), // reliquary
    engine.tool.vector3d.create({x: -1, y: 0, z: 0}), // gallery
  ]

  const solidField = engine.fn.createNoise({
    octaves: 4,
    seed: ['cellar', 'tiles', 'solid'],
    type: 'simplex2d',
  })

  engine.ephemera.add(solidField)

  function find(criteria = {}) {
    for (const unique of uniques) {
      for (const [key, value] of Object.entries(criteria)) {
        if (unique[key] !== value) {
          continue
        }
      }

      return unique
    }
  }

  function generate(x, y, z) {
    const seed = ['cellar', content.cellar.run.count(), 'tile', x, y, z],
      srand = (name, ...args) => engine.fn.srand(...seed, name)(...args)

    const tile = {
      effects : [],
      note: engine.fn.choose([1,2,3,4,5,6,7,8,10,11,12], srand('note')),
      prime: engine.fn.choose([59, 61, 67, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113], srand('prime')),
      seed,
      x,
      y,
      z,
    }

    // Generate an instance of the tile type
    const type = getType(seed, tile)
    const instance = type.generate(tile)

    if (type.isUnique && !uniqueExists(tile)) {
      // Push a proxy for exporting later
      uniques.push({
        instance,
        ...instance.export(),
      })
    }

    return instance
  }

  function getType(seed, tile) {
    const srand = (name, ...args) => engine.fn.srand(...seed, 'type', name)(...args)

    // Origin is always normal
    // TODO: Make a separate tile for entrance
    if (tile.x == 0 && tile.y == 0 && tile.z == 0) {
      return registry.get('normal')
    }

    // If known to be unique, force tile to be that type
    for (const unique of uniques) {
      if (unique.x == tile.x && unique.y == tile.y) {
        if (unique.z == tile.z) {
          return registry.get(unique.id)
        } else if (unique.z == tile.z + 1 && unique.id == 'descent') {
          // Ascents are always directly above descents
          return registry.get('ascent')
        }
      }
    }

    // Determine which unique types are already in-use
    const normalTypes = [],
      uniqueTypes = [],
      uniquesInUse = new Set()

    for (const unique of uniques) {
      const type = registry.get(unique.id)

      if (!type.uniquePerFloor || unique.z == tile.z) {
        uniquesInUse.add(unique.id)
      }
    }

    // Combine all non-unique and unused-unique types
    for (const type of registry.values()) {
      if (!type.canGenerate(tile)) {
        continue
      }

      if (!type.isUnique) {
        normalTypes.push(type)
      } else if (!uniquesInUse.has(type.id)) {
        uniqueTypes.push(type)
      }
    }

    // Roll the dice (5/6, 4/5, 3/4... chance per floor)
    const normalChance = (5 - Math.abs(tile.z))
      / (6 - Math.abs(tile.z))

    return srand('isNormal') < normalChance || !uniqueTypes.length
      ? engine.fn.chooseWeighted(normalTypes, srand('roll'))
      : engine.fn.chooseWeighted(uniqueTypes, srand('roll'))
  }

  function isAscent(tile) {
    for (const unique of uniques) {
      if (unique.x == tile.x && unique.y == tile.y && unique.z == tile.z) {
        return unique.instance.isAscent
      }
      if (unique.x == tile.x && unique.y == tile.y && unique.z == tile.z + 1) {
        return unique.instance.isDescent
      }
    }

    return false
  }

  function isSolid(x, y, z) {
    const ascent = engine.tool.vector2d.create(
      z == 0 ? {} : find({z, id:'ascent'})
    )

    // Distance from ascent on current floor
    const distance = [
      12,
      8,
      6,
      4,
    ][Math.abs(z)]

    // Scale of noise on current floor
    const scale = [
      12,
      8,
      6,
      4,
    ][Math.abs(z)] / engine.tool.simplex2d.prototype.skewFactor

    // Threshold of noise on current floor
    const threshold = [
      0.5,
      0.4833,
      0.4666,
      0.45,
    ][Math.abs(z)]

    return Math.max(
      solidField.value(
        x / scale, y / scale, (z + 0.5) * 10,
      ),
      1 - engine.fn.clamp(
        ascent.distance({x, y}) / distance
      ),
    ) < threshold
  }

  function uniqueExists(tile) {
    for (const unique of uniques) {
      if (unique.x == tile.x && unique.y == tile.y && unique.z == tile.z) {
        return true
      }
    }

    return false
  }

  return {
    calculateGlobalDonationRate: function () {
      return uniques.reduce(
        (value, tile) => value + this.get(tile).getGlobalDonationRate(),
        0,
      )
    },
    calculateGlobalHealthBonus: function () {
      return uniques.reduce(
        (value, tile) => value + this.get(tile).getGlobalHealthBonus(),
        0,
      )
    },
    current: function () {
      return this.get(
        content.cellar.position.get()
      )
    },
    export: () => ({
      uniques: uniques.map((x) => x.instance.export()),
    }),
    find,
    get: function ({x, y, z}) {
      if (!cache.has(x, y, z)) {
        cache.set(x, y, z, generate(x, y, z))
      }

      return cache.get(x, y, z)
    },
    import: function (data = {}) {
      if (data.uniques?.length) {
        for (const unique of data.uniques) {
          // Add a proxy to the uniques array, so the generator knows which type to use
          const proxy = {...unique}
          uniques.push(proxy)

          // Generate it, put it into the cache, and import its state
          const instance = this.get(unique)
          instance.import(unique)

          // Reference the instance from the proxy for exporting later
          proxy.instance = instance
        }
      }

      return this
    },
    invent: function (prototype, base = this.base) {
      prototype = base.extend(prototype)
      registry.set(prototype.id, prototype)

      return prototype
    },
    isOffLimits: ({x, y, z}) => {
      for (let vector of offLimits) {
        if (vector.x == x && vector.y == y && vector.z == z) {
          return true
        }
      }

      return isSolid(x, y, z)
    },
    reset: function () {
      cache.reset()
      solidField.reset()
      uniques.length = 0

      return this
    },
  }
})()
