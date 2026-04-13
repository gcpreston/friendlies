import { Bridge } from 'slippi-web-bridge';

let streamService: Bridge | null = null;

export const STREAM_URL = 'ws://localhost:4000/bridge_socket/websocket';

export function getStreamService(): Bridge {
  if (!streamService) {
    streamService = new Bridge();
  }
  return streamService;
}
