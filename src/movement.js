const robot = require('robotjs');
const config = require('./config');

function moveCharacter(normX, normY) {
  const screenSize = robot.getScreenSize();
  const centerX = Math.floor(screenSize.width / 2);
  const centerY = Math.floor(screenSize.height / 2);
  
  const magnitude = Math.sqrt(normX * normX + normY * normY);
  if (magnitude < 0.1) return;
  
  const maxRange = config.movement.range;
  const desiredDistance = Math.min(magnitude * config.movement.sensitivity, maxRange);
  
  const dirX = normX / magnitude;
  const dirY = normY / magnitude;
  
  const targetX = Math.floor(centerX + dirX * desiredDistance);
  const targetY = Math.floor(centerY + dirY * desiredDistance);
  
  robot.moveMouse(targetX, targetY);
  robot.mouseClick("right");
  console.log(`Movement command: right-click at (${targetX}, ${targetY})`);
  
  // Re-center the mouse after a short delay.
  setTimeout(() => {
    robot.moveMouse(centerX, centerY);
    console.log(`Mouse re-centered to (${centerX}, ${centerY})`);
  }, 50);
}

module.exports = { moveCharacter };