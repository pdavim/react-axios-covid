import React, { PureComponent } from "react";
import { render } from "react-dom";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { TextLayer } from "@deck.gl/layers";

// Set your mapbox token here
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGRhdmltIiwiYSI6ImNrODlhNGZ3MjA0YWgzbm8yYWI2aXdkZXQifQ.PRoLVYzMXBnW5NwpbJhZyg"; // eslint-disable-line
const DATA_URL =
  "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json"; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -9.13333,
  latitude: 38.71667,
  zoom: 9,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

const mapData = [
  [-9.13333, 38.71667, 45],
  [-8.41955, 40.20564, 5],
  [-7.9, 38.56667, 8]
];

export default class SingularCountryMap extends PureComponent {
  _renderLayers() {
    const {
      //data = DATA_URL,
      data = mapData,
      intensity = 1,
      threshold = 0.03,
      radiusPixels = 30
    } = this.props;

    return [
      /*new HeatmapLayer({
        data,
        id: "heatmp-layer",
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: d => d[2],
        radiusPixels,
        intensity,
        threshold
      }),*/
      new TextLayer({
        id: "text-layer",
        data,
        pickable: true,
        getPosition: d => d.coordinates,
        getText: d => d.name,
        getSize: 32,
        getAngle: 0,
        getTextAnchor: "middle",
        getAlignmentBaseline: "center",
        onHover: ({ object, x, y }) => {
          const tooltip = `${object.name}\n${object.address}`;
          /* Update tooltip
             http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
          */
        }
      })
    ];
  }

  render() {
    const { mapStyle = "mapbox://styles/mapbox/dark-v9" } = this.props;

    return (
      <div>
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={this._renderLayers()}
        >
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}

export function renderToDOM(container) {
  render(<SingularCountryMap />, container);
}
