import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap, NavigationControl, _MapContext as MapContext } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import data from './data/gun_data.json';
import ToolTip from './tooltip';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZ2lsbGlhbjEyMyIsImEiOiJjazdxbW9idWowNHk5M2ZtdjBoejIzd3JrIn0.PozuahGTW0joR5YE-Nkqig';

export function GunDataMap() {
    const [ object, setObject ] = useState(null);
    const [ x, setX ] = useState(null);
    const [ y, setY ] = useState(null);

    const layers = [
        new ScatterplotLayer({
            id: 'scatterplot-layer',
            data,
            opacity: 0.8,
            filled: true,
            radiusMinPixels: 2,
            radiusMaxPixels: 5,
            getPosition: d => [d.longitude, d.latitude],
            getFillColor: d => dotColor(d),
            onHover: info => setTooltip(info),
            pickable: true
        })
    ];

    const setTooltip = info => {
        setObject(info.object);
        setX(info.x);
        setY(info.y);
    };

    return(
        <DeckGL
            initialViewState={{
                longitude: -97,
                latitude: 38,
                zoom: 4,
                pitch: 0,
                bearing: 0
            }}
            controller={true}
            layers={layers}
            ContextProvider={MapContext.Provider}
        >
            <ToolTip object={object} x={x} y={y} />
            <StaticMap
                mapStyle="mapbox://styles/mapbox/dark-v10"
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            <div style={{position: "absolute", right: 30, top: 120, zIndex: 1}}>
                <NavigationControl />
            </div>
        </DeckGL>
    );
};

const Red = [200, 0, 40, 150];
const Orange = [255, 140, 0, 100];
const White = [225, 225, 225, 30];

function dotColor(d) {
    let numKilled = d.n_killed;
    let numInjured = d.n_injured;
    if(numKilled > 0) { return Red; }
    else if (numInjured > 0) { return Orange; }
    else { return White; }
}