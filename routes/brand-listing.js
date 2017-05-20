//Import
let express = require('express'),
    moment = require('moment'),
    router = express.Router(),
    config = require('../config/config'),
    ObjectID = require('mongodb').ObjectID,
    Listing = require('../models/listing');

//Variables
let db, jwt;

//Retrieve All Listing
//*Need to configure to retrieve only the brand's listing*
router.get('/getAllListing', (req, res, next) => {
    db = req.db;
    jwt = req.jwt;
    jwt.verify(req.query.jwt, config.secret, function(err, decoded) {
        if (err)
            res.json({
                success: false
            })
        else {
            db.collection('listing').find({
                brandId: decoded.brandId
            }).toArray().then(function(listing) {
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
        }
    });

});

//Add Listing Router
router.post('/addListing', (req, res, next) => {
    db = req.db;
    jwt = req.jwt;
    let data, body;
    body = req.body.listing;
    jwt.verify(req.body.jwt, config.secret, function(err, decoded) {
        if (err) {
            console.log(err)
            res.json({
                success: false
            })
        } else {
            data = new Listing(body.description, body.budget, body.perks, body.requirements, decoded.brandId);
            db.collection('listing').save(data, (err, result) => {
                if (err) return console.log(err);
                setTimeout(function() {
                    res.json({
                        success: true,
                        message: "saved into database !"
                    });
                }, 2000);

            })
        }
    })
});

//Get Chimer Details
router.get('/getCampaginDetails', (req, res, next) => {
    let tempDataArray = [];
    db = req.db;
    db.collection('chimerListing').find({
        listingId: req.query.listingId
    }).toArray().then(function(jobs) {
        for (let data of jobs) {
            let id = new ObjectID(data.chimerId)
                // db.collection('chimeUser').find({
                //     _id: id
                // }).toArray().then(function(result) {
                //     console.log(result);
                //     let temp = {};
                //     // console.log("index " + jobs.indexOf(tempData));
                //     temp.chimerListingId = data._id;
                //     temp.name = result[0].FirstName;
                //     temp.url = data.instaUrl;
                //     temp.lastUpdated = data.lastUpdated;
                //     temp.status = data.jobStatus;
                //     tempDataArray.push(temp);
                // })
            db.collection('chimeUser').findOne({ _id: id }, function(err, result) {
                let temp = {};
                // console.log("index " + jobs.indexOf(tempData));
                temp.chimerListingId = data._id;
                temp.name = result.FirstName;
                temp.url = data.instaUrl;
                temp.lastUpdated = data.lastUpdated;
                temp.status = data.jobStatus;
                tempDataArray.push(temp);
                console.log(tempDataArray);
            })
        }
        setTimeout(function() {
            res.json({
                success: true,
                result: tempDataArray
            });
        }, 5000);

    });
});


//Update In Progress Job
router.put('/updateStatus', (req, res, next) => {
    db = req.db;
    console.log(req.body);
    let id = new ObjectID(req.body.chimerListingId);
    db.collection('chimerListing').update({
        _id: id
    }, {
        $set: {
            jobStatus: "Completed",
        }
    }).then(function(result) {
        res.json({
            success: true,
            results: result
        })
    })
});

router.get('/test', (req, res, next) => {
    res.json({
        SessionStore: req.sessionStore,
        SessionID: req.session
    })
});

module.exports = router;