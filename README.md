# League of Legends Controller Mod

This project maps Xbox controller inputs to League of Legends in-game actions using Node.js.

## Setup

1. Install dependencies:
npm install

2. Run the project:
npm start


## Project Structure

- **src/config.js:** Configuration values (key mappings, polling interval, etc.)
- **src/abilities.js:** Functions to simulate ability key presses.
- **src/movement.js:** Functions to move the mouse based on controller movement.
- **src/controller.js:** Polls the Xbox controller using node-xinput and emits events.
- **src/index.js:** Ties everything together: listens to controller events and triggers movement/abilities.
- **xbox-config.json:** A sample configuration file for reference.
```
lol-controller-mod
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ abilities.js
│  ├─ config.js
│  ├─ controller.js
│  ├─ index.js
│  ├─ movement.js
│  ├─ sendinput.js
│  ├─ vendors.js
│  └─ xinput.js
└─ xbox-config.json

```