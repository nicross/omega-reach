content.rooms = (() => {
  const registry = new Map()

  return {
    export: function () {
      const states = {}

      for (const [id, room] of registry.entries()) {
        states[id] = room.export()
      }

      return states
    },
    get: (id) => registry.get(id),
    import: function (states) {
      for (const [id, room] of registry.entries()) {
        if (id in states) {
          room.import(states[id])
        }
      }

      return this
    },
    invent: function (prototype) {
      if (!this.base.isPrototypeOf(prototype)) {
        prototype = this.base.extend(prototype)
      }

      registry.set(prototype.id, prototype)

      return prototype
    },
    reset: function () {
      for (const [id, room] of registry.entries()) {
        room.reset()
      }

      return this
    },
  }
})()
