import React from "react";

import { inject, observer } from "mobx-react";

import { Marker, StaticMap, _MapContext as MapContext } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { TextLayer } from "@deck.gl/layers";
import { Deck, FirstPersonView, MapView } from "@deck.gl/core";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import totalCases from "../../functions/totalCases";
// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGRhdmltIiwiYSI6ImNrODlhNGZ3MjA0YWgzbm8yYWI2aXdkZXQifQ.PRoLVYzMXBnW5NwpbJhZyg"; // eslint-disable-line
const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -9.13333,
  latitude: 38.71667,
  zoom: 2,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 20
  },
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,255,255,0.1)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
    width: 150
  },
  paperCard2: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,25,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard3: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(243,186,45,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard4: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(125,11,159,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard5: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,25,255,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard6: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(50,204,100,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard7: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,255,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard8: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(204,102,102,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard9: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,0,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard10: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(150,150,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50
  },
  paperCard11: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(15,15,15,0.4)",
    marginLeft: 1,
    marginRight: 1
    //height: 50
  },
  textCard: {
    color: "white",
    fontWeight: 400,
    fontSize: 14
  },
  textContent: {
    color: "white",
    textAlign: "left",
    fontWeight: 900,
    fontSize: 18
  },
  title: {
    color: "white",
    fontWeight: 900,
    fontSize: 18,
    textAlign: "center"
  },
  titleChartOverWhite: {
    color: "black",
    textAlign: "left",
    fontWeight: 700,
    fontSize: 22,
    padding: 20
  },
  TableFooterRegion: {
    paddingTop: 14,
    paddingBottom: 14
  }
}));

const MapChart = inject("Store")(
  observer(props => {
    const mapData = [];
    console.log("MapChart ", props.Store);
    const { mapChartArrayData } = props.Store;
    let lengthData = mapChartArrayData.length;
    for (let i = 0; i < lengthData; i++) {
      mapData.push(mapChartArrayData[i]);
    }

    let dataData =
      props.Store.getAllCountryCornovirusDataObs.data.countries_stat;
    let totalData = totalCases(dataData);

    let dataDataLength = dataData.length;
    let casesData = totalData.totalCases;
    let deathsData = totalData.totalDeaths;
    let nTotalRecovers = totalData.tRecovers;

    const { mapStyle = "mapbox://styles/mapbox/dark-v9" } = props;
    const {
      data = mapData,
      // dattaText = DATA_URLJosn,
      // data = props.Store.mapChartArrayData[14],
      intensity = 1,
      threshold = 0.03,
      radiusPixels = 30
    } = props;

    const deck = new Deck({
      width: 0 //layers: [new ScatterplotLayer({data})]
    });
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
      <Grid container>
        <Grid item xs={12}>
          <h1>Map</h1>
        </Grid>
        /
        <Grid item xs={6}>
          <DeckGL
            width="100%"
            height="88%"
            marginTop="70px"
            ContextProvider={MapContext.Provider}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layer}
            style={{ marginTop: 80 }}
          >
            <StaticMap
              reuseMaps
              mapStyle={mapStyle}
              // container="mapId"
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            />
            <Grid container spacing={1} className={classes.root}>
              <Grid item xs={3}>
                <Paper className={classes.paperCard2}>
                  <Typography className={classes.textCard}>
                    Nº de Casos
                  </Typography>
                  <Typography className={classes.textContent}>
                    {casesData}
                  </Typography>{" "}
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paperCard3}>
                  <Typography className={classes.textCard}>
                    Nº de Mortos
                  </Typography>
                  <Typography className={classes.textContent}>
                    {deathsData}
                  </Typography>{" "}
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paperCard4}>
                  <Typography className={classes.textCard}>
                    Nº de Recuperados
                  </Typography>
                  <Typography className={classes.textContent}>
                    {nTotalRecovers}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paperCard5}>
                  <Typography className={classes.textCard}>
                    Nº de Paises
                  </Typography>
                  <Typography className={classes.textContent}>
                    {dataDataLength}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </DeckGL>
        </Grid>
      </Grid>
    );
  })
);

export default MapChart;

/*export function renderToDOM(container) {
  render(<MapChart />, container);
} */
