import {useCallback, useEffect, useState, createContext, useContext} from "react";

export const KeyDownContext = createContext(null);

export const keyActionMap = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    KeyE: 'zoomIn',
    KeyQ: 'zoomOut'
}

// const client = new WebSocket('ws://172.16.2.149:8881')

// export const useKeyBoard = () => {
//     const [actions, setActions] = useState({
//         moveForward: false,
//         moveBackward: false,
//         moveLeft: false,
//         moveRight: false,
//         zoomIn: false,
//         zoomOut: false
//     });
//
//     // 如果按下的是A 键， 就向左, x --> -1
//     // 如果按下的是D 键， 就向右, x -->  1
//     const handleKeyDown = useCallback((e) => {
//         let action
//         if (e.type === 'mousedown') {
//             action = keyActionMap[e.target.dataset.code]
//         } else if (e.type === 'keydown') {
//             action = keyActionMap[e.code]
//         }
//
//         console.log(action)
//
//         if (action) {
//             if (action === 'moveLeft') {
//                 client.send(JSON.stringify({
//                     method: "ptzMove",
//                     params: {
//                         "address": "172.16.80.111",
//                         "speed": {
//                             "x": 1,
//                             "y": 1,
//                             "z": 0
//                         },
//                         "timeout": 30
//                     }
//                 }))
//             }
//             if (action === 'moveRight') {
//                 client.send(JSON.stringify({
//                     method: "ptzMove",
//                     params: {
//                         "address": "172.16.80.111",
//                         "speed": {
//                             "x": -1,
//                             "y": 1,
//                             "z": 0
//                         },
//                         "timeout": 30
//                     }
//                 }))
//             }
//             setActions((prev) => ({
//                 ...prev,
//                 [action]: true
//             }))
//         }
//         e.stopPropagation()
//     }, [])
//
//     const handleKeyUp = useCallback((e) => {
//         let action
//         if (e.type === 'mouseup') {
//             action = keyActionMap[e.target.dataset.code]
//         } else if (e.type === 'keyup') {
//             action = keyActionMap[e.code]
//         }
//
//         if (action) {
//             client.send(JSON.stringify({
//                 method: "ptzStop",
//                 params: {
//                     "address": "172.16.80.111"
//                 }
//             }))
//             setActions((prev) => ({
//                 ...prev,
//                 [action]: false
//             }))
//         }
//     }, [])
//
//     const handleMouseLeave = useCallback(() => {
//         setActions((prevState) => {
//             return Object.keys(prevState).map(i => ({[i]: false}))
//         })
//     }, [])
//
//     useEffect(() => {
//         document.addEventListener('keydown', handleKeyDown);
//         document.addEventListener('keyup', handleKeyUp);
//
//         client.onopen = () => {
//             client.send(JSON.stringify({
//                 method: "startDiscovery",
//                 params: ""
//             }))
//
//         }
//
//         client.onmessage = e => {
//             const msg = JSON.parse(e.data)
//             if(msg.id === 'startDiscovery' && msg.result) {
//                 client.send(JSON.stringify({
//                     method: "connect",
//                     params: {
//                         "address": "172.16.80.111",
//                         "user": "admin",
//                         "pass": "okwy1234"
//                     }
//                 }))
//             }
//
//
//         }
//         return () => {
//             document.removeEventListener('keydown', handleKeyDown);
//             document.removeEventListener('keyup', handleKeyUp);
//         }
//     }, [handleKeyDown, handleKeyUp])
//
//     return {actions, handleKeyUp, handleKeyDown, handleMouseLeave};
// }
