import {React, useEffect, useState } from 'react';
import sourceImg from '../../start-location.svg';
import destinationImg from '../../pin-location.svg';
import dtImg from '../../date-and-time.svg';
import groupImg from '../../group.svg';
import './TripHistory.css';
import Cookies from 'js-cookie';
import Geocode from "react-geocode";
import configData from "../../config.json";

export default function TripHistory() {
    // const tripDetails = [
    //     {
    //         source: "Home",
    //         destination: "University of Waterloo",
    //         tripDate: "01-03-2022",
    //         riderCount: 2,
            
    //     },
    //     {
    //         source: "University of Waterloo",
    //         destination: "Phillip Street",
    //         tripDate: "01-03-2022",
    //         riderCount: 3,
    //     },
    //     {
    //         source: "Phillip Street",
    //         destination: "University of Waterloo",
    //         tripDate: "01-03-2022",
    //         riderCount: 1,
            
    //     },
    //     {
    //         source: "lester ",
    //         destination: "University of Waterloo",
    //         tripDate: "01-03-2022",
    //         riderCount: 1,
    //         time:"2 pm"
            
    //     }
    // ]
   
    const getLocFromCoords = async (coords) =>{
        let lat = coords['lat']
        let long =  coords['lng']
    
        const res = await Geocode.fromLatLng(lat, long)
        const location = await res.results[0].formatted_address;
        return location
    }

    const getDateandTime = (dtString) =>{
        let [date,time] = dtString.split('T')
        time = time.split('.')[0]
        return date+' @ '+time
    }
    
    const [tripDetails, setTripDetails] = useState([])
    const fetchData = async () => {
        const response = await fetch(configData.END_POINT + '/trip/history',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Coookie': Cookies.get('tokken')
            }
        })
        const data = await response.json() 

        // Parse Data
        let tempArray = []
        for(let i = 0; i< data.length; i++){
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
                        <img className= 'tripImage'src={sourceImg}></img>
                        <h6 className='detail-heading'>Source: </h6>
                        <h6 className='detail-heading'>{source}</h6>
                    </div>
                </div>

                <div className='detail-container'>
                    <div className='detail-row'>
                        <img className= 'tripImage'src={destinationImg}></img>
                        <h6 className='detail-heading'>Destiation: </h6>
                        <h6 className='detail-heading'>{destination}</h6>
                    </div>
                </div>

                <hr></hr>

                <div className='detail-container'>
                    <div className='detail-row'>
                        <img className= 'tripImage' src={dtImg}></img>
                        <h6 className='detail-heading'>Date and time: </h6>
                        <h6 className='detail-heading'>{tripDate}</h6>
                    </div>
                </div>

                

                <div className='detail-container'>
                    <div className='detail-row'>
                    <img className= 'tripImage' src={groupImg}></img>
                        <h6 className='detail-heading'>No. of riders: </h6>
                        <h6 className='detail-heading'>{riderCount}</h6> 
                    </div>
                </div>
            </div>
        
        );
        return(
            <>
            {tripDetails.length ===0? <h1>No trips found</h1>:
                tripDetails.map((data,index) => {
                    return(
                    <CardView key={index} {...data} />
                    )
                })
            }
            </>
        )
} 

