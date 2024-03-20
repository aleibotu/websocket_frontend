'use client';
import {Map} from 'react-map-gl'
import DeckGL from '@deck.gl/react'

import "mapbox-gl/dist/mapbox-gl.css";
// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 121.95,
    latitude: 30.97,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

// DeckGL react component
export default function MyMap() {
    return (
        <div onContextMenu={(e) => e.preventDefault()}>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[]}
            >
                <Map
                    mapboxAccessToken={'pk.eyJ1IjoiYWxlaXZjIiwiYSI6ImNreTJjNGc2azBrZ2MydnJtbDY1bWVkZGsifQ.q71gMIIPSTNoz6VbWLUanw'}
                    mapStyle='mapbox://styles/mapbox/dark-v9'
                    preventStyleDiffing={true}
                />
            </DeckGL>
        </div>
    );
}
