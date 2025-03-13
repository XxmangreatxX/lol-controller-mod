module.exports = {
  movement: {
    pollInterval: 16,      // ~60 FPS (used by rawcontroller if needed)
    sensitivity: 1,        // scaling factor for raw axis values (we assume raw values are in 16-bit range)
    // You may adjust these once you determine the report range.
    // For example, if the joystick center is ~32768, you might subtract center and then divide by center.
  },
  abilities: {
    A: 'q',
    B: 'w',  // For example, for Zed, B maps to in-game W.
    X: 'e',
    Y: 'r',
    LB: 'd',
    RB: 'f',
    LT: '1',
    RT: '2',
    L3: 'space'
  }
};