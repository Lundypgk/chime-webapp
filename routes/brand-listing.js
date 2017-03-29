let express = require('express'),
    moment = require('moment'),
    router = express.Router(),
    ObjectID = require('mongodb').ObjectID,
    db,
    Listing = require('../models/listing');

//Retrieve All Listing
//*Need to configure to retrieve only the brand's listing*
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
        //db.close()
    });
});

//Add Listing Router
router.post('/addListing', (req, res, next) => {
    db = req.db;
    // console.log(req.session.brand);
    // let newListing = new Listing({
    //         brandId: req.session.brand,
    //         description: req.body.description,
    //         budget: req.body.budget,
    //         perks: req.body.perks,
    //         requirements: req.body.requirements
    //     })
    db.collection('listing').save(req.body, (err, result) => {
        if (err) return console.log(err);
        res.json({
            success: true,
            message: "saved into database !"
        });
        console.log('saved to database');
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
            db.collection('chimeUser').find({
                _id: id
            }).toArray().then(function(result) {
                let temp = {};
                temp.name = result[0].FirstName;
                temp.url = jobs[0].instaUrl;
                temp.lastUpdated = jobs[0].lastUpdated;
                tempDataArray.push(temp);
                console.log(jobs)
                res.json({
                    success: true,
                    result: tempDataArray
                });
            })
        }
    });
});


module.exports = router;