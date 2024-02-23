'use client'
import useWebSocket from "react-use-websocket"

export default function Home() {
    const WS_URL = "wss://wss.aleivc.com"

    const { lastJsonMessage } = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    return (
        <div>
            {JSON.stringify(lastJsonMessage)}
        </div>
    );
};
