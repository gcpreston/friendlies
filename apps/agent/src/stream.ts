import { setStream } from './presence';
import { sendToRenderer } from './ipc';
import { Bridge } from 'slippi-web-bridge';

let bridge: Bridge | null = null;

const streamWsDest = process.env.STREAM_WS_DEST || '';
const slippiHost = process.env.SLIPPI_HOST;
const slippiPort = process.env.SLIPPI_PORT ? Number(process.env.SLIPPI_PORT) : undefined;

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
  if (streamWsDest === '') {
    throw new Error('Cannot start stream if STREAM_WS_DEST is not set');
  }

  const bridge = getOrCreateBridge();
  const { data, error } = await bridge.connect(streamWsDest, { slippiHost, slippiPort });

  if (error) {
    throw new Error(`Error starting stream: ${error}`);
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
