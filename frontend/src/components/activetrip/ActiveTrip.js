import {React, useState} from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import configData from "../../config.json";

import './ActiveTrip.css'

export default function ActiveTrip({setActiveTrip}) {

    const [isDriver, setIsDriver] = useState(false);

    // Enable 'Done' button only in driver mode 
    fetch(configData.END_POINT + '/trip/isdriver', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Coookie': Cookies.get('tokken')
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((responseJson) => {
        if(responseJson.isdriver){
            setIsDriver(true)
        }
    }).catch((error) => {
        alert(error);
    });

    // Handle 'Cancel' button
    const handleCancel = (e) => {
        e.preventDefault();

        return fetch(configData.END_POINT + '/trip', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            },
        }).then((response) => {
            if (response.ok){
                setActiveTrip(null);
                alert("Trip cancelled successfully");
                window.location.reload();
                return;
            }
            throw new Error(response.statusText);
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }
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
                <Button variant='danger' id='cancelTripButton' onClick={handleCancel}> Cancel trip </Button>
            </Row>
        </Container>
        
    </>
  )
}
