import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import getGeocode from "../services/geocode";
import config from "../config.json";

const containerStyle = {
  height: "350px",
};

function Map({ mapAddress }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const getCoordinates = async (mapAddress) => {
      const data = await getGeocode(mapAddress);
      setCenter(data.location);
    };

    getCoordinates(mapAddress);
  }, [mapAddress]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: config.GoggleMapApiKey,
  });

  // eslint-disable-next-line
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    )
  );
}

export default React.memo(Map);
