import React from "react";

import { inject, observer } from "mobx-react";

import { StaticMap, _MapContext as MapContext } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

//import { isObject } from "mobx/lib/internal";
// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGRhdmltIiwiYSI6ImNrODlhNGZ3MjA0YWgzbm8yYWI2aXdkZXQifQ.PRoLVYzMXBnW5NwpbJhZyg"; // eslint-disable-line

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 20
  },
  deckGl: {
    width: "450px",
    height: "400px"
  }
}));

const Map01 = inject("Store")(
  observer(props => {
    console.log("map01 props", parseFloat(props.coord[0]));
    const INITIAL_VIEW_STATE = {
      longitude: parseFloat(props.coord[0]),
      latitude: parseFloat(props.coord[1]),
      zoom: 4,
      maxZoom: 16,
      pitch: 0,
      bearing: 0
    };

    //console.log("Map01", props.coord);
    const mapData = [
      { 0: parseFloat(props.coord[0]), 1: parseFloat(props.coord[1]), 2: 45 }
    ];
    //console.log("Map01 ", props.Store);

    /* for (let i = 0; i < lengthData; i++) {
      mapData.push(mapChartArrayData[i]);
    } */
    //console.log("mapData ", mapData);

    const { mapStyle = "mapbox://styles/mapbox/dark-v9" } = props;
    const {
      data = mapData,
      // dattaText = DATA_URLJosn,
      // data = props.Store.mapChartArrayData[14],
      intensity = 1,
      threshold = 0.03,
      radiusPixels = 30
    } = props;

    const layer = [
      new HeatmapLayer({
        data,
        //data,
        id: "heatmp-layer",
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2],
        radiusPixels,
        intensity,
        threshold
      })
    ];

    const classes = useStyles();
    return (
      <Grid container spacing={1} className={classes.root}>
        <Grid item>
          <Paper>
            <DeckGL
              className={classes.deckGl}
              //marginTop="50%"

              ContextProvider={MapContext.Provider}
              initialViewState={INITIAL_VIEW_STATE}
              controller={true}
              layers={layer}
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginRight: "5px",
                width: "47%",
                height: "483px"
              }}
            >
              <StaticMap
                reuseMaps
                mapStyle={mapStyle}
                // container="mapId"
                preventStyleDiffing={true}
                mapboxApiAccessToken={MAPBOX_TOKEN}
              />
            </DeckGL>
          </Paper>
        </Grid>
      </Grid>
    );
  })
);

export default Map01;
