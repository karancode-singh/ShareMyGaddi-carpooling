import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import MapSelector from './MapSelector';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import DatePicker from "react-datepicker";
import './DriveRide.css';
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

export default function DriveRide({ type }) {
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
                            <Row style={{ marginTop: '1rem' }}>
                                <Col xs="6" sm="3" md="4">
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
                            {
                                type === 'drive' ?
                                    <Row style={{ marginTop: '1rem' }}>
                                        <Col sm="7" md="12" xl="8">
                                            <FloatingLabel controlId="ridingWith" label="Select number of people can ride with">
                                                <Form.Select>
                                                    <option>----- Select -----</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    : null
                            }
                            <Row className='justify-content-center'>
                                <Col className='col-auto'>
                                    {
                                        type === 'drive' ?
                                            <Button variant="primary" type="submit" data-test="drive-button" style={{ marginTop: '3rem' }}>
                                                Ready to drive!
                                            </Button> :
                                            <Button variant="primary" type="submit" data-test="ride-button" style={{ marginTop: '3rem' }}>
                                                Ready to ride!
                                            </Button>
                                    }
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