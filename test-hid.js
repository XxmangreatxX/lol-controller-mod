// test-hid.js
const HID = require('node-hid');

// List all HID devices (for reference)
console.log("Available HID devices:");
console.log(HID.devices());

// Replace these with your controller's vendor and product IDs:
const vendorId = 1118; // e.g., 0x045E in decimal
const productId = 767; // your controller's productId

try {
  const device = new HID.HID(vendorId, productId);
  console.log(`Opened HID device for vendorId: ${vendorId}, productId: ${productId}`);
  
  device.on("data", (data) => {
    // Log raw data in hex format
    console.log("Raw HID data:", data.toString('hex'));
  });

  device.on("error", (err) => {
    console.error("HID error:", err);
  });
} catch (err) {
  console.error("Failed to open device:", err);
}
