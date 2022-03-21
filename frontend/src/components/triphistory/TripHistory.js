import React from 'react';
export default function TripHistory() {

    const tripDetails = [
        {
            source: "Home",
            destination: "University of Waterloo",
            tripDate: "01-03-2022",
            rider: "Alex"
        },
        {
            source: "University of Waterloo",
            destination: "Phillip Street",
            tripDate: "01-03-2022",
            rider: "Nelson"
        },
        {
            source: "Phillip Street",
            destination: "University of Waterloo",
            tripDate: "01-03-2022",
            rider: "Ran"
        },
        {
            source: "lester ",
            destination: "University of Waterloo",
            tripDate: "01-03-2022",
            rider: "Ran"
        }
    ]

    const CardView = ({
        source = "Default Title",
        destination = "Default Text",
        imgsrc = "default_holder.js/100px180",
        tripDate = "defaultDate",
        rider = "defaultRider"
    }
    ) => (
        
            <div className="card-body mb-4 mt-4 mx-4 bg-dark text-white">
                <div className="row">
                    <div className="col-md-6">
                        <div className="well">{source}</div>
                    </div>
                    <div className="col-md-3 offset-md-3">
                        <div className="well">{tripDate}</div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="well">{destination}</div>
                    </div>
                </div>

                <hr></hr>

                <div className="row">
                    <div className="col-md-6">
                        <div className="well">{rider}</div>
                    </div>
                </div>
            </div>
        
    );
    return tripDetails.map((data, index) => <CardView key={index} {...data} />);
}

