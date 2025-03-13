const controller = require('./controller');
const virtualController = require('./virtualcontroller');
const { castAbility } = require('./abilities');
const robot = require('robotjs'); // Optional

controller.on('move', (x, y) => {
  console.log(`index.js received move event: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
  // Update virtual controller's left thumbstick.
  virtualController.axis.leftX.setValue(x);
  virtualController.axis.leftY.setValue(y);
  virtualController.update();
  console.log(`Virtual Left Thumb updated: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
});

controller.on('buttonPress', (button) => {
  console.log(`index.js received buttonPress: ${button}`);
  if (['A', 'B', 'X', 'Y'].includes(button)) {
    virtualController.button[button].setValue(true);
    virtualController.update();
    console.log(`Virtual Button ${button} pressed`);
    setTimeout(() => {
      virtualController.button[button].setValue(false);
      virtualController.update();
      console.log(`Virtual Button ${button} released`);
    }, 100);
  } else {
    console.log(`No virtual mapping for button: ${button}`);
  }
});

console.log("League of Legends Controller Mod started!");