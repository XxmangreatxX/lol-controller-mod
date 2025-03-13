const rawController = require('./src/rawcontroller');
rawController.on("move", (x, y) => {
  console.log(`Test move event: x=${x.toFixed(2)}, y=${y.toFixed(2)}`);
});
rawController.on("error", (err) => {
  console.error("Test error:", err);
});
console.log("Running raw HID test. Move the controller now...");