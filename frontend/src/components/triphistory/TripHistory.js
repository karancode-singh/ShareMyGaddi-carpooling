import { React, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import * as GrIcons from 'react-icons/gr'
import sourceImg from '../../start-location.svg';
import destinationImg from '../../pin-location.svg';
import dtImg from '../../date-and-time.svg';
import groupImg from '../../group.svg';
import './TripHistory.css';
import Cookies from 'js-cookie';
import Geocode from "react-geocode";

export default function TripHistory() {
    const getLocFromCoords = async (coords) => {
        let lat = coords['lat']
        let long = coords['lng']

        const res = await Geocode.fromLatLng(lat, long)
        const location = await res.results[0].formatted_address;
        return location
    }

    const getDateandTime = (dtString) => {
        const d = new Date(dtString);
        let date = d.toDateString();
        dtString = d.toTimeString();
        let time = dtString.split(' ')[0].split(':')
        return date + ' @ ' + time[0] + ':' + time[1]
    }

    const [tripDetails, setTripDetails] = useState([])
    const fetchData = async () => {
        const response = await fetch(process.env.REACT_APP_END_POINT + '/trip/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            }
        })
        const data = await response.json()

        // Parse Data
        let tempArray = []
        for (let i = 0; i < data.length; i++) {
            let thisTrip = data[i]
            let newTrip = {}
            let loc;
            loc = await getLocFromCoords(thisTrip["source"])
            newTrip["source"] = loc
            loc = await getLocFromCoords(thisTrip["destination"])
            newTrip["destination"] = loc
            newTrip["tripDate"] = getDateandTime(thisTrip["dateTime"])
            newTrip["riderCount"] = thisTrip["riders"].length

            tempArray.push(newTrip)
        }
        setTripDetails(tempArray)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const CardView = ({
        source = "Default Title",
        destination = "Default Text",
        tripDate = "defaultDate",
        riderCount = "defaultRider",

    }) => (
        <div className="card-body mb-4 mt-4 mx-4 text-black">
            <div className='detail-container'>
                <div className='detail-row'>
                    <img className='tripImage' src={sourceImg}></img>
                    <h6 className='detail-heading'>Source: </h6>
                    <h6 className='detail-heading'>{source}</h6>
                </div>
            </div>

            <div className='detail-container'>
                <div className='detail-row'>
                    <img className='tripImage' src={destinationImg}></img>
                    <h6 className='detail-heading'>Destiation: </h6>
                    <h6 className='detail-heading'>{destination}</h6>
                </div>
            </div>

            <hr></hr>

            <div className='detail-container'>
                <div className='detail-row'>
                    <img className='tripImage' src={dtImg}></img>
                    <h6 className='detail-heading'>Date and time: </h6>
                    <h6 className='detail-heading'>{tripDate}</h6>
                </div>
            </div>



            <div className='detail-container'>
                <div className='detail-row'>
                    <img className='tripImage' src={groupImg}></img>
                    <h6 className='detail-heading'>No. of riders: </h6>
                    <h6 className='detail-heading'>{riderCount}</h6>
                </div>
            </div>
        </div>

    );
    return (
        <>
            {tripDetails.length === 0 ? <h1 style={{ width: '100%', height: '100%', textAlign: 'center', marginTop:'30vh' }}>No trips found</h1> :
                tripDetails.map((data, index) => {
                    return (
                        <CardView key={index} {...data} />
                    )
                })
            }
        </>
    )
}

