const Trip = require("../Models/tripModel");
const User = require("../Models/user");
const dotenv = require("dotenv");
const { PolyUtil } = require("node-geometry-library");
dotenv.config()

// const MS_PER_MINUTE = 60000;
const offsetDurationInMinutes = 15;
const pct = .2;
const radiusOffset = 25;

exports.drive = (req, res) => {
    User.findById(req.auth._id, (err, user) => {
        if (err)
            return res.status(500).end();
        if (user.active_trip == undefined || user.active_trip == null) {
            console.log('drive req.body', req.body);
            const tripObj = new Trip({
                driver: req.auth._id,
                source: req.body.src,
                destination: req.body.dst,
                route: req.body.route,
                date: new Date(req.body.date),
                max_riders: req.body.max_riders,
            });
            tripObj.save((err, trip) => {
                if (err) // TODO: ?Handle error coming due to not selecting all the required fields?
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
    console.log(req.auth._id)
    User.findById(req.auth._id, (err, user) => {
        console.log(err);
        if (err)
            return res.status(500).end();
        console.log(user.active_trip)    
        if (user.active_trip == undefined || user.active_trip == null) {
            //Matching logic START
            console.log('ride req.body', req.body);
            let startDate = new Date(req.body.date);
            startDate.setMinutes(startDate.getMinutes() - offsetDurationInMinutes);
            let endDate = new Date(req.body.date);
            endDate.setMinutes(endDate.getMinutes() + offsetDurationInMinutes);
            Trip.find({
                date: {
                    $gte: startDate,
                    $lte: endDate
                },
                available_riders: true
            }, function (err, trips) {
                if (err) {
                    res.statusMessage = "No matches found. No trips around your time.";
                    return res.status(400).end();
                }
                var trip;
                trips.forEach(tempTrip => {
                    const pctLen = parseInt(tempTrip.route.length * pct)
                    let found = PolyUtil.isLocationOnEdge(
                        req.body.src,
                        tempTrip.route.slice(0, pctLen),
                        radiusOffset
                    );
                    if (found) {
                        found = PolyUtil.isLocationOnEdge(
                            req.body.dst,
                            tempTrip.route.slice(pctLen),
                            radiusOffset
                        );
                        if (found) {
                            trip = tempTrip;
                            return;
                        }
                    }
                });
                //Matching logic END
                if (trip == undefined || trip == null) {
                    res.statusMessage = "No match found";
                    return res.status(400).end();
                }
                trip.riders.push(user._id);
                trip.available_riders = !(trip.riders.length === trip.max_riders);
                trip.save((err, trip) => {
                    if (err)
                        return res.status(500).end();
                    res.status(200).json(trip);
                    user.active_trip = trip._id;
                    user.trip_role_driver = false;
                    user.save((err) => {
                        if (err) {
                            //TODO: revert
                            return res.status(500).end();
                        }
                        return res;
                    })
                    return res.status(500).end();
                });
            });
        } else {
            res.statusMessage = "A trip is already active";
            return res.status(400).end();
        }
    })
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

exports.histroy =(req,res)=>{
    const u = require("../Models/user.js")
}
exports.drivedone=(req,res)=>{
    
    //var ab=ObjectId('623628d6e2cb3e73c861dde1')
    User.findById(req.auth._id,(err, user) => {
        if (err)
            return res.status(500).end();
        else{
            
            
            Trip.findById(user.active_trip,(err,trips)=>{
                if(err)
                return res.status(500).end();
                else{
                    trips.riders.forEach(temp=>{
                        User.findById(temp,(err,user2)=>{
                            
                            if(err)
                            return res.status(500).end();
                            else{
                                
                                user2.trips.push(user.active_trip);
                                
                                trips.riders.pop(temp)
                                
                                user2.save((err)=>{
                                    res.statusMessage = "Error in saving trip to table.";
                            return res.status(500).end();
                                })
                            }
                        })
                    })
                    
                    
                }
            })
        }
        
        

    })
}