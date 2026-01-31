'use strict'

app.component.select = {}

app.component.select.hydrate = function (...args) {
  return Object.create(this.prototype).construct(...args)
}

app.component.select.prototype = {
  construct: function (root, initialValue, options) {
    this.nextElement = root.querySelector('.c-select--next')
    this.previousElement = root.querySelector('.c-select--previous')
    this.rootElement = root
    this.valueElement = root.querySelector('.c-select--value')

    this.nextElement.addEventListener('click', this.next.bind(this))
    this.previousElement.addEventListener('click', this.previous.bind(this))

    this.setOptions(options)
    this.setValue(initialValue)
    this.setAriaLive(true)

    engine.tool.pubsub.decorate(this)

    return this
  },
  getIndex: function () {
    return this.selectedIndex
  },
  getLabel: function () {
    return this.options[this.selectedIndex].label
  },
  getOptions: function () {
    return [...this.options]
  },
  getValue: function () {
    return this.options[this.selectedIndex].value
  },
  next: function () {
    return this.setIndex(this.selectedIndex + 1)
  },
  previous: function () {
    return this.setIndex(this.selectedIndex - 1)
  },
  setAriaLive: function (state) {
    if (state) {
      this.valueElement.setAttribute('aria-live', 'assertive')
    } else {
      this.valueElement.removeAttribute('aria-live')
    }

    return this
  },
  setOptions: function (options = []) {
    this.options = [...options]
    return this
  },
  setIndex: function (index) {
    index = engine.fn.wrap(index, 0, this.options.length)

    this.selectedIndex = index
    this.valueElement.innerHTML = this.options[index].label

    if (this.emit) {
      this.emit('change')
    }

    return this
  },
  setValue: function (value) {
    for (const i in this.options) {
      const option = this.options[i]

      if (option.value == value) {
        this.setIndex(i)
        break
      }
    }

    return this
  }
}
