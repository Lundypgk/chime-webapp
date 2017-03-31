let express = require('express'),
    moment = require('moment'),
    router = express.Router(),
    ObjectID = require('mongodb').ObjectID,
    db, client;

// let applyListing = require('../models/chimer-listing');

//Retrieve All Listing
router.get('/getAllListing', (req, res, next) => {
    db = req.db;
    client = req.client;
    client.get("chimerId", function(err, result) {
        if (result == "") {
            res.send("NOT AUTHORIZED");
        } else {
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
                //db.close()
            });
        }
    });

});

//Apply for Listing
router.post('/applyListing', (req, res, next) => {
    db = req.db;
    client = req.client;
    let chimerId;
    client.get("chimerId", function(err, result) {
        chimerId = result;
        let listing = {
            chimerId: chimerId,
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
    });
});

//Retrieve In Progress Job
router.get('/getCurrentJob', (req, res, next) => {
    db = req.db;
    client = req.client;
    let chimerId = req.query.chimerId;
    let data = [];
    db.collection('chimerListing').find({
        chimerId: chimerId
    }).toArray().then(function(jobs) {
        //Retrieve the list of listingId from the result 
        for (let tempData of jobs) {
            let listingId = new ObjectID(tempData.listingId)
                // let obj = { $oid: tempData.listingId };
            data.push(listingId)
                // console.log(tempData)
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

        //db.close()
    });
    // client.get("chimerId", function(err, result) {
    //     chimerId = result;
    //     db.collection('chimerListing').find({
    //         chimerId: chimerId
    //     }).toArray().then(function(jobs) {
    //         //Retrieve the list of listingId from the result 
    //         for (let tempData of jobs) {
    //             let listingId = new ObjectID(tempData.listingId)
    //                 // let obj = { $oid: tempData.listingId };
    //             data.push(listingId)
    //                 // console.log(tempData)
    //         }
    //         db.collection('listing').find({
    //             _id: { $in: data }
    //         }).toArray().then(function(result) {
    //             for (let tempData of result) {
    //                 for (let tempData2 of jobs) {
    //                     tempData.status = tempData2.jobStatus
    //                 }
    //             }
    //             //If there is any listing
    //             if (result.length >= 1) {
    //                 res.json({
    //                     success: true,
    //                     results: result
    //                 })
    //             } else {
    //                 res.json({
    //                     success: false,
    //                 })
    //             }
    //         })

    //         //db.close()
    //     });
    // });
});

//Update In Progress Job
router.put('/updateCurrentJob', (req, res, next) => {
    db = req.db;
    client = req.client;
    let chimerId = req.body.chimerId;
    db.collection('chimerListing').update({
            chimerId: chimerId,
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
        // client.get("chimerId", function(err, result) {
        //     chimerId = result;
        //     db.collection('chimerListing').update({
        //         chimerId: chimerId,
        //         listingId: req.body._id,
        //     }, {
        //         $set: {
        //             jobStatus: "Approval",
        //             instaUrl: req.body.url,
        //             lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
        //         }
        //     }).then(function(result) {
        //         res.json({
        //             success: true,
        //             results: result
        //         })
        //     })
        // });
});



module.exports = router;