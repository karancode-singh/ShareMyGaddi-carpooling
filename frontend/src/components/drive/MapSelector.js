import React, { useRef } from 'react';
// @ts-ignore
import configData from "../../config.json";
import { GoogleMap, useLoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const libraries = ["places"];
const mapContainerStyle = {
  height: "70vh",
  width: "100%",
};
const options = {
  // styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.473078230478336,
  lng: -80.54225947407059,
};

const autocompleteTextBoxStyle = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `22rem`,
  height: `3rem`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: 'absolute',
  top: '1rem',
  left: '1.5rem',
  maxWidth:'100%'
}

// @ts-ignore
export default function MapSelector(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: configData.MAPS_API_KEY,
    // @ts-ignore
    libraries,
  });
  // const [marker, setMarker] = React.useState(props.marker);
  const [marker, setMarker] = React.useState(center);
  const [autocomplete, setAutocomplete] = React.useState(null);
  const [textBoxText, setTextBoxText] = React.useState('');
  

  // @ts-ignore
  const onMapClick = React.useCallback((e) => {
    setTextBoxText('');
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    // }, []);
  });

  const onAutoCompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    setMarker({
      lat: autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng()
    });
  };

  if (loadError) return <h1>Map load error</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={options}
      onClick={onMapClick}
    // onLoad={onMapLoad}
    >
      <Autocomplete
        onLoad={onAutoCompleteLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search"
          value={textBoxText}
          // @ts-ignore
          style={autocompleteTextBoxStyle}
          // @ts-ignore
          onChange={e => setTextBoxText(e.target.value)}
        />
      </Autocomplete>
      <Marker
        key={`${marker.lat}-${marker.lng}`}
        position={{ lat: marker.lat, lng: marker.lng }}
      />
    </GoogleMap>
  );
}