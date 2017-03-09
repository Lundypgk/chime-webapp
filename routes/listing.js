let express = require('express'),
    router = express.Router(),
    db,
    Listing = require('../models/listing');

//Add Listing Router
router.post('/addListing', (req, res, next) => {
    db = req.db;
    // let newListing = new Listing({
    //     description: req.body.description,
    //     budget: req.body.budget,
    //     perks: req.body.perks,
    //     requirements: req.body.requirements
    // })
    db.collection('listing').save(req.body, (err, result) => {
        if (err) return console.log(err);
        res.json({
            success: true,
            message: "saved into database !"
        });
        console.log('saved to database');
    })
});


module.exports = router;