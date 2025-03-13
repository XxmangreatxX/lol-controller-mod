const ViGEmClient = require('vigemclient');

let client = new ViGEmClient();
let connErr = client.connect();

if (connErr != null) {
  console.error("Error connecting to ViGEmBus driver:", connErr.message);
  process.exit(1);
}

let virtualController = client.createX360Controller();
let err = virtualController.connect();

if (err) {
  console.error("Error connecting virtual controller:", err.message);
  process.exit(1);
}

virtualController.updateMode = "manual"; // We will update manually.
console.log("Virtual controller connected successfully.");
module.exports = virtualController;
