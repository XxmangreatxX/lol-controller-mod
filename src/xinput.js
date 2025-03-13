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

let dllName = 'xinput1_4';
try {
  require('fs').accessSync(`C:\\Windows\\System32\\${dllName}.dll`);
} catch (err) {
  dllName = 'xinput1_3';
}

const xinputLib = ffi.Library(dllName, {
  'XInputGetState': ['uint32', ['uint32', ref.refType(XINPUT_STATE)]]
});

function getState(controllerIndex) {
  const state = new XINPUT_STATE();
  const res = xinputLib.XInputGetState(controllerIndex, state.ref());
  if (res === 0) {
    return state;
  } else {
    return null;
  }
}

module.exports = { getState };