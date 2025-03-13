const robot = require('robotjs');
const config = require('./config');

function castAbility(button) {
  const key = config.abilities[button];
  if (key) {
    // Simulate a quick key tap.
    robot.keyTap(key);
    console.log(`Ability ${button} cast (mapped to ${key}).`);
  } else {
    console.log(`No ability mapping for button: ${button}`);
  }
}

module.exports = { castAbility };