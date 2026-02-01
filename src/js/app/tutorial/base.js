app.tutorial.base = {
  // Attributes
  id: undefined,
  // State
  active: false,
  complete: false,
  state: {},
  // Main methods
  export: function () {
    return {
      ...this.state,
      active: this.active,
      complete: this.complete,
    }
  },
  extend: function (definition) {
    return engine.fn.extend(this, definition)
  },
  import: function ({
    active = false,
    complete = false,
    ...state
  } = {}) {
    this.active = active
    this.complete = complete
    this.state = {...state}

    return this
  },
  reset: function () {
    this.active = false
    this.complete = false
    this.state = {}
  },
  update: function () {
    if (this.complete) {
      return this
    }

    if (!this.active) {
      if (this.shouldActivate()) {
        this.markActive()
      } else {
        return this
      }
    }

    this.onUpdate()

    return this
  },
  // Lifecycle
  markActive: function () {
    this.active = true
    this.onActivate()

    return this
  },
  markComplete: function () {
    this.active = false
    this.complete = true

    this.onComplete()

    return this
  },
  onActivate: () => {},
  onComplete: () => {},
  onUpdate: () => {},
  shouldActivate: () => false,
}
