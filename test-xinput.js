const ffi = require('ffi-napi');
const ref = require('ref-napi');
const Struct = require('ref-struct-napi');

const DWORD = ref.types.uint32;
const WORD = ref.types.uint16;
const SHORT = ref.types.short;

const XINPUT_GAMEPAD = Struct({
  wButtons: WORD,
  bLeftTrigger: 'uchar',
  bRightTrigger: 'uchar',
  sThumbLX: SHORT,
  sThumbLY: SHORT,
  sThumbRX: SHORT,
  sThumbRY: SHORT
});

const XINPUT_STATE = Struct({
  dwPacketNumber: DWORD,
  Gamepad: XINPUT_GAMEPAD
});

const XINPUT_STATEPtr = ref.refType(XINPUT_STATE);

let dllName = 'xinput1_4';
try {
  require('fs').accessSync(`C:\\Windows\\System32\\${dllName}.dll`);
} catch (e) {
  dllName = 'xinput1_3';
}

const xinputLib = ffi.Library(dllName, {
  'XInputGetState': ['uint32', ['uint32', XINPUT_STATEPtr]]
});

function getState(controllerIndex) {
  const state = new XINPUT_STATE();
  const res = xinputLib.XInputGetState(controllerIndex, state.ref());
  console.log("XInputGetState returned:", res);
  if (res === 0) {
    return state;
  } else {
    return null;
  }
}

setInterval(() => {
  let state = getState(0);
  if (state) {
    console.log({
      sThumbLX: state.Gamepad.sThumbLX,
      sThumbLY: state.Gamepad.sThumbLY,
      wButtons: state.Gamepad.wButtons,
      bLeftTrigger: state.Gamepad.bLeftTrigger,
      bRightTrigger: state.Gamepad.bRightTrigger
    });
  } else {
    console.log("No state available.");
  }
}, 100);
