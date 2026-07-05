content.programs.blackHole = content.programs.invent({
  id: 'blackHole',
  fieldDefinitions: {},
  propertyDefinitions: {
    radius4dSpatialScale: (srand) => srand(15, 30),
    radius4dTimeScale: (srand) => 1 / srand(2, 8),
  },
  alterParticleColor: function (particle, point) {
    const time = content.time.value()

    particle.target.h = engine.fn.scale(Math.sin(engine.const.tau * time * particle.twinkleFrequencies[0]), -1, 1, 0.75, 1) - 1
    particle.target.s = engine.fn.scale(Math.sin(engine.const.tau * time * particle.twinkleFrequencies[1]), -1, 1, 0, 1)

    return true
  },
  alterParticleVertex: function (particle, point) {
    const time = content.time.value()

    const radius4d = this.fields.radius4d.valueAt({
      time,
      x: point.x,
      y: point.y,
      z: point.z,
    }, this.properties.radius4dSpatialScale, this.properties.radius4dTimeScale)

    const radius = engine.fn.lerp(2/3, 4/3, this.options.body.radius) * this.radiusFactor * radius4d

    particle.target.v = radius4d ** 8
    particle.target.x = point.x * radius
    particle.target.y = point.y * radius
    particle.target.z = point.z * radius

    return true
  },
  // Rumble
  getRumble: function (point) {
    return this.fields.radius4d.valueAt({
      time: content.time.value(),
      x: point.x,
      y: point.y,
      z: point.z,
    }, this.properties.radius4dSpatialScale, this.properties.radius4dTimeScale)
  },
}, content.programs.baseStar)

// Planets and moons
content.programs.blackHolePlanet = content.programs.invent({
  id: 'blackHolePlanet',
  radiusFactor: 1/3,
  unscannedRadius: 1,
  // Faux light source
  propertyDefinitions: {
    lightSource: (srand) => engine.tool.vector3d.create({
      x: srand(0, 1),
      y: srand(-1, 1),
      z: srand(-1, 1),
    }).normalize(),
  },
  getLightSource: function () {
    return content.scans.is(this.options.body.name)
      ? engine.tool.vector3d.create()
      : this.properties.lightSource.clone()
  },
}, content.programs.blackHole)

content.programs.blackHoleMoon = content.programs.invent({
  id: 'blackHoleMoon',
  radiusFactor: 1/9,
  unscannedRadius: 0.5,
  // Faux light source
  propertyDefinitions: {
    lightSource: (srand) => engine.tool.vector3d.create({
      x: srand(0, 1),
      y: srand(-1, 1),
      z: srand(-1, 1),
    }).normalize(),
  },
  getLightSource: function () {
    return content.scans.is(this.options.body.name)
      ? engine.tool.vector3d.create()
      : this.properties.lightSource.clone()
  },
}, content.programs.blackHole)
