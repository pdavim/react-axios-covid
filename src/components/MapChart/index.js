import React, { useState } from "react";
import { observer, inject } from "mobx-react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  geographicRoot: {
    height: "600px",
    maxWidth: "100%",
    alignItems: "center"
  }
}));

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = inject("Store")(
  observer(props => {
    const [, setZoom] = useState(1);
    let citiesMarkers = props.Store.citiesDataArrayObs;
    //let countriesArraylength = countriesArray.length;
    let zoom = 1.5;
    //console.log("citiesMarkers ", citiesMarkers);

    function handleZoomEnd(position) {
      setZoom(position.zoom);
    }

    let classes = useStyles();
    return (
      <ComposableMap
        projection="geoEqualEarth"
        className={classes.geographicRoot}
      >
        >
        <ZoomableGroup zoom={zoom} onZoomEnd={handleZoomEnd}>
          >
          <Geographies geography={geoUrl} className={classes.geographicRoot}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  className={classes.geographicRoot}
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {citiesMarkers.map(
            ({ name, coordinates, markerOffset, xmarkerOffset }) => (
              <Marker
                key={name}
                coordinates={coordinates}
                className={classes.geographicRoot}
              >
                >
                <circle r={3} fill="#F00" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  x={xmarkerOffset}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#5D5A6D",
                    fontSize: "3px"
                  }}
                >
                  {name}
                </text>
              </Marker>
            )
          )}
        </ZoomableGroup>
      </ComposableMap>
    );
  })
);

export default MapChart;
