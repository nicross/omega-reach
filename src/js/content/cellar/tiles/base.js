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
  onEnter: () => {},
  onExit: () => {},
  onInteractMore: () => {},
  // Particles
  alterParticle: function (particle) {},
}
