app.tutorial.base = {
  // Attributes
  id: undefined,
  weight: 0,
  // State
  active: false,
  complete: false,
  defaultState: {},
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
    this.state = {...this.defaultState, ...state}

    return this
  },
  preventDouble: function (key = 'default') {
    if (!this._preventDouble) {
      this._preventDouble = new Set()
    }

    if (this._preventDouble.has(key)) {
      return true
    }

    this._preventDouble.add(key)

    return false
  },
  reset: function () {
    delete this._preventDouble

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
    this.state = {...this.defaultState}

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
  // Input preference
  getInputPreference: (raw = false) => {
    const aliases = {
      midi: 'keyboard',
    }

    const preference = app.settings.computed.inputPreference

    return !raw && aliases[preference]
      ? aliases[preference]
      : preference
  }
}
