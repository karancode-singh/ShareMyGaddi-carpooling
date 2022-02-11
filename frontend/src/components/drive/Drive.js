import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MapSelector from './MapSelector';
import './Drive.css';

export default function Drive() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('Title Error');
    const [mapType, setMapType] = useState();
    const [mapCoords, setMapCoords] = useState({
        src: null,
        dst: null
    });

    const openMapModal = (mapType) => {
        setMapType(mapType);
        setModalTitle(mapType=='src' ? 'Source point' : 'Destination point');
        setShowModal(true);
    }

    const handleCallback = (closeButtonClicked, mapType, mapData) => {
        setShowModal(false);
        if (closeButtonClicked) return;
        setMapCoords({
            ...mapCoords,
            [mapType]: mapData
        });
        console.log(mapCoords);
    }

    return (
        <>
            <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                <Button variant="primary" onClick={() => openMapModal('src')}>
                    Set source
                </Button>
                <Button variant="primary" onClick={() => openMapModal('dst')}>
                    Set destination
                </Button>
            </div>
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