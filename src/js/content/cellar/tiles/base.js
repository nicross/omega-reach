content.cellar.tiles.base = {
  id: undefined,
  alwaysAudible: false,
  isUnique: false,
  name: undefined,
  uniquePerFloor: false,
  uniquePerRun: false,
  weight: 1,
  // Instance properties
  effects: undefined,
  isActive: false,
  note: undefined,
  prime: undefined,
  seed: undefined,
  state: undefined,
  x: undefined,
  y: undefined,
  z: undefined,
  // State
  defaultState: {},
  // Generator
  canGenerate: (tile) => true,
  generate: function (tile = {}) {
    return this.extend(tile)
  },
  // Methods
  activate: function () {
    if (!this.isActive) {
      this.isActive = true
      this.onActivate()
    }

    return this
  },
  deactivate: function () {
    if (this.isActive) {
      this.isActive = false
      this.onDeactivate()
    }

    return this
  },
  enter: function () {
    this.activate()
    this.onEnter()
  },
  exit: function () {
    this.onExit()
    this.deactivate()
  },
  canInteractMore: () => false,
  extend: function (definition = {}) {
    const instance = engine.fn.extend(this, definition)

    instance.defaultState = {...this.defaultState, ...instance.defaultState}
    instance.state = {...instance.defaultState}

    return instance
  },
  getInteractLabelMore: () => {},
  export: function () {
    return {
      id: this.id,
      state: {...this.state},
      x: this.x,
      y: this.y,
      z: this.z,
    }
  },
  getName: function () {
    return this.name
  },
  getEffects: function () {
    return this.effects || []
  },
  hasSolutionMore: () => false,
  import: function (data = {}) {
    this.state = {
      ...this.defaultState,
      ...(data.state || {}),
    }

    return this
  },
  isFullyScanned: function () {
    return content.cellar.scans.get(this) >= this.getEffects().length
  },
  isIncompleteMore: () => false,
  onActivate: function () {},
  onDeactivate: function () {},
  onEnter: function () {},
  onExit: function () {},
  onInteractMore: () => {},
  // Particles
  alterParticle: function (particle) {},
}
