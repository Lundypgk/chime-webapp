let express = require('express'),
    moment = require('moment'),
    router = express.Router(),
    config = require('../config/config'),
    ObjectID = require('mongodb').ObjectID,
    db, jwt;

// let applyListing = require('../models/chimer-listing');

//Retrieve All Listing
router.get('/getAllListing', (req, res, next) => {
    db = req.db;
    db.collection('listing').find().toArray().then(function(listing) {
        //If there is any listing
        if (listing.length >= 1) {
            res.json({
                success: true,
                results: listing
            })
        } else {
            res.json({
                success: false,
            })
        }
    });
});

//Apply for Listing
router.post('/applyListing', (req, res, next) => {
    db = req.db;
    jwt = req.jwt;
    jwt.verify(req.body.jwt, config.secret, function(err, decoded) {
        if (err)
            res.json({
                success: false
            })
        else {
            let listing = {
                chimerId: decoded.chimerId,
                listingId: req.body._id,
                jobStatus: "InProgress",
                perks: "",
                instaUrl: ""
            };
            db.collection('chimerListing').save(listing, (err, result) => {
                if (err) return console.log(err);
                res.json({
                    success: true,
                    message: "saved into database !"
                });
                console.log('saved to database');
            })
        }
    });
});

//Retrieve In Progress Job
router.get('/getCurrentJob', (req, res, next) => {
    db = req.db;
    jwt = req.jwt;
    let data = [];
    let token = req.query.jwt;
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.json({
                success: false,
                message: "There is something wrong with the authentication"
            })
        } else {
            db.collection('chimerListing').find({
                chimerId: decoded.chimerId
            }).toArray().then(function(jobs) {
                //Retrieve the list of listingId from the result 
                for (let tempData of jobs) {
                    let listingId = new ObjectID(tempData.listingId)
                    data.push(listingId)
                }
                db.collection('listing').find({
                    _id: { $in: data }
                }).toArray().then(function(result) {
                    for (let tempData of result) {
                        for (let tempData2 of jobs) {
                            tempData.status = tempData2.jobStatus
                        }
                    }
                    //If there is any listing
                    if (result.length >= 1) {
                        res.json({
                            success: true,
                            results: result
                        })
                    } else {
                        res.json({
                            success: false,
                        })
                    }
                })
            });
        }
    });
});

//Update In Progress Job
router.put('/updateCurrentJob', (req, res, next) => {
    db = req.db;
    jwt = req.jwt;
    let token = req.body.jwt;
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.json({
                success: false,
                message: "There is something wrong with the authentication"
            })
        } else
            db.collection('chimerListing').update({
                chimerId: decoded.chimerId,
                listingId: req.body._id,
            }, {
                $set: {
                    jobStatus: "Approval",
                    instaUrl: req.body.url,
                    lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
                }
            }).then(function(result) {
                res.json({
                    success: true,
                    results: result
                })
            })
    });
});



module.exports = router;