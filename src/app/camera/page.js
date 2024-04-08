'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {Video} from "@/app/camera/Video";

import {keyActionMap} from "./useKeyBoard";

import styles from "./page.module.css";

export const KeyDownContext = createContext(null);
const client = new WebSocket('ws://882465s3t4.vicp.fun:12841')
const initActions = {
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    zoomIn: false,
    zoomOut: false
}

export default function Page() {
    const [actions, setActions] = useState(initActions);

    const handleKeyDown = (e) => {
        let action
        if (e.type === 'mousedown') {
            action = keyActionMap[e.target.dataset.code]
        } else if (e.type === 'keydown') {
            action = keyActionMap[e.code]
        }

        if (action) {
            let pos = {x: 0, y: 0, z: 0};
            if(action === 'moveLeft') {
                pos = {...pos, x: 1}
            } else if (action === 'moveRight') {
                pos = {...pos, x: -1}
            } else if (action === 'moveForward') {
                pos = {...pos, y: 1}
            } else if (action === 'moveBackward') {
                pos = {...pos, y: -1}
            } else if (action === 'zoomIn') {
                pos = {...pos, z: 1}
            } else if (action === 'zoomOut') {
                pos = {...pos, z: -1}
            }
            client.send(JSON.stringify({
                method: "ptzMove",
                params: {
                    address: "172.16.80.111",
                    speed: pos,
                    timeout: 10
                }
            }))
            setActions((prev) => ({
                ...prev,
                [action]: true
            }))
        }

        console.log(action)
        e.stopPropagation()
    }

    const handleKeyUp = (e) => {
        let action
        if (e.type === 'mouseup') {
            action = keyActionMap[e.target.dataset.code]
        } else if (e.type === 'keyup') {
            action = keyActionMap[e.code]
        }

        if (action) {
            client.send(JSON.stringify({
                method: "ptzStop",
                params: {
                    "address": "172.16.80.111"
                }
            }))
            setActions((prev) => ({
                ...prev,
                [action]: false
            }))
        }
    }

    const handleMouseLeave = () => {
        setActions(() => {
            return Object.keys(initActions).map(i => ({[i]: false}))
        })
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    return (
        <div style={{maxWidth: 1024}}>
            视频延迟大约9秒,,,,,,,,,,,,,,
            <Video/>
            <div className={styles.container}>
                <KeyDownContext.Provider value={{actions, handleKeyDown, handleKeyUp, handleMouseLeave}}>
                    <CardList/>
                </KeyDownContext.Provider>
            </div>
        </div>
    )
}

const CardList = () => {
    return (
        <>
            <Card code="KeyA" text='左' />
            <Card code="KeyW" text='上' />
            <Card code="KeyS" text='下' />
            <Card code="KeyD" text='右'/>
            <Card code="KeyE" text='近'/>
            <Card code="KeyQ" text='远'/>
        </>
    )
}

const Card = ({code, text}) => {
    const {actions, handleKeyUp, handleKeyDown, handleMouseLeave} = useContext(KeyDownContext)
    const pressed = actions[keyActionMap[code]]

    return (
        <div
            data-code={code}
            className={styles.card}
            onMouseUp={handleKeyUp}
            onMouseDown={handleKeyDown}
            onMouseLeave={handleMouseLeave}
            style={{backgroundColor: pressed ? '#474b4f' : '#000'}}
        >
            {text}
        </div>
    )
}
