content.audio.barrierChange = (() => {
  const baseGain = engine.fn.fromDb(-12),
    bus = content.audio.channel.sfx.createBus(),
    rootFrequency = engine.fn.fromMidi(60)

  function trigger({
    delay = 1/12,
    duration = 1/2,
    isUp = true,
  } = {}) {
    const detune = engine.fn.randomFloat(-10, 10),
      modFrequency = engine.fn.randomFloat(7, 13),
      when = engine.time() + delay

    // Synthesis
    const synth = engine.synth.fm({
      carrierDetune: detune,
      carrierFrequency: rootFrequency,
      carrierType: 'square',
      modDepth: isUp ? 0 : engine.fn.randomFloat(0.25, 0.5) * rootFrequency,
      modFrequency: 5,
      modType: 'triangle',
      when,
    }).filtered({
      detune,
      frequency: rootFrequency * 2,
    }).connect(bus)

    synth.param.mod.frequency.exponentialRampToValueAtTime(15, when + duration)

    synth.param.detune.linearRampToValueAtTime(detune + (isUp ? -1200 : 600), when + duration/8)
    synth.param.detune.linearRampToValueAtTime(detune + (isUp ? 1200 : -1800), when + duration/4)

    synth.param.gain.linearRampToValueAtTime(baseGain, when + 1/48)
    synth.param.gain.linearRampToValueAtTime(engine.const.zeroGain, when + duration)

    synth.param.mod.depth.linearRampToValueAtTime(0, when + duration)

    synth.stop(when + duration)
  }

  return {
    trigger: function (...args) {
      trigger(...args)

      return this
    },
  }
})()
