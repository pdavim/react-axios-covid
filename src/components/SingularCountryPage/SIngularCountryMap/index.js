import React from "react";
import { inject, observer } from "mobx-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  { markerOffset: -15, name: "lisboa", coordinates: [38.71667, -9.13333] },
  { markerOffset: 25, name: "Coimbra", coordinates: [40.20564, -8.41955] },
  { markerOffset: 25, name: "Évora", coordinates: [38.56667, -7.9] },
  { markerOffset: 25, name: "Faro", coordinates: [37.01937, -7.93223] },
  { markerOffset: 25, name: "Porto", coordinates: [41.14961, -8.61099] },
  { markerOffset: -15, name: "Braga", coordinates: [41.55032, -8.42005] }
];

const SingularCountryMap = inject("Store")(
  observer(props => {
    return (
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [58.0, 20.0],
          scale: 400
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            console.log("geographies ", geographies);
            let region = "";
            let geagraphiesArray = geographies.length;
            for (let i = 0; i < geagraphiesArray; i++) {
              if (geographies[i].properties.NAME === "Portugal") {
                region = geographies[i].properties.REGION_UN;
              }
            }
            console.log("region ", region);
            geographies
              .filter(d => d.properties.REGION_UN === region)
              .map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ));
          }}
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    );
  })
);

export default SingularCountryMap;
