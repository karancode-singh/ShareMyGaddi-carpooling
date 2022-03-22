import {React, useState} from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

import './ActiveTrip.css'

export default function ActiveTrip() {

    const [isDriver, setisDriver] = useState(true)
    return (
    <>
        <h1 id="pageTitle">Active Trip page</h1>
        <Container id="activeTripContainer">
            <div className="active-trip-card">
                <h1>Summary</h1>
                <Row className='active-trip-row'>
                    <h3>Source:</h3>
                    <h3>Destination:</h3>
                    <h3>Date:</h3>
                </Row>

                <h1>Details</h1>
                <Row className='active-trip-row'>
                    <h3>Driver:</h3>
                    <h3>Rider(s):</h3>
                </Row>
            </div>
            <Row>
                {isDriver? <Button variant='primary' id='cancelTripButton'> Done </Button>: null}
                <Button variant='danger' id='cancelTripButton'> Cancel trip </Button>
            </Row>
        </Container>
        
    </>
  )
}