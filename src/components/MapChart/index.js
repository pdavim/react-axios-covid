import React, { useState } from "react";
import { observer, inject } from "mobx-react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = inject("Store")(
  observer(props => {
    const [zoom, setZoom] = useState(1);
    let citiesMarkers = props.Store.citiesDataArrayObs;
    //let countriesArraylength = countriesArray.length;

    //console.log("citiesMarkers ", citiesMarkers);

    function handleZoomEnd(position) {
      setZoom(position.zoom);
    }

    return (
      <ComposableMap projection="geoEqualEarth">
        <ZoomableGroup zoom={zoom} onZoomEnd={handleZoomEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>

          {citiesMarkers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontFamily: "system-ui",
                  fill: "#5D5A6D",
                  fontSize: "8px"
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    );
  })
);

export default MapChart;
