app.screen.game.info = (() => {
  const attributesElement = document.querySelector('.a-game--attributes'),
    descriptionElement = document.querySelector('.a-game--description'),
    nameElement = document.querySelector('.a-game--name')

  function generateRandomInfo() {
    const isScanned = Math.random() > 0.5

    const info = {
      attributes: [],
      description: isScanned ? 'Object description' : 'Unscanned',
      isScanned,
      name: `Object #${engine.fn.randomInt(1000, 9999)}`,
    }

    if (isScanned) {
      const count = engine.fn.randomInt(0, 3)

      for (let i = 0; i < count; i += 1) {
        info.attributes.push(
          engine.fn.choose([
            {label: 'Common trait', modifiers: []},
            {label: 'Rare trait', modifiers: ['rare']},
            {label: 'Undiscovered trait', modifiers: ['undiscovered']},
            {label: 'Unrecovered instrument', modifiers: ['undiscovered', 'instrument']},
            {label: 'Instrument recovered', modifiers: ['instrument']},
          ], Math.random())
        )
      }
    }

    return info
  }

  return {
    update: function () {
      const {
        attributes,
        description,
        isScanned,
        name,
      } = generateRandomInfo()

      nameElement.innerHTML = name
      descriptionElement.innerHTML = description

      attributesElement.innerHTML = attributes.map(
        ({label, modifiers}) => `<li class="a-game--attribute${modifiers.map((modifier) => ` a-game--attribute-${modifier}`).join('')}">${label}</li>`
      ).join('')

      if (isScanned) {
        descriptionElement.classList.remove('a-game--description-unscanned')
      } else {
        descriptionElement.classList.add('a-game--description-unscanned')
      }

      return this
    },
  }
})()
