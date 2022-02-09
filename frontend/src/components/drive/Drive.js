import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MapSelector from './MapSelector';
import './Drive.css';

export default function Drive() {
    const [show, setShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('Title Error');

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                <Button variant="primary" onClick={handleShow}>
                    Launch modal
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MapSelector></MapSelector>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}