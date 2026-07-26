content.cellar.barrier = (() => {
  const pubsub = engine.tool.pubsub.create()

  let amount = 0

  return pubsub.decorate({
    add: function (value = 1) {
      amount = Math.max(amount + value, 0)
      pubsub.emit('add')

      return this
    },
    amount: () => amount,
    export: function () {
      return {
        amount,
      }
    },
    has: (value = 1) => amount >= value,
    import: function (data = {}) {
      amount = data.amount || 0

      return this
    },
    reset: function () {
      amount = 0

      return this
    },
    set: function (value = 0) {
      amount = Math.max(value || 0, 0)

      return this
    },
    subtract: function (value = 1) {
      amount = Math.max(amount - value, 0)
      pubsub.emit('subtract')

      return this
    },
  })
})()
