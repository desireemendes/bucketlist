import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from "./mapStyles"
import { useState } from "react";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([])

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading map";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={ (event) => {
          setMarkers(current => [...current, {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
       ])
      }}
      >
       {markers.map((marker => (
         <Marker
         key={marker.time.toISOstring()}
         position={{ lat: marker.lat, lng: marker.lng}}
         icon={{
           url: "/plane.svg",
           scaledSize: new window.google.maps.Size(30, 30),
           origin: new window.google.maps.Point(0, 0),
           anchor: new window.google.maps.Point(15, 15)
         }}
          />
       )))}

      </GoogleMap>
    </div>
  );
}

export default Map;
