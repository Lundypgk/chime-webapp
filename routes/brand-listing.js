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
                console.log("")
                console.log("")
                console.log("")
                console.log("")
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