'use client'
import {useEffect, useState} from "react";

export default function Home() {
    const [msg, setMsg] = useState("")
    useEffect(() => {
        const client = new WebSocket("wss://websocket.aleivc.com/wss");
        client.onmessage = (event) => {
            console.log(event.data)
            setMsg(current => current += event.data);
        }
    }, [])
    return (
        <div>
            some data
            {msg}
        </div>
    );
};
