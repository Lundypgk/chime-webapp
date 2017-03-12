let express = require('express'),
    router = express.Router(),
    db;

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
        //db.close()
    });
});



module.exports = router;