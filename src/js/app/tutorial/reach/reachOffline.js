app.tutorial.reachOffline = app.tutorial.invent({
  id: 'reachOffline',
  // Lifecycle
  shouldActivate: () => content.location.is('reach'),
  onUpdate: function () {
    if (!content.location.is('reach')) {
      return
    }

    [
      {
        title: `It's the Omega Reach.`,
        description: `It's capable of feats only a telescope dreams—and fabled for its breakings of fourth ceilings. You enter the enclosure for what can only be described as a retractable hand—one that has started—and ended—intergalactic wars.`,
        actions: [
          {
            label: 'Approach the device',
          }
        ],
      },
      {
        title: `<span class="u-highlight">[Select input device…]</span>`,
        description: `You sit at the device. Upon its inert console rests…`,
        actions: [
          {
            label: 'two joysticks.',
            before: () => app.settings.setInputPreference('gamepad'),
          },
          {
            label: 'a trackball.',
            before: () => app.settings.setInputPreference('mouse'),
          },
          {
            label: 'a grid of keys.',
            before: () => app.settings.setInputPreference('keyboard'),
          },
          {
            label: 'a row of black and white keys.',
            before: () => app.settings.setInputPreference('midi'),
          },
          {
            label: 'a screen.',
            before: () => app.settings.setInputPreference('touch'),
          },
        ],
        after: () => {
          app.settings.save()
        },
      },
      {
        title: `<span class="u-highlight">[Select input preference…]</span>`,
        description: `To confirm your choices at the console, you…`,
        actions: [
          {
            label: 'hold for a second.',
            before: () => {
              app.settings.setInputHold(true)
            },
          },
          {
            label: 'reach it immediately.',
            before: () => {
              app.settings.setInputHold(false)
            },
          },
        ],
        after: () => {
          app.settings.save()
          app.screen.game.interact.update()
        },
      },
      {
        title: `Yet, it's offline.`,
        description: `You recall there being a specific sequence to make it stir. It's somewhere in that waking memory of yours. You reach toward the console, and…`,
        actions: [
          {
            label: 'Try something',
          }
        ],
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Interacting:`,
        description: () => ({
          gamepad: `Hold one or both <kbd>Triggers</kbd> and move the <kbd>Analog Sticks</kbd> to interact. Locate the sweet spot using audio, visual, and haptic cues to proceed.`,
          keyboard: `${app.settings.computed.inputHold ? 'Hold' : 'Press'}  one or more keys to interact. Each key points to a location. Locate the sweet spot using audio and visual cues to proceed.`,
          mouse: `${app.settings.computed.inputHold ? 'Click and hold' : 'Click'}  to interact at that location. Locate the sweet spot using audio and visual cues to proceed.`,
          touch: `${app.settings.computed.inputHold ? 'Tap and hold' : 'Tap'}  to interact at that location. Locate the sweet spot using audio and visual cues to proceed.`,
        }[this.getInputPreference()]),
        actions: [
          {
            label: 'Next tutorial',
          }
        ],
      },
      {
        tutorial: true,
        title: `<span class="u-highlight">[Tutorial]</span> <span class="u-screenReader">for</span> Skipping:`,
        description: () => ({
          gamepad: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} the <kbd>A</kbd> button`,
          keyboard: `${app.settings.computed.inputHold ? 'Hold' : 'Press'} <kbd>Enter</kbd> or <kbd>Spacebar</kbd>`,
          mouse: `${app.settings.computed.inputHold ? 'Click and hold' : 'Click'} the <kbd>Examine Button</kbd>`,
          touch: `${app.settings.computed.inputHold ? 'Tap and hold' : 'Tap'} the <kbd>Examine Button</kbd>`,
        }[this.getInputPreference()]) + ` to skip the current interaction. You will not be penalized for doing so.`,
        actions: [
          {
            label: 'Regain control',
          }
        ],
        after: () => this.markComplete(),
      },
    ].forEach((x) => app.screen.game.dialog.push(x))
  },
})
