content.programs.brownDwarf = content.programs.invent({
  id: 'brownDwarf',
  fieldDefinitions: {
    hue: {},
    saturation: {},
    value: {},
  },
  propertyDefinitions: {
    hueBands: (srand) => srand(6,18),
    hueTimeScale: (srand) => srand(1/24, 1/6),
    saturationBands: (srand) => srand(6, 18),
    saturationTimeScale: (srand) => srand(1/24, 1/6),
    valueBands: (srand) => srand(6, 18),
    valueTimeScale: (srand) => srand(1/24, 1/6),
    xScale: (srand) => srand(0.25, 1),
  },
  alterParticleColor: function (particle, point) {
    const time = content.time.value()

    particle.target.h = engine.fn.lerp(-45/360, 45/360, this.fields.hue.valueAt({
      x: point.x * this.properties.xScale,
      y: point.z * this.properties.hueBands,
      z: time * this.properties.hueTimeScale,
    }, 1))

    particle.target.s = engine.fn.lerp(0.666, 1, this.fields.saturation.valueAt({
      x: point.x * this.properties.xScale,
      y: point.z * this.properties.saturationBands,
      z: time * this.properties.saturationTimeScale,
    }, 1))

    particle.target.v = this.fields.value.valueAt({
      x: point.x * this.properties.xScale,
      y: point.z * this.properties.valueBands,
      z: time * this.properties.valueTimeScale,
    }, 1)

    return true
  },
  alterParticleVertex: function (particle, point) {
    const radius = engine.fn.lerp(1.5, 2.5, this.options.body.radius)

    particle.target.x = point.x * radius
    particle.target.y = point.y * radius
    particle.target.z = point.z * radius

    return true
  },
  // Rumble
  getRumble: function (point) {
    return content.fn.gain(this.fields.value.valueAt({
      x: point.x * this.properties.xScale,
      y: point.z * this.properties.hueBands,
      z: content.time.value() * this.properties.valueTimeScale,
    }, 1), 2)
  },
  getLightSource: function () {
    return engine.tool.vector3d.unitX()
  },
}, content.programs.baseStar)
