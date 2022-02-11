import React, { useRef } from 'react';
import configData from "../../config.json";
import { GoogleMap, useLoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import { Button, Modal } from 'react-bootstrap';

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
  maxWidth: '100%'
}

export default function MapSelector(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: configData.MAPS_API_KEY,
    libraries,
  });
  const [marker, setMarker] = React.useState(center);
  const [autocomplete, setAutocomplete] = React.useState(null);
  const [textBoxText, setTextBoxText] = React.useState('');

  const handleClose =() => {
    props.handleCallback(true);
    return null;
  }

  const onMapClick = React.useCallback((e) => {
    const coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setTextBoxText('');
    setMarker(coords);
    // }, []);
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    setTextBoxText('');
    setMarker(props.mapCoords[props.mapType] == null ? center : props.mapCoords[props.mapType]);
    mapRef.current = map;
  // }, []);
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const onAutoCompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    setTextBoxText(autocomplete.getPlace().formatted_address);
    const coord = {
      lat: autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng()
    };
    setMarker(coord);
    panTo(coord);
  };

  if (loadError) return <h1>Map load error</h1>;
  // if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Modal
      onHide={handleClose}
      size='xl'
      show={props.showModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={marker}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          <Autocomplete
            onLoad={onAutoCompleteLoad}
            onPlaceChanged={onPlaceChanged}
            restrictions={{ country: ['ca', 'us'] }}
          >
            <input
              type="text"
              placeholder="Search"
              value={textBoxText}
              style={autocompleteTextBoxStyle}
              onChange={e => setTextBoxText(e.target.value)}
            />
          </Autocomplete>
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        </GoogleMap>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={() => props.handleCallback(false,props.mapType,marker)}>Select</Button>
      </Modal.Footer>
    </Modal>
  )
    // : null;
}