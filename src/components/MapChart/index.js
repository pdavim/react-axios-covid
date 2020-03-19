import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import Tooltip from "@material-ui/core/Tooltip";

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
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  typography: {
    padding: theme.spacing(2)
  }
}));

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = inject("Store")(
  observer(props => {
    // getModalStyle is not a pure function, we roll the style only on the first render

    /*  const handleClose = () => {
      setOpen(false);
    }; */
    let citiesMarkers = props.Store.citiesDataArrayObs;
    //let countriesArraylength = countriesArray.length;
    let zoom = 1.5;
    //console.log("citiesMarkers ", props);

    const handleZoomEnd = position => {
      //setZoom(position.zoom);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    let classes = useStyles();
    return (
      <div>
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
              ({
                name,
                coordinates,
                markerOffset,
                xmarkerOffset,
                region,
                capital,
                population
              }) => (
                <Marker
                  key={name}
                  coordinates={coordinates}
                  //onClick={handleOpen}
                  className={classes.geographicRoot}
                >
                  >
                  <Tooltip title={name}>
                    <circle
                      r={3}
                      fill="#F00"
                      stroke="#fff"
                      strokeWidth={2}
                      onClick={handleClick}
                      aria-describedby={id}
                    />
                  </Tooltip>
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
      </div>
    );
  })
);

export default MapChart;
