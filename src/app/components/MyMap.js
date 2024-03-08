'use client';
import {Map} from 'react-map-gl'
import DeckGL from '@deck.gl/react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'

import MyChart from "@/app/components/MyChart";

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
            <div style={{zIndex: 11, position: 'absolute'}}>
                <MyChart />
            </div>
            <div style={{zIndex: 10}}>
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={true}
                    layers={[]}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <Map
                        reuseMaps
                        mapLib={maplibregl}
                        mapStyle='https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json'
                        preventStyleDiffing={true}
                    />
                </DeckGL>
            </div>
        </div>
    );
}
