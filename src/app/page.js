'use client'
import {useEffect} from "react";
import mqtt from "mqtt";

export default function Home() {
    useEffect(() => {
        const client = mqtt.connect(`wss://websocket.aleivc.com/wss`);

        client.on("connect", (packet) => {
            client.subscribe(topic, (err) => {
                if (!err) {
                    console.log(err);
                }
            })
        })

        client.on("message", (topic, message) => {
            const msg = JSON.parse(message.toString());
            console.log(msg);
        })

        return () => {
            client.end(); // Clean up by disconnecting client on unmount
        };
    }, [])
    return (
        <>
            test
        </>
    )
};
