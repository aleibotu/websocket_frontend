import {useRef} from "react";
import ReactHlsPlayer from "react-hls-player";

export function Video() {
    const playerRef = useRef()
    return (
        <ReactHlsPlayer
            src="http://61.169.69.134:7474/hls/3124/hls.m3u8"
            autoPlay={true}
            controls={true}
            width="100%"
            height="auto"
            playerRef={playerRef}
        />
    )
}
