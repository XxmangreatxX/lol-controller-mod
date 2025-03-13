const HID = require('node-hid');
const EventEmitter = require('events');
const vendorId = 1118; // Xbox vendor
const productId = 767; // Your controller's productId

class RawController extends EventEmitter {
  constructor() {
    super();
    try {
      this.device = new HID.HID(vendorId, productId);
      console.log("Raw controller opened.");
      this.device.on("data", (data) => this.handleData(data));
      this.device.on("error", (err) => this.emit("error", err));
    } catch (err) {
      console.error("Failed to open raw controller:", err);
    }
  }
  
  handleData(data) {
    // Convert the Buffer to an array.
    const arr = Array.from(data);
    console.log("Raw HID data (with indices):");
    arr.forEach((val, i) => {
      console.log(`Index ${i}: ${val}`);
    });

    // --- Attempt Alternative Parsing ---
    // Many Xbox One controllers send a report with a length of around 20 bytes.
    // Often, the left stick data is located at indices 4-5 for X and 6-7 for Y.
    if (arr.length < 8) return;

    const leftX = arr[4] | (arr[5] << 8); // little-endian
    const leftY = arr[6] | (arr[7] << 8);
    
    // Convert to signed 16-bit integers.
    const signedLeftX = (leftX & 0x8000) ? leftX - 0x10000 : leftX;
    const signedLeftY = (leftY & 0x8000) ? leftY - 0x10000 : leftY;
    
    // Normalize values assuming typical range -32768 to 32767.
    const normX = signedLeftX / 32767;
    const normY = -signedLeftY / 32767; // invert Y if needed
    
    // Emit move event if movement is significant.
    if (Math.abs(normX) > 0.05 || Math.abs(normY) > 0.05) {
      this.emit("move", normX, normY);
      console.log(`Emitted move: x=${normX.toFixed(2)}, y=${normY.toFixed(2)}`);
    }
  }
}

module.exports = new RawController();
