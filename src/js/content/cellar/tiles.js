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

    // Determine the tile type
    const types = getTypes(tile)
    const type = engine.fn.chooseWeighted(types, srand('type'))

    // Generate an instance of the tile type
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

  function getTypes(tile) {
    // Origin is always normal
    if (tile.x == 0 && tile.y == 0 && tile.z == 0) {
      return [
        registry.get('normal'),
      ]
    }

    // If known to be unique, force tile to be that type
    for (const unique of uniques) {
      if (unique.x == tile.x && unique.y == tile.y) {
        if (unique.z == tile.z) {
          return [
            registry.get(unique.id),
          ]
        } else if (unique.z == tile.z + 1 && unique.id == 'descent') {
          // Ascents are always directly above descents
          return [
            registry.get('ascent'),
          ]
        }
      }
    }

    // Determine which unique types are already in-use
    const nonUniqueTypes = [],
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
        nonUniqueTypes.push(type)
      } else if (!uniquesInUse.has(type.id)) {
        uniqueTypes.push(type)
      }
    }

    return [
      ...nonUniqueTypes,
      ...uniqueTypes,
    ]
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

      return false
    },
    reset: function () {
      cache.reset()
      uniques.length = 0

      return this
    },
  }
})()
