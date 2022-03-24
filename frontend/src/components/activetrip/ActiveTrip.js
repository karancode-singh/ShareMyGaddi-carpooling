import {React, useState, useEffect} from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import configData from "../../config.json";

import './ActiveTrip.css'

Geocode.setApiKey(configData.MAPS_API_KEY);

export default function ActiveTrip({setActiveTrip}) {

    const getLocFromCoords = (coords, type) =>{
        let lat = coords['lat']
        let long =  coords['lng']
    
        Geocode.fromLatLng(lat, long).then(
            (res) => {
                const location = res.results[0].formatted_address;
                if(type === 'src'){
                    setsource(location)
                }
                else{
                    setdestination(location)
                }
            },
            (err) => {
                console.error(err);
                if(type === 'src'){
                    setsource(lat+','+long)
                }
                else{
                    setdestination(lat+','+long)
                }
            }
        );
    }

    const [isDriver, setIsDriver] = useState(false);

    // Enable 'Done' button only in driver mode 
    useEffect(() => {
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
    },[]);

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

    // Active Trip details
    const [source, setsource] = useState("")
    const [destination, setdestination] = useState("")
    const [datetime, setdatetime] = useState("")
    const [driver, setdriver] = useState("")

    useEffect(() => {
        fetch(configData.END_POINT + '/trip/activetrip', {
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
            getLocFromCoords(responseJson.source,'src')
            getLocFromCoords(responseJson.destination,'dest')
            setdatetime(responseJson.dateTime)
            setdriver(responseJson.driver)
        }).catch((error) => {
            alert(error);
        });
    },[]);

    return (
    <>
        <h1 id="pageTitle">Active Trip page</h1>
        <Container id="activeTripContainer">
            <div className="active-trip-card">
                <h1>Summary</h1>
                <Row className='active-trip-row'>
                    <h3>Source: {source}</h3>
                    <h3>Destination: {destination}</h3>
                    <h3>Date: {datetime}</h3>
                </Row>

                <h1>Details</h1>
                <Row className='active-trip-row'>
                    <h3>Driver: {driver}</h3>
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
