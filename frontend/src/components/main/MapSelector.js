import React, { useRef, useState } from 'react';
import { GoogleMap, Autocomplete, Marker } from '@react-google-maps/api';
import { Button, Modal } from 'react-bootstrap';

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
  const [marker, setMarker] = useState(center);
  const [autocomplete, setAutocomplete] = useState(null);
  const [textBoxText, setTextBoxText] = useState('');

  const handleClose = () => {
    props.handleCallback(true);
    return null;
  }

  const onMapClick = (e) => {
    const coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setTextBoxText('');
    setMarker(coords);
  };

  const mapSelectorRef = useRef();
  const onMapSelectorLoad = (mapSelector) => {
    setTextBoxText('');
    setMarker(props.mapCoords[props.mapType] == null ? center : props.mapCoords[props.mapType]);
    mapSelectorRef.current = mapSelector;
  };

  const panTo = ({ lat, lng }) => {
    mapSelectorRef.current.panTo({ lat, lng });
    mapSelectorRef.current.setZoom(14);
  };

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
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={marker}
          options={options}
          onClick={onMapClick}
          onLoad={onMapSelectorLoad}
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
        <Button variant="secondary" data-test="close-button" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={() => props.handleCallback(false, props.mapType, marker)}>Select</Button>
      </Modal.Footer>
    </Modal>
  )
}