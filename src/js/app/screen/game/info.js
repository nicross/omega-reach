app.screen.game.info = (() => {
  const attributesElement = document.querySelector('.a-game--attributes'),
    descriptionElement = document.querySelector('.a-game--description'),
    nameElement = document.querySelector('.a-game--name')

  function generateRandomInfo() {
    const isDiscovered = Math.random() > 0.5

    const info = {
      attributes: [],
      description: isDiscovered ? 'Object description' : 'Unexamined',
      isDiscovered,
      name: `Object #${engine.fn.randomInt(1000, 9999)}`,
      nameShort: '(short name)',
    }

    if (isDiscovered) {
      const count = engine.fn.randomInt(0, 3)

      for (let i = 0; i < count; i += 1) {
        info.attributes.push(
          engine.fn.choose([
            {label: 'Common quirk', modifiers: []},
            {label: 'Rare quirk', modifiers: ['rare']},
            {label: 'Unexamined quirk', modifiers: ['undiscovered']},
            {label: 'Unrecovered instrument', modifiers: ['undiscovered', 'instrument']},
            {label: 'Instrument recovered', modifiers: ['instrument']},
          ], Math.random())
        )
      }
    }

    return info
  }

  function getRoomInfo() {
    const room = content.location.get()

    return {
      attributes: room.getAttributeLabels(),
      description: room.getDescription(),
      isDiscovered: room.isDiscovered(),
      name: room.getName(),
      nameShort: room.getNameShort(),
    }
  }

  return {
    update: function () {
      const {
        attributes,
        description,
        isDiscovered,
        name,
        nameShort,
      } = getRoomInfo()

      nameElement.ariaLabel = nameShort
      nameElement.innerHTML = name
      descriptionElement.innerHTML = description

      attributesElement.innerHTML = attributes.map(
        ({label, modifiers}) => `<li class="a-game--attribute${modifiers.map((modifier) => ` a-game--attribute-${modifier}`).join('')}">${label}</li>`
      ).join('')

      if (isDiscovered) {
        descriptionElement.classList.remove('a-game--description-undiscovered')
      } else {
        descriptionElement.classList.add('a-game--description-undiscovered')
      }

      return this
    },
  }
})()
