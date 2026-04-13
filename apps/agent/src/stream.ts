import { setStream } from './presence';
import { sendToRenderer } from './ipc';
import { Bridge } from 'slippi-web-bridge';

let bridge: Bridge | null = null;

const STREAM_WS_DEST_FALLBACK = 'wss://spectatormode.tv/bridge_socket/websocket';
const streamWsDest = process.env.STREAM_WS_DEST ?? STREAM_WS_DEST_FALLBACK;

function getOrCreateBridge(): Bridge {
  if (!bridge) {
    bridge = new Bridge();

    bridge.onDisconnect(reason => {
      sendToRenderer('stream:disconnected', reason);
      setStream(null);
    });
  }

  return bridge;
}

export async function startStream(): Promise<number> {
  const bridge = getOrCreateBridge();
  const { data, error } = await bridge.connect(streamWsDest);
  console.log("BRIDGE CONNECT RESULT", data, error);

  if (error) {
    throw new Error(error);
  }

  const streamId = data!.streamIds[0];
  setStream(streamId);
  return streamId;
}

export function stopStream() {
  if (bridge) {
    bridge.quit();
  }
}
