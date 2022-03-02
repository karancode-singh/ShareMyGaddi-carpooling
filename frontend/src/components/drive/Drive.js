import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import MapSelector from './MapSelector';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import DatePicker from "react-datepicker";
import './Drive.css';
import "react-datepicker/dist/react-datepicker.css";

const mapContainerStyle = {
    height: "60vh",
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

export default function Drive() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Title Error');
    const [mapType, setMapType] = useState();
    const [mapCoords, setMapCoords] = useState({
        src: null,
        dst: null
    });
    const [routeResp, setRouteResp] = useState();
    const [date, setDate] = useState(new Date());

    const mapRef = useRef();
    const onMapLoad = (map) => {
        mapRef.current = map;
    };

    const openMapModal = (mapType) => {
        setMapType(mapType);
        setModalTitle(mapType === 'src' ? 'Source point' : 'Destination point');
        setShowModal(true);
    }

    const handleCallback = (closeButtonClicked, mapType, mapData) => {
        setShowModal(false);
        if (closeButtonClicked) return;
        setMapCoords({
            ...mapCoords,
            [mapType]: mapData
        });
    }

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK')
                setRouteResp(response)
            else
                alert('Problem fetching directions')
        } else alert('Problem fetching directions')
    }

    useEffect(() => {
        setRouteResp(null);
    }, [mapCoords]);

    return (
        <>
            {/* <div style={{ width: '100%', height: '100%', textAlign: 'center' }}> */}
            <Container fluid="lg">
                <Row style={{ marginTop: '3rem' }}>
                    <Col md>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="src">
                                <Col xs="9">
                                    <Form.Control readOnly defaultValue="Source not selected" value={mapCoords['src'] ? mapCoords['src']['lat'] + ', ' + mapCoords['src']['lng'] : null} />
                                </Col>
                                <Col xs="3">
                                    <Button variant="primary" onClick={() => openMapModal('src')} style={{ width: '100%' }} data-test="source-button">
                                        Source
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="dst">
                                <Col xs="9">
                                    <Form.Control readOnly defaultValue="Destination not selected" value={mapCoords['dst'] ? mapCoords['dst']['lat'] + ', ' + mapCoords['dst']['lng'] : null} />
                                </Col>
                                <Col xs="3">
                                    <Button variant="primary" onClick={() => openMapModal('dst')} style={{ width: '100%' }} data-test="destination-button">
                                        Destination
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Row>
                                <Col xs="6" sm="3">
                                    <label>Date of trip: </label>
                                </Col>
                                <Col xs="6">
                                    <DatePicker
                                        selected={date}
                                        minDate={new Date()}
                                        closeOnScroll={true}
                                        onChange={(date) => setDate(date)} />
                                </Col>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col className='col-auto'>
                                    <Button variant="primary" type="submit" data-test="submit-button" style={{ marginTop: '3rem' }}>
                                        Ready to drive!
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md style={{ marginTop: '2rem' }}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={15}
                            center={center}
                            options={options}
                            onLoad={onMapLoad}
                        >
                            {
                                (routeResp == null &&
                                    mapCoords['src'] != null && mapCoords['dst'] != null) && (
                                    <DirectionsService
                                        // required
                                        options={{
                                            destination: mapCoords['dst'],
                                            origin: mapCoords['src'],
                                            travelMode: 'DRIVING'
                                        }}
                                        // required
                                        callback={directionsCallback}
                                    />
                                )
                            }

                            {
                                routeResp !== null && (
                                    <DirectionsRenderer
                                        // required
                                        options={{
                                            directions: routeResp
                                        }}
                                    />
                                )
                            }
                        </GoogleMap>
                    </Col>
                </Row>
            </Container>
            <MapSelector
                showModal={showModal}
                mapType={mapType}
                modalTitle={modalTitle}
                mapCoords={mapCoords}
                handleCallback={handleCallback}
            />
        </>
    );
}