import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
function Map({ searchResults }) {
  const [selectedLocation, setselectedLocation] = useState({});
  //Transforming the search results object into the {lat:number,long:number} object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  const center = getCenter(coordinates); //gives central point of all results
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    height: "100%",
    width: "100%",
  });
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/tanishha/cks0ic6gd2bsp18nn7r2l682i"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((results) => (
        <div key={results.long}>
          <Marker
            longitude={results.long}
            latitude={results.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setselectedLocation(results)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>

          {/* //popup that appears when marker is clicked */}

          {selectedLocation.long === results.long ? (
            <Popup
              onClose={() => setselectedLocation({})} //change to empty
              closeOnClick="true"
              latitude={selectedLocation.lat}
              longitude={selectedLocation.long}
            >
              {results.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
