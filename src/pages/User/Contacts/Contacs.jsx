import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import React from "react";
function Contacs() {
  document.title = "Contacts";
  const containerStyle = {
    width: "100%",
    height: "800px",
  };
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8",
  });
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Contacs;
