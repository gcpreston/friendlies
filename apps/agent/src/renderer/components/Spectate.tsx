import * as SlippiViewer from '@gcpreston/slippi-viewer';
import { useEffect, useRef } from 'react';

export function Spectate({ streamId }: { streamId: number | null }) {
  const viewerRef = useRef();

  useEffect(() => {
    console.log("slippi-viewer import:", SlippiViewer);
    const viewer = viewerRef.current;

    if (viewer && streamId) {
      viewer.spectate(`ws://localhost:4000/viewer_socket/websocket?stream_id=${streamId}`);
    }
  }, []);

  return (
    <>
      {streamId && <div>Watching stream: {streamId}</div>}
      <slippi-viewer ref={viewerRef} zips-base-url='http://localhost:4000/assets'></slippi-viewer>
    </>
  );
}
