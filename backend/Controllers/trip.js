const Trip = require("../Models/tripModel");
const User = require("../Models/user");
const dotenv = require("dotenv");
const { PolyUtil } = require("node-geometry-library");
dotenv.config()

exports.drive = (req, res) => {
    User.findById(req.auth._id, (err, user) => {
        if (err)
            return res.status(500).end();
        if (user.active_trip == undefined || user.active_trip == null) {
            const tripObj = new Trip({
                driver: req.auth._id,
                source: req.body.src,
                destination: req.body.dst,
                route: req.body.route,
                date: new Date(req.body.date),
                max_riders: req.body.max_riders,
            });
            tripObj.save((err, trip) => {
                if (err)
                    return res.status(500).end();
                res.status(200).json(trip);
                user.active_trip = trip._id;
                user.trip_role_driver = true;
                user.save((err) => {
                    if (err) {
                        trip.deleteOne();
                        return res.status(500).end();
                    }
                    return res;
                })
                return res.status(500).end();
            })
        } else {
            //TODO: revert
            res.statusMessage = "A trip is already active";
            return res.status(400).end();
        }
    })
}

exports.ride = (req, res) => {
    let response = PolyUtil.isLocationOnEdge(
        {
            "lat": 43.49481,
            "lng": -80.5487173
        }, // point object {lat, lng}
        [{ "lat": 43.49555, "lng": -80.54922 },
        { "lat": 43.4941605, "lng": -80.5487012 },
        { "lat": 43.4938041, "lng": -80.5494875 }
        ],
        20
    );
    console.log(response);  // true
    return response;
    // User.findById(req.auth._id, (err, user) => {
    //     if (err)
    //         return res.status(500).end();
    //     if (user.active_trip == undefined || user.active_trip == null) {
    //         //TODO: match directly? update match pool and run something to check for match and update when done?
    //         const trip = new Object();
    //         trip.riders.push(user._id);
    //         trip.available_riders = !(trip.riders.length === trip.max_riders);
    //         trip.save((err, trip) => {
    //             if (err)
    //                 return res.status(500).end();
    //             res.status(200).json(trip);
    //             user.active_trip = trip._id;
    //             user.trip_role_driver = false;
    //             user.save((err) => {
    //                 if (err) {
    //                     //TODO: revert
    //                     return res.status(500).end();
    //                 }
    //                 return res;
    //             })
    //             return res.status(500).end();
    //         })
    //     } else {
    //         res.statusMessage = "A trip is already active";
    //         return res.status(400).end();
    //     }
    // })
}

exports.cancelTrip = (req, res) => {
    User.findById(req.auth._id, (err, user) => {
        if (err)
            return res.status(500).end();
        if (user.active_trip == undefined || user.active_trip == null) {
            res.statusMessage = "No active trip";
            return res.status(400).end();
        } else {
            Trip.findById(user.active_trip, (err, trip) => {
                if (err)
                    return res.status(500).end();
                if (trip) {
                    if (user.trip_role_driver) {
                        trip.deleteOne((err) => {
                            if (err)
                                return res.status(500).end();
                        });
                    } else {
                        trip.riders = trip.riders.filter(function (element) {
                            return element != user._id;
                        });
                        trip.available_riders = true;
                        trip.save((err) => {
                            if (err)
                                return res.status(500).end();
                        });
                    }
                }
                user.active_trip = null;
                user.trip_role_driver = null;
                user.save((err) => {
                    if (err) {
                        res.statusMessage = "Error in saving user. Trip was deleted/modified.";
                        return res.status(500).end();
                    }
                    res.status(200).end();
                    return res;
                });
            });
        }
    })
}