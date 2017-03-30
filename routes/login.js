let express = require('express'),
    router = express.Router(),
    db;

//Login Router for chimer
router.post('/chimer', (req, res, next) => {
    db = req.db;
    db.collection('chimeUser').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        req.session.chimer = docs;
        // res.session.chimer = docs;
        console.log(req.session);
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

//Login Router brand
router.post('/brand', (req, res, next) => {
    db = req.db;
    db.collection('brand').find({
        Username: req.body.username,
        Password: req.body.password
    }).toArray().then(function(docs) {
        req.session.brand = docs;
        req.session.save();
        console.log(req.session.brand);
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