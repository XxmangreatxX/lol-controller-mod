const xinput = require('./xinput');
const EventEmitter = require('events');

class Controller extends EventEmitter {
  constructor() {
    super();
    this.prevState = {
      move: { x: 0, y: 0 },
      buttons: 0
    };
    this.pollInterval = 16; // ~60 FPS
    this.startPolling();
  }
  
  startPolling() {
    setInterval(() => {
      const state = xinput.getState(0);
      if (!state) return;
      
      // Process left thumbstick for movement.
      const leftX = state.Gamepad.sThumbLX;
      const leftY = state.Gamepad.sThumbLY;
      const normX = leftX / 32767;
      const normY = -leftY / 32767; // invert Y
      // Log the normalized values every poll:
      console.log(`Polling: normX=${normX.toFixed(2)}, normY=${normY.toFixed(2)}`);
      
      // Emit a move event if change is significant.
      if (
        Math.abs(normX - this.prevState.move.x) > 0.005 ||
        Math.abs(normY - this.prevState.move.y) > 0.005
      ) {
        this.emit('move', normX, normY);
        this.prevState.move = { x: normX, y: normY };
        console.log(`Emitted move: x=${normX.toFixed(2)}, y=${normY.toFixed(2)}`);
      }
      
      // Process buttons...
      const buttons = state.Gamepad.wButtons;
      const mapping = {
        A: 0x1000,
        B: 0x2000,
        X: 0x4000,
        Y: 0x8000,
        LB: 0x0100,
        RB: 0x0200,
        L3: 0x0040,
        R3: 0x0080,
        "DPad Up": 0x0001,
        "DPad Down": 0x0002,
        "DPad Left": 0x0004,
        "DPad Right": 0x0008,
        Start: 0x0010,
        Back: 0x0020
      };
      for (let btn in mapping) {
        if ((buttons & mapping[btn]) && !(this.prevState.buttons & mapping[btn])) {
          this.emit('buttonPress', btn);
          console.log(`Emitted button: ${btn}`);
        }
      }
      this.prevState.buttons = buttons;
      
      // Process triggers.
      const LT = state.Gamepad.bLeftTrigger;
      const RT = state.Gamepad.bRightTrigger;
      if (LT > 50) {
        this.emit('buttonPress', 'LT');
        console.log("Emitted trigger: LT");
      }
      if (RT > 50) {
        this.emit('buttonPress', 'RT');
        console.log("Emitted trigger: RT");
      }
    }, this.pollInterval);
  }
}

module.exports = new Controller();