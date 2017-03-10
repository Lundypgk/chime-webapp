let express = require('express'),
    router = express.Router(),
    db;

//Login Router
router.post('/', (req, res, next) => {
    db = req.db;
    db.collection('chimeUser').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        //If there is such user
        if (docs.length >= 1) {
            res.json({
                success: true,
                //objects: docs
            })
        } else {
            res.json({
                success: false,
                //objects: docs
            })
        }

        //db.close()
    });
});

module.exports = router;