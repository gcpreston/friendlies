import * as SlippiViewer from '@gcpreston/slippi-viewer';
import { useEffect, useRef } from 'react';

export function Spectate() {
    const viewerRef = useRef();

    useEffect(() => {
        console.log("slippi-viewer import:", SlippiViewer);
        const viewer = viewerRef.current;

        if (viewer) {
            console.log("viewer:", viewer);
            viewer.spectate("ws://localhost:4000/viewer_socket/websocket?stream_id=2887902519");
        }
    }, []);

    return (
        <div>
            <slippi-viewer ref={viewerRef} zips-base-url='http://localhost:4000/assets'></slippi-viewer>
        </div>
    );
}
